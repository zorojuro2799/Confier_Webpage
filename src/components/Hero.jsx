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
      paddingTop: '84px'
    }}>
      
      {/* Interactive Physics Canvas Background - UNTOUCHED as requested */}
      <TopDownPond />
      
      <div className="container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none', width: '100%' }}>
          <div style={{ 
            color: '#fff', 
            textAlign: 'center', 
            margin: '0 auto', 
            pointerEvents: 'auto',
            maxWidth: '800px',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.15, 
              marginBottom: '1.2rem', 
              letterSpacing: '-0.02em',
              textShadow: '0 12px 28px rgba(0,0,0,0.42)',
              color: '#FAFAFA'
            }}>
              {t('hero.title1')}<br/>
              <span style={{ 
                color: '#A8D5BA', // Soft Green Accent
                fontStyle: 'italic'
              }}>{t('hero.title2')}</span>
            </h1>

            <p style={{ 
              fontFamily: "var(--font-sans)",
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
              maxWidth: '650px', 
              margin: '0 auto 2.2rem', 
              lineHeight: 1.7, 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              {t('hero.subtitle')}
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <button 
                className="btn-primary" 
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  letterSpacing: '0.2px',
                  padding: '1rem 2.1rem',
                  fontSize: '1rem',
                  boxShadow: '0 14px 24px rgba(0,0,0,0.2)',
                  border: 'none',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onClick={() => {
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                {t('hero.btn1')}
              </button>
              <button 
                style={{
                  fontFamily: "var(--font-sans)",
                  background: 'rgba(255,255,255,0.1)', 
                  color: '#fff', 
                  border: '1px solid rgba(255,255,255,0.4)',
                  padding: '1rem 2.1rem', 
                  borderRadius: '14px', 
                  fontWeight: 600, 
                  letterSpacing: '0.2px',
                  fontSize: '1rem',
                  cursor: 'pointer', 
                  backdropFilter: 'blur(12px)', 
                  transition: 'all 0.3s',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }} 
                onMouseOver={e => {
                  e.currentTarget.style.background='rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform='translateY(-2px)';
                }} 
                onMouseOut={e => {
                  e.currentTarget.style.background='rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform='translateY(0)';
                }}
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('nav.contact')}
              </button>
            </div>
            
          </div>
      </div>
    </section>
  );
}
