import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Pick & Drop Service</h1>
      <div className="home-buttons">
        <button onClick={() => navigate('/user/register')}>Register as Rider</button>
        <button onClick={() => navigate('/driver/register')}>Register as Driver</button>
      </div>
    </div>
  );
}
