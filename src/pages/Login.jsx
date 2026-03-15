import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { API_BASE_URL } from "../main";
import { toast } from 'react-toastify';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/delivery-users/login`, formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful");
      if (res.data.user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
          
          <button type="submit">Login</button>
        </form>
        <div className="link-btn" onClick={() => navigate("/delivery-register")}>Don't have an account? Register</div>
      </div>
    </div>
  );
}
