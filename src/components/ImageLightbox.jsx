import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ImageLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || currentIndex === undefined || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  return (
    <div style={lightboxStyles.backdrop} onClick={onClose} id="lightbox-backdrop">
      {/* Close button top right */}
      <button onClick={onClose} style={lightboxStyles.closeBtn} aria-label="Close Lightbox">
        <X size={28} />
      </button>

      {/* Navigation Controls */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }} 
        style={lightboxStyles.navBtn('left')}
        aria-label="Previous Image"
      >
        <ChevronLeft size={36} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }} 
        style={lightboxStyles.navBtn('right')}
        aria-label="Next Image"
      >
        <ChevronRight size={36} />
      </button>

      {/* Core Viewer Area */}
      <div style={lightboxStyles.contentContainer} onClick={(e) => e.stopPropagation()}>
        <div style={lightboxStyles.imageWrapper}>
          <img 
            src={currentImage.src} 
            alt={currentImage.title} 
            style={lightboxStyles.image}
            className="lightbox-zoom-in"
          />
        </div>

        {/* Caption Panel */}
        <div style={lightboxStyles.captionPanel}>
          <div style={lightboxStyles.headerRow}>
            <span style={lightboxStyles.categoryTag}>{currentImage.category}</span>
            <span style={lightboxStyles.date}>{currentImage.date}</span>
          </div>
          <h4 style={lightboxStyles.title}>{currentImage.title}</h4>
          <p style={lightboxStyles.desc}>{currentImage.description}</p>
        </div>
      </div>
    </div>
  );
}

const lightboxStyles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(11, 15, 23, 0.95)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2100,
    padding: '2rem',
    userSelect: 'none',
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: '#ffffff',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--transition-fast)',
    zIndex: 2200,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.05)',
    },
  },
  navBtn: (direction) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [direction === 'left' ? 'left' : 'right']: '30px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: 'none',
    color: '#ffffff',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--transition-fast)',
    zIndex: 2200,
    '@media (max-width: 768px)': {
      width: '44px',
      height: '44px',
      [direction === 'left' ? 'left' : 'right']: '10px',
    },
  }),
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    width: '100%',
    backgroundColor: '#131924',
    border: '1px solid #1e293b',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  imageWrapper: {
    width: '100%',
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#070a0f',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  captionPanel: {
    padding: '1.5rem',
    color: '#ffffff',
    backgroundColor: '#131924',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  categoryTag: {
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--secondary-light)',
  },
  date: {
    fontSize: '0.8rem',
    color: '#64748b',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '0.4rem',
  },
  desc: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
    lineHeight: 1.5,
  },
};

// Add dynamically injected styling for image scale zoom in and button hovering
if (typeof window !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @keyframes zoomIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .lightbox-zoom-in {
      animation: zoomIn 0.3s ease-out forwards;
    }
  `;
  document.head.appendChild(styleEl);
}
