import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../main';

function Home() {
  const [trips, setTrips] = useState([]);
  const [filters, setFilters] = useState({
    region: '',
    difficulty: '',
    date: ''
  });

  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/trips/search`, filters);
      setTrips(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/trips`)
      .then(res => setTrips(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Available Trips</h1>

      <form onSubmit={handleSearch}>
        <input type="text" name="region" placeholder="Region" onChange={handleChange} />
        <select name="difficulty" onChange={handleChange}>
          <option value="">-- Difficulty --</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Difficult">Difficult</option>
        </select>
        <input type="date" name="date" onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      <div className="trip-list">
        {trips.map(trip => (
          <div key={trip._id} className="trip-card">
            <img src={trip.image} alt={trip.title} width="200" />
            <h2>{trip.title}</h2>
            <p>Location: {trip.location}</p>
            <p>Price: ₹{trip.discountPrice || trip.price}</p>
            <Link to={`/trip/${trip._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
