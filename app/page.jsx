import App from '../components/App';
import { faqData, orgData, businessCards, logoUrl } from '../components/siteData';

export default function Page() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: orgData.name,
    legalName: orgData.legalName,
    description: orgData.description,
    url: orgData.url,
    email: orgData.email,
    logo: logoUrl,
    image: logoUrl,
    areaServed: 'IN',
    knowsAbout: [
      'Manufacturing Software',
      'ERP Gap Assessment',
      'Industrial IoT',
      'Production Planning',
      'Inventory Management',
      'Dispatch Automation',
      'Quality Control Systems',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Manufacturing Software Solutions',
      itemListElement: businessCards.map((card) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: card.title,
          description: card.solution,
          provider: { '@type': 'ProfessionalService', name: orgData.name },
        },
      })),
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <App />
    </>
  );
}
