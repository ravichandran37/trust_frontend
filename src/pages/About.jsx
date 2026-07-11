import React from 'react';
import { Target, Eye, Shield, Users, Heart, Award, ArrowRight } from 'lucide-react';

export default function About() {
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
      name: 'Dr. R. Ponner Swamy',
      role: 'Founder & Chief Trustee',
      bio: 'Visionary educationist with 25+ years in rural development. Founded the trust to give back to his home district.',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      name: 'Dr. Anjali Mehta',
      role: 'Medical Director',
      bio: 'Pediatrician who retired from state services to lead our Arogya health camps and rural vaccination drives.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      name: 'Mr. S. Karthikeyan',
      role: 'Secretary & Operations Head',
      bio: 'Former corporate CSR consultant specializing in executing large-scale sanitation and drinking water drives.',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
    }
  ];

  const milestones = [
    { year: '2011', title: 'The Genesis', desc: 'Ponner Trust is registered. First scholarship cohort of 12 rural students funded.' },
    { year: '2015', title: 'Mobile Medical Vans', desc: 'Launched two fully-equipped healthcare vans to cover 18 tribal villages weekly.' },
    { year: '2019', title: '10K Lives Impacted', desc: 'Reached a cumulative impact of 10,000 beneficiaries across all social drives.' },
    { year: '2024', title: 'Skill Center Inception', desc: 'Established the Ponner Center for Vocational Studies supporting 150+ women annually.' }
  ];

  return (
    <div className="page-wrapper" style={aboutStyles.wrapper}>
      {/* Page Hero */}
      <section style={aboutStyles.hero}>
        <div style={aboutStyles.heroOverlay} />
        <div className="container" style={aboutStyles.heroContent}>
          <span style={aboutStyles.heroTag}>OUR STORY</span>
          <h1 style={aboutStyles.heroTitle}>A Decade of Devotion & Trust</h1>
          <p style={aboutStyles.heroDesc}>
            Ponner Educational and Charitable Trust was established to uplift vulnerable rural communities through accessible education and quality healthcare.
          </p>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="section">
        <div className="container">
          <div style={aboutStyles.storyGrid}>
            <div style={aboutStyles.storyText}>
              <h2 style={{ marginBottom: '1.5rem' }}>How We Began</h2>
              <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
                Founded in 2011, Ponner Trust started as a personal initiative by a group of passionate educators and doctors who witnessed the stark disparities in primary school facilities and basic medical checkups in rural districts.
              </p>
              <p style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
                What began as a small scholarship project funding tuition fees for twelve children has evolved into a robust charitable institution. Today, we work closely with village heads, school headmasters, and government panels to deliver holistic development.
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
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>
                    To construct scalable and transparent channels in primary schooling, sanitation, health awareness, and skill development for rural families.
                  </p>
                </div>
              </div>

              <div className="card-glass" style={aboutStyles.mvCard}>
                <div style={aboutStyles.mvIconBg}>
                  <Eye size={28} color="var(--primary)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Our Vision</h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>
                    A society where every individual, regardless of their birthplace, has the health, knowledge, and tools to realize their full potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" style={aboutStyles.valuesSection}>
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
      <section className="section">
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
      <section className="section" style={aboutStyles.timelineSection}>
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
    '@media (max-width: 768px)': {
      left: '20px',
    },
  },
  timelineItem: (isLeft) => ({
    position: 'relative',
    width: '50%',
    padding: '1.5rem 2.5rem',
    boxSizing: 'border-box',
    left: isLeft ? 0 : '50%',
    textAlign: isLeft ? 'right' : 'left',
    zIndex: 2,
    '@media (max-width: 768px)': {
      width: '100%',
      left: 0,
      textAlign: 'left',
      paddingLeft: '45px',
      paddingRight: '10px',
    },
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
    '@media (max-width: 768px)': {
      left: '20px',
    },
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
};
