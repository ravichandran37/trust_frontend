import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Activity, Award, ArrowRight, Shield, Globe, Users, Target, Handshake, Gift } from 'lucide-react';

export default function Home({ onDonateClick, setCurrentPage }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: '/images/hero.png',
      tag: 'Empowering Next Generations',
      title: 'Every Child Deserves A Bright Future',
      desc: 'Through our Vidya Scholarship program, we break the cycle of poverty by providing quality education and resources to underprivileged children.',
      ctaPrimary: 'Donate Now',
      ctaSecondary: 'Read Our Story',
    },
    {
      image: '/images/medical.png',
      tag: 'Healthcare Outreach',
      title: 'Making Wellness Accessible to All',
      desc: 'Our mobile medical clinics and free treatment camps provide critical diagnostic and preventative care to isolated rural communities.',
      ctaPrimary: 'Support Healthcare',
      ctaSecondary: 'View Initiatives',
    },
    {
      image: '/images/women.png',
      tag: 'Vocational Empowerment',
      title: 'Uplifting Women, Transforming Families',
      desc: 'Providing sustainable livelihood training in crafts, sewing, and technology, helping women gain financial independence.',
      ctaPrimary: 'Empower a Life',
      ctaSecondary: 'Our Services',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: '15,000+', label: 'Lives Uplifted', icon: <Users size={24} /> },
    { number: '50+', label: 'Schools Supported', icon: <BookOpen size={24} /> },
    { number: '120+', label: 'Medical Camps Run', icon: <Activity size={24} /> },
    { number: '25+', label: 'Green Villages', icon: <Globe size={24} /> },
  ];

  const pillars = [
    {
      icon: <BookOpen size={36} color="var(--primary)" />,
      title: 'Inclusive Education',
      desc: 'Funding fees, distributing supplies, and installing computer labs in neglected rural schools.',
      action: 'Education Initiatives'
    },
    {
      icon: <Activity size={36} color="var(--primary)" />,
      title: 'Preventative Healthcare',
      desc: 'Conducting free vision diagnostics, general wellness camps, and distributing essential medicines.',
      action: 'Healthcare Programs'
    },
    {
      icon: <Target size={36} color="var(--primary)" />,
      title: 'Livelihood Training',
      desc: 'Empowering local communities and women through vocational schools and micro-finance advice.',
      action: 'Empowerment Services'
    }
  ];

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      <Helmet>
        <title>Annai Therasa Home - Empowering Next Generations</title>
        <meta name="description" content="Annai Therasa Home is dedicated to providing quality education, healthcare, and livelihood training to underprivileged communities in rural areas." />
      </Helmet>

      {/* Hero Section */}
      <section style={homeStyles.hero}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            style={{
              ...homeStyles.slide,
              opacity: activeSlide === idx ? 1 : 0,
              visibility: activeSlide === idx ? 'visible' : 'hidden',
            }}
          >
            {/* Background image overlay */}
            <div style={homeStyles.slideImageOverlay}>
              <img
                src={slide.image}
                alt={slide.title}
                style={homeStyles.slideImage}
              />
              <div style={homeStyles.slideOverlayGrad} />
            </div>

            {/* Slide Content */}
            <div className="container" style={homeStyles.slideContent}>
              <div style={homeStyles.textContent} className="fade-in-el">
                <span style={homeStyles.slideTag}>{slide.tag}</span>
                <h1 style={homeStyles.slideTitle}>{slide.title}</h1>
                <p style={homeStyles.slideDesc}>{slide.desc}</p>
                <div style={homeStyles.ctaGroup}>
                  <button
                    className="btn btn-secondary"
                    onClick={onDonateClick}
                    style={{ padding: '1rem 2.2rem' }}
                  >
                    <Heart size={18} fill="currentColor" />
                    <span>{slide.ctaPrimary}</span>
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      if (idx === 0) setCurrentPage('about');
                      else if (idx === 1) setCurrentPage('services');
                      else setCurrentPage('services');
                    }}
                    style={{ padding: '1rem 2.2rem', color: '#ffffff', borderColor: '#ffffff' }}
                  >
                    <span>{slide.ctaSecondary}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div style={homeStyles.indicators}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              style={homeStyles.indicatorBtn(activeSlide === idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={homeStyles.statsSection}>
        <div className="container">
          <div style={homeStyles.statsGrid}>
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="card-glass"
                style={homeStyles.statCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div style={homeStyles.statIcon}>{stat.icon}</div>
                <h3 style={homeStyles.statNumber}>{stat.number}</h3>
                <p style={homeStyles.statLabel}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="section mesh-bg" style={homeStyles.pillarsSection}>
        <div className="container">
          <div style={homeStyles.sectionHeader}>
            <span style={homeStyles.sectionTag}>WHAT WE STAND FOR</span>
            <h2 style={homeStyles.sectionTitle}>Pillars of Sustainable Hope</h2>
            <p style={homeStyles.sectionSubtitle}>
              We implement comprehensive programs to tackle foundational social issues. Here is how we make a lasting impact.
            </p>
          </div>

          <div style={homeStyles.pillarsGrid}>
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                className="card-glass"
                style={idx === 0 ? homeStyles.pillarCardLarge : homeStyles.pillarCard}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div style={idx === 0 ? homeStyles.pillarIconBgLarge : homeStyles.pillarIconBg}>{pillar.icon}</div>
                <div style={idx === 0 ? { flex: 1 } : {}}>
                  <h3 style={idx === 0 ? homeStyles.pillarTitleLarge : homeStyles.pillarTitle}>{pillar.title}</h3>
                  <p style={homeStyles.pillarDesc}>{pillar.desc}</p>
                  <button
                    onClick={() => setCurrentPage('services')}
                    style={{ ...homeStyles.pillarLink, marginTop: '1rem' }}
                  >
                    <span>{pillar.action}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How You Can Help Section */}
      <section style={homeStyles.helpSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={homeStyles.helpTitle}>How You Can Help?</h2>
          <div style={homeStyles.helpUnderline}></div>

          <div style={homeStyles.helpGrid}>
            <div style={homeStyles.helpItem}>
              <div style={homeStyles.helpIconWrapper}><Handshake size={48} color="#c0563e" /></div>
              <h3 style={homeStyles.helpItemTitle}>Become a Partner</h3>
            </div>
            <div style={homeStyles.helpDivider} className="help-divider"></div>
            <div style={homeStyles.helpItem}>
              <div style={homeStyles.helpIconWrapper}><Users size={48} color="#c0563e" /></div>
              <h3 style={homeStyles.helpItemTitle}>Volunteer with us</h3>
            </div>
            <div style={homeStyles.helpDivider} className="help-divider"></div>
            <div style={homeStyles.helpItem}>
              <div style={homeStyles.helpIconWrapper}><Gift size={48} color="#c0563e" /></div>
              <h3 style={homeStyles.helpItemTitle}>Donate for a Cause</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={homeStyles.ctaBanner}>
        <div style={homeStyles.ctaBannerOverlay} />
        <div className="container" style={homeStyles.ctaBannerContent}>
          <h2 style={homeStyles.ctaBannerTitle}>Ready to Create a Ripple of Change?</h2>
          <p style={homeStyles.ctaBannerText}>
            Your time, voice, or donation can provide clean drinking water, high school scholarships, or medical relief to families in need.
          </p>
          <div style={homeStyles.ctaBannerButtons}>
            <button className="btn btn-secondary" onClick={onDonateClick} style={{ padding: '1rem 2.5rem' }}>
              <Heart size={18} fill="currentColor" />
              <span>Donate Now</span>
            </button>
            <button className="btn btn-outline" onClick={() => setCurrentPage('contact')} style={{ padding: '1rem 2.5rem', color: '#ffffff', borderColor: '#ffffff' }}>
              <span>Contact Our Team</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

const homeStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  hero: {
    height: '80vh',
    minHeight: '580px',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#070a0f',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    transition: 'opacity var(--transition-slow) ease-in-out, visibility var(--transition-slow)',
  },
  slideImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.65)',
  },
  slideOverlayGrad: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(2, 44, 34, 0.9) 0%, rgba(2, 44, 34, 0.4) 60%, rgba(2, 44, 34, 0.1) 100%)',
  },
  slideContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
  },
  textContent: {
    maxWidth: '650px',
    textAlign: 'left',
    color: '#ffffff',
  },
  slideTag: {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: 'var(--secondary-light)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '1rem',
    display: 'inline-block',
  },
  slideTitle: {
    color: '#ffffff',
    fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
    lineHeight: 1.15,
    marginBottom: '1.25rem',
  },
  slideDesc: {
    color: '#e2e8f0',
    fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
    marginBottom: '2.5rem',
    lineHeight: 1.6,
  },
  ctaGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  indicators: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
    display: 'flex',
    gap: '0.75rem',
  },
  indicatorBtn: (isActive) => ({
    width: isActive ? '32px' : '10px',
    height: '10px',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    backgroundColor: isActive ? 'var(--secondary)' : 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
  }),
  statsSection: {
    marginTop: '-60px',
    position: 'relative',
    zIndex: 5,
    paddingBottom: '3rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  statCard: {
    padding: '2.5rem 1.5rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statIcon: {
    color: 'var(--secondary)',
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
    padding: '0.75rem',
    borderRadius: 'var(--radius-md)',
    display: 'inline-flex',
  },
  statNumber: {
    fontSize: '2.25rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
  },
  statLabel: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  },
  pillarsSection: {
    backgroundColor: 'var(--bg-base)',
    position: 'relative',
  },
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 4rem auto',
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
  sectionSubtitle: {
    color: 'var(--text-secondary)',
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
  },
  pillarCard: {
    padding: '3rem 2.5rem',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.25rem',
  },
  pillarCardLarge: {
    padding: '4rem 3rem',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3rem',
    gridColumn: '1 / -1',
    flexWrap: 'wrap',
  },
  pillarIconBg: {
    backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
    padding: '1.25rem',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarIconBgLarge: {
    backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  pillarTitleLarge: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '1rem',
  },
  pillarDesc: {
    fontSize: '1.05rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  pillarLink: {
    background: 'none',
    border: 'none',
    color: 'var(--primary)',
    fontWeight: 700,
    fontSize: '0.95rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: 0,
    transition: 'color var(--transition-fast)',
    '&:hover': {
      color: 'var(--primary-light)',
    },
  },
  ctaBanner: {
    position: 'relative',
    padding: '6rem 0',
    backgroundColor: 'var(--primary-dark)',
    backgroundImage: "url('/images/green.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#ffffff',
    textAlign: 'center',
    overflow: 'hidden',
  },
  ctaBannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(2, 44, 34, 0.9)',
    zIndex: 1,
  },
  ctaBannerContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
  },
  ctaBannerTitle: {
    color: '#ffffff',
    marginBottom: '1rem',
  },
  ctaBannerText: {
    color: '#e2e8f0',
    fontSize: '1.1rem',
    marginBottom: '2.5rem',
    lineHeight: 1.6,
  },
  ctaBannerButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.25rem',
    flexWrap: 'wrap',
  },
  helpSection: {
    padding: '4rem 0',
    backgroundColor: 'var(--bg-default)',
  },
  helpTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  helpUnderline: {
    width: '100px',
    height: '6px',
    backgroundColor: '#d35400',
    margin: '0 auto 3rem auto',
    borderRadius: '10px',
  },
  helpGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '900px',
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  helpItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    minWidth: '200px',
  },
  helpIconWrapper: {
    marginBottom: '1rem',
  },
  helpItemTitle: {
    fontSize: '1.25rem',
    color: '#bd4c54',
    fontWeight: 600,
  },
  helpDivider: {
    width: '0px',
    height: '80px',
    borderLeft: '1px dashed #d35400',
    margin: '0 1rem',
    display: 'block',
  },
};

if (typeof window !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .pillar-link-hover:hover {
      color: var(--primary-light) !important;
    }
    @media (max-width: 768px) {
      .help-divider {
        height: 0px !important;
        width: 80px !important;
        border-left: none !important;
        border-top: 1px dashed #d35400 !important;
        margin: 2rem auto !important;
      }
    }
  `;
  document.head.appendChild(styleEl);
}
