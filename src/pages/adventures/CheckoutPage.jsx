import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const [customer, setCustomer] = useState({ firstName: '', lastName: '', email: '', address: '', phone: '' });
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem('trip_cart')) || [];
  setItems(storedCart);
}, []);

const total = items.reduce((sum, i) => sum + (i.tripPrice * i.userNames.length), 0);


  const handleChange = e => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleOrder = async e => {
    e.preventDefault();
    const res = await axios.post(`${API_BASE_URL}/api/triporder`, { customer, items, totalAmount: total, });
    navigate(`/confirmation/${res.data._id}`);
  };

  return (
    <div>
      <h2>Billing Details</h2>
      <form onSubmit={handleOrder}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />

        <h3>Total Payment: ₹{total}</h3>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
