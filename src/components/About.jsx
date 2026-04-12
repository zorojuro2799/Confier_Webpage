import React from 'react';
import { useLanguage } from '../LanguageContext.jsx';
import { CheckCircle2, FlaskConical, ShieldCheck } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const pillars = [
    { title: t('about.pillar1.title'), text: t('about.pillar1.text'), icon: <CheckCircle2 size={32} /> },
    { title: t('about.pillar2.title'), text: t('about.pillar2.text'), icon: <FlaskConical size={32} /> },
    { title: t('about.pillar3.title'), text: t('about.pillar3.text'), icon: <ShieldCheck size={32} /> }
  ];

  return (
    <section id="about" className="section" style={{ background: '#fff', padding: '10rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Section 1: Editorial Header - High Trust */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '8rem', alignItems: 'center', marginBottom: '12rem' }}>
          <div>
            <span style={{ 
              fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px', 
              color: 'var(--clr-orange)', display: 'block', marginBottom: '2rem' 
            }}>
              {t('about.tag')}
            </span>
            <h2 style={{ 
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', 
              marginBottom: '2.5rem', color: '#111', lineHeight: 1.1 
            }}>
              {t('about.title')}
            </h2>
            <div style={{ height: '2px', width: '80px', background: 'var(--clr-orange)', marginBottom: '3rem' }}></div>
            <p style={{ fontSize: '1.25rem', color: 'var(--clr-text-main)', lineHeight: 1.7, fontWeight: 500 }}>
              {t('about.desc')}
            </p>
          </div>
          
          <div style={{ position: 'relative' }}>
            <div style={{ 
              borderRadius: '8px', overflow: 'hidden', boxShadow: '0 40px 120px rgba(0,0,0,0.1)' 
            }}>
              <img 
                src="/about-shrimp.png" 
                alt="Shrimp farming" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544605915-ea8195a62bc6?auto=format&fit=crop&q=80'; }}
              />
            </div>
            {/* Trust Badge integrated into image */}
            <div style={{ 
              position: 'absolute', bottom: '-40px', left: '-40px', background: 'var(--clr-teal-dark)', 
              color: '#fff', padding: '2rem 3rem', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              display: 'none' // Hidden for now for max cleanliness
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>15+</div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.5rem' }}>Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Section 2: The Three Pillars - Aligned with official site */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '12rem' }}>
          {pillars.map((pillar, idx) => (
            <div key={idx} style={{ 
              padding: '3rem', border: '1px solid var(--clr-border)', 
              borderRadius: '2px', transition: 'all 0.3s'
            }}>
              <div style={{ color: 'var(--clr-orange)', marginBottom: '2rem' }}>{pillar.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.5rem', color: '#111' }}>
                {pillar.title}
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--clr-text-muted)', lineHeight: 1.8 }}>
                {pillar.text}
              </p>
            </div>
          ))}
        </div>

        {/* Section 3: Innovation Lab - Science driven trust */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center', background: 'var(--clr-bg-primary)', padding: '6rem 4rem', borderRadius: '4px' }}>
          <div style={{ order: 2 }}>
            <img 
              src="/about-mission.png" 
              alt="Research & Development" 
              style={{ width: '100%', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80'; }}
            />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--clr-teal-dark)', letterSpacing: '2px', display: 'block', marginBottom: '1.5rem' }}>{t('rnd.tag')}</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#111', marginBottom: '2rem' }}>
              {t('about.pillar2.title')}
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--clr-ocean)', lineHeight: 1.8, marginBottom: '2rem' }}>
              {t('about.pillar2.text')}
            </p>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
               <img src="/confier-icon.png" alt="Confier" style={{ width: '60px', opacity: 0.5 }} />
               <div style={{ fontSize: '0.8rem', color: 'var(--clr-teal-dark)', fontWeight: 700, fontStyle: 'italic' }}>
                 {t('about.pillar3.title')}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
