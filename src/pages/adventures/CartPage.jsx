import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../main';
import './AdventureCommerce.css';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaUsers, FaFire, FaCampground, FaUtensils, FaTrash } from 'react-icons/fa';

const TripCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;

      const response = await axios.get(`${API_BASE_URL}/api/tripcart`, {
        headers: {
          'x-user-data': JSON.stringify(user),
        },
      });
      setCartItems(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const handleCheckout = (item) => {
    // For now, we allow checking out individual items as per previous logic
    navigate('/billing', { state: { item } });
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/tripcart/${itemId}`);
      fetchCart();
      toast.info("Item removed from cart");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="commerce-container animate-fade-in">
      <div className="commerce-header">
        <h2>Exploration Cart</h2>
        <p style={{ color: '#64748b', fontWeight: 600 }}>Review your upcoming expeditions</p>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#94a3b8' }}>Your cart is empty.</p>
          <button className="checkout-btn-cart" onClick={() => navigate('/adventurehome')} style={{ marginTop: '1.5rem' }}>Discover Adventures</button>
        </div>
      ) : (
        <div className="cart-grid">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-card">
              <div className="cart-info">
                <h3>{item.activity}</h3>
                <div className="cart-meta">
                  <span><FaCalendarAlt color="#10b981" /> {new Date(item.date).toDateString()}</span>
                  <span><FaUsers color="#10b981" /> {item.totalGuests} Participants</span>
                </div>
                {item.extras && (
                  <div className="cart-extras">
                    {item.extras.firecamp && <span className="extra-pill"><FaFire /> Firecamp</span>}
                    {item.extras.tentStay && <span className="extra-pill"><FaCampground /> Tent Stay</span>}
                    {item.extras.food && <span className="extra-pill"><FaUtensils /> Full Meals</span>}
                  </div>
                )}
              </div>
              <div className="cart-price-side">
                <span className="cart-total-value">₹{item.totalPrice}</span>
                <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                    <button className="checkout-btn-cart" onClick={() => handleCheckout(item)}>Checkout</button>
                    <button 
                      style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '12px', borderRadius: '15px', cursor: 'pointer' }}
                      onClick={() => removeItem(item._id)}
                    >
                        <FaTrash />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripCartPage;
