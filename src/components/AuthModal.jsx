import React, { useEffect, useState } from 'react';
import { X, Mail, Lock, User, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext.jsx';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  
  const { logIn, signUp } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    // Always open in a predictable state so the dialog feels reliable.
    setFeedback({ type: '', text: '' });
    setLoading(false);
    setIsLogin(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', text: '' });
    setLoading(true);

    try {
      if (isLogin) {
        await logIn(email, password);
        onClose();
        setEmail('');
        setPassword('');
        setFullName('');
      } else {
        if (!fullName.trim()) {
          setFeedback({ type: 'error', text: t('auth.requiredName') });
          setLoading(false);
          return;
        }
        await signUp(email, password, fullName);
        setFeedback({ type: 'success', text: t('auth.checkEmail') });
        setTimeout(() => {
          onClose();
          setEmail('');
          setPassword('');
          setFullName('');
          setIsLogin(true);
        }, 2000);
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: 'max(1rem, env(safe-area-inset-top)) 1rem 1rem'
    }} onClick={onClose}>
      
      <div style={{
        background: 'rgba(255,255,255,0.95)', width: 'min(100%, 430px)', borderRadius: '24px',
        padding: 'clamp(1.25rem, 4vw, 2rem)', boxShadow: 'var(--shadow-xl)',
        position: 'relative', maxHeight: 'min(92dvh, 760px)', overflowY: 'auto',
        border: '1px solid rgba(255,255,255,0.65)', marginTop: 'max(4vh, 0.5rem)'
      }} onClick={e => e.stopPropagation()}>
        
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--clr-text-muted)'
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{
          color: 'var(--clr-teal-dark)', fontSize: '1.8rem', fontWeight: 700,
          marginBottom: '0.5rem'
        }}>
          {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
        </h2>
        
        <p style={{
          color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: '2rem'
        }}>
          {isLogin ? t('auth.signInToAccount') : t('auth.joinConfier')}
        </p>

        {feedback.text && (
          <div style={{
            background: feedback.type === 'success' ? '#d4edda' : '#f8d7da',
            border: feedback.type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
            color: feedback.type === 'success' ? '#155724' : '#721c24',
            padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem',
            display: 'flex', gap: '0.5rem', alignItems: 'flex-start'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.9rem' }}>{feedback.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {!isLogin && (
            <div>
              <label style={{
                display: 'block', fontSize: '0.9rem', fontWeight: 600,
                color: 'var(--clr-text-main)', marginBottom: '0.5rem'
              }}>
                {t('auth.fullName')}
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User size={18} style={{
                  position: 'absolute', left: '12px', color: 'var(--clr-text-muted)'
                }} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  style={{
                    width: '100%', padding: '12px', paddingLeft: '40px',
                    border: '1px solid var(--clr-border)', borderRadius: '8px',
                    fontSize: '0.95rem', transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--clr-teal)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--clr-border)'}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{
              display: 'block', fontSize: '0.9rem', fontWeight: 600,
              color: 'var(--clr-text-main)', marginBottom: '0.5rem'
            }}>
              {t('auth.email')}
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={18} style={{
                position: 'absolute', left: '12px', color: 'var(--clr-text-muted)'
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%', padding: '12px', paddingLeft: '40px',
                  border: '1px solid var(--clr-border)', borderRadius: '8px',
                  fontSize: '0.95rem', transition: 'all 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--clr-teal)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--clr-border)'}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block', fontSize: '0.9rem', fontWeight: 600,
              color: 'var(--clr-text-main)', marginBottom: '0.5rem'
            }}>
              {t('auth.password')}
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={18} style={{
                position: 'absolute', left: '12px', color: 'var(--clr-text-muted)'
              }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={{
                  width: '100%', padding: '12px', paddingLeft: '40px',
                  border: '1px solid var(--clr-border)', borderRadius: '8px',
                  fontSize: '0.95rem', transition: 'all 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--clr-teal)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--clr-border)'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? 'var(--clr-text-muted)' : 'var(--clr-orange-warm)',
              color: '#fff', padding: '12px 1rem', borderRadius: '8px',
              border: 'none', fontWeight: 700, fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem', transition: 'all 0.2s'
            }}
          >
            {loading && <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />}
            {isLogin ? t('auth.signIn') : t('auth.create')}
          </button>
        </form>

        <div style={{
          textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem',
          color: 'var(--clr-text-muted)'
        }}>
          {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFeedback({ type: '', text: '' });
              setEmail('');
              setPassword('');
              setFullName('');
            }}
            style={{
              background: 'none', border: 'none', color: 'var(--clr-orange-warm)',
              cursor: 'pointer', fontWeight: 700, marginLeft: '0.5rem'
            }}
          >
            {isLogin ? t('auth.signUp') : t('auth.signIn')}
          </button>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
