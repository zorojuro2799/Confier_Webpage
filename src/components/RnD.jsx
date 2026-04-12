import React from 'react';
import { Microscope, Award, LineChart } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';

export default function RnD() {
  const { t } = useLanguage();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section id="rnd" className="section" style={{ background: 'var(--clr-bg-primary)', padding: isMobile ? '60px 15px' : undefined }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '4rem' }}>
          <span className="section-tag">{t('rnd.tag')}</span>
          <h2 className="text-title" style={{ fontSize: isMobile ? '2.2rem' : undefined }}>{t('rnd.title')}</h2>
          <p className="text-subtitle" style={{ margin: '0 auto', fontSize: isMobile ? '0.95rem' : undefined }}>
            {t('rnd.desc')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? '1.5rem' : '2rem' }}>
          {[
            { icon: <Microscope size={32}/>, title: 'Expertise & Knowledge', desc: 'Leveraging advanced research and years of aquaculture experience to create targeted solutions.' },
            { icon: <Award size={32}/>, title: 'Quality & Excellence', desc: 'From sourcing high-grade ingredients to precision manufacturing and rigorous testing.' },
            { icon: <LineChart size={32}/>, title: 'Tailored Solutions', desc: 'Understanding your water conditions to develop formulations that maximize farm productivity.' }
          ].map((feature, idx) => (
            <div key={idx} style={{ 
              background: '#fff', padding: '2rem', borderRadius: 'var(--radius-lg)', 
              textAlign: 'center', border: '1px solid var(--clr-border)'
            }}>
              <div style={{ 
                width: '64px', height: '64px', background: 'var(--clr-teal-light)', color: 'var(--clr-teal-dark)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: '1rem', color: 'var(--clr-text-main)' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
