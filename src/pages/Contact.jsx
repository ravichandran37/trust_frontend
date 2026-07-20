import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle, ShieldAlert } from 'lucide-react';
import { addQuery } from '../utils/api';

export default function Contact() {
  // Form State
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How do I know my donation is used transparently?',
      a: 'Annai Therasa Home is fully audited by registered chartered accountants. We publish audited financial balance sheets annually. 92% of all donations go directly into funding active project implementation (textbooks, medical vials, solar posts), while only 8% supports administration.'
    },
    {
      q: 'How can I obtain my tax-deduction receipt?',
      a: 'Once your donation is completed (via our online portal or bank transfer), a digital receipt with our Section 80G registration number is emailed immediately. You can file this under tax returns for a 50% deduction.'
    },
    {
      q: 'Can I volunteer for school programs or health camps?',
      a: 'Absolutely! We welcome students, corporate professionals, and medical experts. Please fill out the inquiry form on this page with the subject "Volunteering" and describe your skills. Our operations team will match you with a nearby camp.'
    },
    {
      q: 'Do you accept corporate sponsorship / CSR grants?',
      a: 'Yes, we are registered with the Ministry of Corporate Affairs for CSR projects (Registration No. CSR00018302). We execute tailored CSR drives in rural schooling and environment grids, providing structured progress trackers.'
    }
  ];

  const handleValidate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message body cannot be empty';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsSubmitting(true);
      try {
        await addQuery({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          category: 'General'
        });
        setSuccess(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } catch (err) {
        console.error("Error submitting query:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="page-wrapper" style={contactStyles.wrapper}>
      <Helmet>
        <title>Contact Us - Annai Therasa Home</title>
        <meta name="description" content="Get in touch with Annai Therasa Home. Contact our office team or drop a message to learn more about our projects, tax benefits, or volunteering opportunities." />
      </Helmet>
      {/* Page Hero */}
      <section style={contactStyles.hero} className="mesh-bg">
        <div style={contactStyles.heroOverlay} />
        <div className="container" style={contactStyles.heroContent}>
          <span style={contactStyles.heroTag}>GET IN TOUCH</span>
          <h1 style={contactStyles.heroTitle}>We'd Love to Hear From You</h1>
          <p style={contactStyles.heroDesc}>
            Have questions about our projects, tax benefits, or volunteering? Contact our office team or drop a message below.
          </p>
        </div>
      </section>

      {/* Info & Form Section */}
      <section className="section">
        <div className="container">
          <div style={contactStyles.mainGrid}>
            
            {/* Info Cards Column */}
            <div style={contactStyles.infoCol}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Office Contacts</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Feel free to call our central office or drop by during public hours (Monday to Friday, 9:00 AM - 5:00 PM).
              </p>

              <div style={contactStyles.contactCards}>
                <div className="card-glass" style={contactStyles.infoCard}>
                  <MapPin size={24} color="var(--primary)" />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Annai Therasa Home for the Intellectually Impaired and the Handicapped</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: 'block' }}>
                      Ayyappan Nagar, First Street, Y. Ottakadai<br />Madurai, Tamil Nadu
                    </span>
                  </div>
                </div>

                <div className="card-glass" style={contactStyles.infoCard}>
                  <Phone size={24} color="var(--primary)" />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Phone & Google Pay</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <a href="tel:+919655573202">+91 96555 73202</a>
                    </span>
                  </div>
                </div>

                <div className="card-glass" style={contactStyles.infoCard}>
                  <Mail size={24} color="var(--primary)" />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Legal Advisor</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: 'block' }}>
                      K. Samidurai<br />Advocate, Madurai High Court
                    </span>
                  </div>
                </div>
              </div>

              {/* Accreditations Box */}
              <div style={contactStyles.certificationsBox}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>
                  Accreditations & Registry
                </h4>
                <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.6rem', lineHeight: 1.4 }}>
                  <li>• Government Registered (Registration No. 128/2009)</li>
                  <li>• Operates under the Rights of Persons with Disabilities Act, 2016</li>
                  <li>• Eligible for 12A, 80G, and CSR support, enabling tax-beneficial donations and corporate social responsibility partnerships.</li>
                </ul>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <div className="card-glass" style={contactStyles.formCard}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Send Us a Message</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Fill out this contact form and our coordinator will respond to you within 24 business hours.
              </p>

              <form onSubmit={handleSubmit} style={contactStyles.form}>
                <div style={contactStyles.formGroup}>
                  <label style={contactStyles.label}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={contactStyles.input(errors.name)}
                  />
                  {errors.name && <span style={contactStyles.errSpan}>{errors.name}</span>}
                </div>

                <div style={contactStyles.formGroup}>
                  <label style={contactStyles.label}>Email Address *</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={contactStyles.input(errors.email)}
                  />
                  {errors.email && <span style={contactStyles.errSpan}>{errors.email}</span>}
                </div>

                <div style={contactStyles.formGroup}>
                  <label style={contactStyles.label}>Subject *</label>
                  <input
                    type="text"
                    placeholder="e.g. CSR Inquiries, Donation Help"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    style={contactStyles.input(errors.subject)}
                  />
                  {errors.subject && <span style={contactStyles.errSpan}>{errors.subject}</span>}
                </div>

                <div style={contactStyles.formGroup}>
                  <label style={contactStyles.label}>Message *</label>
                  <textarea
                    rows="4"
                    placeholder="Describe your inquiry..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={contactStyles.textarea(errors.message)}
                  />
                  {errors.message && <span style={contactStyles.errSpan}>{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Form</span>
                      <Send size={16} />
                    </>
                  )}
                </button>

                {success && (
                  <div style={contactStyles.successBox}>
                    <CheckCircle size={18} />
                    <span>Inquiry submitted! We will reach out to you shortly.</span>
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section" style={contactStyles.faqSection}>
        <div className="container">
          <div style={contactStyles.sectionHeader}>
            <span style={contactStyles.sectionTag}>COMMON INQUIRIES</span>
            <h2 style={contactStyles.sectionTitle}>Frequently Asked Questions</h2>
          </div>

          <div style={contactStyles.faqList}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="card-glass" 
                style={contactStyles.faqItem(openFaq === idx)}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div style={contactStyles.faqHeader}>
                  <div style={contactStyles.faqQuestionBox}>
                    <HelpCircle size={18} color="var(--primary)" />
                    <strong style={{ fontSize: '0.98rem' }}>{faq.q}</strong>
                  </div>
                  <ChevronDown 
                    size={18} 
                    style={contactStyles.faqArrow(openFaq === idx)} 
                  />
                </div>
                
                <div style={contactStyles.faqBody(openFaq === idx)}>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '0.75rem' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ height: '400px', width: '100%', borderTop: '1px solid var(--border-color)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg-base) 100%)', zIndex: 1 }} />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7877239611295!2d80.2520638!3d13.0490135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526639a38f38ff%3A0xeef2a70bfbb39c94!2sCathedral%20Rd%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.5) opacity(0.8)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Annai Therasa Home Head Office Location Map"
        />
      </section>
    </div>
  );
}

const contactStyles = {
  wrapper: {
    width: '100%',
  },
  hero: {
    position: 'relative',
    padding: '7rem 0',
    backgroundColor: '#022c22',
    backgroundImage: "url('/images/hero.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    color: '#ffffff',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(2, 44, 34, 0.9)',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
  },
  heroTag: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--secondary-light)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
    display: 'inline-block',
  },
  heroTitle: {
    color: '#ffffff',
    marginBottom: '1rem',
  },
  heroDesc: {
    color: '#e2e8f0',
    fontSize: '1.1rem',
    lineHeight: 1.6,
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    gap: '3rem',
    alignItems: 'start',
    textAlign: 'left',

  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  contactCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    marginBottom: '2rem',
  },
  infoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    padding: '1.5rem',
    textAlign: 'left',
  },
  certificationsBox: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    padding: '1.5rem',
    borderRadius: 'var(--radius-lg)',
  },
  formCard: {
    padding: '2.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '0.35rem',
  },
  input: (hasError) => ({
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid',
    borderColor: hasError ? '#ef4444' : 'var(--border-color)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    fontSize: '0.92rem',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
  }),
  textarea: (hasError) => ({
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid',
    borderColor: hasError ? '#ef4444' : 'var(--border-color)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    outline: 'none',
    resize: 'none',
    transition: 'border-color var(--transition-fast)',
  }),
  errSpan: {
    fontSize: '0.75rem',
    color: '#ef4444',
    marginTop: '0.25rem',
  },
  successBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(6, 78, 59, 0.08)',
    border: '1px solid rgba(6, 78, 59, 0.2)',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    color: 'var(--primary-dark)',
    fontSize: '0.88rem',
    fontWeight: 600,
    marginTop: '0.5rem',
  },
  faqSection: {
    backgroundColor: 'var(--bg-surface)',
  },
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto 3rem auto',
  },
  sectionTag: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--primary)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '0.5rem',
  },
  sectionTitle: {
    marginBottom: '1rem',
  },
  faqList: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  faqItem: (isOpen) => ({
    padding: '1.25rem 1.5rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all var(--transition-fast)',
    borderColor: isOpen ? 'rgba(6, 78, 59, 0.3)' : 'var(--border-glass)',
  }),
  faqHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  faqArrow: (isOpen) => ({
    color: 'var(--text-secondary)',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform var(--transition-normal) ease',
  }),
  faqBody: (isOpen) => ({
    height: isOpen ? 'auto' : 0,
    opacity: isOpen ? 1 : 0,
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  }),
};
