import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import './ShippingForm.css'; // ✅ Import the CSS file
import { toast } from 'react-toastify';

const ShippingForm = ({ onShippingSaved, inline = false }) => {
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
      toast.success('Shipping address saved!');
      onShippingSaved(res.data.shipping);  
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save address');
    }
  };

  const formContent = (
    <form className="shipping-form-container" onSubmit={handleSubmit}>
      <h3 className="shipping-form-title">Shipping Details</h3>
      
      <div className="shipping-form-grid">
        <div className="full-width">
          <input className="shipping-input" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        </div>
        
        <div className="full-width">
          <input className="shipping-input" name="phone" placeholder="Contact Phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="full-width">
          <input className="shipping-input" name="addressLine1" placeholder="Flat, House no., Building, Company" value={formData.addressLine1} onChange={handleChange} required />
        </div>

        <div className="full-width">
          <input className="shipping-input" name="addressLine2" placeholder="Area, Colony, Street, Sector, Village" value={formData.addressLine2} onChange={handleChange} />
        </div>

        <div className="third-width">
          <input className="shipping-input" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="third-width">
          <input className="shipping-input" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        </div>

        <div className="third-width">
          <input className="shipping-input" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
        </div>

        <div className="full-width">
          <input className="shipping-input" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        </div>
      </div>

      <button className="shipping-submit-btn" type="submit">Save & Continue</button>
    </form>
  );

  if (inline) {
    return (
      <div className="shipping-form-inline">
        {formContent}
      </div>
    );
  }

  return (
    <div className="shipping-popup-overlay">
      {formContent}
    </div>
  );
};

export default ShippingForm;
