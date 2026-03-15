import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import './TripDetails.css';
import { toast } from 'react-toastify';
import { 
  FaMapMarkerAlt, 
  FaHiking, 
  FaCloudRain, 
  FaUsers, 
  FaCheckCircle, 
  FaFire, 
  FaCampground, 
  FaUtensils,
  FaCalendarAlt,
  FaArrowLeft
} from 'react-icons/fa';

function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [userCount, setUserCount] = useState(1);
  const [extras, setExtras] = useState({
    firecamp: false,
    tentStay: false,
    food: false
  });
  const [form, setForm] = useState({
    phone: '',
    selectedDate: '',
    userNames: ['']
  });

  useEffect(() => {
    // Standardizing the ID for hardcoded trips if needed
    axios.get(`${API_BASE_URL}/api/trips/${id}`)
      .then(res => setTrip(res.data))
      .catch(err => {
        console.error("API Fetch failed, using local discovery fallback");
        // High-fidelity fallback for hardcoded demo trips
        const fallbackTrips = {
          '1': { _id: '1', image: 'https://images.unsplash.com/photo-1596395817260-262846878e3c?auto=format&fit=crop&q=80&w=2070', title: 'Bandaje Falls Expedition', location: 'Chikmagalur', difficulty: 'Moderate', price: 4999 },
          '2': { _id: '2', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070', title: 'Netravati Peak Summit', location: 'Kudremukh', difficulty: 'Easy-Mod', price: 6499 },
          '3': { _id: '3', image: 'https://images.unsplash.com/photo-1542401886-65d6c60db211?auto=format&fit=crop&q=80&w=2070', title: 'Ethereal Malenadu Monsoons', location: 'Western Ghats', difficulty: 'Easy', price: 7499 },
          '4': { _id: '4', image: 'https://images.unsplash.com/photo-1627850604058-52e40de1b847?auto=format&fit=crop&q=80&w=2070', title: 'Extreme Waterfall Rappelling', location: 'Kondane', difficulty: 'Extreme', price: 3999 },
        };
        if (fallbackTrips[id]) setTrip(fallbackTrips[id]);
      });
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

  const updateParticipants = (delta) => {
    const newCount = Math.max(1, userCount + delta);
    setUserCount(newCount);
    
    const newNames = [...form.userNames];
    if (delta > 0) {
      newNames.push('');
    } else if (newNames.length > 1) {
      newNames.pop();
    }
    setForm({ ...form, userNames: newNames });
  };

  const toggleExtra = (key) => {
    setExtras(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateTotal = () => {
    if (!trip) return 0;
    const basePrice = trip.discountPrice || trip.price;
    let total = basePrice * userCount;
    
    if (extras.firecamp) total += 500;
    if (extras.tentStay) total += 1000;
    if (extras.food) total += 800 * userCount;
    
    return total;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error("Please login to book");
      return;
    }

    const cartItem = {
      tripId: trip._id,
      activity: trip.title,
      pricePerHead: trip.discountPrice || trip.price,
      totalPrice: calculateTotal(),
      date: form.selectedDate,
      phone: form.phone,
      totalGuests: userCount,
      guests: form.userNames.map(name => ({ title: 'Mr/Ms', name })),
      extras
    };

    try {
      // Modernize: Save to backend cart
      await axios.post(`${API_BASE_URL}/api/tripcart/add`, {
        userId: user.id,
        ...cartItem
      });
      
      // Also sync to local cart for checkout page compatibility
      const existingLocal = JSON.parse(localStorage.getItem('trip_cart')) || [];
      existingLocal.push(cartItem);
      localStorage.setItem('trip_cart', JSON.stringify(existingLocal));
      toast.success('Added to exploration cart!');
      navigate('/cart');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart');
    }
  };

  if (!trip) return (
    <div className="trip-detail-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="loader">Analyzing Expedition...</div>
    </div>
  );

  return (
    <div className="trip-detail-container animate-fade-in">
      <header className="trip-hero">
        <img src={trip.image} alt={trip.title} className="trip-hero-img" />
        <div className="trip-hero-overlay"></div>
        <div className="trip-hero-content">
          <button className="filter-pill" style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }} onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back to Discovery
          </button>
          <span className="trip-category-tag">Cinematic Expedition</span>
          <h1>{trip.title}</h1>
          <div className="trip-meta-grid">
            <div className="meta-item"><FaMapMarkerAlt /> {trip.location}, {trip.region || 'India'}</div>
            <div className="meta-item"><FaHiking /> {trip.difficulty} Difficulty</div>
            <div className="meta-item"><FaCloudRain /> Monsoon/Winter</div>
            <div className="meta-item"><FaUsers /> Guided Experience</div>
          </div>
        </div>
      </header>

      <main className="trip-main-content">
        <div className="trip-info-left">
          <section className="content-section">
            <h2>The Expedition</h2>
            <p>{trip.description || "Embark on a journey through the most pristine landscapes. Our curated expeditions focus on immersive experiences, blending physical challenge with spiritual tranquility. Discover the hidden gems of the Western Ghats with our expert guides who bring the terrain's history and ecology to life."}</p>
          </section>

          <section className="content-section">
            <h2>Expedition Itinerary</h2>
            <div className="itinerary-list">
              {[
                { day: "01", title: "The Ascent", desc: "Begin your journey from the base camp. Traverse through lush meadows and emerald forests." },
                { day: "02", title: "The Summit", desc: "Reach the peak at sunrise for a panoramic view of the clouds. Experience the peak of Malenadu." },
                { day: "03", title: "The Descent", desc: "Return through hidden waterfall trails and conclude the journey at the heritage home." }
              ].map(item => (
                <div key={item.day} className="itinerary-item">
                  <div className="day-marker">{item.day}</div>
                  <div className="day-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="content-section">
            <h2>HighHawks Intelligence</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="extra-item active"><FaCheckCircle color="#10b981" /> Expert Local Guides</div>
              <div className="extra-item active"><FaCheckCircle color="#10b981" /> Professional First-aid</div>
              <div className="extra-item active"><FaCheckCircle color="#10b981" /> Logistics Management</div>
              <div className="extra-item active"><FaCheckCircle color="#10b981" /> Carbon-neutral Travel</div>
            </div>
          </section>
        </div>

        <aside className="booking-sidebar">
          <div className="price-header">
            <span className="label">Investment Per Head</span>
            <div className="value">₹{trip.discountPrice || trip.price}</div>
          </div>

          <form className="booking-form" onSubmit={handleBooking}>
            <div className="form-group">
              <label><FaCalendarAlt /> Select Departure</label>
              <select name="selectedDate" value={form.selectedDate} onChange={handleChange} required>
                <option value="">-- Choose Date --</option>
                {trip.availableDates?.map((d, i) => (
                  <option key={i} value={d}>{new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</option>
                ))}
                {!trip.availableDates?.length && <option value="2024-10-20">20th October, 2024</option>}
              </select>
            </div>

            <div className="form-group">
              <label><FaUsers /> Expedition Participants</label>
              <div className="itinerary-item" style={{ alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '10px 20px', borderRadius: '15px' }}>
                <button type="button" className="day-marker" style={{ cursor: 'pointer', width: '35px', height: '35px' }} onClick={() => updateParticipants(-1)}>-</button>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{userCount}</span>
                <button type="button" className="day-marker" style={{ cursor: 'pointer', width: '35px', height: '35px' }} onClick={() => updateParticipants(1)}>+</button>
              </div>
            </div>

            <div className="form-group">
              <label>Expedition Extras</label>
              <div className="extra-options">
                <div className={`extra-item ${extras.firecamp ? 'active' : ''}`} onClick={() => toggleExtra('firecamp')}>
                  <div className="extra-info">
                    <span className="extra-name"><FaFire /> Firecamp setup</span>
                    <span className="extra-price">+₹500 flat</span>
                  </div>
                  {extras.firecamp && <FaCheckCircle color="#10b981" />}
                </div>
                <div className={`extra-item ${extras.tentStay ? 'active' : ''}`} onClick={() => toggleExtra('tentStay')}>
                  <div className="extra-info">
                    <span className="extra-name"><FaCampground /> Tent / Homestay</span>
                    <span className="extra-price">+₹1,000 flat</span>
                  </div>
                  {extras.tentStay && <FaCheckCircle color="#10b981" />}
                </div>
                <div className={`extra-item ${extras.food ? 'active' : ''}`} onClick={() => toggleExtra('food')}>
                  <div className="extra-info">
                    <span className="extra-name"><FaUtensils /> Full Meals Pack</span>
                    <span className="extra-price">+₹800 / head</span>
                  </div>
                  {extras.food && <FaCheckCircle color="#10b981" />}
                </div>
              </div>
            </div>

            <div className="booking-summary">
              <span style={{ fontWeight: 700, color: '#64748b' }}>Total Estimate</span>
              <span style={{ fontWeight: 900, fontSize: '1.5rem', color: '#10b981' }}>₹{calculateTotal()}</span>
            </div>

            <button type="submit" className="book-now-btn">Secure Expedition Space</button>
          </form>
        </aside>
      </main>
    </div>
  );
}

export default TripDetail;
