import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import CaseStudyArticle from '../../../components/CaseStudyArticle';
import { caseStudies, getCaseStudy, siteUrl } from '../../../components/siteData';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.id }));
}

export function generateMetadata({ params }) {
  const project = getCaseStudy(params.slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const socialTitle = `${title} | VP Informatics`;
  const description = `${project.outcome}. ${project.intro}`;
  const url = `${siteUrl}/case-studies/${project.id}`;

  return {
    title,
    description,
    alternates: { canonical: `/case-studies/${project.id}` },
    openGraph: {
      type: 'article',
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

export default function CaseStudyPage({ params }) {
  const project = getCaseStudy(params.slug);
  if (!project) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${siteUrl}/case-studies` },
      { '@type': 'ListItem', position: 3, name: project.label, item: `${siteUrl}/case-studies/${project.id}` },
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
            <a href="/case-studies" className="hover:text-red-600">Case Studies</a>
            <span className="mx-2">/</span>
            <span className="text-slate-600">{project.label}</span>
          </nav>
          <CaseStudyArticle project={project} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
