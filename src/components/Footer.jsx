import React, { useState } from 'react';
import { Heart, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email address is required.');
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={footerStyles.footer}>
      <div className="container">
        <div style={footerStyles.grid}>
          {/* Brand Info */}
          <div style={footerStyles.brandCol}>
            <div style={footerStyles.logoContainer} onClick={() => handleNavClick('home')}>
              <img src="/logo.png" alt="Annai Therasa Home Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <p style={footerStyles.brandDesc}>
              Dedicated to creating sustainable positive change through impactful initiatives, advocacy, and dedicated care for the intellectually impaired and handicapped since 2009.
            </p>
            <div style={footerStyles.socials}>
              <a href="#" style={footerStyles.socialIcon} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" style={footerStyles.socialIcon} aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" style={footerStyles.socialIcon} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" style={footerStyles.socialIcon} aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div style={footerStyles.linksCol}>
            <h4 style={footerStyles.title}>Quick Links</h4>
            <ul style={footerStyles.list}>
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'our-work', label: 'Our Work' },
                { id: 'get-involved', label: 'Get Involved' },
                { id: 'services', label: 'Services' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'contact', label: 'Contact' },
                { id: 'admin', label: 'Admin Portal' }
              ].map((page) => (
                <li key={page.id} style={footerStyles.listItem}>
                  <button onClick={() => handleNavClick(page.id)} style={footerStyles.linkBtn}>
                    <ArrowRight size={12} style={footerStyles.bullet} />
                    <span>{page.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Projects/Initiatives */}
          <div style={footerStyles.linksCol}>
            <h4 style={footerStyles.title}>Initiatives</h4>
            <ul style={footerStyles.list}>
              {['Vidya Scholarship', 'Arogya Medical Camps', 'Women Skill Center', 'Green Village Initiative'].map((init, idx) => (
                <li key={idx} style={footerStyles.listItem}>
                  <button onClick={() => handleNavClick('services')} style={footerStyles.linkBtn}>
                    <ArrowRight size={12} style={footerStyles.bullet} />
                    {init}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div style={footerStyles.newsletterCol}>
            <h4 style={footerStyles.title}>Subscribe to Updates</h4>
            <p style={footerStyles.newsletterText}>Receive stories of hope and trust highlights directly in your inbox.</p>
            
            <form onSubmit={handleSubscribe} style={footerStyles.form}>
              <div style={footerStyles.inputWrapper}>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={footerStyles.input}
                  id="newsletter-email"
                />
                <button type="submit" style={footerStyles.submitBtn} id="newsletter-submit-btn">
                  <ArrowRight size={18} />
                </button>
              </div>
              {error && <p style={footerStyles.errorText}>{error}</p>}
              {subscribed && <p style={footerStyles.successText}>Successfully subscribed! Thank you.</p>}
            </form>

            <div style={footerStyles.contactShort}>
              <div style={footerStyles.contactItem}>
                <MapPin size={16} color="var(--secondary)" />
                <span>Ayyappan Nagar, First Street, Y. Ottakadai, Madurai, Tamil Nadu</span>
              </div>
              <div style={footerStyles.contactItem}>
                <Phone size={16} color="var(--secondary)" />
                <span>+91 96555 73202</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={footerStyles.bottom}>
          <p style={footerStyles.copyright}>
            &copy; {new Date().getFullYear()} Annai Therasa Home for the Intellectually Impaired and the Handicapped. All rights reserved.
          </p>
          <p style={footerStyles.regInfo}>
            Rights of Persons with Disabilities Act 2016 Government Recognized | Registration No.: 128/2009 | 12A.80G.CSR 2
          </p>
        </div>
      </div>
    </footer>
  );
}

const footerStyles = {
  footer: {
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    padding: '5rem 0 2rem 0',
    borderTop: '1px solid #1e293b',
    marginTop: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '3rem',
    marginBottom: '4rem',
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
  },
  logoIcon: {
    backgroundColor: 'var(--primary)',
    padding: '0.4rem',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.3rem',
    fontWeight: 800,
    color: '#ffffff',
  },
  logoHighlight: {
    color: 'var(--secondary-light)',
  },
  brandDesc: {
    fontSize: '0.9rem',
    lineHeight: 1.6,
    color: '#94a3b8',
  },
  socials: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      backgroundColor: 'var(--primary)',
      color: '#ffffff',
      transform: 'translateY(-3px)',
    },
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: 600,
    position: 'relative',
    paddingBottom: '0.5rem',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '30px',
      height: '2px',
      backgroundColor: 'var(--secondary)',
    },
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    textAlign: 'left',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      color: 'var(--secondary-light)',
      transform: 'translateX(5px)',
    },
  },
  bullet: {
    marginRight: '0.5rem',
    opacity: 0.5,
  },
  newsletterCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  newsletterText: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },
  form: {
    margin: '0.5rem 0',
  },
  inputWrapper: {
    display: 'flex',
    border: '1px solid #334155',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    backgroundColor: '#1e293b',
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'none',
    padding: '0.75rem 1rem',
    color: '#ffffff',
    fontSize: '0.9rem',
    outline: 'none',
  },
  submitBtn: {
    backgroundColor: 'var(--primary)',
    border: 'none',
    color: '#ffffff',
    padding: '0 1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color var(--transition-fast)',
    '&:hover': {
      backgroundColor: 'var(--primary-light)',
    },
  },
  errorText: {
    color: '#f87171',
    fontSize: '0.8rem',
    marginTop: '0.4rem',
  },
  successText: {
    color: '#34d399',
    fontSize: '0.85rem',
    marginTop: '0.4rem',
  },
  contactShort: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    marginTop: '0.5rem',
    fontSize: '0.85rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  bottom: {
    borderTop: '1px solid #1e293b',
    paddingTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    textAlign: 'center',
    fontSize: '0.85rem',
  },
  copyright: {
    color: '#64748b',
  },
  regInfo: {
    color: '#475569',
  },
};

// Add social icon & button hover style overrides in CSS style block dynamically
if (typeof window !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    footer button:hover {
      color: var(--secondary-light) !important;
      transform: translateX(4px);
    }
    footer a:hover {
      background-color: var(--primary) !important;
      color: white !important;
      transform: translateY(-3px);
    }
  `;
  document.head.appendChild(styleEl);
}
