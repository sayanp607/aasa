import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../main";
import { useNavigate } from "react-router-dom";
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
      <div className="profile-header">
        <h2>My Ride History</h2>
        <button className="back-btn" onClick={() => navigate("/book")}>
          Back to Booking
        </button>
      </div>

      {rides.length === 0 ? (
        <p className="no-rides">No rides booked yet.</p>
      ) : (
        rides.map((ride) => (
          <div className="ride-card" key={ride._id}>
            <p><strong>Pickup:</strong> {ride.pickupAddress}</p>
            <p><strong>Drop:</strong> {ride.dropAddress}</p>
            <p><strong>Vehicle Type:</strong> {ride.vehicleType || "N/A"}</p>
            <p><strong>Distance:</strong> {ride.totalDistance} km</p>
            <p><strong>Price:</strong> ₹{ride.totalPrice}</p>
            <p><strong>Date:</strong> {new Date(ride.createdAt).toLocaleString()}</p>

            <p>
              <strong>Status:</strong>{" "}
              {ride.status === "Pending" && <span className="status pending">Pending</span>}
              {ride.status === "Accepted" && <span className="status accepted">Accepted</span>}
              {ride.status === "Rejected" && <span className="status rejected">Rejected</span>}
              {ride.status === "Completed" && <span className="status completed">Completed</span>}
            </p>

            {ride.otp && <p><strong>OTP:</strong> {ride.otp}</p>}
            {ride.driverId && <p><strong>Driver ID:</strong> {ride.driverId}</p>}
          </div>
        ))
      )}
    </div>
  );
}
