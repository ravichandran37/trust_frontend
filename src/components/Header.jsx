import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Sun, Moon, User } from 'lucide-react';
import { getMenuOptions } from '../utils/api';

export default function Header({ currentPage, setCurrentPage, onDonateClick, theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuOptions, setMenuOptions] = useState([]);

  useEffect(() => {
    getMenuOptions().then(setMenuOptions).catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us', category: 'about_us' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    const clickedOption = menuOptions.find(o => o.linkId === pageId);
    
    if (clickedOption && clickedOption.category === 'about_us' && pageId !== 'board-members') {
      setCurrentPage('about');
      setTimeout(() => {
        const el = document.getElementById(pageId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentPage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <header style={headerStyles.header(isScrolled)}>
      <div className="container" style={headerStyles.navContainer}>
        {/* Logo */}
        <div style={headerStyles.logoContainer} onClick={() => handleNavClick('home')}>
          <img src="/logo.png" alt="Annai Therasa Home Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain', borderRadius: '6px' }} />
        </div>

        {/* Desktop Navigation */}
        <nav style={headerStyles.desktopNav}>
          {baseNavLinks.map((link) => {
            const subLinks = link.category ? menuOptions.filter(o => o.category === link.category) : [];
            const hasDropdown = subLinks.length > 0;
            return (
              <div key={link.id} className="nav-item-wrapper" style={{ position: 'relative' }}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  style={headerStyles.navLink(currentPage === link.id)}
                  id={`nav-link-${link.id}`}
                >
                  {link.label}
                  {currentPage === link.id && <div style={headerStyles.activeDot} />}
                </button>
                {hasDropdown && (
                  <div className="nav-dropdown" style={headerStyles.dropdownMenu}>
                    {subLinks.map(sub => (
                      <button 
                        key={sub.id} 
                        style={headerStyles.dropdownItem}
                        onClick={() => handleNavClick(sub.linkId)}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Actions (Theme toggle & Donate) */}
        <div style={headerStyles.actions}>
          <button
            onClick={() => handleNavClick('admin')}
            style={headerStyles.profileBtn}
            aria-label="Admin Portal"
            id="header-admin-btn"
          >
            <User size={20} color="var(--primary)" />
          </button>
          
          <button
            onClick={toggleTheme}
            style={headerStyles.themeToggle}
            aria-label="Toggle Theme"
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun size={20} color="var(--secondary-light)" /> : <Moon size={20} color="var(--primary)" />}
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={onDonateClick}
            style={headerStyles.donateBtn}
            id="header-donate-btn"
          >
            <Heart size={16} fill="currentColor" />
            <span>Donate</span>
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={headerStyles.menuToggle}
            aria-label="Toggle menu"
            id="mobile-menu-toggle-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div style={headerStyles.mobileMenu}>
          <div style={headerStyles.mobileMenuContent}>
            {baseNavLinks.map((link) => {
              const subLinks = link.category ? menuOptions.filter(o => o.category === link.category) : [];
              return (
                <React.Fragment key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    style={headerStyles.mobileNavLink(currentPage === link.id)}
                    id={`mobile-nav-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                  {subLinks.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => handleNavClick(sub.linkId)}
                      style={{...headerStyles.mobileNavLink(currentPage === sub.linkId), paddingLeft: '1.5rem', fontSize: '1rem'}}
                    >
                      - {sub.label}
                    </button>
                  ))}
                </React.Fragment>
              );
            })}
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onDonateClick();
              }}
              style={headerStyles.mobileDonateBtn}
            >
              <Heart size={16} fill="currentColor" />
              <span>Donate Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

const headerStyles = {
  header: (isScrolled) => ({
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
    height: isScrolled ? '70px' : '88px',
    backgroundColor: isScrolled ? 'var(--bg-surface-glass)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
    borderBottom: isScrolled ? '1px solid var(--border-glass)' : '1px solid transparent',
    display: 'flex',
    alignItems: 'center',
    transition: 'height var(--transition-normal), background-color var(--transition-normal), border-bottom var(--transition-normal)',
  }),
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    cursor: 'pointer',
    userSelect: 'none',
    flex: 1,
  },
  logoIcon: {
    backgroundColor: 'var(--primary)',
    padding: '0.45rem',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-md)',
  },
  logoText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.45rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
  },
  logoHighlight: {
    color: 'var(--secondary)',
  },
  desktopNav: {
    display: 'none',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  // Active states
  navLink: (isActive) => ({
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-body)',
    fontWeight: isActive ? 700 : 500,
    fontSize: '0.98rem',
    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
    cursor: 'pointer',
    padding: '0.5rem 0',
    position: 'relative',
    transition: 'color var(--transition-fast)',
  }),
  activeDot: {
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: 'var(--secondary)',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 1000,
    backgroundColor: 'var(--bg-surface)',
    minWidth: '200px',
    boxShadow: 'var(--shadow-lg)',
    borderRadius: 'var(--radius-md)',
    padding: '0.5rem 0',
    display: 'none',
    flexDirection: 'column',
    border: '1px solid var(--border-glass)',
  },
  dropdownItem: {
    background: 'none',
    border: 'none',
    padding: '0.75rem 1.25rem',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
    justifyContent: 'flex-end',
  },
  themeToggle: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    padding: '0.55rem',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--transition-fast)',
  },
  profileBtn: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    padding: '0.55rem',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--transition-fast)',
  },
  donateBtn: {
    display: 'none',
    padding: '0.65rem 1.4rem',
    fontSize: '0.9rem',
    borderRadius: 'var(--radius-md)',
  },
  menuToggle: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'var(--bg-surface)',
    borderBottom: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-lg)',
    animation: 'fadeIn 0.3s ease-out forwards',
  },
  mobileMenuContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem 2rem',
    gap: '1.25rem',
  },
  mobileNavLink: (isActive) => ({
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-body)',
    fontWeight: isActive ? 700 : 500,
    fontSize: '1.1rem',
    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
    cursor: 'pointer',
    textAlign: 'left',
    padding: '0.5rem 0',
  }),
  mobileDonateBtn: {
    width: '100%',
    marginTop: '0.5rem',
  },
};

// Add responsive media query logic inline or via component injection style
if (typeof window !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @media (min-width: 768px) {
      #mobile-menu-toggle-btn { display: none !important; }
      #header-donate-btn { display: inline-flex !important; }
      header nav { display: flex !important; }
    }
    .nav-item-wrapper:hover .nav-dropdown {
      display: flex !important;
    }
    .nav-dropdown button:hover {
      background-color: rgba(16, 185, 129, 0.1);
      color: var(--primary);
    }
  `;
  document.head.appendChild(styleEl);
}
