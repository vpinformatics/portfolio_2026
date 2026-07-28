import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import SvgIcon from '../../components/SvgIcon';
import { portfolioSummary, siteUrl } from '../../components/siteData';

const title = 'Case Studies';
const socialTitle = `${title} | VP Informatics`;
const description = 'Manufacturing software case studies: printing & packaging, PCB/electronics, textile/embroidery job work, and industrial IoT machine efficiency — problem, solution, and measured outcomes.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/case-studies' },
  openGraph: { type: 'website', url: `${siteUrl}/case-studies`, title: socialTitle, description },
  twitter: { card: 'summary_large_image', title: socialTitle, description },
};

export default function CaseStudiesIndexPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${siteUrl}/case-studies` },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="/" className="hover:text-red-600">Home</a>
            <span className="mx-2">/</span>
            <span className="text-slate-600">Case Studies</span>
          </nav>

          <div className="max-w-3xl mb-16">
            <span className="text-red-600 font-extrabold text-xs uppercase tracking-[0.22em] mb-3 block">Portfolio / Case Studies</span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-950 mb-5">Industry → Problem → Outcome.</h1>
            <p className="text-slate-600 text-base md:text-lg font-medium">Project pages are organized around real manufacturing workflows, operational risk, system solution, before/after flow, and measurable business value.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioSummary.map((group) => (
              <div key={group.id} className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:border-red-200 transition-all h-full flex flex-col">
                <div className="flex-grow">
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-red-600 mb-3">Project Page</div>
                  <h2 className="text-2xl font-black text-slate-950 mb-3">{group.industry}</h2>
                  <p className="text-sm font-bold text-slate-600 leading-relaxed mb-5">{group.headline}</p>
                  <div className="bg-slate-950 text-white rounded-2xl p-5 mb-6">
                    <div className="text-[10px] font-black uppercase tracking-widest text-red-300 mb-2">Primary Outcome</div>
                    <div className="text-xl font-black">{group.outcome}</div>
                  </div>
                  <div className="space-y-3">
                    {group.items.map(([name, outcome]) => (
                      <div key={name} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                        <div className="font-black text-slate-950">{name}</div>
                        <div className="text-sm font-bold text-red-600 mt-1">{outcome}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <a href={`/case-studies/${group.id}`} className="mt-6 inline-flex items-center justify-center bg-red-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-950 transition-all">
                  View Project Page <SvgIcon name="ArrowRight" className="w-4 h-4 ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
