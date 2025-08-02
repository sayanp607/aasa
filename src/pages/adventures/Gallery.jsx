import React from 'react';
import './Gallery.css';
import NavbarTrip from '../Navbartrip';

const galleryImages = [
  '/blog1.jpeg', '/blog2.png', '/blog3.jpg',
  '/blog4.png', '/blog5.jpg', '/blog6.jpeg',
  '/blog7.jpg', '/blog8.jpg', '/blog9.jpg',
  '/blog10.jpg', '/blog1.jpeg', '/blog2.png'
];

const Gallery = () => {
  return (
    <div className="gallery-container">
      <NavbarTrip/>
      {/* Full Width Top Image */}
      <div className="top-image">
        <img src="/gifts.jpg" alt="Top Visual" />
      </div>

      {/* Gallery Grid */}
      <div className="image-grid">
        {galleryImages.map((src, index) => (
          <div className="grid-item" key={index}>
            <img src={src} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* YouTube Videos */}
      <div className="video-section">
        <iframe
          src="https://www.youtube.com/embed/R6J_pva3eVc"
          title="YouTube video 1"
          allowFullScreen
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/d-edzWhSg1I"
          title="YouTube video 2"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Gallery;
