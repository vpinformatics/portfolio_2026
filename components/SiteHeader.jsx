'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SvgIcon from './SvgIcon';
import VPLogo from './VPLogo';
import { navLinks } from './siteData';

// Only hash links (in-page sections on the homepage) can be scroll-spied —
// route links like /products have nothing to observe.
const sectionIds = navLinks
  .filter(([href]) => href.startsWith('/#'))
  .map(([href]) => href.slice(2));

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setTheme(localStorage.getItem('vp-theme') || 'light');
  }, []);

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    localStorage.setItem('vp-theme', theme);
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0B1220' : '#ffffff');
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight whichever section is currently under the fixed header, homepage only.
  useEffect(() => {
    if (pathname !== '/') { setActiveSection(''); return; }
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const headerOffset = 120;
    const onScroll = () => {
      let current = '';
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= headerOffset) current = el.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <nav className={`glass-nav fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav-scrolled py-2.5' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a href="/#home" className="flex items-center logo-shell"><VPLogo /></a>
        <div className="hidden xl:flex items-center gap-6">
          {navLinks.map(([href, label]) => {
            const isActive = href === `/#${activeSection}`;
            return (
              <a
                key={label}
                href={href}
                aria-current={isActive ? 'true' : undefined}
                className={`whitespace-nowrap text-xs font-extrabold uppercase tracking-wide transition-colors ${isActive ? 'text-red-600' : 'text-slate-500 hover:text-red-600'}`}
              >
                {label}
              </a>
            );
          })}
          <button onClick={toggleTheme} className="theme-toggle-btn px-3 py-2 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-2" aria-label="Toggle light and dark theme">
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <a href="/#contact" className="bg-red-600 text-white px-5 py-2.5 rounded text-xs font-black uppercase tracking-wider hover:bg-slate-950 transition-all flex items-center gap-2">Request ERP Gap Assessment <SvgIcon name="ArrowRight" className="w-4 h-4" /></a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden text-slate-900 p-2 theme-toggle-btn">{mobileMenuOpen ? <SvgIcon name="X" /> : <SvgIcon name="Menu" />}</button>
      </div>
      {mobileMenuOpen && <div className="xl:hidden bg-white border-t border-slate-100 px-6 py-6 shadow-xl flex flex-col gap-4 animate-fadeIn">
        <button onClick={toggleTheme} className="theme-toggle-btn px-4 py-3 rounded-xl border text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2">
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? 'Switch To Light Theme' : 'Switch To Dark Theme'}</span>
        </button>
        {[...navLinks, ['/#contact', 'Request ERP Gap Assessment']].map(([href, label]) => {
          const isActive = href === `/#${activeSection}`;
          return (
            <a
              key={label}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive ? 'true' : undefined}
              className={`font-bold ${isActive ? 'text-red-600' : 'text-slate-800 hover:text-red-600'}`}
            >
              {label}
            </a>
          );
        })}
      </div>}
    </nav>
  );
}
