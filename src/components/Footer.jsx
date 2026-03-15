import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>AASA</h2>
            <p>Your premium destination for luxury clothing, unique gifts, and seamless services.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <div className="footer-links">
              <a href="/pickup">Pick & Drop</a>
              <a href="/delivery">Delivery</a>
              <a href="/adventures">Adventures</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AASA. All rights reserved.</p>
          <div className="social-links">
            {/* Social icons could be added here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
