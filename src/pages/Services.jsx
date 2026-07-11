import React, { useState } from 'react';
import { BookOpen, Activity, Heart, Shield, CheckCircle, ArrowRight, X, Sparkles } from 'lucide-react';

export default function Services({ onDonateClick }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'education', label: 'Education' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'livelihood', label: 'Livelihood' },
    { id: 'environment', label: 'Environment' }
  ];

  const services = [
    {
      id: 'vidya',
      category: 'education',
      title: 'Vidya Scholarship Program',
      shortDesc: 'Funding college and secondary school tuition fees for merit-based underprivileged rural students.',
      longDesc: 'The Vidya Scholarship Program identifies brilliant students from low-income agricultural families who cannot afford higher secondary or collegiate tuition. We pay direct collegiate fees, supply textbooks, and assign corporate mentors to help guide their career paths.',
      metric: '850+ Scholarships Awarded',
      image: '/images/hero.png',
      icon: <BookOpen size={24} />,
      subProjects: ['College Tuition Coverage', 'Textbook Distribution Camps', 'Digital Literacy Labs', '1-on-1 Mentorship Circles'],
      impactTestimony: '"Without Ponner Trust, I would have dropped out after 10th grade. Today, I am a junior software engineer." — Ramesh Kumar, Vidya Scholar 2021.'
    },
    {
      id: 'arogya',
      category: 'healthcare',
      title: 'Arogya Medical Camps',
      shortDesc: 'Conducting free primary diagnostic checkups, vision tests, and distributing life-saving medicines in remote clusters.',
      longDesc: 'Through Arogya Mobile clinics, we bring state-of-the-art diagnostic screening, general physician consults, and pediatric checkups to tribal and isolated hill stations where medical infrastructure is non-existent. Critical surgeries are sponsored via partner hospitals.',
      metric: '14,000+ Patients Treated',
      image: '/images/medical.png',
      icon: <Activity size={24} />,
      subProjects: ['Weekly General Health Clinics', 'Free Cataract Eye Surgeries', 'Pediatric Vaccination Support', 'Clean Sanitation & Hygiene Drives'],
      impactTestimony: '"The mobile clinic comes to our village every Tuesday. The free medicines have controlled my mother\'s hypertension." — M. Selvi, Beneficiary.'
    },
    {
      id: 'skill',
      category: 'livelihood',
      title: 'Women Skill Development',
      shortDesc: 'Vocational training in sewing, textile weaving, and computer basics to foster financial self-reliance.',
      longDesc: 'Our vocational schools provide women with structured certifications in professional sewing, fashion embroidery, and digital data entry. Graduates receive a free sewing machine or are placed in corporate craft units to immediately start earning.',
      metric: '420+ Women Certified',
      image: '/images/women.png',
      icon: <Heart size={24} />,
      subProjects: ['Tailoring & Sewing Certifications', 'Applique & Craft Design Workshops', 'Basic Computer & Accounting Literacy', 'Self-Help Group Financing Support'],
      impactTestimony: '"I bought my own sewing machine using the trust\'s micro-subsidy. I now support my two children\'s education." — Priya Devi, Boutique Owner.'
    },
    {
      id: 'green',
      category: 'environment',
      title: 'Green Village Drive',
      shortDesc: 'Promoting solar lighting, organic farming advice, and community reforestation for eco-resilience.',
      longDesc: 'The Green Village initiative focuses on environmental sustainability. We install solar-powered streetlights, facilitate water harvesting check-dams, conduct workshops on compost-based organic farming, and coordinate local reforestation programs.',
      metric: '2,500+ Saplings Planted',
      image: '/images/green.png',
      icon: <Shield size={24} />,
      subProjects: ['Solar Streetlight Installation', 'Reforestation & Tree Guards', 'Water Check-Dam Construction', 'Organic Composting Seminars'],
      impactTestimony: '"Our village streets are safe to walk at night now thanks to the solar streetlights. The youth also planted 300 neem trees." — Panchayat President.'
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <div className="page-wrapper" style={serviceStyles.wrapper}>
      {/* Page Hero */}
      <section style={serviceStyles.hero}>
        <div style={serviceStyles.heroOverlay} />
        <div className="container" style={serviceStyles.heroContent}>
          <span style={serviceStyles.heroTag}>OUR SERVICES</span>
          <h1 style={serviceStyles.heroTitle}>Initiatives Building Better Futures</h1>
          <p style={serviceStyles.heroDesc}>
            Through structured community projects, we strive to remove barriers and deliver resources where they are needed most.
          </p>
        </div>
      </section>

      {/* Tabs & Grid */}
      <section className="section">
        <div className="container">
          {/* Tab buttons */}
          <div style={serviceStyles.tabsWrapper}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={serviceStyles.tabBtn(activeTab === tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div style={serviceStyles.grid}>
            {filteredServices.map(service => (
              <div key={service.id} className="card-glass" style={serviceStyles.card}>
                <div style={serviceStyles.cardImageWrapper}>
                  <img src={service.image} alt={service.title} style={serviceStyles.cardImage} />
                  <div style={serviceStyles.cardCategoryBadge}>{service.category}</div>
                </div>
                
                <div style={serviceStyles.cardContent}>
                  <div style={serviceStyles.cardHeader}>
                    <div style={serviceStyles.cardIconBg}>{service.icon}</div>
                    <h3 style={{ fontSize: '1.25rem' }}>{service.title}</h3>
                  </div>
                  <p style={serviceStyles.cardText}>{service.shortDesc}</p>
                  
                  <div style={serviceStyles.metricBlock}>
                    <CheckCircle size={16} color="var(--primary)" />
                    <span>{service.metric}</span>
                  </div>

                  <div style={serviceStyles.cardFooter}>
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="btn btn-outline"
                      style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem', width: '100%' }}
                    >
                      <span>Explore Project Details</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal/Drawer Overlay */}
      {selectedService && (
        <div style={serviceStyles.modalBackdrop} onClick={() => setSelectedService(null)}>
          <div style={serviceStyles.modal} onClick={e => e.stopPropagation()} className="fade-in-el">
            
            <div style={serviceStyles.modalHero}>
              <img src={selectedService.image} alt={selectedService.title} style={serviceStyles.modalHeroImg} />
              <div style={serviceStyles.modalHeroOverlay} />
              <button onClick={() => setSelectedService(null)} style={serviceStyles.modalCloseBtn}>
                <X size={20} />
              </button>
              <div style={serviceStyles.modalHeroContent}>
                <span style={{ fontSize: '0.85rem', color: 'var(--secondary-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {selectedService.category} Project
                </span>
                <h3 style={{ color: '#ffffff', fontSize: '1.6rem', marginTop: '0.25rem' }}>{selectedService.title}</h3>
              </div>
            </div>

            <div style={serviceStyles.modalBody}>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {selectedService.longDesc}
              </p>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="var(--secondary)" />
                <span>Primary Sub-Projects</span>
              </h4>
              <ul style={serviceStyles.subProjectsList}>
                {selectedService.subProjects.map((proj, idx) => (
                  <li key={idx} style={serviceStyles.subProjectItem}>
                    <CheckCircle size={15} color="var(--primary)" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>

              <div style={serviceStyles.testimonyBox}>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {selectedService.impactTestimony}
                </p>
              </div>

              <div style={serviceStyles.modalActionRow}>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    setSelectedService(null);
                    onDonateClick();
                  }}
                  style={{ flex: 1.5 }}
                >
                  Support This Project
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setSelectedService(null)}
                  style={{ flex: 1 }}
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

const serviceStyles = {
  wrapper: {
    width: '100%',
  },
  hero: {
    position: 'relative',
    padding: '7rem 0',
    backgroundColor: '#022c22',
    backgroundImage: "url('/images/medical.png')",
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
    backgroundColor: 'rgba(2, 44, 34, 0.88)',
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
  tabsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
    marginBottom: '3rem',
  },
  tabBtn: (isActive) => ({
    padding: '0.65rem 1.4rem',
    border: '1px solid',
    borderColor: isActive ? 'var(--primary)' : 'var(--border-color)',
    borderRadius: 'var(--radius-full)',
    backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-surface)',
    color: isActive ? '#ffffff' : 'var(--text-secondary)',
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    boxShadow: isActive ? 'var(--shadow-md)' : 'none',
    '&:hover': {
      borderColor: 'var(--primary)',
      backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-surface-hover)',
    }
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    textAlign: 'left',
    height: '100%',
  },
  cardImageWrapper: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-normal)',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  cardCategoryBadge: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    backgroundColor: 'var(--secondary)',
    color: '#ffffff',
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '0.25rem 0.65rem',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--shadow-sm)',
  },
  cardContent: {
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flex: 1,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  cardIconBg: {
    backgroundColor: 'rgba(6, 78, 59, 0.08)',
    color: 'var(--primary)',
    padding: '0.5rem',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
  },
  cardText: {
    fontSize: '0.92rem',
    lineHeight: 1.5,
    color: 'var(--text-secondary)',
    flex: 1,
  },
  metricBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.88rem',
    fontWeight: 600,
    color: 'var(--primary)',
    backgroundColor: 'rgba(6, 78, 59, 0.05)',
    padding: '0.5rem 0.75rem',
    borderRadius: 'var(--radius-md)',
  },
  cardFooter: {
    marginTop: '0.5rem',
  },
  // Modal drawer overlay styling
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(3px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1900,
    padding: '1rem',
  },
  modal: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    width: '100%',
    maxWidth: '560px',
    boxShadow: 'var(--shadow-xl)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  modalHero: {
    position: 'relative',
    height: '180px',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '1.5rem',
  },
  modalHeroImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  modalHeroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(11, 15, 23, 0.95) 0%, rgba(11, 15, 23, 0.3) 100%)',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: 'none',
    color: '#ffffff',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeroContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'left',
  },
  modalBody: {
    padding: '1.5rem',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
  },
  subProjectsList: {
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.6rem',
    marginBottom: '1.25rem',
    '@media (max-width: 500px)': {
      gridTemplateColumns: '1fr',
    },
  },
  subProjectItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
  },
  testimonyBox: {
    borderLeft: '3px solid var(--secondary)',
    paddingLeft: '1rem',
    backgroundColor: 'var(--bg-surface-hover)',
    padding: '0.85rem',
    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
    marginBottom: '1.5rem',
  },
  modalActionRow: {
    display: 'flex',
    gap: '0.75rem',
  },
};
