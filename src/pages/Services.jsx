import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Icons from 'lucide-react';
import { getServices } from '../utils/api';

export default function Services({ onDonateClick }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const [services, setServices] = useState([]);
  const [tabs, setTabs] = useState([{ id: 'all', label: 'All Projects' }]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const loadedServices = await getServices();
        setServices(loadedServices);

        const categories = new Set(loadedServices.map(s => s.category));
        const dynamicTabs = [{ id: 'all', label: 'All Projects' }];
        categories.forEach(cat => {
          dynamicTabs.push({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) });
        });
        setTabs(dynamicTabs);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.HelpCircle;
    return <IconComponent size={24} />;
  };

  const filteredServices = activeTab === 'all'
    ? services
    : services.filter(s => s.category === activeTab);

  return (
    <div className="page-wrapper" style={serviceStyles.wrapper}>
      <Helmet>
        <title>Our Services & Projects - Annai Therasa Home</title>
        <meta name="description" content="Discover the various initiatives and projects run by Annai Therasa Home, from education and healthcare to livelihood support." />
      </Helmet>
      {/* Page Hero */}
      <section style={serviceStyles.hero} className="mesh-bg">
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
                  <img src={service.image} alt={service.title} style={serviceStyles.cardImage} loading="lazy" />
                  <div style={serviceStyles.cardCategoryBadge}>{service.category}</div>
                </div>

                <div style={serviceStyles.cardContent}>
                  <div style={serviceStyles.cardHeader}>
                    <div style={serviceStyles.cardIconBg}>{renderIcon(service.icon)}</div>
                    <h3 style={{ fontSize: '1.25rem' }}>{service.title}</h3>
                  </div>
                  <p style={serviceStyles.cardText}>{service.shortDesc}</p>

                  <div style={serviceStyles.metricBlock}>
                    <Icons.CheckCircle size={16} color="var(--primary)" />
                    <span>{service.metric}</span>
                  </div>

                  <div style={serviceStyles.cardFooter}>
                    <button
                      onClick={() => setSelectedService(service)}
                      className="btn btn-outline"
                      style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem', width: '100%' }}
                    >
                      <span>Explore Project Details</span>
                      <Icons.ArrowRight size={14} />
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
              <button onClick={() => setSelectedService(null)} style={serviceStyles.modalCloseBtn}>
                <Icons.X size={20} />
              </button>
            </div>

            <div style={serviceStyles.modalBody}>
              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {selectedService.category} Project
                </span>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', marginTop: '0.25rem', fontWeight: 800 }}>{selectedService.title}</h3>
              </div>
              <div
                style={{ fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1.25rem' }}
                dangerouslySetInnerHTML={{ __html: selectedService.longDesc }}
              />

              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icons.Sparkles size={18} color="var(--secondary)" />
                <span>Primary Sub-Projects</span>
              </h4>
              <ul style={serviceStyles.subProjectsList}>
                {selectedService.subProjects.map((proj, idx) => (
                  <li key={idx} style={serviceStyles.subProjectItem}>
                    <Icons.CheckCircle size={15} color="var(--primary)" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>

              <div style={serviceStyles.testimonyBox}>
                <Icons.MessageSquare size={24} color="var(--secondary)" style={{ marginBottom: '0.5rem' }} />
                <p style={{ fontStyle: 'italic', fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  "{selectedService.impactTestimony}"
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '2.5rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: 0,
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
    }
  },
  cardImageWrapper: {
    position: 'relative',
    height: '220px',
    width: '100%',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
  },
  cardCategoryBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(4px)',
    color: 'var(--primary)',
    fontWeight: 700,
    fontSize: '0.75rem',
    padding: '0.4rem 0.8rem',
    borderRadius: 'var(--radius-full)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardContent: {
    padding: '2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  cardIconBg: {
    backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
    padding: '0.75rem',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    color: 'var(--primary)',
  },
  cardText: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    flex: 1,
    marginBottom: '1.5rem',
  },
  metricBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--primary)',
    backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    marginBottom: '1.5rem',
  },
  cardFooter: {
    marginTop: 'auto',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '1rem',
  },
  modal: {
    backgroundColor: 'var(--bg-surface)',
    width: '100%',
    maxWidth: '700px',
    maxHeight: '90vh',
    borderRadius: 'var(--radius-lg)',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: 'var(--shadow-xl)',
  },
  modalHero: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#0f172a', // Dark background to frame the contained image
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 'var(--radius-xl)',
    borderTopRightRadius: 'var(--radius-xl)',
    overflow: 'hidden'
  },
  modalHeroImg: {
    width: '100%',
    maxHeight: '350px',
    objectFit: 'contain',
  },
  modalHeroOverlay: {
    display: 'none'
  },
  modalCloseBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(4px)',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'background-color var(--transition-fast)'
  },
  modalHeroContent: {
    display: 'none'
  },
  modalBody: {
    padding: '2.5rem',
  },
  subProjectsList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 2rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  subProjectItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
  },
  testimonyBox: {
    backgroundColor: 'var(--bg-base)',
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    borderLeft: '4px solid var(--secondary)',
    marginBottom: '2.5rem',
  },
  modalActionRow: {
    display: 'flex',
    gap: '0.75rem',
  },
};
