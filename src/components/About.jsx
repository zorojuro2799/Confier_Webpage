import React from 'react';
import { useLanguage } from '../LanguageContext.jsx';
import { Microscope, Target, Settings } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const pillars = [
    { title: t('about.pillar1.title'), text: t('about.pillar1.text'), icon: <Microscope size={32} strokeWidth={1.5} /> },
    { title: t('about.pillar2.title'), text: t('about.pillar2.text'), icon: <Target size={32} strokeWidth={1.5} /> },
    { title: t('about.pillar3.title'), text: t('about.pillar3.text'), icon: <Settings size={32} strokeWidth={1.5} /> }
  ];

  return (
    <section id="about" style={{ 
      background: 'linear-gradient(180deg, #ffffff 0%, #f7fbfc 100%)', 
      padding: isMobile ? '80px 20px' : '120px 40px',
      overflow: 'hidden'
    }}>
      <style>{`
        .about-image-wrapper {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 44px rgba(0, 91, 150, 0.14);
        }
        .about-image-wrapper::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 24px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.3);
          pointer-events: none;
          z-index: 10;
        }
        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .about-image-wrapper:hover .about-image {
          transform: scale(1.05);
        }
        
        .advantage-card {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(6px);
          padding: 2.5rem 2rem;
          border-radius: 22px;
          border: 1px solid rgba(0, 91, 150, 0.08);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .advantage-card:hover {
          background: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(0, 91, 150, 0.12);
          border-color: rgba(46, 139, 87, 0.2);
        }
        .advantage-icon {
          width: 64px;
          height: 64px;
          background: white;
          color: var(--teal, #2E8B57);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.03);
          transition: all 0.4s ease;
        }
        .advantage-card:hover .advantage-icon {
          background: var(--earth, #005B96);
          color: white;
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 15px 30px rgba(0, 91, 150, 0.2);
        }
      `}</style>

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section 1: The Confier Genesis */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', 
          gap: isMobile ? '3rem' : '6rem', 
          alignItems: 'center', 
          marginBottom: isMobile ? '5rem' : '8rem' 
        }}>
          <div style={{ order: isMobile ? 2 : 1 }}>
            <span style={{ 
              color: 'var(--teal, #2E8B57)', 
              fontWeight: 700, 
              letterSpacing: '1.5px', 
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              display: 'inline-block',
              marginBottom: '1rem',
              background: 'rgba(46, 139, 87, 0.1)',
              padding: '8px 16px',
              borderRadius: '20px'
            }}>
              {t('about.tag')}
            </span>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: isMobile ? '2.5rem' : '3.5rem', 
              color: 'var(--earth, #005B96)', 
              marginBottom: '1.5rem',
              lineHeight: 1.15
            }}>
              {t('about.title')}
            </h2>
            <div style={{ 
              height: '3px', 
              width: '60px', 
              background: 'var(--teal, #2E8B57)', 
              marginBottom: '2rem',
              borderRadius: '2px'
            }}></div>
            <p style={{ 
              fontSize: isMobile ? '1.05rem' : '1.15rem', 
              color: 'var(--text-mid, #4A5A6A)', 
              lineHeight: 1.8,
              marginBottom: '1.5rem'
            }}>
              {t('about.desc')}
            </p>
            <p style={{ 
              fontSize: isMobile ? '1.05rem' : '1.15rem', 
              color: 'var(--text-mid, #4A5A6A)', 
              lineHeight: 1.8 
            }}>
              We merge advanced biotechnology, sustainable sourcing, and constant innovation to craft products that do more than support healthier aquatic life; they actively reduce the environmental footprint of modern farming.
            </p>
          </div>
          
          <div style={{ order: isMobile ? 1 : 2, position: 'relative' }}>
            <div className="about-image-wrapper">
              <img
                src="/Shrimp (18).webp"
                alt="Confier Genesis - Science and Nature"
                className="about-image"
                style={{ height: isMobile ? '350px' : '550px' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />            </div>
            {/* Elegant Floating Badge */}
            <div style={{ 
              position: 'absolute', 
              bottom: isMobile ? '-20px' : '-30px', 
              left: isMobile ? '20px' : '-30px', 
              background: 'var(--earth, #005B96)', 
              color: 'white', 
              padding: isMobile ? '1.2rem 1.5rem' : '1.8rem 2.2rem', 
              borderRadius: '20px', 
              boxShadow: '0 20px 40px rgba(0, 91, 150, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              zIndex: 20
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.8rem', fontWeight: 800, fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>4+</div>
              <div style={{ fontSize: isMobile ? '0.75rem' : '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: 1.3, fontWeight: 600, color: 'var(--teal-light, #A8D5BA)' }}>Years of<br/>Excellence</div>
            </div>
          </div>
        </div>

        {/* Section 2: The Confier Advantage (3 Pillars) */}
        <div style={{ 
          background: 'white',
          borderRadius: '32px',
          padding: isMobile ? '3rem 1.5rem' : '5rem',
          boxShadow: '0 14px 36px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.06)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '4rem' }}>
             <h3 style={{ 
               fontFamily: "'Playfair Display', serif", 
               fontSize: isMobile ? '2.2rem' : '2.8rem', 
               color: 'var(--text-dark, #2C3E50)',
               marginBottom: '1rem'
             }}>
               Why Confier?
             </h3>
             <p style={{ 
               fontSize: '1rem', 
               color: 'var(--teal, #2E8B57)', 
               fontWeight: 700,
               textTransform: 'uppercase',
               letterSpacing: '2px'
             }}>
               Where Science Meets Sustainability
             </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
            gap: isMobile ? '1.5rem' : '2.5rem' 
          }}>
            {pillars.map((pillar, idx) => (
              <div key={idx} className="advantage-card">
                <div className="advantage-icon">
                  {pillar.icon}
                </div>
                <h4 style={{ 
                  fontFamily: "'Montserrat', sans-serif", 
                  fontSize: '1.25rem', 
                  fontWeight: 700,
                  marginBottom: '1rem', 
                  color: 'var(--text-dark, #2C3E50)',
                  lineHeight: 1.3
                }}>
                  {pillar.title}
                </h4>
                <p style={{ 
                  fontSize: '1rem', 
                  color: 'var(--text-mid, #4A5A6A)', 
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}