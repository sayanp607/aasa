import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import './Auth.css';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const handleLogin = async () => {
    const isAdmin = email === 'admin@example.com';
    const endpoint = isAdmin
      ? `${API_BASE_URL}/api/admin/login`
      : `${API_BASE_URL}/api/user/login`;

    // If admin, show phone input and block login if empty
    if (isAdmin) {
      if (!showPhoneInput) {
        setShowPhoneInput(true);
        return; // Don't login yet
      }
      if (phone.trim() === '') {
        alert('Phone number is required for admin login');
        return;
      }
    }

    try {
      const res = await axios.post(endpoint, { email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', isAdmin ? 'admin' : 'user');
      if (isAdmin) {
        localStorage.setItem('adminPhone', phone);
      }

      window.dispatchEvent(new Event('userLoggedIn'));
      alert('Login successful');
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <span className="modal-close" onClick={onClose}>&times;</span>

        <h2>Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (e.target.value !== 'admin@example.com') {
              setShowPhoneInput(false);
              setPhone('');
            }
          }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {showPhoneInput && (
          <input
            placeholder="Admin Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        )}

        <button className="authbtn" onClick={handleLogin}>Login</button>

        <p className="logintxt">
          Don't have an account?{' '}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => {
              onClose();
              setTimeout(() => window.dispatchEvent(new Event('openRegisterModal')), 50);
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
