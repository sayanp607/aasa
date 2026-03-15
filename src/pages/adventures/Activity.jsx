import React from "react";
import { Link } from "react-router-dom";
import "./Activity.css";
import NavbarTrip from "../Navbartrip";

const trips = [
  {
    _id: "1",
    image: "https://images.unsplash.com/photo-1596395817260-262846878e3c?auto=format&fit=crop&q=80&w=1000",
    title: "Bandaje Falls Trek",
    location: "Uttarakhand",
    price: 5999,
    rating: 4.5,
    reviews: 120,
    route: "/activity/Bandaje-Falls-Trek",
  },
  {
    _id: "2",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
    title: "Netravati Trek: Experience the Beauty of the Western Ghats",
    location: "Uttarakhand",
    price: 6999,
    rating: 4.5,
    reviews: 120,
    route: "/activity/Netravati-Trek",
  },
  {
    _id: "3",
    image: "https://images.unsplash.com/photo-1542401886-65d6c60db211?auto=format&fit=crop&q=80&w=2070",
    title: "MONSOONS IN MALENADU",
    location: "Himachal Pradesh",
    price: 8999,
    rating: 4.5,
    reviews: 120,
    route: "/activity/monsoons-in-malendu",
  },
  {
    _id: "4",
    image: "https://images.unsplash.com/photo-1627850604058-52e40de1b847?auto=format&fit=crop&q=80&w=2070",
    title: "Waterfall Rappelling Expeditions",
    location: "Maharashtra",
    price: 4999,
    rating: 4.5,
    reviews: 120,
    route: "/activity/waterfall-rappelling-expeditions",
  },
  {
    _id: "5",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070",
    title: "Wild Waterfall Rappelling Expeditions",
    location: "Maharashtra",
    price: 4999,
    rating: 4.5,
    reviews: 120,
    route: "/activity/wild-waterfall-rappelling-expeditions",
  },
  {
    _id: "6",
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=2070",
    title: "Gokarna Beach Trek and Honnavar Mangroves",
    location: "Maharashtra",
    price: 4999,
    rating: 4.5,
    reviews: 120,
    route: "/activity/gokarna-beach-trek",
  },
  {
    _id: "7",
    image: "https://images.unsplash.com/photo-1544735032-6a71fd64446b?auto=format&fit=crop&q=80&w=2070",
    title: "7 Valleys Trek Sirsi – A Scenic Adventure in Karnataka",
    location: "Maharashtra",
    price: 4999,
    rating: 4.5,
    reviews: 120,
    route: "/activity/valleys",
  },
  {
    _id: "8",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1974",
    title: "The Omkareshwara Trek: Embark on a Spiritual Journey.",
    location: "Maharashtra",
    price: 4999,
    rating: 4.5,
    reviews: 120,
    route: "/activity/trek",
  },
];

const ActivityPage = () => {
  return (
    <div className="activity-container">
      {/* Top Banner */}
      <NavbarTrip />
      <section className="activity-banner">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600"
          alt="Adventure Banner"
          className="activity-banner-image"
          loading="lazy"
        />
        <div className="activity-banner-overlay">
          <h2>Where are you going?</h2>
          <div className="activity-search-form">
            <input type="text" placeholder="Destination" />
            <input type="text" placeholder="From - To" />
            <input type="text" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
            <input
              type="text"
              placeholder="25/07/2025 12:00 am - 26/07/2025 11:59 pm"
            />
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
                <img src={trip.image} alt={trip.title} loading="lazy" />
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
