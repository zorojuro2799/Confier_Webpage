import React from 'react';
import { User, Heart, ShoppingCart, LogIn } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext.jsx';

export default function AccountSection() {
  const { t } = useLanguage();
  const { user, displayName, userRole, loading } = useAuth();
  const { cartItems, wishlistItems } = useCart();

  return (
    <section id="account" style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #ecf7fa 0%, #f8fcfd 100%)' }}>
      <div className="container">
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ color: 'var(--clr-orange-warm)', fontWeight: 700, marginBottom: '0.5rem' }}>
              {t('account.title')}
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--clr-teal-dark)', marginBottom: '0.75rem' }}>
              {user ? `${t('account.welcome')}, ${displayName}` : t('account.title')}
            </h2>
            <p style={{ color: 'var(--clr-text-muted)', maxWidth: '620px', margin: '0 auto' }}>
              {user ? t('account.subtitle') : t('account.guest')}
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid var(--clr-border)',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-md)',
            padding: '2rem'
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', color: 'var(--clr-text-muted)' }}>Loading...</div>
            ) : user ? (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--clr-bg-surface)' }}>
                    <div style={{ color: 'var(--clr-text-muted)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('account.emailLabel')}</div>
                    <div style={{ color: 'var(--clr-text-main)', fontWeight: 700, wordBreak: 'break-word' }}>{user.email}</div>
                  </div>
                  <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--clr-bg-surface)' }}>
                    <div style={{ color: 'var(--clr-text-muted)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('account.roleLabel')}</div>
                    <div style={{ color: 'var(--clr-text-main)', fontWeight: 700 }}>
                      {userRole === 'admin' ? t('account.roleAdmin') : t('account.roleUser')}
                    </div>
                  </div>
                  <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--clr-bg-surface)' }}>
                    <div style={{ color: 'var(--clr-text-muted)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('account.wishlist')}</div>
                    <div style={{ color: 'var(--clr-text-main)', fontWeight: 700 }}>{wishlistItems.length}</div>
                  </div>
                  <div style={{ padding: '1rem', borderRadius: '16px', background: 'var(--clr-bg-surface)' }}>
                    <div style={{ color: 'var(--clr-text-muted)', fontSize: '0.85rem', marginBottom: '0.35rem' }}>{t('account.cart')}</div>
                    <div style={{ color: 'var(--clr-text-main)', fontWeight: 700 }}>{cartItems.length}</div>
                  </div>
                </div>

                <div>
                  <div style={{ color: 'var(--clr-teal-dark)', fontWeight: 800, marginBottom: '1rem' }}>
                    {t('account.quickActions')}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href="#products" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.9rem 1.2rem', background: 'var(--clr-teal-light)',
                      color: 'var(--clr-teal-dark)', borderRadius: '12px', textDecoration: 'none', fontWeight: 700
                    }}>
                      <Heart size={18} /> {t('account.viewProducts')}
                    </a>
                    <a href="#home" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.9rem 1.2rem', background: 'var(--clr-orange-warm)',
                      color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 700
                    }}>
                      <ShoppingCart size={18} /> {t('account.openCart')}
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px', margin: '0 auto 1rem', borderRadius: '50%',
                  background: 'var(--clr-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <User size={28} color="var(--clr-teal-dark)" />
                </div>
                <div style={{ color: 'var(--clr-text-main)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {t('account.loginPrompt')}
                </div>
                <div style={{ color: 'var(--clr-text-muted)' }}>
                  <LogIn size={16} style={{ verticalAlign: 'text-bottom', marginRight: '0.35rem' }} />
                  {t('auth.loginRegister')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
