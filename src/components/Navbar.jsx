import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdAccountCircle,MdEmail } from "react-icons/md";
import { toast } from 'react-toastify';
const Navbar = ({ onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin();
    window.addEventListener("userLoggedIn", checkLogin);

    return () => {
      window.removeEventListener("userLoggedIn", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    window.location.reload();
  };

  const handleProfileClick = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/admin-profile");
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">E-Commerce</div>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for products..."
        />
      </div>

      {/* Desktop Buttons */}
      <div className="desktop-visible">
          <Link to="/"><FaHome /> Home</Link>
<Link to="/contact"><MdEmail /> Contact Us</Link>
<a onClick={handleProfileClick} style={{ cursor: "pointer" }}>
  <MdAccountCircle /> Profile
</a>


        {/* {!isLoggedIn ? (
          <button onClick={onLoginClick} className="login-button">
            Login
          </button>
        ) : (
          <button onClick={handleLogout} className="login-button">
            Logout
          </button>
        )} */}

        <FaShoppingCart
          className="cart-icon"
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger-wrapper">
        <button className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar-links active">
          <Link to="/"><FaHome /> Home</Link>
<Link to="/contact"><MdEmail /> Contact Us</Link>
<a onClick={handleProfileClick} style={{ cursor: "pointer" }}>
  <MdAccountCircle /> Profile
</a>


          {/* {!isLoggedIn ? (
            <button onClick={onLoginClick} className="login-button mobile-visible">
              Login
            </button>
          ) : (
            <button onClick={handleLogout} className="login-button mobile-visible">
              Logout
            </button>
          )} */}

          <FaShoppingCart
            className="cart-icon mobile-visible"
            onClick={() => navigate("/cart")}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
