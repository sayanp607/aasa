import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../main';
import axios from 'axios';
import Modal from 'react-modal';
import './BillingPage.css';
import NavbarTrip from '../Navbartrip';
import { toast } from 'react-toastify';

const BillingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    // Basic validation
    if (!billingInfo.firstName || !billingInfo.email || !billingInfo.phone) {
      toast.warning("Please fill in the required fields.");
      return;
    }

    try {
      const userData = JSON.stringify(JSON.parse(localStorage.getItem("user")));

      await axios.post(`${API_BASE_URL}/api/triporder/place`, {
        item,
        billingInfo
      }, {
        headers: {
          'x-user-data': userData,
          'Content-Type': 'application/json'
        }
      });
      
      setIsModalOpen(true);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Order failed! Please check your connection.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/tripprofile');
  };

  if (!item) {
    return (
      <div className="billing-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NavbarTrip />
        <div className="billing-form-wrapper" style={{ textAlign: 'center' }}>
          <h2>No Active Expedition Found</h2>
          <p>Please select an adventure from the hub to proceed.</p>
          <button className="place-order-btn" onClick={() => navigate('/activity')}>Back to Hub</button>
        </div>
      </div>
    );
  }

  return (
    <div className="billing-container">
      <NavbarTrip />
      
      <div className="billing-grid">
        {/* Left: Billing Form */}
        <div className="billing-form-wrapper">
          <span className="logistics-tag" style={{ color: '#10b981', marginBottom: '1rem', display: 'block' }}>Logistics Phase 02</span>
          <h2>Billing Details</h2>
          <div className="billing-form">
            <div className="input-group">
                <label>First Name</label>
                <input name="firstName" placeholder="e.g. John" onChange={handleChange} value={billingInfo.firstName} />
            </div>
            <div className="input-group">
                <label>Last Name</label>
                <input name="lastName" placeholder="e.g. Doe" onChange={handleChange} value={billingInfo.lastName} />
            </div>
            <div className="input-group">
                <label>Expedition Primary Email</label>
                <input name="email" type="email" placeholder="john@example.com" onChange={handleChange} value={billingInfo.email} />
            </div>
            <div className="input-group">
                <label>Emergency Contact Phone</label>
                <input name="phone" placeholder="+91 00000 00000" onChange={handleChange} value={billingInfo.phone} />
            </div>
            <div className="input-group">
                <label>Base Camp Address</label>
                <input name="address" placeholder="Full residential address" onChange={handleChange} value={billingInfo.address} />
            </div>
            <button className="place-order-btn" onClick={placeOrder}>Confirm Expedition Dispatch</button>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="order-summary-wrapper">
          <h2>Expedition Summary</h2>
          <div className="summary-item">
            <div className="adventure-preview">
                <img src={item.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'} alt={item.activity} />
                <div>
                    <h3>{item.activity}</h3>
                    <p style={{ color: '#10b981', fontWeight: 700 }}>{item.date}</p>
                </div>
            </div>

            <div className="summary-details">
                <div className="detail-row">
                    <span>Base Fare (Per Head)</span>
                    <strong>₹{item.pricePerHead}</strong>
                </div>
                <div className="detail-row">
                    <span>Expedition Party</span>
                    <strong>{item.guests?.length || 1} Adventurer(s)</strong>
                </div>
                {item.extras && Object.entries(item.extras).some(([_, val]) => val) && (
                    <div className="detail-row" style={{ flexDirection: 'column', gap: '5px', marginTop: '10px' }}>
                        <span>Expedition Extras:</span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {item.extras.firecamp && <span className="cat" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Firecamp</span>}
                            {item.extras.tentStay && <span className="cat" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Tent Stay</span>}
                            {item.extras.food && <span className="cat" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Full Board</span>}
                        </div>
                    </div>
                )}
            </div>

            <div className="total-row">
                <span className="label">Total Investment</span>
                <span className="amount">₹{item.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Order Confirmation"
        className="success-modal"
        overlayClassName="overlay"
      >
        <span className="success-icon">🎉</span>
        <h2>Mission Successful!</h2>
        <p>Your expedition has been logged. A confirmation dossier will be sent to <strong>{billingInfo.email}</strong> shortly.</p>
        <button className="modal-btn" onClick={handleCloseModal}>Access Adventurer Profile</button>
      </Modal>
    </div>
  );
};

export default BillingPage;
