import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdventureCommerce.css';
import { FaCheckCircle, FaLock, FaShieldAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const checkoutItem = location.state?.item;

  const [customer, setCustomer] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    address: '', 
    phone: '' 
  });
  const [showPopup, setShowPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (!checkoutItem) {
      navigate('/cart');
    }
  }, [checkoutItem, navigate]);

  const total = checkoutItem?.totalPrice || 0;

  const handleChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleOrder = async e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error("Session expired. Please login.");
      return;
    }

    try {
      const payload = {
        userId: user.id || user._id,
        billingInfo: customer,
        item: checkoutItem,
        totalAmount: total,
      };

      const res = await axios.post(`${API_BASE_URL}/api/triporder`, payload);
      setOrderDetails(res.data);
      setShowPopup(true);
      
      // Cleanup cart
      localStorage.removeItem('trip_cart');
    } catch (err) {
      console.error(err);
      toast.error("Failed to process mission order.");
    }
  };

  return (
    <div className="commerce-container animate-fade-in">
      <div className="commerce-header" style={{ textAlign: 'left' }}>
        <h2>Mission Deployment</h2>
        <p style={{ color: '#64748b', fontWeight: 600 }}>Secure billing and expedition confirmation</p>
      </div>

      <div className="checkout-layout">
        <div className="billing-zone">
          <form className="billing-form" onSubmit={handleOrder}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input name="firstName" placeholder="First Name" onChange={handleChange} required />
              <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
            </div>
            <input name="email" type="email" placeholder="Intelligence Email" onChange={handleChange} required />
            <input name="address" placeholder="Deployment Base Address" onChange={handleChange} required />
            <input name="phone" placeholder="Emergency Contact Number" onChange={handleChange} required />
            
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '20px', display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
              <FaShieldAlt color="#10b981" size={24} />
              <div>
                <span style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem' }}>Encrypted Checkout</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Your mission data is secured with AES-256 encryption.</span>
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              <FaLock style={{ marginRight: '10px' }} /> Confirm & Deploy
            </button>
          </form>
        </div>

        <div className="order-summary-box">
          <h3 style={{ fontWeight: 800, marginBottom: '2rem' }}>Order Summary</h3>
          <div className="summary-row">
            <span>{checkoutItem?.activity}</span>
            <span>₹{checkoutItem?.pricePerHead * checkoutItem?.totalGuests}</span>
          </div>
          <div className="summary-row">
            <span>Participants</span>
            <span>x{checkoutItem?.totalGuests}</span>
          </div>
          {checkoutItem?.extras?.firecamp && (
            <div className="summary-row">
              <span>Firecamp Extra</span>
              <span>₹500</span>
            </div>
          )}
          {checkoutItem?.extras?.tentStay && (
            <div className="summary-row">
              <span>Accomodation Extra</span>
              <span>₹1000</span>
            </div>
          )}
          {checkoutItem?.extras?.food && (
            <div className="summary-row">
              <span>Meals Extra</span>
              <span>₹{800 * checkoutItem?.totalGuests}</span>
            </div>
          )}
          
          <div className="summary-row total">
            <span>Total Payable</span>
            <span style={{ color: '#10b981' }}>₹{total}</span>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 }}>
          <div className="animate-slide-up" style={{ background: 'white', padding: '4rem', borderRadius: '40px', textAlign: 'center', maxWidth: '500px', width: '90%' }}>
            <FaCheckCircle color="#10b981" size={80} style={{ marginBottom: '2rem' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Mission Confirmed!</h2>
            <p style={{ color: '#64748b', fontWeight: 600, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
              Your expedition space has been secured. An intelligence briefing will be sent to your email shortly.
            </p>
            <div style={{ background: '#f1f5f9', padding: '1.5rem', borderRadius: '20px', marginBottom: '2.5rem', textAlign: 'left' }}>
               <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Logistics ID</span>
               <p style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.25rem' }}>#{orderDetails?._id.slice(-8).toUpperCase()}</p>
            </div>
            <button className="place-order-btn" style={{ background: '#10b981' }} onClick={() => navigate('/dashboard')}>
              Go to Command Center
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
