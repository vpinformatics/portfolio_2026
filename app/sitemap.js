import { siteUrl, caseStudies, products } from '../components/siteData';

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...caseStudies.map((c) => ({
      url: `${siteUrl}/case-studies/${c.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/products`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...products.map((p) => ({
      url: `${siteUrl}/products/${p.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
