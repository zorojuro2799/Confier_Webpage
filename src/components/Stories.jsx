import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';

const stories = [
  { id: 1, ytId: "264GQ5uIyR0", featured: true },
  { id: 2, ytId: "Ln9c1FAtJAg" },
  { id: 3, ytId: "Pz-GxYZHvsQ" },
  { id: 4, ytId: "16SHDbHbo8w" },
  { id: 5, ytId: "8vMUNEXoQPQ" },
  { id: 6, ytId: "mNlRRq8Uh2I" }
];

export default function Stories() {
  const { t } = useLanguage();

  return (
    <section id="stories" className="section" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef8fa 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" style={{ background: 'rgba(231,111,81,0.1)', color: 'var(--clr-orange)' }}>
            {t('nav.results')}
          </span>
          <h2 className="text-title" style={{ marginTop: '1rem', color: 'var(--clr-teal-dark)' }}>
            {t('nav.results')}
          </h2>
          <p style={{ color: '#0ea5e9', fontSize: '1.4rem', fontWeight: 600, marginTop: '1rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
            &ldquo;{t('stories.quote')}&rdquo;
          </p>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridAutoRows: 'minmax(180px, auto)',
            gap: '1rem'
          }}
          className="stories-collage"
        >
          <style>{`
            .stories-collage {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .collage-item-1 { grid-column: span 2; min-height: 250px !important; }
            
            @media (min-width: 900px) {
              .stories-collage {
                grid-template-columns: repeat(3, 1fr) !important;
                grid-auto-rows: 280px !important;
                grid-template-areas: 
                  "feature feature item1"
                  "feature feature item2"
                  "item3 item4 item5" !important;
              }
              .collage-item-1 { grid-area: feature; }
              .collage-item-2 { grid-area: item1; }
              .collage-item-3 { grid-area: item2; }
              .collage-item-4 { grid-area: item3; }
              .collage-item-5 { grid-area: item4; }
              .collage-item-6 { grid-area: item5; }
            }
          `}</style>

          {stories.map((story) => (
            <div 
              key={story.id} 
              className={`collage-item-${story.id}`}
              style={{ 
                position: 'relative', 
                background: '#000', 
                borderRadius: '20px', 
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 16px 34px rgba(0,0,0,0.12)',
                minHeight: '180px'
              }}
            >
              <iframe 
                width="100%" height="100%" 
                src={`https://www.youtube-nocookie.com/embed/${story.ytId}?rel=0`} 
                title={`YouTube Testimonial ${story.id}`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ position: 'absolute', inset: 0 }}
              ></iframe>
            </div>
          ))}
        </div>

        {/* Clean Discover More CTA */}
        <div style={{ marginTop: '3.4rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a 
            href="https://youtube.com/@confierintl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ 
              display: 'inline-flex', padding: '0.9rem 1.8rem', background: '#fff', 
              color: 'var(--clr-ocean)', border: '1px solid var(--clr-border)', borderRadius: '999px', 
              textDecoration: 'none', fontWeight: 'bold', alignItems: 'center', gap: '10px',
              transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Play size={20} className="icon" />
            Official Channel
          </a>

          <a 
            href="https://www.youtube.com/@confierintl/videos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ 
              display: 'inline-flex', padding: '0.9rem 1.8rem', background: '#cc0000', // YouTube red
              color: '#fff', borderRadius: '999px', textDecoration: 'none', fontWeight: 'bold',
              alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(204,0,0,0.3)',
              border: '1px solid #cc0000'
            }}
          >
            <ArrowUpRight size={20} color="#fff" />
            View more videos
          </a>
        </div>

      </div>
    </section>
  );
}
