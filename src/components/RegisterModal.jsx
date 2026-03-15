import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import "./Auth.css"
import { toast } from 'react-toastify';
const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleRegister = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/user/register`, formData);
      toast.success('Registration successful');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

return (
  <div className="modal">
    <div className='modal-container'>
             <span className="modal-close" onClick={onClose}>&times;</span>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
      <button className='authbtn' onClick={handleRegister}>Register</button>
      <p className='logintxt'>
        Already have an account?{' '}
        <span onClick={() => {
          onClose();
          setTimeout(() => window.dispatchEvent(new Event('openLoginModal')), 50);
        }}>Login here</span>
      </p>
    </div>
  </div>
);

};

export default RegisterModal;
