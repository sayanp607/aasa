import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { toast } from 'react-toastify';

export default function DriverLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/drivers/login`, form, { withCredentials: true });
      localStorage.setItem('token', res.data.token);
      toast.success('Driver Login Successful');
      navigate('/driver/dashboard');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Driver Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
