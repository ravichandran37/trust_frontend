import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, Eye, Shield, Users, Heart, Award, ArrowRight } from 'lucide-react';
import { getMenuOptions, getPage } from '../utils/api';

export default function About() {
  const [customSections, setCustomSections] = useState([]);

  useEffect(() => {
    const fetchCustomSections = async () => {
      try {
        const options = await getMenuOptions();
        const aboutOptions = options.filter(o => 
          o.category === 'about_us' && 
          !['vision', 'history', 'leadership', 'board-members'].includes(o.linkId)
        );
        
        const sectionsData = await Promise.all(
          aboutOptions.map(async (opt) => {
            try {
              const page = await getPage(opt.linkId);
              return { ...page, id: opt.linkId, label: opt.label };
            } catch (e) {
              return null;
            }
          })
        );
        
        setCustomSections(sectionsData.filter(Boolean));
      } catch (err) {
        console.error('Failed to load custom sections:', err);
      }
    };
    
    fetchCustomSections();
  }, []);

  const values = [
    {
      icon: <Shield size={24} color="var(--primary)" />,
      title: 'Radial Transparency',
      desc: 'We are audit-certified and ensure 90%+ of donations go directly into beneficiary services.'
    },
    {
      icon: <Heart size={24} color="var(--primary)" />,
      title: 'Empathy First',
      desc: 'Our initiatives are tailored to the exact cultural and physical needs of target villages.'
    },
    {
      icon: <Users size={24} color="var(--primary)" />,
      title: 'Community Ownership',
      desc: 'We train local volunteers to manage clinics and workshops, creating self-sustaining hubs.'
    },
    {
      icon: <Award size={24} color="var(--primary)" />,
      title: 'Commitment to Excellence',
      desc: 'We establish robust feedback mechanisms to continuously scale and measure impact quality.'
    }
  ];

  const team = [
    {
      name: 'Mr. K. Samidurai',
      role: 'Legal Advisor',
      bio: 'Advocate at the Madurai High Court, ensuring all legal compliances and advocacy for the disabled.',
      img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200'
    }
  ];

  const milestones = [
    { year: '2009', title: 'The Genesis', desc: 'Annai Therasa Home is established and officially registered to provide shelter and care for the intellectually impaired.' },
    { year: '2013', title: 'Residential Wing Expansion', desc: 'Inaugurated a new residential facility, expanding our capacity to accommodate 50+ residents safely.' },
    { year: '2018', title: 'Specialized Rehabilitation', desc: 'Launched tailored physiotherapy and special education programs designed for multiple disabilities.' },
    { year: '2023', title: 'Vocational Training Unit', desc: 'Established a craft and skill center to empower our residents with self-sustaining livelihood skills.' }
  ];

  const awards = [
    { title: 'Government Registered', org: 'Registration No. 128/2009' },
    { title: 'RPwD Act 2016 Compliant', org: 'Operates under the Rights of Persons with Disabilities Act, 2016' },
    { title: 'Tax-Beneficial Donations', org: 'Eligible for 12A, 80G, and CSR support, enabling tax-beneficial donations and corporate partnerships.' }
  ];

  return (
    <div className="page-wrapper" style={aboutStyles.wrapper}>
      <Helmet>
        <title>About Us - Annai Therasa Home</title>
        <meta name="description" content="Learn about the mission, vision, and team behind Annai Therasa Home's efforts to support rural communities." />
      </Helmet>
      {/* Page Hero */}
      <section style={aboutStyles.hero} className="mesh-bg">
        <div style={aboutStyles.heroOverlay} />
        <div className="container" style={aboutStyles.heroContent}>
          <span style={aboutStyles.heroTag}>OUR STORY</span>
          <h1 style={aboutStyles.heroTitle}>A Decade of Devotion & Trust</h1>
          <p style={aboutStyles.heroDesc}>
            Annai Therasa Home for the Intellectually Impaired and the Handicapped was established to uplift vulnerable rural communities and provide dedicated care and advocacy.
          </p>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section id="vision" className="section">
        <div className="container">
          <div style={aboutStyles.storyGrid}>
            <div style={aboutStyles.storyText}>
              <h2 style={{ marginBottom: '1.5rem' }}>How We Began</h2>
              <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
                Annai Therasa Home for the Intellectually Impaired and the Handicapped is a compassionate, non-profit organization located at Ayyappan Nagar, First Street, Y. Ottakadai, Madurai, Tamil Nadu. Since its establishment in 2009 (Government Registration No. 128/2009), our mission has been to provide a safe, caring, and dignified environment for individuals with intellectual and multiple disabilities.
              </p>
              <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
                We are committed to improving the quality of life of every resident through personalized care, rehabilitation, education, skill development, and emotional support. Our dedicated team works tirelessly to help each individual achieve their fullest potential while ensuring they are treated with love, respect, and dignity.
              </p>
              <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
                Our organization operates in accordance with the Rights of Persons with Disabilities (RPwD) Act, 2016, promoting equal rights, inclusion, and opportunities for persons with disabilities.
              </p>
              <div style={aboutStyles.quoteBox}>
                <p style={aboutStyles.quoteText}>
                  "True empowerment is not about giving charity; it's about providing the tools and health for communities to stand tall on their own."
                </p>
                <span style={aboutStyles.quoteAuthor}>— Dr. R. Ponner Swamy</span>
              </div>
            </div>

            <div style={aboutStyles.missionVisionCol}>
              <div className="card-glass" style={aboutStyles.mvCard}>
                <div style={aboutStyles.mvIconBg}>
                  <Target size={28} color="var(--primary)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Our Mission</h3>
                  <ul style={{ fontSize: '0.92rem', lineHeight: 1.5, paddingLeft: '1.2rem', color: 'var(--text-secondary)' }}>
                    <li>To provide quality residential care for persons with intellectual and physical disabilities.</li>
                    <li>To promote independence, self-confidence, and social inclusion.</li>
                    <li>To offer rehabilitation, education, healthcare, and life skills training.</li>
                    <li>To create a loving environment where every individual feels valued and respected.</li>
                  </ul>
                </div>
              </div>

              <div className="card-glass" style={aboutStyles.mvCard}>
                <div style={aboutStyles.mvIconBg}>
                  <Eye size={28} color="var(--primary)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Our Vision</h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>
                    To build an inclusive society where persons with disabilities live with dignity, equality, and the opportunity to lead meaningful and fulfilling lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="section" style={aboutStyles.valuesSection}>
        <div className="container">
          <div style={aboutStyles.sectionHeader}>
            <span style={aboutStyles.sectionTag}>GUIDING LIGHTS</span>
            <h2 style={aboutStyles.sectionTitle}>Values that Define Our Action</h2>
          </div>

          <div style={aboutStyles.valuesGrid}>
            {values.map((val, idx) => (
              <div key={idx} className="card-glass" style={aboutStyles.valueCard}>
                <div style={aboutStyles.valueIcon}>{val.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{val.title}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Leadership */}
      <section id="leadership" className="section">
        <div className="container">
          <div style={aboutStyles.sectionHeader}>
            <span style={aboutStyles.sectionTag}>OUR LEADERSHIP</span>
            <h2 style={aboutStyles.sectionTitle}>The Hearts Behind the Initiative</h2>
          </div>

          <div style={aboutStyles.teamGrid}>
            {team.map((member, idx) => (
              <div key={idx} className="card-glass" style={aboutStyles.teamCard}>
                <img src={member.img} alt={member.name} style={aboutStyles.teamImg} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                <span style={aboutStyles.teamRole}>{member.role}</span>
                <p style={aboutStyles.teamBio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="history" className="section" style={aboutStyles.timelineSection}>
        <div className="container">
          <div style={aboutStyles.sectionHeader}>
            <span style={aboutStyles.sectionTag}>OUR JOURNEY</span>
            <h2 style={aboutStyles.sectionTitle}>Milestones Over The Years</h2>
          </div>

          <div style={aboutStyles.timeline}>
            {milestones.map((milestone, idx) => (
              <div key={idx} style={aboutStyles.timelineItem(idx % 2 === 0)}>
                <div style={aboutStyles.timelineContent}>
                  <span style={aboutStyles.timelineYear}>{milestone.year}</span>
                  <h3 style={aboutStyles.timelineTitle}>{milestone.title}</h3>
                  <p style={aboutStyles.timelineDesc}>{milestone.desc}</p>
                </div>
                <div style={aboutStyles.timelineDot} />
              </div>
            ))}
            <div style={aboutStyles.timelineLine} />
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="section" style={aboutStyles.awardsSection}>
        <div className="container">
          <div style={aboutStyles.sectionHeader}>
            <span style={aboutStyles.sectionTag}>RECOGNITION</span>
            <h2 style={aboutStyles.sectionTitle}>Awards & Certifications</h2>
          </div>
          <div style={aboutStyles.awardsGrid}>
            {awards.map((award, idx) => (
              <div key={idx} className="card-glass" style={aboutStyles.awardCard}>
                <Award size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{award.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Dynamic Sections */}
      {customSections.map((section, idx) => (
        <section key={section.id} id={section.id} className="section" style={idx % 2 !== 0 ? { backgroundColor: 'var(--bg-surface)' } : {}}>
          <div className="container">
            <div style={aboutStyles.storyGrid}>
              {idx % 2 === 0 ? (
                <>
                  <div style={aboutStyles.storyText}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', color: 'var(--text-primary)' }}>{section.title || section.label}</h2>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                      {section.content || `Content for ${section.label} is coming soon.`}
                    </div>
                  </div>
                  <div style={aboutStyles.missionVisionCol}>
                    {section.heroImage ? (
                      <img src={section.heroImage} alt={section.title} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', minHeight: '300px', backgroundColor: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        Image Placeholder
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={aboutStyles.missionVisionCol}>
                    {section.heroImage ? (
                      <img src={section.heroImage} alt={section.title} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', minHeight: '300px', backgroundColor: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        Image Placeholder
                      </div>
                    )}
                  </div>
                  <div style={aboutStyles.storyText}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', color: 'var(--text-primary)' }}>{section.title || section.label}</h2>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                      {section.content || `Content for ${section.label} is coming soon.`}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

const aboutStyles = {
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
    backgroundColor: 'rgba(2, 44, 34, 0.85)',
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
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
    alignItems: 'center',
  },
  storyText: {
    textAlign: 'left',
  },
  quoteBox: {
    borderLeft: '4px solid var(--secondary)',
    paddingLeft: '1.25rem',
    margin: '2rem 0 0 0',
    backgroundColor: 'var(--bg-surface-hover)',
    padding: '1.25rem',
    borderRadius: '0 var(--radius-md) var(--radius-md) 0',
  },
  quoteText: {
    fontStyle: 'italic',
    fontSize: '1rem',
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  },
  quoteAuthor: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--primary)',
  },
  missionVisionCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  mvCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.25rem',
    padding: '2rem',
    textAlign: 'left',
  },
  mvIconBg: {
    backgroundColor: 'rgba(6, 78, 59, 0.08)',
    padding: '0.75rem',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
  },
  valuesSection: {
    backgroundColor: 'var(--bg-surface)',
  },
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto 3.5rem auto',
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
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
  },
  valueCard: {
    padding: '2.5rem 1.5rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  valueIcon: {
    backgroundColor: 'rgba(6, 78, 59, 0.06)',
    padding: '0.85rem',
    borderRadius: '50%',
    display: 'flex',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  teamCard: {
    padding: '2.5rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  teamImg: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1.25rem',
    border: '3px solid var(--border-color)',
    boxShadow: 'var(--shadow-md)',
  },
  teamRole: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
    display: 'block',
  },
  teamBio: {
    fontSize: '0.9rem',
    lineHeight: 1.55,
    color: 'var(--text-secondary)',
  },
  timelineSection: {
    backgroundColor: 'var(--bg-surface)',
  },
  timeline: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem 0',
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '3px',
    backgroundColor: 'var(--border-color)',
    zIndex: 1,

  },
  timelineItem: (isLeft) => ({
    position: 'relative',
    width: '50%',
    padding: '1.5rem 2.5rem',
    boxSizing: 'border-box',
    left: isLeft ? 0 : '50%',
    textAlign: isLeft ? 'right' : 'left',
    zIndex: 2,

  }),
  timelineDot: {
    position: 'absolute',
    top: '2.5rem',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'var(--secondary)',
    border: '4px solid var(--bg-surface)',
    boxShadow: 'var(--shadow-sm)',
    zIndex: 3,

  },
  timelineContent: {
    backgroundColor: 'var(--bg-base)',
    padding: '1.5rem',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
    display: 'inline-block',
    width: '100%',
  },
  timelineYear: {
    fontSize: '1.2rem',
    fontWeight: 800,
    color: 'var(--primary)',
    display: 'block',
    marginBottom: '0.25rem',
  },
  timelineTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  timelineDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  awardsSection: {
    backgroundColor: 'var(--bg-base)',
    paddingBottom: '8rem',
  },
  awardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  awardCard: {
    padding: '3rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
};
