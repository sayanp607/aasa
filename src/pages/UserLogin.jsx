import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import { useNavigate } from 'react-router-dom';
import './Form.css';

export default function UserLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/users/login`, form, { withCredentials: true });
      localStorage.setItem('token', res.data.token);
      alert('Login Successful');
      navigate('/book');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Rider Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Login</button>
        <p className="form-link">
        Don't have an account?{" "}
        <span onClick={() => navigate('/user/register')}>Register here</span>
      </p>
    </div>
  );
}
