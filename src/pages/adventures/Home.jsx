import React from 'react';
import { Link } from 'react-router-dom';
import './Hometrip.css';

function Home() {
  const trips = [
    {
      _id: '1',
      image: '/bandaje.jpg',
      title: 'Bandaje Falls Trek',
      location: 'Uttarakhand',
      price: 4999,
      rating: 4.5,
      reviews: 120,
      route: '/activity/Bandaje-Falls-Trek'
    },
    {
      _id: '2',
      image: '/netravati.jpg',
      title: 'Netravati Trek: Experience the Beauty of the Western Ghats',
      location: 'Uttarakhand',
      price: 6499,
      rating: 4.5,
      reviews: 120,
      route: '/activity/Netravati-Trek'
    },
    {
      _id: '3',
      image: '/monsoons.jpg',
      title: 'MONSOONS IN MALENADU',
      location: 'Himachal Pradesh',
      price: 7499,
      rating: 4.5,
      reviews: 120,
      route: '/activity/monsoons-in-malendu'
    },
    {
      _id: '4',
      image: '/waterfall.jpg',
      title: 'Waterfall Rappelling Expeditions',
      location: 'Maharashtra',
      price: 3999,
      rating: 4.5,
      reviews: 120,
      route: '/activity/waterfall-rappelling-expeditions'
    },
  ];

  return (
    <div className="home-container">
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

      <section className="hero-section">
        <div className="hero-text">
          <h1>HighHawks</h1>
          <p>Explore thrilling adventures</p>
        </div>
      </section>

      <section className="trip-list">
        <h2>Top Activities</h2>
        <div className="trip-grid">
          {trips.map((trip) => (
         <div key={trip._id} className="activity-card">
  <div className="activity-card-img">
    <span className="tag">Featured</span>
    <img src={trip.image} alt={trip.title} />
    <div className="card-badge">
      <img src="/aasa.jpg" alt="badge" />
    </div>
    <div className="activity-location">{trip.location}</div>
  </div>
  <div className="activity-card-details">
    <Link to={trip.route} className="activity-title-link">
      <h3>{trip.title}</h3>
    </Link>
    <div className="rating-reviews">
      <span className="stars">⭐ {trip.rating}</span>
      <span className="reviews">({trip.reviews} reviews)</span>
    </div>
    <div className="price-container">
      <span className="price-label">⚡ from</span>
      <span className="price">₹{trip.price}</span>
    </div>
  </div>
</div>

          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
