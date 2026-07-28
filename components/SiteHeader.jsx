'use client';

import { useState, useEffect } from 'react';
import SvgIcon from './SvgIcon';
import VPLogo from './VPLogo';
import { navLinks } from './siteData';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(localStorage.getItem('vp-theme') || 'light');
  }, []);

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    localStorage.setItem('vp-theme', theme);
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0A0E14' : '#ffffff');
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-100' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a href="/#home" className={`flex items-center logo-shell ${!isScrolled ? 'brightness-0 invert' : ''}`}><VPLogo /></a>
        <div className="hidden xl:flex items-center gap-7">
          {navLinks.map(([href, label]) => <a key={label} href={href} className={`whitespace-nowrap text-sm font-medium transition-colors ${isScrolled ? 'text-slate-600 hover:text-red-600' : 'text-slate-200 hover:text-white'}`}>{label}</a>)}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn px-3 py-2 rounded-lg border text-sm flex items-center gap-2"
            style={!isScrolled ? { background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.25)', color: '#fff' } : undefined}
            aria-label="Toggle light and dark theme"
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
          <a href="/#contact" className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">Request ERP Gap Assessment</a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`xl:hidden p-2 theme-toggle-btn ${!isScrolled ? '!text-white' : 'text-slate-900'}`}>{mobileMenuOpen ? <SvgIcon name="X" /> : <SvgIcon name="Menu" />}</button>
      </div>
      {mobileMenuOpen && <div className="xl:hidden bg-white border-t border-slate-100 px-6 py-6 shadow-md flex flex-col gap-4 animate-fadeIn">
        <button onClick={toggleTheme} className="theme-toggle-btn px-4 py-3 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2">
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? 'Switch To Light Theme' : 'Switch To Dark Theme'}</span>
        </button>
        {[...navLinks, ['/#contact', 'Request ERP Gap Assessment']].map(([href, label]) => <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="font-bold text-slate-800 hover:text-red-600">{label}</a>)}
      </div>}
    </nav>
  );
}
