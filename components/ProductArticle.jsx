import WhatsAppIcon from './WhatsAppIcon';

const ACCENTS = {
  red: { kickerText: 'text-red-300', outcomeText: 'text-red-300', check: 'text-red-600', ctaBg: 'bg-red-600', ctaAccentText: 'text-red-100', ctaSubText: 'text-red-50', primaryBtn: 'bg-white text-slate-950 hover:bg-slate-950 hover:text-white', secondaryBtn: 'bg-red-700/50 border border-white/20 text-white hover:bg-white hover:text-slate-950', priceBg: 'bg-slate-950', highlight: 'text-red-500' },
  whatsapp: { kickerText: 'text-[#25D366]', outcomeText: 'text-[#25D366]', check: 'text-[#25D366]', ctaBg: 'bg-gradient-to-r from-[#25D366] to-[#128C7E]', ctaAccentText: 'text-white/80', ctaSubText: 'text-white/90', primaryBtn: 'bg-white text-[#128C7E] hover:bg-slate-950 hover:text-white', secondaryBtn: 'bg-black/20 border border-white/20 text-white hover:bg-white hover:text-[#128C7E]', priceBg: 'bg-[#128C7E]', highlight: 'text-[#25D366]' },
  software: { kickerText: 'text-indigo-300', outcomeText: 'text-indigo-300', check: 'text-indigo-600', ctaBg: 'bg-gradient-to-r from-indigo-600 to-blue-600', ctaAccentText: 'text-white/80', ctaSubText: 'text-white/90', primaryBtn: 'bg-white text-indigo-700 hover:bg-slate-950 hover:text-white', secondaryBtn: 'bg-black/20 border border-white/20 text-white hover:bg-white hover:text-indigo-700', priceBg: 'bg-indigo-700', highlight: 'text-indigo-400' },
};

function CtaButton({ label, href, external, primary, accent }) {
  const base = 'px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-center transition-all';
  const style = primary ? accent.primaryBtn : accent.secondaryBtn;
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${base} ${style}`}
    >
      {label}
    </a>
  );
}

function renderTitle(title, highlight, highlightClass) {
  if (!highlight) return title;
  const idx = title.indexOf(highlight);
  if (idx === -1) return title;
  return <>
    {title.slice(0, idx)}
    <span className={highlightClass}>{highlight}</span>
    {title.slice(idx + highlight.length)}
  </>;
}

export default function ProductArticle({ product }) {
  const accent = ACCENTS[product.accent || 'red'];
  const isWhatsApp = product.accent === 'whatsapp';
  return (
    <article className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-950 text-white p-8 md:p-10 grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <div className={`flex items-center gap-2 font-black text-xs uppercase tracking-[0.22em] mb-3 ${accent.kickerText}`}>
            {isWhatsApp && <WhatsAppIcon className="w-4 h-4" />}
            {product.kicker}
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-5">{renderTitle(product.title, product.titleHighlight, accent.highlight)}</h1>
          <p className="text-slate-300 text-base md:text-lg font-medium leading-relaxed">{product.intro}</p>
        </div>
        <div className="lg:col-span-4 bg-white/10 border border-white/10 rounded-3xl p-6">
          <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent.outcomeText}`}>Outcome</div>
          <div className="text-2xl font-black text-white">{product.outcome}</div>
        </div>
      </div>

      <div className="p-8 md:p-10">
        <p className="text-lg font-bold text-slate-700 leading-relaxed max-w-4xl mb-10">{product.summary}</p>

        {product.pricing && (
          <div className="mb-10 bg-slate-50 border border-slate-200 rounded-3xl p-7 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-black text-slate-950">{product.pricing.name}</h2>
              <div className={`${accent.priceBg} text-white rounded-2xl px-6 py-3 text-center shrink-0`}>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/60">Price</div>
                <div className="text-2xl font-black">{product.pricing.price}</div>
              </div>
            </div>
            {product.pricing.priceNote && <p className="text-sm font-bold text-slate-500 mb-6">{product.pricing.priceNote}</p>}
            {product.pricing.payLink && (
              <div className="mb-8">
                <a
                  href={product.pricing.payLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block ${accent.ctaBg} text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity`}
                >
                  Pay {product.pricing.price} Now
                </a>
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {product.pricing.includes.map(x => (
                <div key={x} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                  <span className={`${accent.check} mt-0.5`}>✓</span><span>{x}</span>
                </div>
              ))}
            </div>
            {product.pricing.tools && (
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Business Tools, Included With Every Site</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-5">
                  {product.pricing.tools.map((t, i) => (
                    <div key={t.title}>
                      <div className="font-mono text-xs text-slate-300 mb-1">{String(i + 1).padStart(2, '0')}</div>
                      <div className="font-black text-slate-950 text-sm mb-1">{t.title}</div>
                      <div className="text-xs font-semibold text-slate-500">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {product.pricing.note && <p className="text-xs font-semibold text-slate-400 mt-6">{product.pricing.note}</p>}
          </div>
        )}

        <div className="mb-10">
          <h2 className="text-xl font-black text-slate-950 mb-5">{product.featuresHeading || "What's Included"}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.features.map(f => (
              <div key={f.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-black text-slate-950 mb-2">{f.title}</h3>
                <p className="text-sm font-semibold text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-7">
            <h2 className="text-xl font-black text-slate-950 mb-5">Perfect For</h2>
            <div className="flex flex-wrap gap-2">
              {product.perfectFor.map(x => (
                <span key={x} className="bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-black text-slate-700">{x}</span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
            <h2 className="text-xl font-black text-slate-950 mb-5">Relevant If Your Business Has</h2>
            <div className="space-y-3">{product.relevant.map(x => <div key={x} className="text-sm font-bold text-slate-600"><span className={accent.check}>✓</span> {x}</div>)}</div>
          </div>
        </div>

        <div className={`${accent.ctaBg} text-white rounded-3xl p-7 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6`}>
          <div>
            <div className={`${accent.ctaAccentText} font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2`}>
              {isWhatsApp && <WhatsAppIcon className="w-4 h-4" />}
              Next Step
            </div>
            <h2 className="text-2xl font-black mb-2">{product.outcome}.</h2>
            <p className={`${accent.ctaSubText} font-medium`}>{product.summary}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <CtaButton label={product.cta.primaryLabel} href={product.cta.primaryHref} external={product.cta.primaryExternal} primary accent={accent} />
            <CtaButton label={product.cta.secondaryLabel} href={product.cta.secondaryHref} external={product.cta.secondaryHref?.startsWith('http')} accent={accent} />
          </div>
        </div>
      </div>
    </article>
  );
}
