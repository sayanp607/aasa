import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import './ShippingForm.css'; // ✅ Import the CSS file

const ShippingForm = ({ onShippingSaved }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/shipping/add-shipping`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Shipping address saved!');
      onShippingSaved(res.data.shipping);  
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to save address');
    }
  };

  return (
    <div className="shipping-popup-overlay">
      <form className="shipping-form-container" onSubmit={handleSubmit}>
        <h3 className="shipping-form-title">Shipping Address</h3>
        <input className="shipping-input" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input className="shipping-input" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input className="shipping-input" name="addressLine1" placeholder="Address Line 1" value={formData.addressLine1} onChange={handleChange} required />
        <input className="shipping-input" name="addressLine2" placeholder="Address Line 2" value={formData.addressLine2} onChange={handleChange} />
        <input className="shipping-input" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input className="shipping-input" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input className="shipping-input" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
        <input className="shipping-input" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <button className="shipping-submit-btn" type="submit">Save Shipping</button>
      </form>
    </div>
  );
};

export default ShippingForm;
