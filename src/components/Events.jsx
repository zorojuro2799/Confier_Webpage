import React, { useState } from 'react';
import { Heart, MessageCircle, MapPin, User, Trash2, ImagePlus, PlusCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';

export default function Events() {
  const { t } = useLanguage();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Initial Instagram-style Posts
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: "Khuong Duy Nguyen", 
      role: "Business Dev Manager - APAC/ISC", 
      location: "Confier HQ",
      timeAgo: "2 days ago",
      imageUrl: "https://images.unsplash.com/photo-1595859703086-130ab7ee6de7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Incredible sessions at Confier HQ! Sharing valuable insights and training our team on the absolute latest technologies in sustainable shrimp culture. The future of aquaculture is bright.",
      likes: 124,
      isLiked: false,
      comments: [
        { id: 101, author: "FarmPro22", text: "Amazing training session! Learned so much." },
        { id: 102, author: "AquaSpecialist", text: "Can't wait to apply these techniques in the field." }
      ]
    },
    { 
      id: 2, 
      author: "Martha Mamora", 
      role: "Application Manager", 
      location: "Bhimavaram, AP",
      timeAgo: "5 days ago",
      imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Ground reports from Bhimavaram today. Training the local Confier staff on advanced disease diagnostics and frontline remedies. Ground-level support is how we ensure farmer success! 🦐🔬",
      likes: 89,
      isLiked: true,
      comments: [
        { id: 201, author: "LocalFarmer_AP", text: "Thank you for the continuous support Martha!" }
      ]
    }
  ]);

  // Admin Controls State
  const [isAdmin, setIsAdmin] = useState(false); // Toggle to simulate an admin logged in
  const [showAddPost, setShowAddPost] = useState(false);
  const [newPost, setNewPost] = useState({ imageUrl: '', imageFile: null, caption: '', location: '' });
  
  // Comment Input State (keyed by post ID)
  const [commentInputs, setCommentInputs] = useState({});

  // ─── Actions ─────────────────────────────────────

  const handleLike = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || text.trim() === '') return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { id: Date.now(), author: isAdmin ? "Confier Admin" : "GuestUser", text: text.trim() }]
        };
      }
      return p;
    }));
    
    // Clear input
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: p.comments.filter(c => c.id !== commentId) };
      }
      return p;
    }));
  };

  const handleDeletePost = (postId) => {
    if (window.confirm(t('events.confirmDelete'))) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.imageUrl || !newPost.caption) {
      alert(t('events.alertNeedImage'));
      return;
    }

    const createdPost = {
      id: Date.now(),
      author: "Confier Admin",
      role: "Official Updates",
      location: newPost.location || "Confier HQ",
      timeAgo: "Just now",
      imageUrl: newPost.imageUrl, // This is the data URL from FileReader
      caption: newPost.caption,
      likes: 0,
      isLiked: false,
      comments: []
    };

    setPosts([createdPost, ...posts]);
    setNewPost({ imageUrl: '', imageFile: null, caption: '', location: '' });
    setShowAddPost(false);
  };

  return (
    <section id="events" style={{ background: 'linear-gradient(180deg, #f0f8fa 0%, #f9fcfd 100%)', padding: isMobile ? '60px 10px' : '100px 20px', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header & Admin Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
          <span style={{ 
            color: 'var(--teal, #2E8B57)', 
            fontWeight: 700, 
            letterSpacing: '1.5px', 
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            background: 'rgba(46, 139, 87, 0.1)',
            padding: '8px 16px',
            borderRadius: '20px',
            marginBottom: '1rem'
          }}>
            {t('events.tag')}
          </span>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: isMobile ? '2.2rem' : '2.8rem', 
            color: 'var(--earth, #005B96)', 
            lineHeight: 1.1, 
            marginBottom: '1rem' 
          }}>
            {t('events.latestHeading')}
          </h2>
          
          {/* Admin Simulator Toggle */}
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            style={{
              marginTop: '1rem',
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', borderRadius: '999px',
              background: isAdmin ? '#FEF2F2' : '#FFF',
              border: isAdmin ? '1px solid #FCA5A5' : '1px solid #E5E7EB',
              color: isAdmin ? '#DC2626' : '#6B7280',
              fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <ShieldAlert size={16} />
            {isAdmin ? t('events.adminOn') : t('events.adminOff')}
          </button>
        </div>

        {/* Admin Create Post Form */}
        {isAdmin && (
          <div style={{ background: 'rgba(255,255,255,0.93)', borderRadius: '20px', border: '1px solid #E5E7EB', overflow: 'hidden', maxWidth: '650px', margin: '0 auto 2rem', boxShadow: 'var(--shadow-md)' }}>
            <div 
              onClick={() => setShowAddPost(!showAddPost)}
              style={{ padding: '1rem 1.5rem', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827' }}><PlusCircle size={18}/> {t('events.createPost')}</strong>
              <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>{showAddPost ? t('events.hide') : t('events.expand')}</span>
            </div>
            
            {showAddPost && (
              <form onSubmit={handleCreatePost} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>{t('events.uploadImage')}</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setNewPost({...newPost, imageUrl: event.target.result, imageFile: file});
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                    required
                  />
                  {newPost.imageFile && (
                    <p style={{ fontSize: '0.8rem', color: '#059669', marginTop: '6px' }}>✓ {newPost.imageFile.name}</p>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>{t('events.location')}</label>
                  <input 
                    type="text" placeholder={t('events.locationPh')} 
                    value={newPost.location} onChange={e => setNewPost({...newPost, location: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#374151' }}>{t('events.caption')}</label>
                  <textarea 
                    rows="3" placeholder={t('events.captionPh')} required
                    value={newPost.caption} onChange={e => setNewPost({...newPost, caption: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '0.9rem', resize: 'vertical' }}
                  />
                </div>
                <button type="submit" style={{ background: 'var(--teal-dark, #005B96)', color: 'white', padding: '12px', borderRadius: '12px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                  {t('events.postCta')}
                </button>
              </form>
            )}
          </div>
        )}

        {/* The Feed */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
          gap: '2rem',
          alignItems: 'start'
        }}>
          {posts.map((post) => (
            <div key={post.id} style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
              overflow: 'hidden'
            }}>
              
              {/* Post Header */}
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(45deg, var(--teal-dark), var(--teal))', borderRadius: '50%', padding: '2px' }}>
                    <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-mid)' }}>
                      <User size={20} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {post.author}
                      <CheckCircle2 size={14} color="var(--teal, #2E8B57)" />
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {post.location && <><MapPin size={12}/> {post.location} • </>}
                      {post.timeAgo}
                    </div>
                  </div>
                </div>

                {isAdmin && (
                  <button 
                    onClick={() => handleDeletePost(post.id)}
                    style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '8px' }}
                    title={t('events.deletePost')}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              {/* Post Image */}
              <div style={{ width: '100%', backgroundColor: '#f3f4f6', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
                <img
                  src={post.imageUrl}
                  alt="Post content"
                  style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.src = '/Shrimp (18).webp'; }}
                />              </div>

              {/* Post Actions (Like / Comment) */}
              <div style={{ padding: '12px 16px', display: 'flex', gap: '16px' }}>
                <button onClick={() => handleLike(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: post.isLiked ? '#EF4444' : '#111827', transition: 'transform 0.1s' }}>
                  <Heart size={26} fill={post.isLiked ? '#EF4444' : 'none'} />
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#111827' }}>
                  <MessageCircle size={26} />
                </button>
              </div>

              {/* Likes Count */}
              <div style={{ padding: '0 16px', fontWeight: 700, fontSize: '0.95rem', color: '#111827', marginBottom: '8px' }}>
                {post.likes.toLocaleString()} {t('events.likes')}
              </div>

              {/* Caption */}
              <div style={{ padding: '0 16px', fontSize: '0.95rem', color: '#111827', lineHeight: 1.5, marginBottom: '12px' }}>
                <span style={{ fontWeight: 700, marginRight: '8px' }}>{post.author}</span>
                {post.caption}
              </div>

              {/* Comments Section */}
              <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                {post.comments.length > 0 ? (
                  post.comments.map(comment => (
                    <div key={comment.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '0.9rem', lineHeight: 1.4 }}>
                      <div>
                        <span style={{ fontWeight: 700, marginRight: '6px', color: '#111827' }}>{comment.author}</span>
                        <span style={{ color: '#374151' }}>{comment.text}</span>
                      </div>
                      {isAdmin && (
                        <button 
                          onClick={() => handleDeleteComment(post.id, comment.id)}
                          style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '0 4px' }}
                          title={t('events.deleteComment')}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>{t('events.noComments')}</div>
                )}
              </div>

              {/* Add Comment Input */}
              <div style={{ 
                padding: '12px 16px', 
                borderTop: '1px solid #E5E7EB', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px' 
              }}>
                <input 
                  type="text" 
                  placeholder={t('events.commentPh')} 
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                  style={{ 
                    flex: 1, border: 'none', outline: 'none', 
                    fontSize: '0.95rem', background: 'transparent' 
                  }}
                />
                <button 
                  onClick={() => handleAddComment(post.id)}
                  disabled={!commentInputs[post.id]?.trim()}
                  style={{ 
                    background: 'none', border: 'none', 
                    color: commentInputs[post.id]?.trim() ? 'var(--teal-dark, #005B96)' : '#9CA3AF', 
                    fontWeight: 600, cursor: commentInputs[post.id]?.trim() ? 'pointer' : 'default',
                    fontSize: '0.95rem'
                  }}
                >
                  {t('events.post')}
                </button>
              </div>

            </div>
          ))}
          
          {posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6B7280', background: '#fff', borderRadius: '16px', border: '1px dashed #E5E7EB' }}>
              <ImagePlus size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h3>{t('events.emptyTitle')}</h3>
              <p>{t('events.emptyHint')}</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}