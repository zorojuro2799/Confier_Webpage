import React, { useState, useEffect } from 'react';
import { Shield, Lock, LogIn, LayoutDashboard, Database, FileText, Users, LogOut, X, Newspaper, Bell, MessageCircle, Zap } from 'lucide-react';

export default function AdminPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Listen for the global custom event to open the admin portal
  useEffect(() => {
    const handleOpenAdmin = () => setIsOpen(true);
    window.addEventListener('open-admin', handleOpenAdmin);
    return () => window.removeEventListener('open-admin', handleOpenAdmin);
  }, []);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@confierintl.com' && password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. (Hint: admin@confierintl.com / admin123)');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const closePortal = () => setIsOpen(false);

  // Sample feed data for Latest Updates & Community Feed
  const feedItems = [
    {
      id: 1,
      type: 'update',
      title: 'New Probiotic Formula Released',
      description: 'Revolutionary aquaculture enhancement supplement now available.',
      timestamp: '2 hours ago',
      icon: Zap,
      color: 'var(--clr-orange)'
    },
    {
      id: 2,
      type: 'community',
      title: 'Farmer Success Story: 40% Yield Increase',
      description: 'Farmer from West Coast shares their experience using Confier products.',
      timestamp: '5 hours ago',
      icon: MessageCircle,
      color: 'var(--clr-teal-dark)'
    },
    {
      id: 3,
      type: 'update',
      title: 'System Maintenance Scheduled',
      description: 'Platform upgrade planned for April 20th, 2-4 AM UTC.',
      timestamp: '1 day ago',
      icon: Bell,
      color: 'var(--clr-earth)'
    },
    {
      id: 4,
      type: 'community',
      title: 'Community Q&A Session',
      description: 'Join our experts for a live discussion on sustainable aquaculture practices.',
      timestamp: '2 days ago',
      icon: MessageCircle,
      color: 'var(--clr-teal-dark)'
    }
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,15,25,0.85)',
      backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff', width: '100%', maxWidth: isLoggedIn ? '900px' : '400px',
        borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease-in-out', position: 'relative'
      }}>
        
        {/* Close Button */}
        <button onClick={closePortal} style={{
          position: 'absolute', top: '16px', right: '16px', background: 'var(--clr-bg-surface)', border: 'none',
          width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10
        }}>
          <X size={20} color="var(--clr-earth)" />
        </button>

        {!isLoggedIn ? (
          /* LOGIN SCREEN */
          <div style={{ padding: '3rem 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                width: '64px', height: '64px', background: 'var(--clr-teal-light)', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
                color: 'var(--clr-teal-dark)'
              }}>
                <Shield size={32} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--clr-earth)', marginBottom: '0.5rem' }}>
                Admin Access
              </h2>
              <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>
                Authorized Personnel Only
              </p>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--clr-earth)', marginBottom: '0.5rem' }}>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--clr-border)', outline: 'none' }} 
                  placeholder="admin@confierintl.com"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--clr-earth)', marginBottom: '0.5rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', paddingLeft: '2.5rem', borderRadius: '12px', border: '1px solid var(--clr-border)', outline: 'none' }} 
                    placeholder="Enter password..."
                    required
                  />
                  <Lock size={16} color="var(--clr-text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {error && <div style={{ color: 'red', fontSize: '0.8rem', textAlign: 'center', marginTop: '0.5rem' }}>{error}</div>}

              <button type="submit" style={{ 
                background: 'var(--clr-teal-dark)', color: '#fff', padding: '1rem', borderRadius: '12px',
                border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}>
                <LogIn size={20} /> Login to Control Panel
              </button>
            </form>
          </div>
        ) : (
          /* DASHBOARD SCREEN */
          <div style={{ display: 'flex', minHeight: '600px' }}>
            
            {/* Sidebar */}
            <div style={{ width: '260px', background: 'var(--clr-bg-primary)', borderRight: '1px solid var(--clr-border)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--clr-earth)', fontSize: '1.2rem', marginBottom: '0.2rem' }}>Confier HQ</h3>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--clr-teal)' }}>Superadmin</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <button className="admin-nav-btn active">
                  <LayoutDashboard size={18} /> Overview
                </button>
                <button className="admin-nav-btn">
                  <Database size={18} /> Manage Products
                </button>
                <button className="admin-nav-btn">
                  <Newspaper size={18} /> Manage Newsroom
                </button>
                <button className="admin-nav-btn">
                  <Users size={18} /> Farmer Interactions
                </button>
              </div>

              <button onClick={handleLogout} style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none',
                color: 'var(--clr-text-muted)', fontWeight: 600, cursor: 'pointer', padding: '0.75rem',
                marginTop: 'auto'
              }}>
                <LogOut size={18} /> Sign out
              </button>
            </div>

            {/* Main Area */}
            <div style={{ flex: 1, padding: '2.5rem', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '1px solid var(--clr-border)', paddingBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--clr-earth)', marginBottom: '0.5rem' }}>Dashboard</h2>
                  <p style={{ color: 'var(--clr-text-muted)' }}>Welcome back. Here is what is happening today.</p>
                </div>
                <button style={{ 
                  background: 'var(--clr-orange)', color: '#fff', border: 'none', padding: '0.75rem 1.5rem',
                  borderRadius: '10px', fontWeight: 600, cursor: 'pointer'
                }}>
                  + Quick Add
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--clr-bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--clr-border)' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--clr-text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>Active Products</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--clr-teal-dark)', fontFamily: 'var(--font-mono)' }}>15</div>
                </div>
                <div style={{ background: 'var(--clr-bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--clr-border)' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--clr-text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>Newsroom Posts</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--clr-teal-dark)', fontFamily: 'var(--font-mono)' }}>12</div>
                </div>
                <div style={{ background: 'var(--clr-bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--clr-border)' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--clr-text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>Shrumpi Queries (24h)</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--clr-orange)', fontFamily: 'var(--font-mono)' }}>1,402</div>
                </div>
              </div>

              <div style={{ background: 'var(--clr-bg-surface)', borderRadius: '16px', border: '1px solid var(--clr-border)', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-text-muted)', marginBottom: '2rem' }}>
                [ System Analytics Chart Placeholder ]
              </div>

              {/* Latest Updates & Community Feed Section */}
              <div style={{ background: 'var(--clr-bg-surface)', borderRadius: '16px', border: '1px solid var(--clr-border)', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--clr-border)' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--clr-earth)', margin: 0 }}>
                    Latest Updates & Community Feed
                  </h3>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                    Recent news, updates, and community highlights
                  </p>
                </div>

                <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  {feedItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div 
                        key={item.id}
                        style={{
                          padding: '1.5rem',
                          borderBottom: index < feedItems.length - 1 ? '1px solid var(--clr-border)' : 'none',
                          display: 'flex',
                          gap: '1rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 95, 115, 0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: item.color + '15',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <IconComponent size={20} color={item.color} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '1rem',
                            marginBottom: '0.5rem'
                          }}>
                            <h4 style={{
                              margin: 0,
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              color: 'var(--clr-earth)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {item.title}
                            </h4>
                            <span style={{
                              fontSize: '0.75rem',
                              color: 'var(--clr-text-muted)',
                              whiteSpace: 'nowrap',
                              flexShrink: 0
                            }}>
                              {item.timestamp}
                            </span>
                          </div>
                          <p style={{
                            margin: 0,
                            fontSize: '0.85rem',
                            color: 'var(--clr-text-muted)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid var(--clr-border)',
                  textAlign: 'center'
                }}>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--clr-teal-dark)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--clr-orange)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--clr-teal-dark)'}
                  >
                    View All Updates →
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .admin-nav-btn {
          display: flex; align-items: center; gap: 12px; padding: 12px 16px; width: 100%;
          text-align: left; background: none; border: none; border-radius: 10px; cursor: pointer;
          color: var(--clr-text-main); font-weight: 500; font-size: 0.95rem; transition: all 0.2s;
        }
        .admin-nav-btn:hover { background: var(--clr-bg-surface); }
        .admin-nav-btn.active { background: var(--clr-teal-light); color: var(--clr-earth); font-weight: 600; }
      `}} />
    </div>
  );
}
