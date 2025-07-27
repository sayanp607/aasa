import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { API_BASE_URL } from "../main";
import { useNavigate } from "react-router-dom";
import "./BookRide.css";
import { FaUserCircle } from "react-icons/fa";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [rideStatus, setRideStatus] = useState(() => localStorage.getItem("ride_status"));
  const [otp, setOtp] = useState(() => localStorage.getItem("ride_otp"));
  const [phone, setPhone] = useState("");
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
      alert("Please login");
      navigate("/user/login");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        alert("Session expired, please login again.");
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
        alert(`Ride accepted! OTP: ${data.otp}\nDriver Contact: ${data.driverPhone}`);
      });

      socket.current.on("ride_rejected", () => {
        alert("Ride rejected by driver");
        setRideStatus("Rejected");
        localStorage.setItem("ride_status", "Rejected");
      });

    } catch {
      alert("Session invalid, please login again.");
      localStorage.removeItem("token");
      navigate("/user/login");
    }

    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [navigate]);

  useEffect(() => {
    map.current = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 12.9716, lng: 77.5946 },
      zoom: 12,
    });

    const geocoder = new window.google.maps.Geocoder();

    const pickupAuto = new window.google.maps.places.Autocomplete(pickupRef.current);
    pickupAuto.addListener("place_changed", () => {
      const place = pickupAuto.getPlace();
      const coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setPickup(place.formatted_address);
      setPickupCoords(coords);

      if (pickupMarker.current) pickupMarker.current.setMap(null);
      pickupMarker.current = new window.google.maps.Marker({
        position: coords,
        map: map.current,
        label: "P",
      });

      map.current.setCenter(coords);
    });

    const dropAuto = new window.google.maps.places.Autocomplete(dropRef.current);
    dropAuto.addListener("place_changed", () => {
      const place = dropAuto.getPlace();
      const coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setDrop(place.formatted_address);
      setDropCoords(coords);

      if (dropMarker.current) dropMarker.current.setMap(null);
      dropMarker.current = new window.google.maps.Marker({
        position: coords,
        map: map.current,
        label: "D",
      });

      map.current.setCenter(coords);
    });

    map.current.addListener("click", (event) => {
      const clickedLatLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      geocoder.geocode({ location: clickedLatLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;

          if (!pickupCoords) {
            setPickup(address);
            setPickupCoords(clickedLatLng);
            pickupRef.current.value = address;

            if (pickupMarker.current) pickupMarker.current.setMap(null);
            pickupMarker.current = new window.google.maps.Marker({
              position: clickedLatLng,
              map: map.current,
              label: "P",
            });
          } else if (!dropCoords) {
            setDrop(address);
            setDropCoords(clickedLatLng);
            dropRef.current.value = address;

            if (dropMarker.current) dropMarker.current.setMap(null);
            dropMarker.current = new window.google.maps.Marker({
              position: clickedLatLng,
              map: map.current,
              label: "D",
            });
          } else {
            alert("Both Pickup and Drop already set. Clear to select again.");
          }

          map.current.setCenter(clickedLatLng);
        }
      });
    });
  }, []);

 

useEffect(() => {
  const fetchPrices = async () => {
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
        const km = parseFloat(data.rows[0].elements[0].distance.text.replace(" km", ""));
        setDistanceKm(km);
      } catch (err) {
        console.error(err);
        alert("Failed to calculate distance");
      }
    }
  };

  fetchPrices();
}, [pickupCoords, dropCoords]);



  const getBikePrice = (km) => {
    if (km <= 2) return 34.5;
    if (km <= 5) return 46.5;
    if (km <= 11) return 58.5;
    if (km <= 21) return 74.5;
    return 74.5 + (Math.ceil(km - 21) * 5); // Optional if distance > 21km
  };

  const handleAction = async () => {
    if (!pickupCoords || !dropCoords || !vehicleType) {
      return alert("Please complete all ride details before booking.");
    }

    if (step === "check") {
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
        const km = parseFloat(data.rows[0].elements[0].distance.text.replace(" km", ""));
        setDistanceKm(km);

        let basePrice;

        if (vehicleType === "bike") {
          basePrice = getBikePrice(km);
        } else {
          basePrice = Math.ceil(km) * 50; // You can update car logic later
        }

        setPrice(basePrice);

        const actualPrice = km <= 5 ? basePrice + 8 : basePrice + 12;

        const confirmPrice = window.confirm(
          `Distance: ${km.toFixed(2)} km\n` +
          `Discounted Price: ₹${basePrice}\n` +
          `Actual Price: ₹${actualPrice}\n\nProceed?`
        );

        if (confirmPrice) setStep("book");
      } catch (err) {
        console.error(err);
        alert("Failed to calculate distance");
      }
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
        if (!phone || phone.length < 10) return alert("Please enter a valid phone number.");


        alert("Ride booked successfully!");
        localStorage.setItem("ride_id", response.data.rideId);
        localStorage.setItem("ride_status", "Pending");
        setRideStatus("Pending");
        setStep("check");
        setPrice(null);
        setDistanceKm(null);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Failed to book ride");
      }
    }
  };

  const handleCancelRide = async () => {
    const rideId = localStorage.getItem("ride_id");
    if (!rideId) return alert("No ride to cancel");

    try {
      await axios.post(`${API_BASE_URL}/api/rides/cancel/${rideId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert("Ride cancelled successfully");
      localStorage.removeItem("ride_id");
      localStorage.removeItem("ride_status");
      setRideStatus(null);
      setStep("check");
      setPrice(null);
      setDistanceKm(null);
    } catch (err) {
      console.error(err);
      alert("Failed to cancel ride");
    }
  };
const handleUseMyLocation = () => {
  if (hasAutoFilledLocation) return; // Prevent repeating

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const coords = { lat, lng };

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location: coords }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          setPickup(address);
          setPickupCoords(coords);
          pickupRef.current.value = address;
          setHasAutoFilledLocation(true); // ✅ prevent future auto-calls

          if (pickupMarker.current) pickupMarker.current.setMap(null);
          pickupMarker.current = new window.google.maps.Marker({
            position: coords,
            map: map.current,
            label: "P",
          });

          map.current.setCenter(coords);
          map.current.setZoom(16);
        } else {
          alert("Could not determine address from your location.");
        }
      });
    },
    (error) => {
      console.error(error);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Please allow location access.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location unavailable.");
          break;
        case error.TIMEOUT:
          alert("Request timed out. Try again.");
          break;
        default:
          alert("Failed to get your location.");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
};



return (
  <div className="bookride-container">
    <div className="bookride-header">
      <h2>Book Your Ride</h2>
       <button onClick={() => navigate("/")} className="back-home-btn">
        ⬅ Back to Home
      </button>
      <div className="profile-section" onClick={() => navigate("/user/profile")}>
        <FaUserCircle className="profile-icon" />
        <p className="profile-text">My Profile</p>
      </div>
    </div>

    <div className="bookride-form">
<input
  ref={pickupRef}
  placeholder="Pickup Location"
 onFocus={() => {
  if (!hasAutoFilledLocation && !locationPopupDismissed) {
    setShowLocationPopup(true);
  }
}}

/><br />

{showLocationPopup && (
  <div className="location-popup">
    <div className="popup-content">
      <p>Do you want to use your current location as Pickup?</p>
      <div className="popup-buttons">
        <button onClick={() => {
          handleUseMyLocation();
          setShowLocationPopup(false);
        }}>
          ✅ Use My Location
        </button>
       <button onClick={() => {
  setShowLocationPopup(false);
  setLocationPopupDismissed(true); // ✅ prevent showing popup again
}}>
  ❌ Cancel
</button>

      </div>
    </div>
  </div>
)}


      <input ref={dropRef} placeholder="Drop Location" /><br />
      <input
  type="text"
  placeholder="Your Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>


      {/* VEHICLE DROPDOWN */}
      <div className="vehicle-dropdown-wrapper">
        <p style={{ fontWeight: "bold" }}>Select Vehicle Type:</p>

        <div className="dropdown-header" onClick={() => setDropdownOpen(!dropdownOpen)}>
          {vehicleType ? (
            <div className="vehicle-option selected">
              <img src={`/images/${vehicleType}.jpg`} alt={vehicleType} />
              <span>{vehicleType === "bike" ? "Bike" : "Car"}</span>
            </div>
          ) : (
            <span className="dropdown-placeholder">Choose Vehicle</span>
          )}
          <span className="dropdown-arrow">▼</span>
        </div>

        {dropdownOpen && pickupCoords && dropCoords && distanceKm && (
          <div className="dropdown-options">
            {["bike", "car"].map((type) => {
              const basePrice = type === "bike" ? getBikePrice(distanceKm) : Math.ceil(distanceKm) * 50;
              const actualPrice = distanceKm <= 5 ? basePrice + 8 : basePrice + 12;
              return (
                <div
                  key={type}
                  className={`vehicle-option ${vehicleType === type ? "selected" : ""}`}
                  onClick={() => {
                    setVehicleType(type);
                    setPrice(basePrice);
                    setDropdownOpen(false);
                    setStep("book");
                  }}
                >
                  <img src={`/images/${type}.jpg`} alt={type} />
                  <div className="vehicle-details">
                    <span style={{ fontWeight: "bold" }}>{type === "bike" ? "Bike" : "Car"}</span>
                    <span>Distance: {distanceKm.toFixed(2)} km</span>
                    <span>Discounted: ₹{basePrice}</span>
                    <span>Actual: ₹{actualPrice}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="button-group">
        <button
          onClick={handleAction}
          disabled={!vehicleType || !pickupCoords || !dropCoords}
        >
         Book Ride
        </button>

        <button className="clearbtn" onClick={() => {
          setPickup("");
          setDrop("");
          setPickupCoords(null);
          setDropCoords(null);
          pickupRef.current.value = "";
          dropRef.current.value = "";
          setDistanceKm(null);
          setVehicleType("");
          setPrice(null);
          setStep("check");
        }}>
          Clear Locations
        </button>
      </div>
    </div>

    {rideStatus === "Pending" && (
      <div className="ride-status">
        <p><strong>Note:</strong> You can cancel until driver accepts or rejects</p>
        <button onClick={handleCancelRide}>Cancel Ride</button>
      </div>
    )}

    {otp && driverPhone && (
      <div className="ride-details">
        <h3>Ride Details:</h3>
        <p><strong>OTP:</strong> {otp}</p>
        <p><strong>Driver Contact:</strong> {driverPhone}</p>
        <button onClick={() => {
          setOtp(null);
          setDriverPhone(null);
          localStorage.removeItem("ride_otp");
          localStorage.removeItem("ride_driver_phone");
        }}>
          Delete Details
        </button>
      </div>
    )}

    <div ref={mapContainerRef} className="map-container"></div>
  </div>
);


}
