import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { API_BASE_URL } from "../main";
import { useNavigate } from "react-router-dom";
import "./BookRide.css";
import { toast } from 'react-toastify';
import { FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaMotorcycle, FaCar, FaArrowLeft, FaCheckCircle, FaTimes, FaLocationArrow, FaPaperPlane } from "react-icons/fa";
import AddressAutocomplete from "../components/AddressAutocomplete";

export default function BookRide() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [locationPopupDismissed, setLocationPopupDismissed] = useState(false);
  const [dropCoords, setDropCoords] = useState(null);
  const [vehicleType, setVehicleType] = useState("");
  const [price, setPrice] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  const [step, setStep] = useState("check");
  const [rideStatus, setRideStatus] = useState(() => localStorage.getItem("ride_status"));
  const [otp, setOtp] = useState(() => localStorage.getItem("ride_otp"));
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedbackText] = useState("");
  const [hasAutoFilledLocation, setHasAutoFilledLocation] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const [driverPhone, setDriverPhone] = useState(() => localStorage.getItem("ride_driver_phone"));

  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const pickupRef = useRef();
  const dropRef = useRef();
  const socket = useRef(null);
  const pickupMarker = useRef(null);
  const dropMarker = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Please login");
      navigate("/user/login");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        toast.error("Session expired, please login again.");
        localStorage.removeItem("token");
        navigate("/user/login");
        return;
      }

      socket.current = io(API_BASE_URL);
      socket.current.emit("register_user", decoded.id);

      socket.current.on("ride_accepted", (data) => {
        setOtp(data.otp);
        setDriverPhone(data.driverPhone);
        setRideStatus("Accepted");
        localStorage.setItem("ride_otp", data.otp);
        localStorage.setItem("ride_driver_phone", data.driverPhone);
        localStorage.setItem("ride_status", "Accepted");
        toast.success(`Trip Accepted! Driver Phone: ${data.driverPhone}`);
      });

      socket.current.on("ride_rejected", () => {
        toast.info("Your ride request was not accepted. Please try again.");
        setRideStatus("Rejected");
        localStorage.setItem("ride_status", "Rejected");
        setOtp(null);
        setDriverPhone(null);
      });

      socket.current.on("ride_completed", () => {
        console.log("Ride completed event received");
        toast.success("Trip Finished! Please rate your experience.");
        setRideStatus("Completed");
        localStorage.setItem("ride_status", "Completed");
        setOtp(null);
        setDriverPhone(null);
      });

    } catch {
      toast.error("Session invalid, please login again.");
      localStorage.removeItem("token");
      navigate("/user/login");
    }

    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [navigate]);

  useEffect(() => {
    // Redirect to home if user uses browser back button
    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    
    // Push a current state so that the next back navigation triggers popstate
    window.history.pushState(null, null, window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    let initInterval = setInterval(() => {
      if (
        window.google && 
        window.google.maps && 
        mapContainerRef.current 
      ) {
        console.log("Map Env READY");
        clearInterval(initInterval);
        initializeMap();
      }
    }, 100);

    return () => clearInterval(initInterval);
  }, []);

  const initializeMap = () => {
    map.current = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 12.9716, lng: 77.5946 },
      zoom: 12,
      disableDefaultUI: true,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      ],
    });
  };

  const updateMarker = (type, coords) => {
    if (!map.current) return;
    if (type === "pickup") {
      if (pickupMarker.current) pickupMarker.current.setMap(null);
      pickupMarker.current = new window.google.maps.Marker({
        position: coords,
        map: map.current,
        title: "Pickup",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#0ea5e9',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#fff',
          scale: 8
        }
      });
    } else {
      if (dropMarker.current) dropMarker.current.setMap(null);
      dropMarker.current = new window.google.maps.Marker({
        position: coords,
        map: map.current,
        title: "Drop",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#ef4444',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#fff',
          scale: 8
        }
      });
    }
    map.current.setCenter(coords);
  };

  useEffect(() => {
    const fetchDistance = async () => {
      if (pickupCoords && dropCoords) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/rides/distance`, {
            params: {
              pickupLat: pickupCoords.lat,
              pickupLng: pickupCoords.lng,
              dropLat: dropCoords.lat,
              dropLng: dropCoords.lng,
            },
          });
          const data = response.data;
          if (data.rows[0].elements[0].status === "OK") {
            const km = parseFloat(data.rows[0].elements[0].distance.text.replace(" km", ""));
            setDistanceKm(km);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchDistance();
  }, [pickupCoords, dropCoords]);

  const getBikePrice = (km) => {
    if (km <= 2) return 34.5;
    if (km <= 5) return 46.5;
    if (km <= 11) return 58.5;
    if (km <= 21) return 74.5;
    return 74.5 + (Math.ceil(km - 21) * 5);
  };

  const getCarPrice = (km) => {
    if (km <= 2) return 99;
    if (km <= 5) return 149;
    if (km <= 11) return 249;
    if (km <= 21) return 399;
    return 399 + (Math.ceil(km - 21) * 15);
  };

  const handleAction = async () => {
    if (!pickupCoords || !dropCoords || !vehicleType || !phone) {
      return toast.warning("Please complete all details (Locations, Vehicle, and Phone).");
    }

    if (step === "check") {
        setStep("book");
        let basePrice = vehicleType === "bike" ? getBikePrice(distanceKm) : getCarPrice(distanceKm);
        setPrice(basePrice);
    } else if (step === "book") {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/rides/book`, {
          pickupAddress: pickup,
          dropAddress: drop,
          pickupCoords,
          dropCoords,
          totalDistance: distanceKm.toFixed(2),
          totalPrice: price,
          vehicleType,
          phone: phone
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        toast.success("Ride booked successfully!");
        localStorage.setItem("ride_id", response.data.rideId);
        localStorage.setItem("ride_status", "Pending");
        setRideStatus("Pending");
        setStep("check");
        setPrice(null);
        setDistanceKm(null);
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to book ride");
      }
    }
  };

  const handleCancelRide = async () => {
    const rideId = localStorage.getItem("ride_id");
    if (!rideId) return;

    try {
      await axios.post(`${API_BASE_URL}/api/rides/cancel/${rideId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Ride cancelled successfully");
      localStorage.removeItem("ride_id");
      localStorage.removeItem("ride_status");
      setRideStatus(null);
      setStep("check");
      setPrice(null);
      setDistanceKm(null);
    } catch (err) {
      toast.error("Failed to cancel ride");
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: coords }, (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            setPickup(address);
            setPickupCoords(coords);
            setHasAutoFilledLocation(true);
            if (pickupMarker.current) pickupMarker.current.setMap(null);
            pickupMarker.current = new window.google.maps.Marker({
                position: coords,
                map: map.current,
                icon: { path: window.google.maps.SymbolPath.CIRCLE, fillColor: '#0ea5e9', fillOpacity: 1, strokeWeight: 2, strokeColor: '#fff', scale: 8 }
            });
            map.current.setCenter(coords);
            map.current.setZoom(16);
          }
        });
      },
      (error) => toast.error("Failed to get location"),
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="bookride-container">
      <aside className="booking-hub animate-fade-in">
        <header className="booking-hub-header">
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mobility-tag">Aasa Mobility</span>
                <div className="profile-section" onClick={() => navigate("/user/profile")}>
                    <FaUserCircle className="profile-icon" />
                    <p className="profile-text">Profile</p>
                </div>
           </div>
          <h2>Where would you like to go?</h2>
        </header>

        <section className="booking-section">
          <div className="section-label"><FaLocationArrow /> Route Discovery</div>
          <div className="input-group">
            <AddressAutocomplete
              placeholder="Pickup Location"
              initialValue={pickup}
              icon={FaMapMarkerAlt}
              onSelect={(data) => {
                setPickup(data.address);
                setPickupCoords(data.coords);
                updateMarker("pickup", data.coords);
              }}
            />
            <AddressAutocomplete
              placeholder="Drop Location"
              initialValue={drop}
              icon={FaMapMarkerAlt}
              onSelect={(data) => {
                setDrop(data.address);
                setDropCoords(data.coords);
                updateMarker("drop", data.coords);
              }}
              className="drop-input"
            />
          </div>
        </section>

        <section className="booking-section">
          <div className="section-label"><FaPhoneAlt /> Contact Verification</div>
          <div className="ride-input-wrapper">
            <FaPhoneAlt className="input-icon" />
            <input
              type="text"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </section>

        {distanceKm && (
          <section className="booking-section animate-slide-up">
            <div className="section-label"><FaMotorcycle /> Choose Your Vehicle</div>
            <div className="vehicle-grid">
              <div 
                className={`vehicle-card ${vehicleType === "bike" ? "active" : ""}`}
                onClick={() => setVehicleType("bike")}
              >
                <img src="/images/bike.jpg" alt="Bike" />
                <div className="vehicle-info">
                  <span className="vehicle-name">Boutique Bike</span>
                  <span className="vehicle-meta">Est: ₹{getBikePrice(distanceKm)}</span>
                </div>
              </div>
              <div 
                className={`vehicle-card ${vehicleType === "car" ? "active" : ""}`}
                onClick={() => setVehicleType("car")}
              >
                <img src="/images/car.jpg" alt="Car" />
                <div className="vehicle-info">
                  <span className="vehicle-name">Premium Car</span>
                  <span className="vehicle-meta">Est: ₹{getCarPrice(distanceKm)}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="booking-actions">
          <button
            className="primary-ride-btn"
            onClick={handleAction}
            disabled={!vehicleType || !pickupCoords || !dropCoords || !phone}
          >
           {step === "check" ? <><FaPaperPlane /> Request Pricing</> : <><FaCheckCircle /> Confirm & Book Ride</>}
          </button>

          <button className="secondary-action-btn" onClick={() => {
            setPickup(""); setDrop(""); setPickupCoords(null); setDropCoords(null);
            pickupRef.current.value = ""; dropRef.current.value = "";
            setDistanceKm(null); setVehicleType(""); setPrice(null); setStep("check");
          }}>
            Reset Locations
          </button>
        </div>

        {rideStatus === "Pending" && (
          <div className="status-card animate-slide-up">
            <div className="status-header">
                <strong>Searching...</strong>
                <span className="status-indicator pending">Request Broadcasted</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>Waiting for a driver to accept. You can still cancel this request.</p>
            <button className="secondary-action-btn" style={{ borderColor: '#fecaca', color: '#ef4444', marginTop: '12px' }} onClick={handleCancelRide}>
                <FaTimes /> Cancel Request
            </button>
          </div>
        )}

        {rideStatus === "Accepted" && (
          <div className="status-card animate-slide-up" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', borderColor: '#22c55e' }}>
            <div className="status-header">
                <strong style={{ color: '#166534' }}>Driver is Coming! ✅</strong>
                <span className="status-indicator accepted" style={{ background: '#22c55e', color: 'white' }}>In Progress</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div className="intel-box" style={{ background: 'white', border: '1px solid #bbf7d0' }}>
                    <span className="executive-tag">Ride OTP</span>
                    <p style={{ fontSize: '1.4rem', fontWeight: 900, color: '#166534' }}>{otp}</p>
                </div>
                <div className="intel-box" style={{ background: 'white', border: '1px solid #bbf7d0' }}>
                    <span className="executive-tag">Driver Phone</span>
                    <p style={{ fontWeight: 800 }}>{driverPhone || 'Contacting...'}</p>
                </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#15803d', marginTop: '10px', textAlign: 'center' }}>Cancellation is no longer available as the driver is en route.</p>
          </div>
        )}

        {rideStatus === "Rejected" && (
           <div className="status-card animate-slide-up" style={{ backgroundColor: '#fff1f2', borderColor: '#fda4af' }}>
             <div className="status-header">
                <strong style={{ color: '#9f1239' }}>Ride Declined</strong>
                <span className="status-indicator" style={{ background: '#e11d48', color: 'white' }}>Declined</span>
             </div>
             <p style={{ fontSize: '0.85rem', color: '#be123c', marginTop: '8px' }}>Unfortunately, no driver was available. Please try again or change location.</p>
             <button className="primary-ride-btn" style={{ marginTop: '12px' }} onClick={() => { setRideStatus(null); localStorage.removeItem("ride_status"); }}>
                Try Again
             </button>
           </div>
        )}

        {rideStatus === "Completed" && (
           <div className="status-card animate-slide-up" style={{ 
             background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
             borderColor: '#3b82f6',
             position: 'relative' 
           }}>
             <button 
                onClick={() => {
                    setRideStatus(null);
                    localStorage.removeItem("ride_status");
                    localStorage.removeItem("ride_id");
                    toast.info("Feedback skipped");
                }}
                style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#3b82f6',
                    fontSize: '1.2rem'
                }}
             >
                <FaTimes />
             </button>
             <div className="status-header">
                <strong style={{ color: '#1e40af' }}>Trip Finished! 🏁</strong>
                <span className="status-indicator" style={{ background: '#3b82f6', color: 'white' }}>Finished</span>
             </div>
             <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#1e3a8a' }}>How was your experience with Aasa Mobility?</p>
             
             <div className="feedback-stars" style={{ display: 'flex', gap: '8px', margin: '1rem 0' }}>
               {[1, 2, 3, 4, 5].map((star) => (
                 <span 
                   key={star} 
                   onClick={() => setRating(star)}
                   style={{ 
                     fontSize: '2.4rem', 
                     cursor: 'pointer', 
                     color: (rating >= star) ? '#f59e0b' : '#cbd5e1',
                     transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                     transform: (rating === star) ? 'scale(1.25)' : 'scale(1)'
                   }}
                 >
                   ★
                 </span>
               ))}
             </div>

             <textarea 
               placeholder="Tell us more (optional)..."
               value={feedback}
               onChange={(e) => setFeedbackText(e.target.value)}
               className="feedback-textarea"
               style={{ 
                 width: '100%', 
                 padding: '10px', 
                 borderRadius: '8px', 
                 border: '1px solid #bfdbfe', 
                 fontSize: '0.85rem',
                 marginBottom: '10px',
                 minHeight: '60px'
               }}
             />

             <button 
               className="primary-ride-btn" 
               style={{ width: '100%', background: '#1d4ed8' }}
               onClick={async () => {
                 try {
                   const rideId = localStorage.getItem("ride_id");
                   await axios.patch(`${API_BASE_URL}/api/rides/feedback/${rideId}`, { rating, feedback }, {
                     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                   });
                   toast.success("Feedback received. Thank you!");
                   setRideStatus(null);
                   localStorage.removeItem("ride_status");
                   localStorage.removeItem("ride_id");
                   setRating(0);
                   setFeedbackText("");
                 } catch (err) {
                   toast.error("Failed to submit feedback");
                 }
               }}
             >
               Submit & Finish
             </button>
           </div>
        )}
      </aside>

      <main className="map-viewport">
        <button onClick={() => navigate("/")} className="floating-back-btn">
          <FaArrowLeft /> Back to Lifestyle
        </button>
        <div ref={mapContainerRef} className="map-container"></div>

        {showLocationPopup && (
          <div className="mobility-popup-overlay">
            <div className="mobility-popup animate-pop-in">
              <h3>Enable Location?</h3>
              <p>Would you like to use your current location for a faster pickup experience?</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="primary-ride-btn" style={{ flex: 1 }} onClick={() => { handleUseMyLocation(); setShowLocationPopup(false); }}>
                  Yes, Use Location
                </button>
                <button className="secondary-action-btn" style={{ flex: 1 }} onClick={() => { setShowLocationPopup(false); setLocationPopupDismissed(true); }}>
                  Manual Search
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

