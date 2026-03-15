import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../main";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCar, FaRoute, FaRupeeSign, FaClock, FaHistory, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import "./UserProfile.css";

export default function UserProfilePickup() {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_BASE_URL}/api/rides/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRides(res.data);
  } catch (err) {
    console.error(err);
    alert("Failed to fetch ride history. Please login again.");
    localStorage.removeItem("token");
    navigate("/user/login");
  }
};


  return (
    <div className="profile-container">
      <div className="profile-header-section">
        <div className="header-top">
           <button className="back-btn-pill" onClick={() => navigate("/book")}>
            <FaArrowLeft /> Back to Booking
          </button>
        </div>
        <h2 className="profile-main-title">Ride History</h2>
        <p className="profile-subtitle">Track your recent journeys and mobility stats</p>
      </div>

      <div className="history-stats-overview">
         <div className="history-stat">
            <FaHistory className="stat-icon" />
            <div className="stat-data">
               <label>Total Rides</label>
               <span>{rides.length}</span>
            </div>
         </div>
      </div>

      {rides.length === 0 ? (
        <p className="no-rides">No rides booked yet.</p>
      ) : (
        rides.map((ride) => (
          <div className="ride-card" key={ride._id}>
            <div className="ride-card-header">
               <div className="vehicle-info">
                  <FaCar className="vehicle-icon" />
                  <span>{ride.vehicleType || "Ride"}</span>
               </div>
               <span className={`status-pill ${ride.status.toLowerCase()}`}>
                  {ride.status}
               </span>
            </div>

            <div className="route-flow">
               <div className="route-point pickup">
                  <FaMapMarkerAlt className="marker" />
                  <div className="point-text">
                     <label>Pickup</label>
                     <p>{ride.pickupAddress}</p>
                  </div>
               </div>
               <div className="route-line"></div>
               <div className="route-point drop">
                  <FaMapMarkerAlt className="marker" />
                  <div className="point-text">
                     <label>Drop</label>
                     <p>{ride.dropAddress}</p>
                  </div>
               </div>
            </div>

            <div className="ride-metrics-grid">
               <div className="metric-item">
                  <FaRoute />
                  <span>{ride.totalDistance} km</span>
               </div>
               <div className="metric-item">
                  <FaRupeeSign />
                  <span>{ride.totalPrice}</span>
               </div>
               <div className="metric-item">
                  <FaClock />
                  <span>{new Date(ride.createdAt).toLocaleDateString()}</span>
               </div>
            </div>

            <div className="ride-card-footer">
               {ride.otp && (
                  <div className="otp-badge">
                     <FaShieldAlt /> <span>OTP: {ride.otp}</span>
                  </div>
               )}
               <span className="timestamp">{new Date(ride.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
