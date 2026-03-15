import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { useNavigate, Link } from 'react-router-dom'; 
import { CgProfile } from "react-icons/cg";
import { FaTshirt, FaShippingFast, FaMapMarkedAlt, FaShieldAlt } from 'react-icons/fa';
import Footer from '../components/Footer';
import './LandingPage.css';
import { toast } from 'react-toastify';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  // Category Configuration
  const initialCategories = [
    {
      id: 'cloths',
      title: 'Clothing Amour',
      badge: 'Collection',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop',
      action: () => handleClothsClick()
    },
    {
      id: 'gifts',
      title: 'Gifting Items',
      badge: 'Curated',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2030&auto=format&fit=crop',
      action: () => handlegiftsClick()
    },
    {
      id: 'pickup',
      title: 'Pick & Drop',
      badge: 'Seamless',
      image: 'https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1974&auto=format&fit=crop',
      action: () => navigate('/pickup')
    },
    {
      id: 'delivery',
      title: 'Delivery Service',
      badge: 'Reliable',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
      action: () => navigate('/delivery')
    },
    {
      id: 'adventures',
      title: 'Adventures',
      badge: 'Thrilling',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
      action: () => navigate('/adventures')
    }
  ];

  const [categories, setCategories] = useState(initialCategories);

  const handleClothsClick = () => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      navigate('/admin-cloths');
    } else if (role === 'user') {
      navigate('/user-cloths');
    } else {
      toast.info("Please login first");
      setShowLogin(true);
    }
  };

  const handlegiftsClick = () => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      navigate('/admin-gifts');
    } else if (role === 'user') {
      navigate('/user-gifts');
    } else {
      toast.info("Please login first");
      setShowLogin(true);
    }
  };

  useEffect(() => {
    const openRegister = () => {
      setShowLogin(false);
      setShowRegister(true);
    };
    const openLogin = () => {
      setShowRegister(false);
      setShowLogin(true);
    };

    window.addEventListener('openRegisterModal', openRegister);
    window.addEventListener('openLoginModal', openLogin);

    // Rotation Logic (Queue System) - Faster 5s Rotation
    const interval = setInterval(() => {
      setCategories(prev => {
        const newArr = [...prev];
        const first = newArr.shift();
        newArr.push(first);
        return newArr;
      });
    }, 5000); // 5 seconds

    return () => {
      window.removeEventListener('openRegisterModal', openRegister);
      window.removeEventListener('openLoginModal', openLogin);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />
      
      <main className="landing-container">
        {/* Hero Section */}
        <div className="top-section">
          <div className="feature-cluster">
            <div className="feature-card floating-1" onClick={handleClothsClick}>
              <div className="feature-icon-wrapper fashion">
                <FaTshirt />
              </div>
              <div className="feature-info">
                <h4>Fashion</h4>
                <p>Premium Wear</p>
              </div>
            </div>

            <div className="feature-card floating-2" onClick={() => navigate('/delivery')}>
              <div className="feature-icon-wrapper delivery">
                <FaShippingFast />
              </div>
              <div className="feature-info">
                <h4>Express</h4>
                <p>Live Tracking</p>
              </div>
            </div>

            <div className="feature-card floating-3" onClick={() => navigate('/adventures')}>
              <div className="feature-icon-wrapper adventure">
                <FaMapMarkedAlt />
              </div>
              <div className="feature-info">
                <h4>Explore</h4>
                <p>Global Trips</p>
              </div>
            </div>

            <div className="feature-card floating-4">
              <div className="feature-icon-wrapper trust">
                <FaShieldAlt />
              </div>
              <div className="feature-info">
                <h4>Secure</h4>
                <p>Trusted Service</p>
              </div>
            </div>
            
            {/* Visual background element */}
            <div className="cluster-glow"></div>
          </div>

          <div className="cards-section">
            <h1 className="hero-title gradient-text">A Modern Experience</h1>
            <p className="hero-subtitle">Discover premium collections, seamless services, and unique treasures all in one place.</p>

            {/* Delivery Box */}
            <div className="delivery-box">
              <h3 className="delivery-title">One Platform, Infinite Possibilities</h3>

              <div className="delivery-categories">
                <div className="delivery-item">
                  <img src="/fresh.jpg" alt="Fresh" />
                  <div className="delivery-label">FRESH</div>
                </div>
                <div className="delivery-item">
                  <img src="/grocery.jpg" alt="Grocery" />
                  <div className="delivery-label">GROCERY</div>
                </div>
                <div className="delivery-item">
                  <img src="/e-commerce.jpg" alt="E-Commerce" />
                  <div className="delivery-label">SHOP</div>
                </div>
                <div className="delivery-item">
                  <img src="/medicine.jpg" alt="Medicine" />
                  <div className="delivery-label">MEDS</div>
                </div>
              </div>

              <p className="delivery-note">
                Serving JSW Townships, Toranagallu, and Bellary with premium speed and care.
              </p>

              {localStorage.getItem('token') ? (
                <button
                  className="btn-premium"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    toast.success("Logged out successfully");
                    window.dispatchEvent(new Event("userLoggedIn"));
                    window.location.reload();
                  }}
                >
                  LOG OUT
                </button>
              ) : (
                <button
                  className="btn-premium"
                  onClick={() => setShowLogin(true)}
                >
                  GET STARTED
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Grid - Rotating Bento Queue */}
        <div className="cards-container">
          {categories.map((cat, index) => (
            <div 
              key={cat.id}
              className={`card-item hover-lift ${index === 0 ? 'featured-card' : ''}`}
              onClick={cat.action}
            >
              <img src={cat.image} alt={cat.title} className="card-icon" />
              <div className="card-overlay">
                <div className="card-badge">{cat.badge}</div>
                <div className="card-text">{cat.title}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default LandingPage;
