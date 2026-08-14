'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const WEBHOOK_URL = 'https://automation.vpinformatics.in/webhook/companyInfo';

/* Mobile numbers that the visitor did not supply are synthesised so every chat
   still has a stable "from" identity. The WEBSESS prefix is what the n8n side
   uses to tell a browser session apart from a real WhatsApp number. */
const SESSION_PREFIX = 'WEBSESS';
const STORAGE_KEY = 'vp-chat-session';

const isSessionNumber = (n) => typeof n === 'string' && n.startsWith(SESSION_PREFIX);

function newSessionNumber() {
  const rand = String(Math.floor(Math.random() * 1e6)).padStart(6, '0');
  return `${SESSION_PREFIX}${Date.now()}${rand}`;
}

function randomId(prefix) {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}.${Date.now()}.${rand}`;
}

/* n8n's "Respond to Webhook" node can return plain text, a bare object, or an
   array of items — normalise all of those down to a display string. */
function extractReply(payload) {
  if (payload == null) return '';
  if (typeof payload === 'string') return payload.trim();
  if (Array.isArray(payload)) {
    const parts = payload.map(extractReply).filter(Boolean);
    return parts.join('\n\n');
  }
  if (typeof payload === 'object') {
    const keys = ['reply', 'response', 'answer', 'output', 'text', 'message', 'content', 'result', 'data', 'json'];
    for (const k of keys) {
      if (k in payload) {
        const v = extractReply(payload[k]);
        if (v) return v;
      }
    }
  }
  return '';
}

/* The RAG workflow answers in Markdown. Rather than pull in a parser, render the
   small subset it actually emits — bold, italics, inline code, links, bullets,
   headings — straight to React nodes (never raw HTML, so replies can't inject). */
const INLINE_RE = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|<https?:\/\/[^>\s]+>|https?:\/\/[^\s<>)]+)/g;

function renderInline(text, keyPrefix) {
  const link = (href, label, key) => (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="text-red-600 font-bold underline underline-offset-2 break-all">{label}</a>
  );
  const out = [];
  let last = 0;
  let i = 0;
  let m;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyPrefix}-${i++}`;
    if (tok.startsWith('**')) {
      out.push(<strong key={key} className="font-black text-slate-900">{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('`')) {
      out.push(<code key={key} className="px-1 py-0.5 bg-slate-100 text-slate-900 text-[12px]">{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith('[')) {
      const mm = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(tok);
      out.push(link(mm[2], mm[1], key));
    } else if (tok.startsWith('<')) {
      out.push(link(tok.slice(1, -1), tok.slice(1, -1), key));
    } else if (tok.startsWith('http')) {
      out.push(link(tok, tok, key));
    } else {
      out.push(<em key={key}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function RichText({ text }) {
  const lines = String(text).split('\n');
  const blocks = [];
  lines.forEach((raw, idx) => {
    const line = raw.replace(/\s+$/, '');
    const key = `l${idx}`;
    if (!line.trim()) {
      blocks.push(<div key={key} className="h-2" />);
      return;
    }
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push(<hr key={key} className="my-2 border-slate-200" />);
      return;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push(<div key={key} className="font-black text-slate-900 mt-1">{renderInline(heading[2], key)}</div>);
      return;
    }
    const bullet = /^\s*([-*•])\s+(.*)$/.exec(line);
    if (bullet) {
      blocks.push(
        <div key={key} className="flex gap-2 pl-1">
          <span className="text-red-600 flex-shrink-0">→</span>
          <span className="min-w-0">{renderInline(bullet[2], key)}</span>
        </div>
      );
      return;
    }
    const numbered = /^\s*(\d+)[.)]\s+(.*)$/.exec(line);
    if (numbered) {
      blocks.push(
        <div key={key} className="flex gap-2 pl-1">
          <span className="text-red-600 font-black flex-shrink-0">{numbered[1]}.</span>
          <span className="min-w-0">{renderInline(numbered[2], key)}</span>
        </div>
      );
      return;
    }
    blocks.push(<div key={key}>{renderInline(line, key)}</div>);
  });
  return <div className="space-y-0.5">{blocks}</div>;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null); // { name, mobile, email, isSessionMobile }
  const [form, setForm] = useState({ name: '', mobile: '', email: '' });
  const [formError, setFormError] = useState('');
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Restore an earlier session so a page navigation doesn't lose the identity.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved && saved.name && saved.mobile) {
        setProfile(saved);
        setMessages(Array.isArray(saved.messages) ? saved.messages : []);
      }
    } catch {
      /* corrupted or unavailable storage — start fresh */
    }
  }, []);

  useEffect(() => {
    if (!profile) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...profile, messages: messages.slice(-40) }));
    } catch {
      /* storage full or blocked — chat still works for this page view */
    }
  }, [profile, messages]);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, sending]);

  useEffect(() => {
    if (open && profile) inputRef.current?.focus();
  }, [open, profile]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const startChat = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const typedMobile = form.mobile.replace(/[^\d+]/g, '').replace(/^\+/, '');

    if (!name) return setFormError('Please enter your name.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setFormError('Please enter a valid email address.');
    if (typedMobile && typedMobile.length < 8) return setFormError('That mobile number looks too short.');

    setFormError('');
    const mobile = typedMobile || newSessionNumber();
    setProfile({ name, email, mobile, isSessionMobile: !typedMobile });
    setMessages([{ role: 'bot', text: `Hi ${name.split(' ')[0]} — ask me anything about VP Informatics, our solutions, or past projects.` }]);
  };

  const send = useCallback(async (textArg) => {
    const text = (textArg ?? draft).trim();
    if (!text || sending || !profile) return;

    setDraft('');
    setSending(true);
    setMessages((prev) => [...prev, { role: 'user', text }]);

    const messageId = randomId('web');
    const nowIso = new Date().toISOString();
    const inner = {
      id: messageId,
      from: profile.mobile,
      text: { body: text },
      type: 'text',
      timestamp: String(Math.floor(Date.now() / 1000)),
      from_user_id: profile.mobile,
      senderName: profile.name,
      email: profile.email,
      channel: 'web',
      isSessionUser: profile.isSessionMobile,
      storedMessageId: randomId('web-store'),
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'message.id': messageId,
          'message.from': profile.mobile,
          'message.json': JSON.stringify(inner),
          'message.text': text,
          'message.type': 'text',
          'message.hasMedia': 'false',
          'message.timestamp': nowIso,
          'message.senderName': profile.name,
          'message.email': profile.email,
          'message.channel': 'web',
          'message.isSessionUser': String(profile.isSessionMobile),
          'message.pageUrl': typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const raw = await res.text();
      let reply = '';
      try {
        reply = extractReply(JSON.parse(raw));
      } catch {
        reply = raw.trim();
      }
      setMessages((prev) => [...prev, { role: 'bot', text: reply || "I didn't get a response for that. Could you rephrase?" }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'error', text: "Couldn't reach the assistant. Please try again, or message us on WhatsApp." }]);
    } finally {
      setSending(false);
    }
  }, [draft, sending, profile]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const resetChat = () => {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setProfile(null);
    setMessages([]);
    setDraft('');
    setForm({ name: '', mobile: '', email: '' });
    setFormError('');
  };

  const fieldClass = 'w-full bg-transparent border-b-2 border-slate-300 px-1 py-2.5 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none focus:border-red-600 transition-colors';

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open AI chat assistant"
          className="group fixed bottom-24 right-6 z-50 h-14 pl-1.5 pr-5 rounded-full bg-slate-950 text-white shadow-xl shadow-black/25 flex items-center gap-3 transition-all hover:pr-6 hover:shadow-2xl hover:shadow-red-600/30"
        >
          <span className="relative flex-shrink-0 w-11 h-11 rounded-full bg-red-600 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-40 group-hover:opacity-70" />
            <svg viewBox="0 0 24 24" className="relative w-5 h-5 fill-none stroke-white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
          </span>
          <span className="leading-tight text-left">
            <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-red-400">AI Assistant</span>
            <span className="block text-sm font-black">Ask a question</span>
          </span>
        </button>
      )}

      {open && (
        <div className="vp-chat fixed inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 sm:w-[380px] max-h-[calc(100vh-2rem)] h-[560px] flex flex-col bg-white border-2 border-slate-950 shadow-2xl shadow-black/30 animate-fadeIn">
          <div className="flex items-center justify-between gap-3 bg-slate-950 text-white px-4 py-3 flex-shrink-0">
            <div className="min-w-0">
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-red-400">VP Informatics</div>
              <div className="text-sm font-black truncate">{profile ? `Chatting as ${profile.name}` : 'Start a conversation'}</div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {profile && (
                <button type="button" onClick={resetChat} aria-label="Start a new chat" title="Start a new chat" className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 019-9 9 9 0 016.4 2.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 01-9 9 9 9 0 01-6.4-2.7L3 16" /><path d="M3 21v-5h5" /></svg>
                </button>
              )}
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          {!profile ? (
            <form onSubmit={startChat} className="flex-1 overflow-y-auto p-5 space-y-5">
              <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                Tell us who you are and we&apos;ll answer your questions about our systems, case studies, and how we work.
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="chat-name" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Name *</label>
                  <input id="chat-name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Your name" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="chat-email" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email *</label>
                  <input id="chat-email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="you@company.com" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="chat-mobile" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mobile (optional)</label>
                  <input id="chat-mobile" type="tel" inputMode="tel" value={form.mobile} onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))} placeholder="91XXXXXXXXXX" className={fieldClass} />
                  <p className="text-[11px] font-semibold text-slate-400 mt-1.5">Leave blank to chat anonymously — we&apos;ll use a temporary session ID instead.</p>
                </div>
              </div>
              {formError && <p className="text-red-600 text-sm font-bold">{formError}</p>}
              <button type="submit" className="w-full bg-red-600 text-white hover:bg-slate-950 px-6 py-3.5 font-black text-xs uppercase tracking-widest transition-all">Start Chat</button>
            </form>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 text-sm font-semibold leading-relaxed break-words ${
                        m.role === 'user'
                          ? 'bg-slate-950 text-white whitespace-pre-wrap'
                          : m.role === 'error'
                            ? 'bg-white border-l-4 border-red-600 text-red-600'
                            : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      {m.role === 'user' ? m.text : <RichText text={m.text} />}
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 px-3.5 py-3 flex items-center gap-1.5">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="w-1.5 h-1.5 bg-red-600 animate-pulse" style={{ animationDelay: `${d * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-slate-200 p-3 flex items-end gap-2 bg-white flex-shrink-0">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type your question…"
                  className="flex-1 resize-none max-h-24 bg-transparent px-1 py-2 text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => send()}
                  disabled={sending || !draft.trim()}
                  aria-label="Send message"
                  className="w-10 h-10 flex-shrink-0 bg-red-600 text-white hover:bg-slate-950 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
