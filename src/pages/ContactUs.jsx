import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';
import { API_BASE_URL } from "../main";
const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return setStatus("Please fill in all fields");
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/contact/message`, formData);
      if (res.data.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus("Failed to send message");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred. Try again later.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} />

        <button type="submit">Send Message</button>
      </form>
      {status && <p className="status-msg">{status}</p>}
    </div>
  );
};

export default ContactUs;
