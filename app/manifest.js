import { orgData } from '../components/siteData';

export default function manifest() {
  return {
    name: orgData.name,
    short_name: orgData.name,
    description: orgData.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#dc2626',
    icons: [
      { src: '/icon.png', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
