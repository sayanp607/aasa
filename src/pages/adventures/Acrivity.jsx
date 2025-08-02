import React from 'react';
import { Link } from 'react-router-dom';
import './Activity.css';
import NavbarTrip from '../Navbartrip';

const trips = [
  {
    _id: '1',
    image: '/bandaje.jpg',
    title: 'Bandaje Falls Trek',
    location: 'Uttarakhand',
    price: 5999,
     rating: 4.5,
    reviews: 120,
    route: '/activity/Bandaje-Falls-Trek',
  },
  {
    _id: '2',
    image: '/netravati.jpg',
    title: 'Netravati Trek: Experience the Beauty of the Western Ghats',
    location: 'Uttarakhand',
    price: 6999,
     rating: 4.5,
    reviews: 120,
    route: '/activity/Netravati-Trek',
  },
  {
    _id: '3',
    image: '/monsoons.jpg',
    title: 'MONSOONS IN MALENADU',
    location: 'Himachal Pradesh',
    price: 8999,
     rating: 4.5,
    reviews: 120,
    route: '/activity/monsoons-in-malendu',
  },
  {
    _id: '4',
    image: '/waterfall.jpg',
    title: 'Waterfall Rappelling Expeditions',
    location: 'Maharashtra',
    price: 4999,
     rating: 4.5,
    reviews: 120,
    route: '/activity/waterfall-rappelling-expeditions',
  },
  {
    _id: '5',
    image: '/wild.jpg',
    title: 'Wild Waterfall Rappelling Expeditions',
    location: 'Maharashtra',
    price: 4999,
     rating: 4.5,
    reviews: 120,
    route: '/activity/wild-waterfall-rappelling-expeditions',
  },
  {
    _id: '6',
    image: '/gokarna.jpg',
    title: 'Gokarna Beach Trek and Honnavar Mangroves',
    location: 'Maharashtra',
    price: 4999,
     rating: 4.5,
    reviews: 120,
    route: '/activity/gokarna-beach-trek',
  },
  {
    _id: '7',
    image: '/valleys.png',
    title: '7 Valleys Trek Sirsi – A Scenic Adventure in Karnataka',
    location: 'Maharashtra',
    price: 4999,
     rating: 4.5,
    reviews: 120,
    route: '/activity/valleys',
  },
  {
    _id: '8',
    image: '/omkareshwara.jpg',
    title: 'The Omkareshwara Trek: Embark on a Spiritual Journey.',
    location: 'Maharashtra',
    price: 4999,
     rating: 4.5,
    reviews: 120,
    route: '/activity/trek',
  },
];

const ActivityPage = () => {
  return (
    <div className="activity-container">
      {/* Top Banner */}
      <NavbarTrip/>
      <section className="activity-banner">
        <img src="/bandaje.jpg" alt="Banner" className="activity-banner-image" />
        <div className="activity-banner-overlay">
          <h2>Where are you going?</h2>
          <div className="activity-search-form">
            <input type="text" placeholder="Destination" />
            <input type="text" placeholder="From - To" />
            <input type="text" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
            <input type="text" placeholder="25/07/2025 12:00 am - 26/07/2025 11:59 pm" />
            <button className="search-btn">Advance More</button>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="activity-grid-wrapper">
        <h2 className="section-title">All Activities</h2>
        <div className="activity-grid">
          {trips.map((trip) => (
            <div key={trip._id} className="activity-card">
              <div className="activity-card-img">
                <span className="tag">Featured</span>
                <img src={trip.image} alt={trip.title} />
                   {/* 🔵 NEW: Small floating badge under image */}
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
};

export default ActivityPage;
