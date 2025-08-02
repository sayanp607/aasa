import React from 'react';
import { Link } from 'react-router-dom';
import './Navbartrip.css';

const NavbarTrip = () => {
  return (
    <header className="navbar">
      <div className="logo">HighHawks</div>
      <nav className="nav-links">
        <Link to="/adventurehome">Home</Link>
        <Link to="/activity">Activities</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/about">About Us</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>
    </header>
  );
};

export default NavbarTrip ;
