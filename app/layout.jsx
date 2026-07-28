import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { siteUrl, orgData } from '../components/siteData';
import Analytics from '../components/Analytics';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const title = 'VP Informatics - Manufacturing Software, ERP Gap Assessment & Industrial IoT';
const description = orgData.description;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | VP Informatics',
  },
  description,
  keywords: [
    'manufacturing software',
    'ERP gap assessment',
    'industrial IoT',
    'production planning software',
    'factory automation',
    'inventory management software',
    'dispatch management system',
    'quality control software',
    'manufacturing execution system',
    'custom software for manufacturers',
  ],
  authors: [{ name: 'VP Informatics - +91 96647 43159' }],
  creator: 'VP Informatics - +91 96647 43159',
  publisher: 'VP Informatics - +91 96647 43159',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'VP Informatics - +91 96647 43159',
    title,
    description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-white text-slate-800 antialiased selection:bg-red-100 selection:text-red-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
