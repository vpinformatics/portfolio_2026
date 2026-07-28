'use client';

import { useEffect, useRef, useState } from 'react';

export default function SectionRail({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);
  const ref = useRef(null);

  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  return (
    <div ref={ref} className="hidden lg:block sticky top-32 self-start pr-6">
      <ol className="space-y-4 border-l border-slate-200">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`group flex items-baseline gap-3 pl-5 -ml-px border-l-2 transition-colors ${active === s.id ? 'border-red-600' : 'border-transparent'}`}
            >
              <span className={`font-mono text-[11px] tabular-nums transition-colors ${active === s.id ? 'text-red-600' : 'text-slate-300 group-hover:text-slate-400'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className={`text-sm transition-colors ${active === s.id ? 'text-slate-950 font-semibold' : 'text-slate-400 group-hover:text-slate-600'}`}>{s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
