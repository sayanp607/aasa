import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import './Auth.css';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (isAdmin = false) => {
    try {
      const endpoint = isAdmin
        ? `${API_BASE_URL}/api/admin/login`
        : `${API_BASE_URL}/api/user/login`;
      const res = await axios.post(endpoint, { email, password });
        const { token,user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', isAdmin ? 'admin' : 'user');
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
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='authbtn' onClick={() => handleLogin(false)}>Login as User</button>
        <button className='authbtnadmin' onClick={() => handleLogin(true)}>Login as Admin</button>

        <p className='logintxt'>
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
