import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Hometrip.css";
import {
  FaSearch,
  FaHiking,
  FaWater,
  FaCloudRain,
  FaMapMarkerAlt,
  FaArrowRight,
  FaRegClock,
  FaCompass,
} from "react-icons/fa";

function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const trips = [
    {
      _id: "1",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
      title: "Bandaje Falls Expedition",
      location: "Chikmagalur",
      price: 4999,
      rating: 4.8,
      reviews: 156,
      category: "Trek",
      difficulty: "Moderate",
      season: "Monsoon/Winter",
      route: "/activity/Bandaje-Falls-Trek",
    },
    {
      _id: "2",
      image:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1200",
      title: "Netravati Peak Summit",
      location: "Kudremukh",
      price: 6499,
      rating: 4.9,
      reviews: 210,
      category: "Trek",
      difficulty: "Easy-Mod",
      season: "Winter",
      route: "/activity/Netravati-Trek",
    },
    {
      _id: "3",
      image:
        "https://images.unsplash.com/photo-1542401886-65d6c60db211?auto=format&fit=crop&q=80&w=1200",
      title: "Ethereal Malenadu Monsoons",
      location: "Western Ghats",
      price: 7499,
      rating: 4.7,
      reviews: 89,
      category: "Culture",
      difficulty: "Easy",
      season: "Monsoon",
      route: "/activity/monsoons-in-malendu",
    },
    {
      _id: "4",
      image:
        "https://images.unsplash.com/photo-1627850604058-52e40de1b847?auto=format&fit=crop&q=80&w=1200",
      title: "Extreme Waterfall Rappelling",
      location: "Kondane",
      price: 3999,
      rating: 4.6,
      reviews: 134,
      category: "Rappelling",
      difficulty: "Extreme",
      season: "Monsoon",
      route: "/activity/waterfall-rappelling-expeditions",
    },
  ];

  const categories = ["All", "Trek", "Rappelling", "Culture", "Water"];

  const filteredTrips = trips.filter((trip) => {
    const matchesFilter =
      activeFilter === "All" || trip.category === activeFilter;
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="home-container animate-fade-in">
      <header className="navbar">
        <div className="logo">HIGHHAWKS</div>
        <nav className="nav-links">
          <Link to="/adventurehome">Exploration</Link>
          <Link to="/activity">Adventures</Link>
          <Link to="/blog">Stories</Link>
          <Link to="/about">Our Roots</Link>
          <Link to="/gallery">Visions</Link>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-text">
          <span
            className="logistics-tag"
            style={{ color: "white", opacity: 0.8 }}
          >
            Boutique Travel Experience
          </span>
          <h1>UNBOUND</h1>
          <p>
            Discover the most cinematic landscapes and thrilling expeditions
            curated for the modern adventurer.
          </p>

          <div className="adventure-search-wrapper">
            <div className="search-input-group">
              <FaSearch className="search-icon" />
              <input
                placeholder="Search by destination or activity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="hero-search-btn">Discover</button>
          </div>
        </div>
      </section>

      <div className="filter-section">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat === "Trek" && <FaHiking />}
            {cat === "Water" && <FaWater />}
            {cat === "Rappelling" && <FaCompass />}
            {cat === "Culture" && <FaCloudRain />}
            {cat}
          </div>
        ))}
      </div>

      <section className="trip-list">
        <h2>Curated Expeditions</h2>
        <div className="trip-grid">
          {filteredTrips.map((trip) => (
            <div key={trip._id} className="activity-card">
              <div className="activity-card-img">
                <span className="tag">{trip.category}</span>
                <img src={trip.image} alt={trip.title} loading="lazy" />
                <div className="card-badge">
                  <img src="/aasa.jpg" alt="badge" />
                </div>
                <div className="difficulty-tag">{trip.difficulty}</div>
                <div className="activity-location">
                  <FaMapMarkerAlt /> {trip.location}
                </div>
              </div>

              <div className="activity-card-details">
                <Link to={trip.route} className="activity-title-link">
                  <h3>{trip.title}</h3>
                </Link>

                <div className="rating-reviews">
                  <span className="stars">★ {trip.rating}</span>
                  <span className="reviews">({trip.reviews} reviews)</span>
                </div>

                <div className="season-info">
                  <FaCloudRain /> Best: {trip.season}
                </div>

                <div className="price-container">
                  <div className="price-box">
                    <span className="label">Expedition Cost</span>
                    <span className="amount">₹{trip.price}</span>
                  </div>
                  <Link to={trip.route} className="view-btn">
                    Details{" "}
                    <FaArrowRight
                      style={{ marginLeft: "8px", fontSize: "0.7rem" }}
                    />
                  </Link>
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
