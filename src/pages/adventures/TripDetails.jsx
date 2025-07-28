import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../main';

function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [userCount, setUserCount] = useState(1);
  const [form, setForm] = useState({
    phone: '',
    selectedDate: '',
    userNames: ['']
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/trips/${id}`)
      .then(res => setTrip(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e, index = null) => {
    if (e.target.name === 'userNames') {
      const updatedNames = [...form.userNames];
      updatedNames[index] = e.target.value;
      setForm({ ...form, userNames: updatedNames });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleAddUser = () => {
    setUserCount(prev => prev + 1);
    setForm(prev => ({
      ...prev,
      userNames: [...prev.userNames, '']
    }));
  };

  const handleRemoveUser = () => {
    if (userCount > 1) {
      setUserCount(prev => prev - 1);
      setForm(prev => ({
        ...prev,
        userNames: prev.userNames.slice(0, -1)
      }));
    }
  };

  const handleBooking = e => {
    e.preventDefault();
    const cartItem = {
      tripId: trip._id,
      tripTitle: trip.title,
      tripPrice: trip.discountPrice || trip.price,
      selectedDate: form.selectedDate,
      phone: form.phone,
      userNames: form.userNames
    };

    // Store in localStorage cart
    const existingCart = JSON.parse(localStorage.getItem('trip_cart')) || [];
    existingCart.push(cartItem);
    localStorage.setItem('trip_cart', JSON.stringify(existingCart));

    alert('Added to cart!');
    setForm({ phone: '', selectedDate: '', userNames: [''] });
    setUserCount(1);
  };

  if (!trip) return <p>Loading...</p>;

  return (
    <div>
      <h1>{trip.title}</h1>
      <img src={trip.image} alt={trip.title} width="400" />
      <p><strong>Location:</strong> {trip.location}</p>
      <p><strong>Price:</strong> ₹{trip.discountPrice || trip.price}</p>
      <p><strong>Difficulty:</strong> {trip.difficulty}</p>
      <p><strong>Description:</strong> {trip.description}</p>

      <h2>Book This Trip</h2>
      <form onSubmit={handleBooking}>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <select
          name="selectedDate"
          value={form.selectedDate}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Date --</option>
          {trip.availableDates?.map((d, i) => (
            <option key={i} value={d}>{new Date(d).toDateString()}</option>
          ))}
        </select>

        <div style={{ margin: '10px 0' }}>
          <button type="button" onClick={handleRemoveUser}>-</button>
          <span style={{ margin: '0 10px' }}>Users: {userCount}</span>
          <button type="button" onClick={handleAddUser}>+</button>
        </div>

        {form.userNames.map((name, index) => (
          <input
            key={index}
            type="text"
            name="userNames"
            placeholder={`User ${index + 1} Name`}
            value={name}
            onChange={(e) => handleChange(e, index)}
            required
          />
        ))}

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default TripDetail;
