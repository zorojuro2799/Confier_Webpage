import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';

export default function LanguagePillBar() {
  const { lang: activeLang, setLang: setActiveLang } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const primaryLanguages = [
    { id: 'en', label: 'English' },
    { id: 'te', label: 'Telugu' },
    { id: 'hi', label: 'Hindi' }
  ];

  const secondaryLanguages = [
    { id: 'ta', label: 'Tamil' },
    { id: 'kn', label: 'Kannada' },
    { id: 'ml', label: 'Malayalam' },
    { id: 'vi', label: 'Vietnamese' },
    { id: 'id', label: 'Indonesian' },
    { id: 'th', label: 'Thai' },
    { id: 'zh', label: 'Chinese' },
    { id: 'bn', label: 'Bengali' },
    { id: 'es', label: 'Spanish' },
    { id: 'fr', label: 'French' },
    { id: 'ar', label: 'Arabic' },
    { id: 'pt', label: 'Portuguese' },
    { id: 'ru', label: 'Russian' },
    { id: 'ja', label: 'Japanese' },
    { id: 'ko', label: 'Korean' },
    { id: 'de', label: 'German' },
    { id: 'it', label: 'Italian' },
    { id: 'tr', label: 'Turkish' }
  ];

  const visibleLanguages = showAll ? [...primaryLanguages, ...secondaryLanguages] : primaryLanguages;

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      boxShadow: 'var(--shadow-lg)',
      borderRadius: 'var(--radius-full)',
      display: 'flex',
      alignItems: 'center',
      padding: '6px 8px',
      border: '1px solid var(--clr-border)',
      maxWidth: '90vw',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      transition: 'all 0.3s ease'
    }}>
      <button 
        onClick={() => setShowAll(!showAll)}
        style={{ 
          padding: '8px', 
          color: showAll ? '#fff' : 'var(--clr-teal)', 
          background: showAll ? 'var(--clr-teal)' : 'transparent',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          marginRight: '4px',
          flexShrink: 0
        }}
        title="Toggle all languages"
      >
        <Globe size={18} />
      </button>
      
      {visibleLanguages.map(lang => (
        <button
          key={lang.id}
          onClick={() => setActiveLang(lang.id)}
          style={{
            background: activeLang === lang.id ? 'var(--clr-teal)' : 'transparent',
            color: activeLang === lang.id ? '#fff' : 'var(--clr-text-muted)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '8px 16px',
            fontSize: '0.9rem',
            fontWeight: activeLang === lang.id ? 700 : 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: activeLang === lang.id ? '0 2px 8px rgba(10,147,150,0.3)' : 'none',
            flexShrink: 0
          }}
          onMouseOver={(e) => {
            if(activeLang !== lang.id) e.target.style.background = 'var(--clr-teal-light)';
          }}
          onMouseOut={(e) => {
            if(activeLang !== lang.id) e.target.style.background = 'transparent';
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
