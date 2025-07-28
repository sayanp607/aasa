import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';

function Admin() {
  const [form, setForm] = useState({
    title: '', location: '', region: '', difficulty: 'Easy',
    price: '', discountPrice: '', image: '', description: '', availableDates: []
  });

  const [dateInput, setDateInput] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateAdd = () => {
    if (dateInput && !form.availableDates.includes(dateInput)) {
      setForm(prev => ({ ...prev, availableDates: [...prev.availableDates, dateInput] }));
      setDateInput('');
    }
  };

  const handleDateRemove = (date) => {
    setForm(prev => ({
      ...prev,
      availableDates: prev.availableDates.filter(d => d !== date)
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/admintrip/trips`, form);
      alert('Trip created successfully!');
      setForm({
        title: '', location: '', region: '', difficulty: 'Easy',
        price: '', discountPrice: '', image: '', description: '', availableDates: []
      });
    } catch (err) {
      console.error(err);
      alert('Error creating trip');
    }
  };

  return (
    <div>
      <h2>Add New Trip</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="region" placeholder="Region" value={form.region} onChange={handleChange} />
        <select name="difficulty" value={form.difficulty} onChange={handleChange}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Difficult</option>
        </select>
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="discountPrice" type="number" placeholder="Discount Price" value={form.discountPrice} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <div>
          <h4>Available Dates</h4>
          <input
            type="date"
            value={dateInput}
            onChange={e => setDateInput(e.target.value)}
          />
          <button type="button" onClick={handleDateAdd}>Add Date</button>
          <ul>
            {form.availableDates.map((date, idx) => (
              <li key={idx}>
                {date} <button type="button" onClick={() => handleDateRemove(date)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
}

export default Admin;
