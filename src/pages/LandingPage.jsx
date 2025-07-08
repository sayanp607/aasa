import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { useNavigate,Link } from 'react-router-dom'; 

import Footer from '../components/Footer';
import AnimationVideo from '../assets/VID-20250609-WA0066.mp4';
import './LandingPage.css';


const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
   const navigate = useNavigate();

     const handleClothsClick = () => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      navigate('/admin-cloths');
    } else if (role === 'user') {
      navigate('/user-cloths');
    } else {
      alert("Please login first");
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
      alert("Please login first");
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

    return () => {
      window.removeEventListener('openRegisterModal', openRegister);
      window.removeEventListener('openLoginModal', openLogin);
    };
  }, []);
  

  return (
    <div>
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />
      
      <main className="landing-container">
        <div className="sunlight-effect"></div>

        <div className="video-section">
          <video src={AnimationVideo} autoPlay loop muted playsInline className="landing-video" />
        </div>

        <div className="cards-section">
          <h1>Welcome to Our E-Commerce Site</h1>
          <p>Shop everything you need with ease!</p>

        <div className="cards-container">
  
  <div className="card-item theme-cloths" onClick={handleClothsClick}>
    <img src="/cloths.jpg" alt="Product Range" className="card-icon" />
    <div className="card-text">Cloths</div>
  </div>

  <div className="card-item theme-gifts" onClick={handlegiftsClick}>
    <img src="/gifts.jpg" alt="Gifts" className="card-icon" />
    <div className="card-text">Gifts</div>
  </div>

  <Link to="/pickup">
    <div className="card-item theme-pickup">
      <img src="/uber.jpg" alt="Pickup Service" className="card-icon" />
      <div className="card-text">Pickup & Drop</div>
    </div>
  </Link>

  <Link to="/delivery">
    <div className="card-item theme-delivery">
      <img src="/tours.jpg" alt="Delivery Service" className="card-icon" />
      <div className="card-text">Delivery Service</div>
    </div>
  </Link>

</div>

        </div>
      </main>

      <Footer />

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default LandingPage;
