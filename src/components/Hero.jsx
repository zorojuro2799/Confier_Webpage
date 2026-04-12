import React from 'react';
import { useLanguage } from '../LanguageContext.jsx';
import TopDownPond from './TopDownPond.jsx';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" style={{ 
      minHeight: '100vh', 
      display: 'flex', alignItems: 'center', 
      position: 'relative', overflow: 'hidden',
      background: '#000', // Canvas holds the real color
      paddingTop: '80px'
    }}>
      
      {/* Interactive Physics Canvas Background - UNTOUCHED as requested */}
      <TopDownPond />
      
      <div className="container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <div style={{ color: '#fff', textAlign: 'center', margin: '0 auto', pointerEvents: 'auto' }}>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.03em',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}>
              {t('hero.title1')}<br/>
              <span style={{ color: 'var(--clr-teal-light)' }}>{t('hero.title2')}</span>
            </h1>

            <p style={{ 
              fontSize: '1.2rem', 
              maxWidth: '700px', 
              margin: '0 auto 2.5rem', 
              lineHeight: 1.6, 
              opacity: 0.9,
              fontWeight: 500
            }}>
              {t('hero.subtitle')}
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => {
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                {t('hero.btn1')}
              </button>
              <button 
                style={{
                  background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
                  padding: '1rem 2.2rem', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', 
                  backdropFilter: 'blur(12px)', transition: 'all 0.3s'
                }} 
                onMouseOver={e => e.currentTarget.style.background='rgba(255,255,255,0.15)'} 
                onMouseOut={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('nav.contact')}
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '5rem', justifyContent: 'center', marginTop: '5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.8rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>2.5x</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--clr-teal-light)', fontWeight: 800, marginTop: '0.5rem' }}>{t('hero.stat.growth')}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.8rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>95%</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--clr-teal-light)', fontWeight: 800, marginTop: '0.5rem' }}>{t('hero.stat.survival')}</div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
