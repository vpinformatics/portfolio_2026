import Plate from './Plate';

export default function CaseStudyArticle({ project }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-slate-950 text-white p-8 md:p-10 grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <Plate dark className="mb-4">{project.label}</Plate>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-5">{project.title}</h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">{project.intro}</p>
        </div>
        <div className="lg:col-span-4 bg-white/5 rounded-xl p-6">
          <div className="text-xs font-semibold uppercase tracking-wide text-red-300 mb-2">Business Outcome</div>
          <div className="text-xl font-bold text-white">{project.outcome}</div>
        </div>
      </div>

      <div className="p-8 md:p-10 grid lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 rounded-2xl p-7">
          <h2 className="text-lg font-semibold text-slate-950 mb-5">Problem</h2>
          <div className="space-y-3">{project.problem.map(x => <p key={x} className="text-sm text-slate-600 leading-relaxed">{x}</p>)}</div>
        </div>
        <div className="bg-danger-50 rounded-2xl p-7">
          <h2 className="text-lg font-semibold text-slate-950 mb-5">Operational Risk</h2>
          <div className="space-y-3">{project.risk.map(x => <p key={x} className="text-sm text-slate-700 leading-relaxed">{x}</p>)}</div>
        </div>
      </div>

      <div className="px-8 md:px-10 pb-10">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white rounded-2xl p-7 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950 mb-5">What Was Implemented</h2>
            <div className="space-y-3">{project.solution.map(x => <div key={x} className="flex items-start gap-2.5 text-sm text-slate-700"><span className="w-1 h-1 rounded-full bg-red-500 mt-2 flex-shrink-0"></span><span>{x}</span></div>)}</div>
          </div>
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl p-7">
              <h3 className="text-base font-semibold text-slate-950 mb-5">Before</h3>
              <div className="relative pl-5 border-l-2 border-slate-200 space-y-4">{project.before.map(x => <div key={x} className="relative text-sm text-slate-600"><span className="absolute -left-[23px] top-1 w-2 h-2 rounded-full bg-slate-300"></span>{x}</div>)}</div>
            </div>
            <div className="bg-slate-950 text-white rounded-2xl p-7">
              <h3 className="text-base font-semibold mb-5">After</h3>
              <div className="relative pl-5 border-l-2 border-white/15 space-y-4">{project.after.map(x => <div key={x} className="relative text-sm text-slate-100"><span className="absolute -left-[23px] top-1 w-2 h-2 rounded-full bg-red-500"></span>{x}</div>)}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950 mb-5">Measured / Expected Outcomes</h2>
            <div className="grid sm:grid-cols-2 gap-3">{project.outcomes.map(x => <div key={x} className="text-sm font-medium text-slate-700">{x}</div>)}</div>
          </div>
          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950 mb-5">Relevant If Your Business Has</h2>
            <div className="space-y-2.5">{project.relevant.map(x => <div key={x} className="text-sm text-slate-600">{x}</div>)}</div>
          </div>
        </div>

        <div className="mt-8 bg-red-600 text-white rounded-2xl p-7 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="text-red-100 text-xs font-semibold uppercase tracking-wide mb-2">Next Step</div>
            <h2 className="text-xl font-bold mb-2">Find similar ERP gaps in your operation.</h2>
            <p className="text-red-50">Review where planning, approvals, production visibility, dispatch, and key-person dependency are still creating operational risk.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="/#contact" className="bg-white text-slate-950 px-5 py-3 rounded-lg text-sm font-semibold text-center hover:bg-slate-100 transition-colors">Request ERP Gap Assessment</a>
            <a href="https://wa.me/919664743159?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20strategy%20consultation." target="_blank" rel="noopener noreferrer" className="bg-red-700/50 text-white px-5 py-3 rounded-lg text-sm font-semibold text-center hover:bg-red-700 transition-colors">Schedule Strategy Consultation</a>
          </div>
        </div>
      </div>
    </article>
  );
}
