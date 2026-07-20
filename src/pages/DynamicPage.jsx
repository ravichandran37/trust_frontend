import React, { useState, useEffect } from 'react';
import { getPage } from '../utils/api';

export default function DynamicPage({ pageId, pageTitle }) {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      try {
        const data = await getPage(pageId);
        setPageData(data);
      } catch (err) {
        console.error('Error fetching page:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (pageId) {
      fetchPage();
    }
  }, [pageId]);

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Fallback if page not created yet
  if (!pageData) {
    return (
      <div style={styles.container}>
        <div style={styles.heroSection}>
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>{pageTitle || pageId.replace('-', ' ').toUpperCase()}</h1>
          </div>
        </div>
        <div style={styles.contentSection}>
          <div style={styles.comingSoonBox}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Page Coming Soon</h2>
            <p>We are currently updating this section. Please check back later for more information about {pageTitle || pageId.replace('-', ' ')}.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div 
        style={{
          ...styles.heroSection,
          backgroundImage: pageData.heroImage ? `url(${pageData.heroImage})` : 'var(--gradient-primary)',
          backgroundColor: pageData.heroImage ? 'transparent' : 'var(--primary)',
        }}
      >
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{pageData.title}</h1>
        </div>
      </div>
      
      <div style={styles.contentSection}>
        {pageData.contentImage ? (
          <div style={styles.splitLayout}>
            <div style={styles.textContent}>
              {pageData.content.split('\n').map((paragraph, index) => (
                paragraph.trim() ? <p key={index} style={styles.paragraph}>{paragraph}</p> : null
              ))}
            </div>
            <div style={styles.imageContent}>
              <img src={pageData.contentImage} alt={pageData.title} style={styles.featuredImage} />
            </div>
          </div>
        ) : (
          <div style={styles.centeredLayout}>
            {pageData.content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? <p key={index} style={styles.paragraph}>{paragraph}</p> : null
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '80vh',
    backgroundColor: 'var(--bg-base)',
    display: 'flex',
    flexDirection: 'column',
  },
  loadingContainer: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-base)',
    color: 'var(--text-secondary)',
    gap: '1rem',
  },
  heroSection: {
    position: 'relative',
    padding: '6rem 2rem 4rem 2rem',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '30vh',
    background: 'var(--gradient-primary)',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    textTransform: 'capitalize',
  },
  contentSection: {
    flex: 1,
    padding: '4rem 2rem',
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%',
  },
  comingSoonBox: {
    padding: '3rem',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-lg)',
    border: '1px dashed var(--border-color)',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    boxShadow: 'var(--shadow-sm)',
  },
  splitLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'start',
  },
  centeredLayout: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  imageContent: {
    width: '100%',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)',
  },
  featuredImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'cover',
  },
  paragraph: {
    color: 'var(--text-primary)',
    lineHeight: 1.8,
    fontSize: '1.1rem',
    margin: 0,
  }
};
