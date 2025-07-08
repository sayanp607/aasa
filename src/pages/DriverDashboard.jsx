import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { API_BASE_URL } from "../main";
import "./DriverDashboard.css";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export default function DriverDashboard() {
  const [pendingRides, setPendingRides] = useState([]);
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [rejectedRides, setRejectedRides] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(API_BASE_URL);

    const setupSocket = () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        socket.current.emit("register_driver", decoded.id);
        fetchRides();
      } catch {
        console.error("Invalid token, please login again.");
      }
    };

    setupSocket();

    socket.current.on("ride_cancelled_by_user", (data) => {
      alert(`Ride ${data.rideId} is cancelled by user`);
      fetchRides();
    });

    window.addEventListener("storage", setupSocket);

    return () => {
      socket.current.disconnect();
      window.removeEventListener("storage", setupSocket);
    };
  }, []);

  const fetchRides = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/rides/all`, { headers: authHeader() });
      console.log("Ride API Response:", res.data);
      const pending = res.data.filter(r => r.status === "Pending");
      const accepted = res.data.filter(r => r.status === "Accepted" || r.status === "Completed");
      const rejected = res.data.filter(r => r.status === "Rejected");

      setPendingRides(pending);
      setAcceptedRides(accepted);
      setRejectedRides(rejected);
    } catch (err) {
      console.error("Failed to fetch rides", err);
    }
  };

  const shareLocation = (userId) => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.watchPosition((position) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      socket.current.emit("driver_location", { userId, coords });
    });
  };

  const handleAccept = async (rideId, userId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/rides/accept/${rideId}`, {}, { headers: authHeader() });
      fetchRides();
      shareLocation(userId);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to accept ride");
      fetchRides();
    }
  };

  const handleComplete = async (rideId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/rides/complete/${rideId}`, {}, { headers: authHeader() });
      fetchRides();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to complete ride");
      fetchRides();
    }
  };

  const handleReject = async (rideId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/rides/reject/${rideId}`, {}, { headers: authHeader() });
      fetchRides();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to reject ride");
      fetchRides();
    }
  };

  const handleDelete = async (rideId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/rides/delete/${rideId}`, { headers: authHeader() });
      fetchRides();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete ride");
      fetchRides();
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Driver Dashboard</h2>

      <div className="tab-container">
        <button
          className={activeTab === "pending" ? "tab active" : "tab"}
          onClick={() => setActiveTab("pending")}
        >
          Pending Rides
        </button>
        <button
          className={activeTab === "accepted" ? "tab active" : "tab"}
          onClick={() => setActiveTab("accepted")}
        >
          Accepted / Completed
        </button>
        <button
          className={activeTab === "rejected" ? "tab active" : "tab"}
          onClick={() => setActiveTab("rejected")}
        >
          Rejected Rides
        </button>
      </div>

      {activeTab === "pending" && (
        <div className="rides-section">
          {pendingRides.length === 0 ? (
            <p>No pending rides.</p>
          ) : (
            pendingRides.map((ride) => (
              <div className="ride-card pending" key={ride._id}>
                <p><strong>Pickup:</strong> {ride.pickupAddress}</p>
                <p><strong>Drop:</strong> {ride.dropAddress}</p>
                <p><strong>Distance:</strong> {ride.totalDistance} km</p>
                <p><strong>Price:</strong> ₹{ride.totalPrice}</p>
                <p><strong>Vehicle:</strong> {ride.vehicleType}</p>
                  <p><strong>Phone No:</strong> {ride.phone}</p>
                <p><strong>Date:</strong> {new Date(ride.createdAt).toLocaleString()}</p>
                <button onClick={() => handleAccept(ride._id, ride.userId)}>Accept</button>
                <button onClick={() => handleReject(ride._id)}>Reject</button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "accepted" && (
        <div className="rides-section">
          {acceptedRides.length === 0 ? (
            <p>No accepted/completed rides.</p>
          ) : (
            acceptedRides.map((ride) => (
              <div className="ride-card accepted" key={ride._id}>
                <p><strong>Pickup:</strong> {ride.pickupAddress}</p>
                <p><strong>Drop:</strong> {ride.dropAddress}</p>
                <p><strong>Distance:</strong> {ride.totalDistance} km</p>
                <p><strong>Price:</strong> ₹{ride.totalPrice}</p>
                <p><strong>Vehicle:</strong> {ride.vehicleType}</p>
                <p><strong>Phone No:</strong> {ride.phone}</p>


                <p><strong>Date:</strong> {new Date(ride.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> {ride.status === "Completed" ? "Completed" : "Accepted"}</p>
                <p><strong>OTP:</strong> {ride.otp}</p>
                {ride.status !== "Completed" && (
                  <button onClick={() => handleComplete(ride._id)}>Mark as Completed</button>
                )}
                <button onClick={() => handleDelete(ride._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "rejected" && (
        <div className="rides-section">
          {rejectedRides.length === 0 ? (
            <p>No rejected rides.</p>
          ) : (
            rejectedRides.map((ride) => (
              <div className="ride-card rejected" key={ride._id}>
                <p><strong>Pickup:</strong> {ride.pickupAddress}</p>
                <p><strong>Drop:</strong> {ride.dropAddress}</p>
                <p><strong>Distance:</strong> {ride.totalDistance} km</p>
                <p><strong>Price:</strong> ₹{ride.totalPrice}</p>
                <p><strong>Vehicle:</strong> {ride.vehicleType}</p>
                  <p><strong>Phone No:</strong> {ride.phone}</p>
                <p><strong>Date:</strong> {new Date(ride.createdAt).toLocaleString()}</p>
                <p className="rejected-status"><strong>Status:</strong> Rejected</p>
                <button onClick={() => handleDelete(ride._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
