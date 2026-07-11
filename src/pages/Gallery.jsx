import React, { useState } from 'react';
import { Camera, Layers, ZoomIn } from 'lucide-react';

export default function Gallery({ onImageClick }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'education', label: 'Education' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'community', label: 'Community' },
    { id: 'environment', label: 'Environment' }
  ];

  const galleryItems = [
    {
      id: 1,
      src: '/images/hero.png',
      category: 'education',
      title: 'Vidya Scholarship Distribution 2025',
      date: 'Jan 2026',
      description: 'Distribution of scholarships and textbooks to students at the regional community hall.'
    },
    {
      id: 2,
      src: '/images/medical.png',
      category: 'healthcare',
      title: 'Mobile Medical Van Diagnostics',
      date: 'Dec 2025',
      description: 'Arogya health outreach checking senior citizens in the interior villages.'
    },
    {
      id: 3,
      src: '/images/women.png',
      category: 'community',
      title: 'Tailoring & Craft Training Seminar',
      date: 'Nov 2025',
      description: 'Vocational training lab helping local women create artisan textiles.'
    },
    {
      id: 4,
      src: '/images/green.png',
      category: 'environment',
      title: 'Afforestation Drive & Tree Guard Fitment',
      date: 'Oct 2025',
      description: 'Youth volunteers securing native saplings to restore local water levels.'
    },
    {
      id: 5,
      src: '/images/hero.png',
      category: 'education',
      title: 'Rural Computer Center Opening',
      date: 'Sep 2025',
      description: 'First digital classroom set up with desktop systems in district high school.'
    },
    {
      id: 6,
      src: '/images/medical.png',
      category: 'healthcare',
      title: 'Free Cataract Detection Camps',
      date: 'Aug 2025',
      description: 'Doctors conducting high-precision ocular tests for rural farmers.'
    },
    {
      id: 7,
      src: '/images/women.png',
      category: 'community',
      title: 'Micro-Finance & Self-Help Group Meet',
      date: 'Jul 2025',
      description: 'Advisory panel training graduates on business budget sheets.'
    },
    {
      id: 8,
      src: '/images/green.png',
      category: 'environment',
      title: 'Solar Streetlight Commissioning',
      date: 'Jun 2025',
      description: 'First set of clean-energy solar lamp posts installed along main village road.'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const handleItemClick = (indexInFiltered) => {
    onImageClick(filteredItems, indexInFiltered);
  };

  return (
    <div className="page-wrapper" style={galleryStyles.wrapper}>
      {/* Page Hero */}
      <section style={galleryStyles.hero}>
        <div style={galleryStyles.heroOverlay} />
        <div className="container" style={galleryStyles.heroContent}>
          <span style={galleryStyles.heroTag}>OUR GALLERY</span>
          <h1 style={galleryStyles.heroTitle}>Moments of Impact & Hope</h1>
          <p style={galleryStyles.heroDesc}>
            A visual documentation of our journey, the communities we support, and our ongoing projects.
          </p>
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="section">
        <div className="container">
          {/* Category Tabs */}
          <div style={galleryStyles.filterTabs}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={galleryStyles.filterBtn(activeCategory === cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of Items */}
          <div style={galleryStyles.grid}>
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="gallery-card"
                style={galleryStyles.card}
                onClick={() => handleItemClick(idx)}
              >
                <div style={galleryStyles.imgWrapper}>
                  <img src={item.src} alt={item.title} style={galleryStyles.image} />
                  
                  {/* Hover Overlay */}
                  <div className="gallery-overlay" style={galleryStyles.overlay}>
                    <div style={galleryStyles.zoomIconBg}>
                      <ZoomIn size={24} color="#ffffff" />
                    </div>
                    <div style={galleryStyles.overlayText}>
                      <span style={galleryStyles.overlayCategory}>{item.category}</span>
                      <h4 style={galleryStyles.overlayTitle}>{item.title}</h4>
                      <p style={galleryStyles.overlayDate}>{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div style={galleryStyles.emptyState}>
              <Camera size={48} color="var(--text-muted)" />
              <p>No media files found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const galleryStyles = {
  wrapper: {
    width: '100%',
  },
  hero: {
    position: 'relative',
    padding: '7rem 0',
    backgroundColor: '#022c22',
    backgroundImage: "url('/images/green.png')",
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
  filterTabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
    marginBottom: '3rem',
  },
  filterBtn: (isActive) => ({
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
    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
    '&:hover': {
      borderColor: 'var(--primary)',
      backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-surface-hover)',
    }
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)',
    cursor: 'pointer',
    position: 'relative',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
  },
  imgWrapper: {
    position: 'relative',
    width: '100%',
    paddingTop: '75%', /* 4:3 aspect ratio */
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform var(--transition-slow) ease',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(2, 44, 34, 0.85)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity var(--transition-normal) ease',
    padding: '1.5rem',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  zoomIconBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '0.65rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    transform: 'scale(0.8)',
    transition: 'transform var(--transition-normal) ease',
  },
  overlayText: {
    color: '#ffffff',
    transform: 'translateY(10px)',
    transition: 'transform var(--transition-normal) ease',
  },
  overlayCategory: {
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--secondary-light)',
    letterSpacing: '0.1em',
    marginBottom: '0.25rem',
    display: 'block',
  },
  overlayTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: '#ffffff',
    lineHeight: 1.3,
    marginBottom: '0.4rem',
  },
  overlayDate: {
    fontSize: '0.78rem',
    color: '#cbd5e1',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '4rem 0',
    color: 'var(--text-secondary)',
  },
};

// Inject CSS styles for hover animation classes dynamically
if (typeof window !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .gallery-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    .gallery-card:hover img {
      transform: scale(1.05);
    }
    .gallery-card:hover .gallery-overlay {
      opacity: 1;
    }
    .gallery-card:hover .gallery-overlay div {
      transform: scale(1) translateY(0);
    }
  `;
  document.head.appendChild(styleEl);
}
