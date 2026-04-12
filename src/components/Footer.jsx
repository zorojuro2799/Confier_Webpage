import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--clr-teal-dark)', color: '#fff', paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '340px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--clr-teal-light)' }}>
              Confier International
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Eco-friendly shrimp feed supplements and probiotics promoting faster growth and better survival rates for sustainable farming.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: '#fff' }}>Company</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li><a href="#about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>About us</a></li>
                <li><a href="#products" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Products</a></li>
                <li><a href="#rnd" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Innovation Lab</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: '#fff' }}>Contact</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <li><span style={{ color: 'rgba(255,255,255,0.7)' }}>Customercare@confierintl.com</span></li>
                <li><span style={{ color: 'rgba(255,255,255,0.7)' }}>+91 89686 97989</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '3rem', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
          <p>&copy; {new Date().getFullYear()} Confier International Pvt. Ltd.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
            <button 
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-admin')); }}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit', padding: 0 }}
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
