import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import SvgIcon from '../../components/SvgIcon';
import { products, siteUrl } from '../../components/siteData';

const title = 'Products';
const socialTitle = `${title} | VP Informatics`;
const description = 'WhatsApp CRM and customized software solutions from VP Informatics — websites, business software, and automation for any industry.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/products' },
  openGraph: { type: 'website', url: `${siteUrl}/products`, title: socialTitle, description },
  twitter: { card: 'summary_large_image', title: socialTitle, description },
};

export default function ProductsIndexPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
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
            <span className="text-slate-600">Products</span>
          </nav>

          <div className="max-w-3xl mb-16">
            <span className="text-red-600 font-extrabold text-xs uppercase tracking-[0.22em] mb-3 block">Products</span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-950 mb-5">WhatsApp CRM & Customized Software.</h1>
            <p className="text-slate-600 text-base md:text-lg font-medium">Beyond manufacturing case studies, these are the two ways we work with businesses directly — a ready-to-run WhatsApp CRM, and websites plus custom software built around your workflow, in any industry.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:border-red-200 transition-all h-full flex flex-col">
                <div className="flex-grow">
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-red-600 mb-3">{p.kicker}</div>
                  <h2 className="text-2xl font-black text-slate-950 mb-3">{p.label}</h2>
                  <p className="text-sm font-bold text-slate-600 leading-relaxed mb-5">{p.summary}</p>
                  <div className="bg-slate-950 text-white rounded-2xl p-5 mb-6">
                    <div className="text-[10px] font-black uppercase tracking-widest text-red-300 mb-2">Outcome</div>
                    <div className="text-xl font-black">{p.outcome}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.perfectFor.slice(0, 4).map((x) => (
                      <span key={x} className="bg-slate-50 border border-slate-100 rounded-full px-3 py-1.5 text-xs font-black text-slate-700">{x}</span>
                    ))}
                  </div>
                </div>
                <a href={`/products/${p.id}`} className="mt-6 inline-flex items-center justify-center bg-red-600 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-950 transition-all">
                  View Details <SvgIcon name="ArrowRight" className="w-4 h-4 ml-2" />
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
