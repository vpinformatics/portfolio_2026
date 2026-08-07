'use client';

import { useState, useEffect } from 'react';
import SvgIcon from './SvgIcon';
import AnimatedSection from './AnimatedSection';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { faqData, businessCards, portfolioSummary } from './siteData';

function SectionLabel({ children, dark }) {
  return (
    <span className={`tag-clip inline-flex items-center pl-4 pr-3 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] mb-5 ${dark ? 'bg-red-600 text-white' : 'bg-slate-950 text-white'}`}>
      {children}
    </span>
  );
}

function Ledger({ items, tone = 'muted', mark = '×' }) {
  return (
    <div>
      {items.map((x, i) => (
        <div key={x} className={`flex items-baseline gap-3 py-3 border-b border-slate-200 text-sm font-bold ${tone === 'muted' ? 'text-slate-500' : 'text-slate-900'}`}>
          <span className={tone === 'muted' ? 'text-slate-400' : 'text-red-600'}>{mark}</span>
          <span>{x}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const heroSlides = [
    {
      kicker: 'Manufacturing Bottlenecks',
      title: <>Eliminate Production Bottlenecks <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-slate-900 bg-[size:200%] animate-gradient">with Custom Software Systems</span></>,
      copy: 'Reduce manual work, improve visibility, and streamline planning, inventory, quality control, dispatch, and operational workflows.',
    },
    {
      kicker: 'Operational Independence',
      title: <>Convert Production Knowledge Into Systems <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-slate-900 bg-[size:200%] animate-gradient">That Keep Work Moving</span></>,
      copy: 'Reduce dependency on planners, supervisors, spreadsheets, and manual coordination by turning operational knowledge into scalable workflows and real-time visibility.',
    },
    {
      kicker: 'ERP Gap Visibility',
      title: <>Most Factories Already Have Software. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-slate-900 bg-[size:200%] animate-gradient">Few Have Operational Visibility.</span></>,
      copy: "We don't replace your ERP. We eliminate the gaps around it — planning spreadsheets, manual approvals, production blind spots, and dependency on key employees.",
    }
  ];
  const [activeHero, setActiveHero] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '', challenge: 'ERP Limitations', message: '' });
  const genCaptcha = () => ({ a: Math.floor(Math.random() * 9) + 1, b: Math.floor(Math.random() * 9) + 1 });
  const [captcha, setCaptcha] = useState({ a: 1, b: 1 });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    setCaptcha(genCaptcha());
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveHero(p => (p + 1) % heroSlides.length), 8000);
    return () => clearInterval(t);
  }, []);

  const goHero = (idx) => setActiveHero((idx + heroSlides.length) % heroSlides.length);
  const handleInput = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (honeypot) return;
    if (Number(captchaAnswer) !== captcha.a + captcha.b) {
      setCaptchaError(true);
      setCaptcha(genCaptcha());
      setCaptchaAnswer('');
      return;
    }
    setCaptchaError(false);
    setFormSubmitting(true);
    setFormError(false);
    try {
      const res = await fetch('https://automation.vpinformatics.in/webhook/ContactUsWeb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          challenge: formData.challenge,
          message: formData.message,
          source: 'ERP Gap Assessment Form',
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          submitted_at: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setFormSubmitted(true);
      const waMessage = `Hi, I just submitted an ERP Gap Assessment request.\nName: ${formData.name}\nCompany: ${formData.company}\nChallenge: ${formData.challenge}`;
      setFormData({ name: '', company: '', phone: '', email: '', challenge: 'ERP Limitations', message: '' });
      setCaptcha(genCaptcha());
      setCaptchaAnswer('');
      setTimeout(() => setFormSubmitted(false), 5000);
      window.location.href = `https://wa.me/919664743159?text=${encodeURIComponent(waMessage)}`;
    } catch {
      setFormError(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  const outcomes = ['8× Faster Planning', 'Up To 15% Material Savings', '99.8% Inventory Accuracy', 'Reduced Dependency On Key Personnel', 'Real-Time Production Visibility', 'Faster Dispatch Execution'];
  const portfolio = portfolioSummary;
  const questions = faqData;

  return <div className="min-h-screen bg-white text-slate-800">
    <SiteHeader />

    <main>
    <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-24 px-4 relative overflow-hidden bg-white blueprint-grid">
      <div className="max-w-7xl mx-auto text-center relative z-10 min-h-[540px] flex flex-col justify-center corner-mark text-slate-200 py-10">
        <div className="text-slate-800">
        <div className="inline-flex self-center items-center gap-3 mb-8">
          <span className="w-2 h-2 bg-red-600 animate-pulse"></span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-slate-500 border-b border-slate-300 pb-1">{heroSlides[activeHero].kicker}</span>
        </div>
        <div key={activeHero} className="animate-fadeIn">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-950 mb-8 leading-none max-w-7xl mx-auto">
            {heroSlides[activeHero].title}
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-slate-600 max-w-5xl mx-auto mb-10 leading-relaxed font-medium">
            {heroSlides[activeHero].copy}
          </p>
        </div>
        <p className="text-sm sm:text-base text-slate-500 font-bold max-w-3xl mx-auto mb-10">Most factories don't need another ERP. They need fewer manual decisions, less dependency on specific people, and better operational visibility.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          <a href="#contact" className="w-full sm:w-auto bg-red-600 text-white px-8 py-4 font-extrabold text-sm uppercase tracking-widest hover:bg-slate-950 transition-all flex items-center justify-center gap-2">Request ERP Gap Assessment <SvgIcon name="ArrowRight" className="w-4 h-4" /></a>
          <a href="https://wa.me/919664743159?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20strategy%20consultation." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-700 hover:text-red-600 px-1 py-2 text-sm font-extrabold uppercase tracking-widest border-b-2 border-slate-300 hover:border-red-600 transition-all">Schedule Strategy Consultation</a>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => goHero(activeHero - 1)} className="text-slate-400 hover:text-red-600 transition-colors font-black text-lg" aria-label="Previous slide">‹</button>
          {heroSlides.map((_, idx) => <button key={idx} onClick={() => goHero(idx)} className={`h-1 transition-all ${idx === activeHero ? 'bg-red-600 w-10' : 'bg-slate-300 hover:bg-slate-500 w-4'}`} aria-label={`Hero slide ${idx + 1}`}></button>)}
          <button onClick={() => goHero(activeHero + 1)} className="text-slate-400 hover:text-red-600 transition-colors font-black text-lg" aria-label="Next slide">›</button>
        </div>
        </div>
      </div>
    </section>

    <section id="outcomes" className="bg-white border-y border-slate-100 py-5 overflow-hidden marquee-wrap">
      <div className="marquee-track items-center gap-8 text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">
        {[0, 1].map(i => <div key={i} className="flex items-center gap-12 min-w-full justify-around">
          {outcomes.map(o => <span key={o} className="flex items-center gap-2"><span className="text-red-600">✓</span>{o}</span>)}
        </div>)}
      </div>
    </section>

    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <AnimatedSection className="lg:col-span-5">
            <SectionLabel>Business Continuity Risk</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 leading-tight mb-6">Your Operation Should Not Depend On Specific People.</h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium mb-10">When critical operational knowledge lives only inside planners, supervisors, store managers, QC heads, or dispatch coordinators, growth becomes fragile. We convert that knowledge into repeatable systems.</p>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 border-t-2 border-slate-950 pt-4">Roles that often become bottlenecks</h3>
            <Ledger items={['Production Manager', 'Planner', 'Supervisor', 'Store Manager', 'Dispatch Coordinator', 'QC Head']} mark="—" />
          </AnimatedSection>
          <AnimatedSection className="lg:col-span-7" delay={100}>
            <div className="grid md:grid-cols-2 md:divide-x md:divide-dashed md:divide-slate-300">
              <div className="md:pr-10 pb-10 md:pb-0">
                <SvgIcon name="Users" className="w-6 h-6 text-slate-400 mb-4" />
                <h3 className="text-xl font-black text-slate-950 mb-4">When knowledge lives in people</h3>
                <Ledger items={['Questions need answers', 'Managers become bottlenecks', 'Production slows', 'Owner gets pulled into daily coordination', 'Growth stalls']} tone="muted" mark="×" />
              </div>
              <div className="md:pl-10">
                <SvgIcon name="Shield" className="w-6 h-6 text-red-600 mb-4" />
                <h3 className="text-xl font-black text-slate-950 mb-4">When knowledge lives in systems</h3>
                <Ledger items={['Workflows continue', 'Decisions follow rules', 'Operations stay visible', 'Managers focus on improvement', 'Business becomes scalable']} tone="strong" mark="→" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <section className="py-24 bg-slate-950 text-white border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <SectionLabel dark>ERP Gap Assessment</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight">Most factories already have software. The real question is what still happens outside it?</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">Why are planning, approvals, inventory checks, production tracking, and dispatch still happening in spreadsheets, WhatsApp, phone calls, or inside specific people's heads?</p>
          </div>
          <div className="md:col-span-5 border-t-2 border-white/20 pt-2">
            {['Spreadsheet dependencies', 'Manual approvals', 'Production visibility gaps', 'Key-person bottlenecks', 'Duplicate data entry', 'Missing automation opportunities'].map(x => <div key={x} className="flex items-center gap-3 py-3 border-b border-white/10 text-sm font-bold text-slate-200"><span className="text-red-400">✕</span>{x}</div>)}
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-white hover:text-red-400 px-1 py-2 font-black text-xs uppercase tracking-widest border-b-2 border-white/40 hover:border-red-400 transition-all">Request ERP Gap Assessment <SvgIcon name="ArrowRight" className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>Before / After Workflow</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-5">From People-Driven Operations to System-Driven Operations</h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">Factory owners understand flows. This is the difference between coordination dependency and scalable operating discipline.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-0 lg:divide-x lg:divide-dashed lg:divide-slate-300">
          <AnimatedSection>
            <div className="lg:pr-12">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Before VP Informatics</h3>
              <div className="border-l-2 border-slate-300 pl-6 space-y-5">
                {['Production Manager', 'Production Planning', 'Inventory Verification', 'Quality Approval', 'Dispatch Planning', 'Shipment Release'].map((x) => <div key={x} className="relative"><span className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 bg-slate-300"></span><p className="font-extrabold text-slate-700">{x}</p></div>)}
              </div>
              <div className="mt-10 space-y-3 text-sm font-bold text-slate-500 border-t border-slate-200 pt-6">{['Planning waits for specific people', 'Knowledge lives in individuals', 'Visibility depends on phone calls', 'Decisions are difficult to scale'].map(x => <div key={x}>× {x}</div>)}</div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="lg:pl-12">
              <h3 className="text-2xl font-black text-slate-950 mb-8">After VP Informatics</h3>
              <div className="border-l-2 border-red-600 pl-6 space-y-5">
                {['System Rules', 'Automated Planning', 'Inventory Validation', 'Quality Gate', 'Dispatch Automation', 'Shipment Release'].map((x) => <div key={x} className="relative"><span className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 bg-red-600"></span><p className="font-extrabold text-slate-950">{x}</p></div>)}
              </div>
              <div className="mt-10 space-y-3 text-sm font-bold text-slate-700 border-t border-slate-200 pt-6">{['Consistent operational decisions', 'Reduced dependency on key personnel', 'Faster planning and approvals', 'Managers focus on improvement'].map(x => <div key={x}>→ {x}</div>)}</div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>Customised Software. Measured ROI. Built For Growth.</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-5">Customised Software Designed Around Business Outcomes.</h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">Every engagement starts with an operational bottleneck and ends with a measurable business outcome.</p>
        </div>
        <div className="border-t-2 border-slate-950">
          {businessCards.map((c, idx) => <AnimatedSection key={c.title} delay={idx * 50}>
            <div className="grid md:grid-cols-12 gap-6 py-10 border-b border-slate-200 items-start">
              <div className="md:col-span-3 flex items-start gap-4">
                <span className="font-mono text-xs text-slate-400 pt-1">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <span className="text-2xl block mb-2">{c.icon}</span>
                  <h3 className="text-lg font-black text-slate-950 leading-tight">{c.title}</h3>
                </div>
              </div>
              <div className="md:col-span-6 grid sm:grid-cols-2 gap-6">
                <div><div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Problem</div><p className="text-sm text-slate-600 font-semibold leading-relaxed">{c.problem}</p></div>
                <div><div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Solution</div><p className="text-sm text-slate-600 font-semibold leading-relaxed">{c.solution}</p></div>
              </div>
              <div className="md:col-span-3 md:text-right md:border-l md:border-slate-200 md:pl-6">
                <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Outcome</div>
                <div className="text-xl font-black text-slate-950 mb-3">{c.outcome}</div>
                <div className="space-y-1">{c.points.map(p => <div key={p} className="text-xs font-bold text-slate-500">→ {p}</div>)}</div>
              </div>
            </div>
          </AnimatedSection>)}
        </div>
      </div>
    </section>

    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <SectionLabel>ERP + Excel + Custom</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-6">Most Factories Already Have Software.</h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium mb-6">The challenge isn't buying another system. The challenge is eliminating the gaps between people, spreadsheets, and existing software.</p>
            <blockquote className="border-l-4 border-red-600 pl-5 text-xl font-black text-slate-950">We don't replace your ERP. We eliminate the operational gaps around it.</blockquote>
          </div>
          <div className="lg:col-span-7 grid md:grid-cols-2 md:divide-x md:divide-dashed md:divide-slate-300">
            <div className="md:pr-10 pb-8 md:pb-0">
              <h3 className="text-xl font-black text-slate-950 mb-5">Current Reality</h3>
              <Ledger items={['Planning in Excel', 'Manual approvals', 'Phone-call follow-ups', 'Knowledge in people', 'ERP + spreadsheets', 'Reactive decisions']} tone="muted" mark="×" />
            </div>
            <div className="md:pl-10">
              <h3 className="text-xl font-black text-slate-950 mb-5">Desired Reality</h3>
              <Ledger items={['Planning inside workflows', 'Automated quality gates', 'Real-time visibility', 'Knowledge in systems', 'Unified operations', 'Predictive visibility']} tone="strong" mark="→" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="solutions" className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>Solutions</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-5">Organized Around Why Customers Buy.</h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">Technology is supporting evidence. The real value is operational control, continuity, and visibility.</p>
        </div>
        <div className="grid md:grid-cols-3 md:divide-x md:divide-dashed md:divide-slate-300 border-t-2 border-slate-950">
          {[
            ['Remove Operational Bottlenecks', 'Production planning, approvals, dispatch, inventory movement, costing, and workflow automation.', ['Faster planning', 'Reduced manual coordination', 'Better throughput'], 'Custom Software • Workflow Engines • Dashboards'],
            ['Reduce Dependency On Key Personnel', 'Convert operational knowledge into repeatable systems so production continues even when key employees are unavailable.', ['Less dependency on planners', 'Consistent decision-making', 'Faster onboarding'], 'Rules Engines • Approval Flows • Role-Based Systems'],
            ['Improve Production Visibility', 'Real-time dashboards, forecasting, alerts, machine monitoring, and operational reporting.', ['Earlier bottleneck detection', 'Faster management decisions', 'Better production visibility'], 'Industrial IoT • AI Automation • Reporting']
          ].map((s, idx) => <AnimatedSection key={s[0]} delay={idx * 100}>
            <div className={`pt-10 h-full flex flex-col ${idx === 0 ? '' : 'md:pl-10'} ${idx === 2 ? '' : 'md:pr-10'}`}>
              <span className="font-mono text-xs text-slate-400 mb-4 block">{String(idx + 1).padStart(2, '0')}</span>
              <SvgIcon name={idx === 0 ? 'Zap' : idx === 1 ? 'Users' : 'Activity'} className="w-8 h-8 text-red-600 mb-6" />
              <h3 className="text-2xl font-black text-slate-950 mb-4">{s[0]}</h3>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed mb-6">{s[1]}</p>
              <div className="space-y-2 mb-8 flex-grow border-t border-slate-200 pt-4">{s[2].map(p => <div key={p} className="text-sm font-bold text-slate-700">→ {p}</div>)}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Powered by<br />
                <span className="text-slate-900">{s[3]}</span></div>
            </div>
          </AnimatedSection>)}
        </div>
      </div>
    </section>

    <section id="portfolio" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>Portfolio / Case Studies</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-5">Industry → Problem → Outcome.</h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">Project pages are organized around real manufacturing workflows, operational risk, system solution, before/after flow, and measurable business value.</p>
        </div>
        <div className="border-t-2 border-slate-950">
          {portfolio.map((group, idx) => <AnimatedSection key={group.id} delay={idx * 80}>
            <a href={`/case-studies/${group.id}`} className="group grid md:grid-cols-12 gap-4 md:gap-6 py-10 border-b border-slate-200 items-start -mx-4 px-4 hover:bg-slate-50 transition-colors">
              <div className="md:col-span-2 font-mono text-xs text-slate-400 pt-1">DWG-0{idx + 1}</div>
              <div className="md:col-span-5">
                <h3 className="text-2xl font-black text-slate-950 mb-2 group-hover:text-red-600 transition-colors">{group.industry}</h3>
                <p className="text-sm font-bold text-slate-600 leading-relaxed">{group.headline}</p>
              </div>
              <div className="md:col-span-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Outcome</div>
                <div className="text-sm font-black text-slate-950 leading-tight">{group.outcome}</div>
              </div>
              <div className="md:col-span-3 space-y-1.5">{group.items.map(([name, outcome]) => <div key={name} className="text-xs font-bold text-slate-500">{name} <span className="text-slate-300">/</span> <span className="text-slate-700">{outcome}</span></div>)}</div>
              <div className="md:col-span-12 mt-3">
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-950 group-hover:text-red-600 border-b-2 border-slate-950 group-hover:border-red-600 pb-1 transition-colors">View Project Page <SvgIcon name="ArrowRight" className="w-4 h-4" /></span>
              </div>
            </a>
          </AnimatedSection>)}
        </div>
      </div>
    </section>

    <section id="process" className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 sticky top-28">
            <SectionLabel>Process</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-5">How We Reduce Operational Risk.</h2>
            <p className="text-slate-600 text-base md:text-lg font-medium">A calm, transparent process focused on workflows, dependencies, visibility, and handover.</p>
          </div>
          <div className="lg:col-span-8 border-t-2 border-slate-950">
            {[
              ['01', 'Operational Discovery', 'We understand planning workflows, approvals, inventory movement, reporting requirements, and production dependencies.'],
              ['02', 'Workflow Architecture', 'We identify bottlenecks, ERP gaps, spreadsheet dependencies, and automation opportunities.'],
              ['03', 'Implementation & Validation', 'Solutions are deployed alongside existing operations and validated with actual users and production scenarios.'],
              ['04', 'Operational Handover', 'Documentation, training, ownership transfer, and long-term scalability planning.']
            ].map((p, idx) => <AnimatedSection key={p[0]} delay={idx * 80}>
              <div className="flex gap-8 py-8 border-b border-slate-200 items-start">
                <div className="text-5xl md:text-6xl font-black text-slate-200 leading-none flex-shrink-0">{p[0]}</div>
                <div><h3 className="text-xl font-black text-slate-950 mb-2">{p[1]}</h3><p className="text-sm md:text-base text-slate-600 font-semibold leading-relaxed">{p[2]}</p></div>
              </div>
            </AnimatedSection>)}
          </div>
        </div>
      </div>
    </section>

    <section id="decision" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel>Project Decision Framework</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 mb-5">Are We The Right Fit?</h2>
          <p className="text-slate-600 text-base md:text-lg font-medium">This section qualifies serious buyers and builds trust before the first call.</p>
        </div>
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-dashed lg:divide-slate-300 mb-16 border-t-2 border-slate-950">
          <div className="pt-10 lg:pr-12 pb-10 lg:pb-0">
            <h3 className="text-2xl font-black text-slate-950 mb-6">When We're The Right Fit</h3>
            {['Planning still depends on spreadsheets', 'Operational knowledge lives in specific people', 'Existing ERP requires workarounds', 'Production visibility is limited', 'Manual coordination slows execution', 'Management wants measurable improvements'].map(x => <div key={x} className="py-3 border-b border-slate-200 flex items-start gap-3 text-sm font-bold text-slate-700">
              <span className="text-emerald-600 flex-shrink-0">✓</span>
              {x}
            </div>)}
          </div>
          <div className="pt-10 lg:pl-12">
            <h3 className="text-2xl font-black text-slate-950 mb-6">When We're Probably Not The Right Fit</h3>
            {['Looking for the cheapest vendor', 'Need only a marketing website', 'Existing software already solves the operational problem', 'Business processes change every week', 'No operational bottlenecks exist'].map(x => <div key={x} className="py-3 border-b border-slate-200 flex items-start gap-3 text-sm font-bold text-slate-700">
              <span className="text-red-600 flex-shrink-0">✕</span>
              {x}
            </div>)}
          </div>
        </div>
        <div className="max-w-4xl mx-auto border-t-2 border-slate-950">
          {questions.map((q, idx) => <div key={q[0]} className="border-b border-slate-200">
            <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full py-5 text-left flex justify-between items-center gap-4"><span className="font-black text-slate-950">{q[0]}</span><span className="text-red-600 font-black text-lg">{activeFaq === idx ? '−' : '+'}</span></button>
            {activeFaq === idx && <div className="pb-6 text-slate-600 font-medium leading-relaxed">{q[1]}</div>}
          </div>)}
        </div>
      </div>
    </section>

    <section id="contact" className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="tag-clip inline-flex items-center pl-4 pr-3 py-1.5 bg-red-600 text-white text-[11px] font-black uppercase tracking-[0.22em] mb-5">Final CTA</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Request ERP Gap Assessment.</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium mb-8">Discover where production planning, approvals, inventory visibility, dispatch, and operational decisions still depend on spreadsheets, workarounds, and key personnel.</p>
            <div className="border-t-2 border-white/20 pt-2">
              {['Workflow Review', 'ERP Gap Identification', 'Dependency Risk Analysis', 'Automation Opportunities', 'Recommended Roadmap'].map(x => <div key={x} className="flex items-center gap-3 py-3 border-b border-white/10 text-sm font-bold text-slate-200"><span className="text-red-400">✓</span>{x}</div>)}
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-12 lg:border-l lg:border-dashed lg:border-white/20">
            {formSubmitted ? <div className="py-16"><div className="text-emerald-400 mb-5"><SvgIcon name="CheckCircle2" className="w-10 h-10" /></div><h3 className="text-2xl font-black mb-2">Assessment request received.</h3><p className="text-slate-300 font-medium">We'll review your details and respond within 1 business day.</p></div> : <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input name="name" value={formData.name} onChange={handleInput} required placeholder="Name" className="w-full bg-transparent border-b-2 border-white/20 px-1 py-3 font-semibold text-white placeholder-slate-500 outline-none focus:border-red-500 transition-colors" />
                <input name="company" value={formData.company} onChange={handleInput} placeholder="Company" className="w-full bg-transparent border-b-2 border-white/20 px-1 py-3 font-semibold text-white placeholder-slate-500 outline-none focus:border-red-500 transition-colors" />
                <input name="phone" value={formData.phone} onChange={handleInput} placeholder="Phone" className="w-full bg-transparent border-b-2 border-white/20 px-1 py-3 font-semibold text-white placeholder-slate-500 outline-none focus:border-red-500 transition-colors" />
                <input type="email" name="email" value={formData.email} onChange={handleInput} required placeholder="Email" className="w-full bg-transparent border-b-2 border-white/20 px-1 py-3 font-semibold text-white placeholder-slate-500 outline-none focus:border-red-500 transition-colors" />
              </div>
              <select name="challenge" value={formData.challenge} onChange={handleInput} className="w-full bg-transparent border-b-2 border-white/20 px-1 py-3 font-semibold text-white outline-none focus:border-red-500 transition-colors">
                {['Production Planning', 'Inventory Visibility', 'Quality Control', 'Dispatch Management', 'ERP Limitations', 'Dependency On Key Personnel', 'Other'].map(x => <option key={x} className="text-slate-900">{x}</option>)}
              </select>
              <textarea name="message" value={formData.message} onChange={handleInput} rows="4" placeholder="Briefly describe your workflow challenge" className="w-full bg-transparent border-b-2 border-white/20 px-1 py-3 font-semibold text-white placeholder-slate-500 outline-none focus:border-red-500 transition-colors"></textarea>
              <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] w-px h-px opacity-0" />
              <div className="flex items-center gap-3">
                <label htmlFor="captcha" className="font-semibold text-sm text-slate-300 whitespace-nowrap">What is {captcha.a} + {captcha.b}?</label>
                <input id="captcha" type="text" inputMode="numeric" value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value)} required placeholder="Answer" className="w-24 bg-transparent border-b-2 border-white/20 px-1 py-2 font-semibold text-white placeholder-slate-500 outline-none focus:border-red-500 transition-colors" />
              </div>
              {captchaError && <p className="text-red-400 text-sm font-bold">That answer isn't right — please try the new sum.</p>}
              {formError && <p className="text-red-400 text-sm font-bold">Something went wrong sending your request. Please try again or email us directly.</p>}
              <div className="flex flex-col sm:flex-row gap-6 items-center pt-2">
                <button type="submit" disabled={formSubmitting} className="w-full sm:w-auto bg-red-600 text-white hover:bg-white hover:text-slate-950 px-8 py-4 font-black text-xs uppercase tracking-widest transition-all disabled:opacity-60 disabled:cursor-not-allowed">{formSubmitting ? 'Sending…' : 'Submit'}</button>
                <a href="https://wa.me/919664743159?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20strategy%20consultation." target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white font-black text-xs uppercase tracking-widest border-b-2 border-white/30 hover:border-white pb-1 transition-all">Schedule Strategy Consultation</a>
              </div>
            </form>}
          </div>
        </div>
      </div>
    </section>

    </main>

    <a
      href="https://wa.me/919664743159"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe57] shadow-xl shadow-black/20 flex items-center justify-center transition-all hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91C21.97 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.3-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .9 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.71-.83.9-1.11.19-.29.38-.24.63-.15.26.1 1.65.78 1.93.92.29.15.48.22.55.34.07.13.07.73-.17 1.41z" />
      </svg>
    </a>

    <SiteFooter />
  </div>;
}
