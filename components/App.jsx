'use client';

import { useState, useEffect } from 'react';
import SvgIcon from './SvgIcon';
import AnimatedSection from './AnimatedSection';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Plate from './Plate';
import SectionRail from './SectionRail';
import { faqData, businessCards, portfolioSummary } from './siteData';

function SectionLabel({ children, dark }) {
  return <Plate dark={dark} className="mb-4">{children}</Plate>;
}

const railSections = [
  { id: 'continuity', label: 'Continuity Risk' },
  { id: 'erp-gap', label: 'ERP Gap' },
  { id: 'workflow', label: 'Before / After' },
  { id: 'outcomes-fn', label: 'Outcomes' },
  { id: 'reality', label: 'Reality Check' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'process', label: 'Process' },
];

export default function App() {
  const heroSlides = [
    {
      kicker: 'Manufacturing Bottlenecks',
      title: <>Eliminate Production Bottlenecks <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-red-400 to-white bg-[size:200%] animate-gradient">with Custom Software Systems</span></>,
      copy: 'Reduce manual work, improve visibility, and streamline planning, inventory, quality control, dispatch, and operational workflows.',
    },
    {
      kicker: 'Operational Independence',
      title: <>Convert Production Knowledge Into Systems <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-red-400 to-white bg-[size:200%] animate-gradient">That Keep Work Moving</span></>,
      copy: 'Reduce dependency on planners, supervisors, spreadsheets, and manual coordination by turning operational knowledge into scalable workflows and real-time visibility.',
    },
    {
      kicker: 'ERP Gap Visibility',
      title: <>Most Factories Already Have Software. <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-red-400 to-white bg-[size:200%] animate-gradient">Few Have Operational Visibility.</span></>,
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

  const portfolio = portfolioSummary;
  const questions = faqData;

  return <div className="min-h-screen bg-white text-slate-800">
    <SiteHeader />

    <main>
    <section id="home" className="pt-32 pb-20 md:pt-44 md:pb-28 px-4 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#0A0E1A_0%,#0B1A33_35%,#0A0E1A_65%,#0A0E1A_100%)]"></div>
        <div className="absolute top-[-16rem] left-[12%] w-[40rem] h-[34rem] rounded-[42%_58%_63%_37%/48%_42%_58%_52%] bg-red-500/25 blur-[100px]"></div>
        <div className="absolute bottom-[-18rem] right-[8%] w-[36rem] h-[36rem] rounded-[58%_42%_46%_54%/54%_60%_40%_46%] bg-sky-400/20 blur-[110px]"></div>
        <div className="absolute top-[8rem] right-[20%] w-[20rem] h-[18rem] rounded-[50%_50%_38%_62%/44%_56%_50%_50%] bg-emerald-400/10 blur-[90px]"></div>
        <svg viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
          <g fill="none" stroke="#5FA8F5" strokeWidth="1.2" strokeLinecap="round" opacity="0.35">
            <path d="M-40 540 C 140 480, 200 380, 130 290 S 40 150, 150 40" />
            <path d="M130 290 C 250 310, 330 250, 390 140" />
            <path d="M1480 60 C 1300 130, 1270 250, 1360 310 S 1470 470, 1330 570" />
            <path d="M1360 310 C 1230 290, 1150 340, 1080 430" />
            <path d="M700 -20 C 670 90, 720 160, 810 185 S 920 270, 870 360" />
            <path d="M0 100 C 120 60, 260 90, 340 50" />
            <path d="M1120 620 C 1220 560, 1240 480, 1180 430" />
          </g>
          <g fill="#8FC2FF" opacity="0.55">
            <circle cx="-40" cy="540" r="4" /><circle cx="130" cy="290" r="5" /><circle cx="150" cy="40" r="3.5" />
            <circle cx="390" cy="140" r="3.5" /><circle cx="1480" cy="60" r="4" /><circle cx="1360" cy="310" r="5" />
            <circle cx="1330" cy="570" r="3.5" /><circle cx="1080" cy="430" r="3.5" /><circle cx="700" cy="-20" r="3.5" />
            <circle cx="870" cy="360" r="4" /><circle cx="340" cy="50" r="3" /><circle cx="1180" cy="430" r="3.5" />
          </g>
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff10_1px,transparent_0)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_40%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950"></div>
      </div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <Plate dark className="mb-6">{heroSlides[activeHero].kicker}</Plate>
        <div key={activeHero} className="animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-7 leading-[1.05] max-w-4xl mx-auto">
            {heroSlides[activeHero].title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            {heroSlides[activeHero].copy}
          </p>
        </div>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-10">Most factories don't need another ERP. They need fewer manual decisions, less dependency on specific people, and better operational visibility.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <a href="#contact" className="w-full sm:w-auto bg-red-600 text-white px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-red-500 transition-colors flex items-center justify-center gap-2">Request ERP Gap Assessment <SvgIcon name="ArrowRight" className="w-4 h-4" /></a>
          <a href="https://wa.me/919664743159?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20strategy%20consultation." target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-slate-300 hover:text-white px-7 py-3.5 rounded-lg text-sm font-semibold transition-colors">Schedule Strategy Consultation →</a>
        </div>
        <div className="flex items-center justify-center gap-2">
          {heroSlides.map((_, idx) => <button key={idx} onClick={() => goHero(idx)} className={`h-1.5 rounded-full transition-all ${idx === activeHero ? 'bg-red-500 w-6' : 'bg-white/20 hover:bg-white/40 w-1.5'}`} aria-label={`Hero slide ${idx + 1}`}></button>)}
        </div>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-[160px_1fr] gap-8 lg:gap-16">
        <SectionRail sections={railSections} />

        <div>
          <section id="continuity" className="py-20">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <AnimatedSection className="lg:col-span-5">
                <SectionLabel>Business Continuity Risk</SectionLabel>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-950 leading-tight mb-6">Your Operation Should Not Depend On Specific People.</h2>
                <p className="text-slate-600 text-base leading-relaxed mb-8">When critical operational knowledge lives only inside planners, supervisors, store managers, QC heads, or dispatch coordinators, growth becomes fragile. We convert that knowledge into repeatable systems.</p>
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-slate-950 mb-4">Roles that often become bottlenecks</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                    {['Production Manager', 'Planner', 'Supervisor', 'Store Manager', 'Dispatch Coordinator', 'QC Head'].map(x => <div key={x} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>{x}</div>)}
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection className="lg:col-span-7" delay={100}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-7 shadow-sm">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-5"><SvgIcon name="Users" className="w-5 h-5" /></div>
                    <h3 className="text-base font-semibold text-slate-950 mb-4">When knowledge lives in people</h3>
                    <div className="divide-y divide-slate-100">{['Questions need answers', 'Managers become bottlenecks', 'Production slows', 'Owner gets pulled into daily coordination', 'Growth stalls'].map(x => <p key={x} className="py-2.5 text-sm text-slate-600">{x}</p>)}</div>
                  </div>
                  <div className="bg-slate-950 text-white rounded-2xl p-7 shadow-sm">
                    <div className="w-11 h-11 rounded-xl bg-white/10 text-red-400 flex items-center justify-center mb-5"><SvgIcon name="Shield" className="w-5 h-5" /></div>
                    <h3 className="text-base font-semibold mb-4">When knowledge lives in systems</h3>
                    <div className="divide-y divide-white/10">{['Workflows continue', 'Decisions follow rules', 'Operations stay visible', 'Managers focus on improvement', 'Business becomes scalable'].map(x => <p key={x} className="py-2.5 text-sm text-slate-300">{x}</p>)}</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section id="erp-gap" className="py-20">
            <div className="bg-slate-950 text-white rounded-2xl p-8 md:p-12 grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7">
                <SectionLabel dark>ERP Gap Assessment</SectionLabel>
                <h2 className="text-2xl md:text-3xl font-bold mb-5 leading-tight">Most factories already have software. The real question is what still happens outside it?</h2>
                <p className="text-slate-300 text-base leading-relaxed">Why are planning, approvals, inventory checks, production tracking, and dispatch still happening in spreadsheets, WhatsApp, phone calls, or inside specific people's heads?</p>
              </div>
              <div className="md:col-span-5">
                <div className="divide-y divide-white/10 mb-6">
                  {['Spreadsheet dependencies', 'Manual approvals', 'Production visibility gaps', 'Key-person bottlenecks', 'Duplicate data entry', 'Missing automation opportunities'].map(x => <div key={x} className="flex items-center gap-3 py-2.5 text-sm text-slate-200"><span className="w-1 h-1 rounded-full bg-red-400"></span>{x}</div>)}
                </div>
                <a href="#contact" className="bg-red-600 hover:bg-red-500 text-white px-6 py-3.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">Request ERP Gap Assessment</a>
              </div>
            </div>
          </section>

          <section id="workflow" className="py-20">
            <SectionLabel>Before / After Workflow</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4 max-w-xl">From People-Driven Operations to System-Driven Operations</h2>
            <p className="text-slate-600 text-base mb-12 max-w-xl">Factory owners understand flows. This is the difference between coordination dependency and scalable operating discipline.</p>
            <div className="grid lg:grid-cols-2 gap-8">
              <AnimatedSection>
                <div className="bg-slate-50 rounded-2xl p-8 h-full">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Before VP Informatics</h3>
                  <div className="relative pl-6 border-l-2 border-slate-200 space-y-5 mb-8">
                    {['Production Manager', 'Production Planning', 'Inventory Verification', 'Quality Approval', 'Dispatch Planning', 'Shipment Release'].map(x => <div key={x} className="relative text-sm font-medium text-slate-700"><span className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300"></span>{x}</div>)}
                  </div>
                  <div className="space-y-2 text-sm text-slate-500">{['Planning waits for specific people', 'Knowledge lives in individuals', 'Visibility depends on phone calls', 'Decisions are difficult to scale'].map(x => <div key={x}>— {x}</div>)}</div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <div className="bg-slate-950 text-white rounded-2xl p-8 h-full">
                  <h3 className="text-lg font-semibold mb-6">After VP Informatics</h3>
                  <div className="relative pl-6 border-l-2 border-white/15 space-y-5 mb-8">
                    {['System Rules', 'Automated Planning', 'Inventory Validation', 'Quality Gate', 'Dispatch Automation', 'Shipment Release'].map(x => <div key={x} className="relative text-sm font-medium text-slate-100"><span className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>{x}</div>)}
                  </div>
                  <div className="space-y-2 text-sm text-slate-400">{['Consistent operational decisions', 'Reduced dependency on key personnel', 'Faster planning and approvals', 'Managers focus on improvement'].map(x => <div key={x}>— {x}</div>)}</div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section id="outcomes-fn" className="py-20">
            <SectionLabel>Function → Outcome</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4 max-w-xl">Customised Software Designed Around Business Outcomes.</h2>
            <p className="text-slate-600 text-base mb-12 max-w-xl">Every engagement starts with an operational bottleneck and ends with a measurable business outcome.</p>
            <div className="divide-y divide-slate-100">
              {businessCards.map((c, idx) => <AnimatedSection key={c.title} delay={idx * 50}>
                <div className="py-8 grid md:grid-cols-12 gap-4 md:gap-8 items-start">
                  <div className="md:col-span-4 flex items-start gap-4">
                    <span className="text-2xl leading-none">{c.icon}</span>
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">{c.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{c.problem}</p>
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-sm text-slate-600 leading-relaxed">{c.solution}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">{c.points.map(p => <span key={p} className="text-xs text-slate-500">{p}</span>)}</div>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <div className="text-xs font-semibold uppercase tracking-wide text-red-600 mb-1">Outcome</div>
                    <div className="text-lg font-bold text-slate-950">{c.outcome}</div>
                  </div>
                </div>
              </AnimatedSection>)}
            </div>
          </section>

          <section id="reality" className="py-20">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <SectionLabel>ERP + Excel + Custom</SectionLabel>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-6">Most Factories Already Have Software.</h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">The challenge isn't buying another system. The challenge is eliminating the gaps between people, spreadsheets, and existing software.</p>
                <blockquote className="border-l-2 border-red-600 pl-5 text-lg font-semibold text-slate-950">We don't replace your ERP. We eliminate the operational gaps around it.</blockquote>
              </div>
              <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl p-7">
                  <h3 className="text-base font-semibold text-slate-950 mb-5">Current Reality</h3>
                  <div className="divide-y divide-slate-200">{['Planning in Excel', 'Manual approvals', 'Phone-call follow-ups', 'Knowledge in people', 'ERP + spreadsheets', 'Reactive decisions'].map(x => <div key={x} className="py-2.5 text-sm text-slate-600">{x}</div>)}</div>
                </div>
                <div className="bg-slate-950 text-white rounded-2xl p-7">
                  <h3 className="text-base font-semibold mb-5">Desired Reality</h3>
                  <div className="divide-y divide-white/10">{['Planning inside workflows', 'Automated quality gates', 'Real-time visibility', 'Knowledge in systems', 'Unified operations', 'Predictive visibility'].map(x => <div key={x} className="py-2.5 text-sm text-slate-300">{x}</div>)}</div>
                </div>
              </div>
            </div>
          </section>

          <section id="solutions" className="py-20">
            <SectionLabel>Solutions</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4 max-w-xl">Organized Around Why Customers Buy.</h2>
            <p className="text-slate-600 text-base mb-12 max-w-xl">Technology is supporting evidence. The real value is operational control, continuity, and visibility.</p>
            <div className="divide-y divide-slate-100">
              {[
                ['Remove Operational Bottlenecks', 'Production planning, approvals, dispatch, inventory movement, costing, and workflow automation.', ['Faster planning', 'Reduced manual coordination', 'Better throughput'], 'Custom Software · Workflow Engines · Dashboards', 'Zap'],
                ['Reduce Dependency On Key Personnel', 'Convert operational knowledge into repeatable systems so production continues even when key employees are unavailable.', ['Less dependency on planners', 'Consistent decision-making', 'Faster onboarding'], 'Rules Engines · Approval Flows · Role-Based Systems', 'Users'],
                ['Improve Production Visibility', 'Real-time dashboards, forecasting, alerts, machine monitoring, and operational reporting.', ['Earlier bottleneck detection', 'Faster management decisions', 'Better production visibility'], 'Industrial IoT · AI Automation · Reporting', 'Activity']
              ].map((s, idx) => <AnimatedSection key={s[0]} delay={idx * 80}>
                <div className="py-8 grid md:grid-cols-12 gap-4 md:gap-8 items-start">
                  <div className="md:col-span-4 flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center flex-shrink-0"><SvgIcon name={s[4]} className="w-5 h-5" /></div>
                    <h3 className="text-base font-semibold text-slate-950">{s[0]}</h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-sm text-slate-600 leading-relaxed mb-2">{s[1]}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">{s[2].map(p => <span key={p} className="text-xs text-slate-500">{p}</span>)}</div>
                  </div>
                  <div className="md:col-span-3 md:text-right text-xs text-slate-400">{s[3]}</div>
                </div>
              </AnimatedSection>)}
            </div>
          </section>

          <section id="portfolio" className="py-20">
            <SectionLabel>Portfolio / Case Studies</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4 max-w-xl">Industry → Problem → Outcome.</h2>
            <p className="text-slate-600 text-base mb-12 max-w-xl">Project pages are organized around real manufacturing workflows, operational risk, system solution, before/after flow, and measurable business value.</p>
            <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
              {portfolio.map((group, idx) => <AnimatedSection key={group.id} delay={idx * 60}>
                <a href={`/case-studies/${group.id}`} className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-7 hover:bg-slate-50 -mx-4 px-4 rounded-xl transition-colors">
                  <span className="font-mono text-sm text-slate-300 md:w-10 flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-950 group-hover:text-red-600 transition-colors">{group.industry}</h3>
                    <p className="text-sm text-slate-500 mt-1">{group.headline}</p>
                  </div>
                  <div className="md:w-56 flex-shrink-0">
                    <div className="text-sm font-semibold text-red-600">{group.outcome}</div>
                  </div>
                  <SvgIcon name="ArrowRight" className="w-5 h-5 text-slate-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </a>
              </AnimatedSection>)}
            </div>
          </section>

          <section id="process" className="py-20">
            <SectionLabel>Process</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4 max-w-xl">How We Reduce Operational Risk.</h2>
            <p className="text-slate-600 text-base mb-12 max-w-xl">A calm, transparent process focused on workflows, dependencies, visibility, and handover.</p>
            <div className="relative pl-10 border-l-2 border-slate-200 space-y-10">
              {[
                ['01', 'Operational Discovery', 'We understand planning workflows, approvals, inventory movement, reporting requirements, and production dependencies.'],
                ['02', 'Workflow Architecture', 'We identify bottlenecks, ERP gaps, spreadsheet dependencies, and automation opportunities.'],
                ['03', 'Implementation & Validation', 'Solutions are deployed alongside existing operations and validated with actual users and production scenarios.'],
                ['04', 'Operational Handover', 'Documentation, training, ownership transfer, and long-term scalability planning.']
              ].map((p, idx) => <AnimatedSection key={p[0]} delay={idx * 80}>
                <div className="relative">
                  <span className="absolute -left-[45px] top-0.5 w-4 h-4 rounded-full bg-white border-2 border-red-600"></span>
                  <div className="text-sm font-bold text-red-600 mb-1">{p[0]}</div>
                  <h3 className="text-base font-semibold text-slate-950 mb-2">{p[1]}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p[2]}</p>
                </div>
              </AnimatedSection>)}
            </div>
          </section>
        </div>
      </div>
    </div>

    <section id="decision" className="py-24 bg-slate-50 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Project Decision Framework</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-5">Are We The Right Fit?</h2>
          <p className="text-slate-600 text-base md:text-lg">A quick self-check before you reach out — so the first call is worth both our time.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-emerald-700 mb-6">When We're The Right Fit</h3>
            <div className="divide-y divide-slate-100">{['Planning still depends on spreadsheets', 'Operational knowledge lives in specific people', 'Existing ERP requires workarounds', 'Production visibility is limited', 'Manual coordination slows execution', 'Management wants measurable improvements'].map(x => <div key={x} className="py-3 flex items-start gap-3 text-sm text-slate-700">
              <SvgIcon name="CheckCircle2" className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              {x}
            </div>)}</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-danger-600 mb-6">When We're Probably Not The Right Fit</h3>
            <div className="divide-y divide-slate-100">{['Looking for the cheapest vendor', 'Need only a marketing website', 'Existing software already solves the operational problem', 'Business processes change every week', 'No operational bottlenecks exist'].map(x => <div key={x} className="py-3 flex items-start gap-3 text-sm text-slate-700">
              <SvgIcon name="X" className="w-4 h-4 text-danger-500 flex-shrink-0 mt-0.5" />
              {x}
            </div>)}</div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto divide-y divide-slate-200">
          {questions.map((q, idx) => <div key={q[0]}>
            <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full py-5 text-left flex justify-between items-center gap-4"><span className="font-semibold text-slate-950">{q[0]}</span><span className="text-red-600 font-bold text-lg">{activeFaq === idx ? '−' : '+'}</span></button>
            {activeFaq === idx && <div className="pb-5 text-slate-600 leading-relaxed">{q[1]}</div>}
          </div>)}
        </div>
      </div>
    </section>

    <section id="contact" className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Plate dark className="mb-4">Start Here</Plate>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Request ERP Gap Assessment.</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">Discover where production planning, approvals, inventory visibility, dispatch, and operational decisions still depend on spreadsheets, workarounds, and key personnel.</p>
            <div className="divide-y divide-white/10">
              {['Workflow Review', 'ERP Gap Identification', 'Dependency Risk Analysis', 'Automation Opportunities', 'Recommended Roadmap'].map(x => <div key={x} className="py-2.5 text-sm text-slate-200">{x}</div>)}
            </div>
          </div>
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl p-7 md:p-10 shadow-xl">
            {formSubmitted ? <div className="text-center py-16"><div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5"><SvgIcon name="CheckCircle2" className="w-7 h-7" /></div><h3 className="text-xl font-semibold mb-2">Assessment request received.</h3><p className="text-slate-600">We'll review your details and respond within 1 business day.</p></div> : <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input name="name" value={formData.name} onChange={handleInput} required placeholder="Name" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:border-red-400" />
                <input name="company" value={formData.company} onChange={handleInput} placeholder="Company" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:border-red-400" />
                <input name="phone" value={formData.phone} onChange={handleInput} placeholder="Phone" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:border-red-400" />
                <input type="email" name="email" value={formData.email} onChange={handleInput} required placeholder="Email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:border-red-400" />
              </div>
              <select name="challenge" value={formData.challenge} onChange={handleInput} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:border-red-400">
                {['Production Planning', 'Inventory Visibility', 'Quality Control', 'Dispatch Management', 'ERP Limitations', 'Dependency On Key Personnel', 'Other'].map(x => <option key={x}>{x}</option>)}
              </select>
              <textarea name="message" value={formData.message} onChange={handleInput} rows="4" placeholder="Briefly describe your workflow challenge" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 outline-none focus:border-red-400"></textarea>
              <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] w-px h-px opacity-0" />
              <div className="flex items-center gap-3">
                <label htmlFor="captcha" className="text-sm text-slate-600 whitespace-nowrap">What is {captcha.a} + {captcha.b}?</label>
                <input id="captcha" type="text" inputMode="numeric" value={captchaAnswer} onChange={e => setCaptchaAnswer(e.target.value)} required placeholder="Answer" className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-red-400" />
              </div>
              {captchaError && <p className="text-danger-600 text-sm">That answer isn't right — please try the new sum.</p>}
              {formError && <p className="text-danger-600 text-sm">Something went wrong sending your request. Please try again or email us directly.</p>}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button type="submit" disabled={formSubmitting} className="flex-1 bg-red-600 text-white hover:bg-red-700 px-6 py-3.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed">{formSubmitting ? 'Sending…' : 'Submit'}</button>
                <a href="https://wa.me/919664743159?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20strategy%20consultation." target="_blank" rel="noopener noreferrer" className="flex-1 border border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-3.5 rounded-lg font-semibold text-sm transition-colors text-center">Schedule Strategy Consultation</a>
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
