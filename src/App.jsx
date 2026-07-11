import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickDonateModal from './components/QuickDonateModal';
import ImageLightbox from './components/ImageLightbox';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Lightbox State
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
    }
  };

  const handleNextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
    }
  };

  // Render active page component
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onDonateClick={() => setIsDonateOpen(true)} setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'services':
        return <Services onDonateClick={() => setIsDonateOpen(true)} />;
      case 'gallery':
        return <Gallery onImageClick={handleOpenLightbox} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onDonateClick={() => setIsDonateOpen(true)} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onDonateClick={() => setIsDonateOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      <QuickDonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />

      {lightboxIndex !== null && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
        />
      )}
    </div>
  );
}

export default App;
