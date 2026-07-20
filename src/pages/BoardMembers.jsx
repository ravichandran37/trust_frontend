import React, { useState, useEffect } from 'react';
import { getBoardMembers } from '../utils/api';
import { User, Shield } from 'lucide-react';

export default function BoardMembers() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getBoardMembers();
        setMembers(data);
      } catch (err) {
        console.error('Error fetching board members:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div>
        <p>Loading Board Members...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', marginBottom: '1.5rem', backdropFilter: 'blur(10px)' }}>
            <Shield size={32} color="#fff" />
          </div>
          <h1 style={styles.heroTitle}>Our Board Members</h1>
          <p style={styles.heroSubtitle}>Meet the dedicated leaders guiding Annai Therasa Home towards a brighter future for the disabled community.</p>
        </div>
      </div>
      
      <div style={styles.contentSection}>
        {members.length === 0 ? (
          <div style={styles.emptyBox}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Coming Soon</h2>
            <p>Our board member profiles are currently being updated. Please check back later.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {members.map(member => (
              <div key={member.id} style={styles.card} className="card-glass">
                <div style={styles.imageContainer}>
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} style={styles.image} />
                  ) : (
                    <div style={styles.placeholderImage}>
                      <User size={64} color="var(--text-muted)" />
                    </div>
                  )}
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.name}>{member.name}</h3>
                  <p style={styles.role}>{member.role}</p>
                </div>
              </div>
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
    padding: '6rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: 'var(--gradient-primary)',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: '1rem',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.6,
  },
  contentSection: {
    flex: 1,
    padding: '5rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  emptyBox: {
    padding: '4rem',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-lg)',
    border: '1px dashed var(--border-color)',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2.5rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2.5rem 1.5rem',
    transition: 'all 0.3s ease',
  },
  imageContainer: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginBottom: '1.5rem',
    boxShadow: 'var(--shadow-md)',
    border: '4px solid var(--bg-base)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--bg-surface-hover)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  name: {
    fontSize: '1.4rem',
    color: 'var(--text-primary)',
    margin: 0,
  },
  role: {
    fontSize: '1rem',
    color: 'var(--primary)',
    fontWeight: 600,
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  }
};
