import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import { useNavigate } from 'react-router-dom';
import { FaCompass, FaCalendarDay, FaUsers, FaTag, FaRupeeSign, FaSuitcase } from 'react-icons/fa';
import './Profile.css';

const UsertripProfile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      setLoading(false);
      return;
    }

    const user = JSON.parse(userString);

    if (!user || !user.id) {
      console.error("User not logged in or malformed user data");
      setLoading(false);
      return;
    }

    axios.get(`${API_BASE_URL}/api/triporder/my-orders`, {
      headers: {
        'x-user-data': JSON.stringify(user),
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      setOrders(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to fetch orders:", err.response?.data || err.message);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="profile-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NavbarTrip />
        <div className="profile-header">
           <h2>Loading Dossier...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <NavbarTrip />
      
      <div className="profile-header">
        <FaCompass className="header-icon" />
        <h2>Adventurer Dashboard</h2>
        <p>A history of your expeditions and logged missions with HighHawks.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <h3>No Expeditions Logged</h3>
          <p>Your passport looks empty. Time to gear up for your next adventure.</p>
          <button className="hub-btn" onClick={() => navigate('/activity')}>Explore Treks</button>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <h3>{order.item?.activity || "Classified Expedition"}</h3>
                <span className="order-status">Confirmed</span>
              </div>

              <div className="order-info">
                <div className="info-item">
                  <div className="info-label">
                    <FaCalendarDay /> Deployment Date
                  </div>
                  <span>{order.item?.date || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <FaRupeeSign /> Trek Value
                  </div>
                  <span>₹{order.item?.pricePerHead || 0} / head</span>
                </div>
              </div>

              {order.item?.guests && order.item.guests.length > 0 && (
                <div className="guests-list">
                  <h4>Expedition Crew</h4>
                  <ul>
                    {order.item.guests.map((guest, i) => (
                      <li key={i} className="guest-tag">{guest.title} {guest.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="order-footer">
                <span className="order-date">
                  <FaTag /> ID: {order._id.slice(-6).toUpperCase()}
                </span>
                <span className="total-price">₹{order.item?.totalPrice || 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsertripProfile;
