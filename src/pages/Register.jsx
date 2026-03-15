import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { API_BASE_URL } from '../main';
import { toast } from 'react-toastify';

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    adminCode: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/delivery-users/register`, formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Registration Successful");
      if (res.data.user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {formData.role === "admin" && (
            <input
              type="password"
              name="adminCode"
              placeholder="Admin Secret Code"
              required
              value={formData.adminCode}
              onChange={handleChange}
            />
          )}

          <button type="submit">Register</button>
        </form>
        <div className="link-btn" onClick={() => navigate("/delivery")}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}
