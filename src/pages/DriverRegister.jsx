import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { toast } from 'react-toastify';

export default function DriverRegister() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    vehicleNumber: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/drivers/register`, form);
      toast.success('Driver Registered Successfully');
      navigate('/driver/dashboard');
    } catch (err) {
      toast.error('Error registering driver');
    }
  };

  return (
    <div className="form-container">
      <h2>Driver Registration</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
      <input name="vehicleType" placeholder="Vehicle Type" onChange={handleChange} /><br />
      <input name="vehicleNumber" placeholder="Vehicle Number" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Register</button>
        <p className="form-link">
        Already have an account?{" "}
        <span onClick={() => navigate('/driver/login')}>Login here</span>
      </p>
    </div>
  );
}
