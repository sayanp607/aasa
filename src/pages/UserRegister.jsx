import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import { useNavigate,Link } from 'react-router-dom';
import './Form.css';

export default function UserRegister() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async () => {
    try {
        const res = await axios.post(`${API_BASE_URL}/api/users/register`, form, { withCredentials: true });
        alert('Registered Successfully!');
        navigate('/user/profile');
    } catch (err) {
        console.log(err.response?.data);  // See exact backend error
        alert(err.response?.data?.error || 'Error during registration');
    }
};


  return (
    <div className="form-container">
      <h2>Rider Registration</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Register</button>
          <p className="form-link">
        Already have an account?{" "}
        <span onClick={() => navigate('/user/login')}>Login here</span>
      </p>
    </div>
  );
}
