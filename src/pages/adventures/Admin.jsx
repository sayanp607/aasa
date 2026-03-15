import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import { useNavigate } from 'react-router-dom';
import './AdminAdventure.css';
import { toast } from 'react-toastify';
import { 
  FaPlus, 
  FaMountain, 
  FaChartLine, 
  FaUsersCog, 
  FaTrash, 
  FaCheck, 
  FaFire, 
  FaCampground, 
  FaUtensils 
} from 'react-icons/fa';

function Admin() {
  const [form, setForm] = useState({
    title: '', location: '', region: '', category: 'Trek', difficulty: 'Medium',
    price: '', discountPrice: '', image: '', description: '', 
    firecamp: false, tentStay: false, foodAndNightlife: false,
    availableDates: []
  });
  const [trips, setTrips] = useState([]);
  const [dateInput, setDateInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admintrip/trips`);
      setTrips(res.data);
    } catch (err) {
      console.error("Failed to fetch logistics data");
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const toggleFormExtra = (key) => {
    setForm(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDateAdd = () => {
    if (dateInput && !form.availableDates.includes(dateInput)) {
      setForm(prev => ({ ...prev, availableDates: [...prev.availableDates, dateInput] }));
      setDateInput('');
    }
  };

  const removeItem = (date) => {
    setForm(prev => ({ ...prev, availableDates: prev.availableDates.filter(d => d !== date) }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/admintrip/trips`, form);
      toast.success('Mission Log updated successfully!');
      setForm({
        title: '', location: '', region: '', category: 'Trek', difficulty: 'Medium',
        price: '', discountPrice: '', image: '', description: '', 
        firecamp: false, tentStay: false, foodAndNightlife: false,
        availableDates: []
      });
      fetchTrips();
    } catch (err) {
      console.error(err);
      toast.error('Error updating mission logs');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Decommission this expedition?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admintrip/trips/${id}`);
      fetchTrips();
      toast.info('Expedition decommissioned');
    } catch (err) {
      toast.error('Failed to decommission trip');
    }
  };

  return (
    <div className="admin-adventure-container animate-fade-in">
      <header className="admin-header">
        <div>
          <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>Command Center</span>
          <h2>Adventure Logistics</h2>
        </div>
        <button className="adm-btn-submit" onClick={() => navigate('/admin/orders')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaUsersCog /> Review All Missions
        </button>
      </header>

      <section className="admin-stats-grid">
        <div className="stat-card">
          <span className="label">Active Portfolios</span>
          <div className="value">{trips.length}</div>
        </div>
        <div className="stat-card">
          <span className="label">Unique Regions</span>
          <div className="value">{new Set(trips.map(t => t.region)).size || 1}</div>
        </div>
        <div className="stat-card">
            <span className="label">Expedition Volume</span>
            <div className="value"><FaChartLine color="#10b981" /> High</div>
        </div>
        <div className="stat-card">
            <span className="label">Status</span>
            <div className="value" style={{ color: '#10b981' }}>ONLINE</div>
        </div>
      </section>

      <div className="admin-main-grid">
        <div className="admin-section-card">
          <h3 style={{ marginBottom: '2rem', fontWeight: 800 }}>Forge New Expedition</h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <input name="title" placeholder="Expedition Title" value={form.title} onChange={handleChange} required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input name="location" placeholder="Primary Location" value={form.location} onChange={handleChange} required />
                <input name="region" placeholder="Operational Region" value={form.region} onChange={handleChange} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option>Trek</option>
                  <option>Water Sports</option>
                  <option>Rappelling</option>
                  <option>Culture</option>
                </select>
                <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Difficult</option>
                  <option>Extreme</option>
                </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input name="price" type="number" placeholder="Standard Cost" value={form.price} onChange={handleChange} required />
                <input name="discountPrice" type="number" placeholder="Intelligence Offer" value={form.discountPrice} onChange={handleChange} />
            </div>
            <input name="image" placeholder="Cinematic Image URL (8K)" value={form.image} onChange={handleChange} required />
            <textarea name="description" placeholder="Expedition Mission Brief (Description)" value={form.description} onChange={handleChange} rows="4" />
            
            <div>
                <h4 style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>EXPEDITION EXTRAS</h4>
                <div className="extras-toggle-grid">
                    <div className={`extra-toggle ${form.firecamp ? 'active' : ''}`} onClick={() => toggleFormExtra('firecamp')}>
                        <FaFire /> Firecamp
                    </div>
                    <div className={`extra-toggle ${form.tentStay ? 'active' : ''}`} onClick={() => toggleFormExtra('tentStay')}>
                        <FaCampground /> Tent Stay
                    </div>
                    <div className={`extra-toggle ${form.foodAndNightlife ? 'active' : ''}`} onClick={() => toggleFormExtra('foodAndNightlife')}>
                        <FaUtensils /> Full Food
                    </div>
                </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '1.5rem', borderRadius: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>DEPLOYMENT DATES</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="date" value={dateInput} onChange={e => setDateInput(e.target.value)} style={{ flex: 1 }} />
                <button type="button" onClick={handleDateAdd} className="adm-btn-submit" style={{ padding: '0 20px' }}><FaPlus /></button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1rem' }}>
                {form.availableDates.map((date, idx) => (
                  <span key={idx} className="extra-pill" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {date} <FaTrash onClick={() => removeItem(date)} style={{ cursor: 'pointer' }} />
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" className="adm-btn-submit" style={{ fontSize: '1.1rem' }}>Deploy Portfolio Item</button>
          </form>
        </div>

        <div className="admin-section-card">
          <h3 style={{ marginBottom: '2rem', fontWeight: 800 }}>Expedition Portfolio</h3>
          <div className="admin-trips-list">
            {trips.length === 0 ? <p style={{ color: '#94a3b8' }}>Portfolio is empty. Access Denied.</p> : (
              trips.map(trip => (
                <div key={trip._id} className="admin-trip-item">
                  <div>
                    <strong style={{ fontSize: '1.1rem', color: '#10b981' }}>{trip.title}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                      <FaMountain /> {trip.difficulty} | ₹{trip.price} | {trip.location}
                    </div>
                  </div>
                  <button className="adm-btn-danger" onClick={() => handleDelete(trip._id)}>DECOMMISSION</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
