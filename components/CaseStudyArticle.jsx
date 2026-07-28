export default function CaseStudyArticle({ project }) {
  return (
    <article className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-950 text-white p-8 md:p-10 grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <div className="text-red-300 font-black text-xs uppercase tracking-[0.22em] mb-3">{project.label}</div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-5">{project.title}</h1>
          <p className="text-slate-300 text-base md:text-lg font-medium leading-relaxed">{project.intro}</p>
        </div>
        <div className="lg:col-span-4 bg-white/10 border border-white/10 rounded-3xl p-6">
          <div className="text-[10px] font-black uppercase tracking-widest text-red-300 mb-2">Business Outcome</div>
          <div className="text-2xl font-black text-white">{project.outcome}</div>
        </div>
      </div>

      <div className="p-8 md:p-10 grid lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-7">
          <h2 className="text-xl font-black text-slate-950 mb-5">Problem</h2>
          <div className="space-y-3">{project.problem.map(x => <p key={x} className="text-sm font-semibold text-slate-600 leading-relaxed">× {x}</p>)}</div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-3xl p-7">
          <h2 className="text-xl font-black text-slate-950 mb-5">Operational Risk</h2>
          <div className="space-y-3">{project.risk.map(x => <p key={x} className="text-sm font-semibold text-slate-700 leading-relaxed">⚠ {x}</p>)}</div>
        </div>
      </div>

      <div className="px-8 md:px-10 pb-10">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <h2 className="text-xl font-black text-slate-950 mb-5">What Was Implemented</h2>
            <div className="space-y-3">{project.solution.map(x => <div key={x} className="flex items-start gap-3 text-sm font-bold text-slate-700"><span className="text-red-600 mt-0.5">✓</span><span>{x}</span></div>)}</div>
          </div>
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-7">
              <h3 className="text-lg font-black text-slate-950 mb-5">Before</h3>
              <div className="space-y-3">{project.before.map((x, i) => <div key={x} className="text-sm font-bold text-slate-600"><div className="bg-white border border-slate-100 rounded-xl px-4 py-3">{x}</div>{i < project.before.length - 1 && <div className="text-center text-slate-400 py-1">↓</div>}</div>)}</div>
            </div>
            <div className="bg-slate-950 text-white rounded-3xl p-7 shadow-xl">
              <h3 className="text-lg font-black mb-5">After</h3>
              <div className="space-y-3">{project.after.map((x, i) => <div key={x} className="text-sm font-bold"><div className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-slate-100">{x}</div>{i < project.after.length - 1 && <div className="text-center text-slate-400 py-1">↓</div>}</div>)}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <h2 className="text-xl font-black text-slate-950 mb-5">Measured / Expected Outcomes</h2>
            <div className="grid sm:grid-cols-2 gap-3">{project.outcomes.map(x => <div key={x} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black text-slate-700">✓ {x}</div>)}</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <h2 className="text-xl font-black text-slate-950 mb-5">Relevant If Your Business Has</h2>
            <div className="space-y-3">{project.relevant.map(x => <div key={x} className="text-sm font-bold text-slate-600">✓ {x}</div>)}</div>
          </div>
        </div>

        <div className="mt-8 bg-red-600 text-white rounded-3xl p-7 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="text-red-100 font-black text-xs uppercase tracking-widest mb-2">Next Step</div>
            <h2 className="text-2xl font-black mb-2">Find similar ERP gaps in your operation.</h2>
            <p className="text-red-50 font-medium">Review where planning, approvals, production visibility, dispatch, and key-person dependency are still creating operational risk.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="/#contact" className="bg-white text-slate-950 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-center hover:bg-slate-950 hover:text-white transition-all">Request ERP Gap Assessment</a>
            <a href="https://wa.me/919664743159?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20strategy%20consultation." target="_blank" rel="noopener noreferrer" className="bg-red-700/50 border border-white/20 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-center hover:bg-white hover:text-slate-950 transition-all">Schedule Strategy Consultation</a>
          </div>
        </div>
      </div>
    </article>
  );
}
