import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.range'), href: '#products' },
    { name: t('nav.results'), href: '#stories' },
    { name: t('nav.rnd'), href: '#rnd' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(12px)', zIndex: 50,
      borderBottom: scrolled ? '1px solid var(--clr-border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      padding: '0.8rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* LOGO */}
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          {/* Logo element placeholder pointing to public/logo.png */}
          <div style={{ height: '56px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src="/logo.png" 
              alt="Confier International" 
              onError={(e) => {
                 e.target.style.display='none'; 
                 e.target.nextSibling.style.display='flex'; 
              }} 
              style={{ maxHeight: '100%', objectFit: 'contain' }} 
            />
            {/* Fallback styling looking exactly like their uploaded font if PNG is missing */}
            <div style={{ display: 'none', flexDirection: 'column', lineHeight: 1.1 }}>
              <strong style={{ fontFamily: '"Nunito", "DM Sans", sans-serif', fontSize: '1.4rem', color: 'var(--clr-orange-warm)' }}>CONFIER</strong>
              <small style={{ fontFamily: '"Nunito", "DM Sans", sans-serif', fontSize: '0.85rem', color: 'var(--clr-orange-warm)' }}>INTERNATIONAL</small>
            </div>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <div style={{ display: 'none' }} className="desktop-nav">
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {navLinks.map((link, idx) => (
              <a key={idx} href={link.href} style={{
                textDecoration: 'none', color: 'var(--clr-text-main)', fontSize: '0.875rem', fontWeight: 600, transition: 'color 0.2s'
              }} onMouseOver={(e) => e.target.style.color = 'var(--clr-teal)'} onMouseOut={(e) => e.target.style.color = 'var(--clr-text-main)'}>
                {link.name}
              </a>
            ))}
            <a href="#contact" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>{t('nav.contact')}</a>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)} 
          style={{ background: 'none', border: 'none', color: 'var(--clr-text-main)' }}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, 
          background: '#fff', borderBottom: '1px solid var(--clr-border)',
          padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} onClick={() => setMobileOpen(false)} style={{
              textDecoration: 'none', color: 'var(--clr-text-main)', fontSize: '1rem', fontWeight: 600,
              padding: '0.5rem 0', borderBottom: '1px solid var(--clr-border)'
            }}>
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ marginTop: '0.5rem', textAlign: 'center' }}>{t('nav.contact')}</a>
        </div>
      )}

      {/* Extra CSS for media queries since we used inline styles for speed */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
