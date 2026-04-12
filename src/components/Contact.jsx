import React from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../LanguageContext.jsx';

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="section" style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          
          <div>
            <span className="section-tag">{t('nav.contact')}</span>
            <h2 className="text-title" style={{ color: 'var(--clr-teal-dark)' }}>{t('contact.title')}</h2>
            <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Contact us about anything related to our formulations, bulk pricing, or technical support. We'll do our best to get back to you as soon as possible.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', background: 'var(--clr-teal-light)', borderRadius: '50%', color: 'var(--clr-teal-dark)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--clr-text-main)', marginBottom: '0.25rem' }}>Head Office</h4>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Plot-480, RK Township, Lankelapalem,<br/>
                    Visakhapatnam, Andhra Pradesh 531019
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', background: 'var(--clr-bg-primary)', borderRadius: '50%', color: 'var(--clr-orange)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--clr-text-main)', marginBottom: '0.25rem' }}>Call Us</h4>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>+91 89686 97989</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', background: 'var(--clr-bg-primary)', borderRadius: '50%', color: 'var(--clr-orange)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, color: 'var(--clr-text-main)', marginBottom: '0.25rem' }}>Email Support</h4>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>Customercare@confierintl.com</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--clr-bg-primary)', padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--clr-text-main)' }}>
              Send a Message
            </h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! We will contact you soon."); }}>
              <input type="text" placeholder="Your Full Name" required style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)', outline: 'none', background: '#fff' }} />
              <input type="email" placeholder="Your Email Address" required style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)', outline: 'none', background: '#fff' }} />
              <textarea placeholder="How can we help?" rows="4" required style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)', outline: 'none', background: '#fff', resize: 'vertical' }}></textarea>
              <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>
                <Send size={18} /> Submit Request
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
