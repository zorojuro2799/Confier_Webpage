import React from 'react';
import { Calendar, MapPin, User, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';

export default function Events() {
  const { t } = useLanguage();
  
  const events = [
    { 
      id: 1, 
      person: "Khuong Duy Nguyen", 
      title: "Technology Training & Field Visit", 
      role: "Business Dev Manager - APAC/ISC", 
      location: "Confier HQ & Partner Farms",
      date: "Recent Visit",
      category: "Field Operations",
      imageUrl: "https://images.unsplash.com/photo-1595859703086-130ab7ee6de7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Mr. Duy visited the CIPL team to share valuable insights and provide training on the latest technologies in shrimp culture. Accompanied the CIPL team to various shrimp farms, offering practical guidance.",
    },
    { 
      id: 2, 
      person: "Martha Mamora", 
      title: "Ground Report & Remedies Training", 
      role: "Application Manager - Aquaculture", 
      location: "Kakinada & Bhimavaram, AP",
      date: "Ongoing Initiative",
      category: "Laboratory Training",
      imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Visits frequently to Kakinada and Bhimavaram areas. As part of her visit she also trains Confier staff on various diseases and remedies to ensure our farmers receive the best possible frontline support.",
    }
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section id="events" className="section" style={{ background: '#fafafa', padding: isMobile ? '60px 15px' : '100px 20px' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: isMobile ? '2rem' : '4rem' }}>
          <span style={{ 
            background: 'rgba(0,119,182,0.1)', color: 'var(--clr-ocean)', padding: '6px 16px', 
            borderRadius: '30px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' 
          }}>
            {t('events.tag')}
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.2rem' : 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--clr-earth)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Latest Events
          </h2>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: isMobile ? '0.95rem' : '1.1rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Stay updated with Confier's internal training programs and laboratory innovations.
          </p>
        </div>

        {/* Editorial Grid Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(380px, 1fr))', 
          gap: isMobile ? '1.5rem' : '3rem' 
        }}>
          
          {events.map((ev) => (
            <div key={ev.id} style={{ 
              background: '#fff', borderRadius: '24px', overflow: 'hidden', 
              boxShadow: '0 20px 60px rgba(0,0,0,0.06)', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex', flexDirection: 'column', cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.06)';
            }}
            >
              
              {/* Massive Feature Image */}
              <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: 'var(--clr-earth)' }}>
                <img 
                  src={ev.imageUrl} 
                  alt={ev.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', opacity: 0.9 }} 
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div style={{ 
                  position: 'absolute', inset: 0, 
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)' 
                }} />

                {/* Top Right Date Tag */}
                <div style={{ 
                  position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.2)', 
                  backdropFilter: 'blur(10px)', color: '#fff', padding: '6px 14px', borderRadius: '20px', 
                  fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  <Calendar size={14} /> {ev.date}
                </div>

                {/* Bottom Left Avatar & Person Overlay */}
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '48px', height: '48px', background: '#fff', borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-teal-dark)', flexShrink: 0 
                  }}>
                    <User size={24} />
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                      {ev.person}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 500 }}>
                      {ev.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean White Card Text Area */}
              <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                <div style={{ color: 'var(--clr-orange)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  {ev.category}
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--clr-earth)', marginBottom: '1.25rem', lineHeight: 1.3 }}>
                  {ev.title}
                </h3>
                
                <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', flex: 1 }}>
                  {ev.desc}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--clr-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                    <MapPin size={18} color="var(--clr-teal)" />
                    {ev.location}
                  </div>
                  <div style={{ color: 'var(--clr-teal-dark)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '0.9rem' }}>
                    Read Full <ChevronRight size={16} />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
