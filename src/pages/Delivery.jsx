import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Delivery() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role === 'user') {
      navigate('/dashboard');
    } else if (role === 'admin') {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Delivery Service</h1>
      <h3 className='home-title'>Please Login to place your deliveries.</h3>
    </div>
  );
}
