import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import ProductArticle from '../../../components/ProductArticle';
import { products, getProduct, siteUrl } from '../../../components/siteData';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return {};

  const title = product.label;
  const socialTitle = `${title} | VP Informatics`;
  const description = `${product.outcome}. ${product.intro}`;
  const url = `${siteUrl}/products/${product.id}`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      type: 'website',
      url,
      title: socialTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: product.label, item: `${siteUrl}/products/${product.id}` },
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
            <a href="/products" className="hover:text-red-600">Products</a>
            <span className="mx-2">/</span>
            <span className="text-slate-600">{product.label}</span>
          </nav>
          <ProductArticle product={product} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
