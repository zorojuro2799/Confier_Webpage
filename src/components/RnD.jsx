import React from 'react';
import { Microscope, Award, LineChart } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';

export default function RnD() {
  const { t } = useLanguage();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const pillars = [
    { 
      icon: <Microscope size={32}/>, 
      title: t('rnd.pillar1.title'), 
      desc: t('rnd.pillar1.desc') 
    },
    { 
      icon: <Award size={32}/>, 
      title: t('rnd.pillar2.title'), 
      desc: t('rnd.pillar2.desc') 
    },
    { 
      icon: <LineChart size={32}/>, 
      title: t('rnd.pillar3.title'), 
      desc: t('rnd.pillar3.desc') 
    }
  ];

  return (
    <section id="rnd" className="section" style={{ 
      background: 'var(--bg-section, #F0F4F8)',
      padding: isMobile ? '60px 20px' : '100px 40px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        .rnd-card {
          background: #ffffff;
          padding: 2rem;
          border-radius: 16px;
          text-align: left;
          border: 1px solid rgba(168, 213, 186, 0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .rnd-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 91, 150, 0.08);
        }
        .rnd-icon-wrapper {
          width: 60px;
          height: 60px;
          background: rgba(46, 139, 87, 0.08);
          color: var(--teal, #2E8B57);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .rnd-card:hover .rnd-icon-wrapper {
          background: var(--teal, #2E8B57);
          color: white;
        }
        
        .cert-placeholder {
          background: rgba(255, 255, 255, 0.6);
          border: 1px dashed rgba(46, 139, 87, 0.3);
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
          margin-top: 4rem;
          color: var(--text-mid, #4A5A6A);
        }
      `}</style>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '4rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <span className="section-tag" style={{ 
            color: 'var(--teal, #2E8B57)', 
            fontWeight: 700, 
            letterSpacing: '1.5px', 
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            display: 'inline-block',
            marginBottom: '1rem',
            background: 'rgba(46, 139, 87, 0.1)',
            padding: '6px 14px',
            borderRadius: '20px'
          }}>{t('rnd.tag')}</span>
          
          <h2 style={{ 
            fontSize: isMobile ? '2rem' : '2.8rem', 
            fontFamily: "'Playfair Display', serif", 
            color: 'var(--earth, #005B96)', 
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>{t('rnd.title')}</h2>
          
          <p style={{ 
            margin: '0 auto', 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            lineHeight: 1.6,
            color: 'var(--text-mid, #4A5A6A)'
          }}>
            {t('rnd.desc')}
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
          gap: isMobile ? '1.5rem' : '2rem',
          alignItems: 'stretch'
        }}>
          {pillars.map((feature, idx) => (
            <div key={idx} className="rnd-card">
              <div className="rnd-icon-wrapper">
                {feature.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontFamily: "'Montserrat', sans-serif", 
                fontWeight: 700, 
                marginBottom: '0.8rem', 
                color: 'var(--text-dark, #2C3E50)',
                lineHeight: 1.3
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                color: 'var(--text-mid, #4A5A6A)', 
                fontSize: '0.95rem', 
                lineHeight: 1.6,
                margin: 0,
                flexGrow: 1
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Placeholder for Hallmarks & Certifications */}
        <div className="cert-placeholder">
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--earth, #005B96)', fontSize: '1.2rem' }}>Hallmarks & Certifications</h4>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>Space reserved for official badges and quality certifications.</p>
        </div>

      </div>
    </section>
  );
}