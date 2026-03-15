import React from 'react';
import './Gallery.css';
import NavbarTrip from '../Navbartrip';

const galleryImages = [
  'https://images.unsplash.com/photo-1596395817260-262846878e3c?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1542401886-65d6c60db211?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1627850604058-52e40de1b847?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1433086466344-704ee390234a?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1544735032-6a71fd64446b?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&q=80&w=1200',
];

const Gallery = () => {
  return (
    <div className="gallery-container">
      <NavbarTrip/>
      
      <section className="gallery-hero">
        <div className="hero-content">
            <span className="subtitle">Visual Journals</span>
            <h1>The Expedition Archive</h1>
            <p>Capturing the raw essence of the Western Ghats, one frame at a time.</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="image-grid">
        {galleryImages.map((src, index) => (
          <div className="grid-item" key={index}>
            <img src={src} alt={`Expedition ${index + 1}`} loading="lazy" />
            <div className="image-overlay">
                <span>View Expedition</span>
            </div>
          </div>
        ))}
      </div>

      <section className="video-section-wrapper">
          <div className="container">
              <h2 className="section-title">Cinematic Stories</h2>
              <div className="video-section">
                <div className="video-card">
                    <iframe
                    src="https://www.youtube.com/embed/R6J_pva3eVc"
                    title="YouTube video 1"
                    allowFullScreen
                    ></iframe>
                </div>
                <div className="video-card">
                    <iframe
                    src="https://www.youtube.com/embed/d-edzWhSg1I"
                    title="YouTube video 2"
                    allowFullScreen
                    ></iframe>
                </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Gallery;
