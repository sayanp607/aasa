import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../main";
import { useNavigate } from "react-router-dom";
import "./Delivery.css";
import { toast } from 'react-toastify';
import AddressAutocomplete from "../components/AddressAutocomplete";
import { 
  FaBox, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaDollyFlatbed, 
  FaWeightHanging, 
  FaTruckLoading,
  FaShieldAlt,
  FaBolt
} from "react-icons/fa";

export default function Delivery() {
  const [role, setRole] = useState(localStorage.getItem("role") || "user");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // User State
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [packageSize, setPackageSize] = useState("small");
  const [phone, setPhone] = useState("");
  const [distanceKm, setDistanceKm] = useState(null);
  const [price, setPrice] = useState(null);
  const [isFragile, setIsFragile] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [parcelValue, setParcelValue] = useState("");

  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const pickupRef = useRef();
  const dropRef = useRef();
  const pickupMarker = useRef(null);
  const dropMarker = useRef(null);
  const adminMarkers = useRef([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.warning("Please login to access delivery services");
      navigate("/user/login");
      return;
    }
    if (role === 'admin') {
      fetchAdminOrders();
    }
  }, [navigate, role]);

  const fetchAdminOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/orders/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
      setFilteredOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch admin orders", err);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/api/orders/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAdminOrders();
    } catch {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    const filtered = orders.filter(o => 
       o.pickup.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
       o.delivery[0].address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  useEffect(() => {
    let initInterval = setInterval(() => {
      const condition = role === 'admin' 
        ? (window.google && window.google.maps && mapContainerRef.current)
        : (window.google && window.google.maps && mapContainerRef.current);

      if (condition) {
        clearInterval(initInterval);
        initializeMap();
      }
    }, 100);

    return () => clearInterval(initInterval);
  }, [role]);

  const initializeMap = () => {
    map.current = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 12.9716, lng: 77.5946 },
      zoom: role === 'admin' ? 10 : 12,
      disableDefaultUI: true,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      ],
    });

    if (role === 'admin') {
       updateAdminMarkers();
    }
  };

  const updateAdminMarkers = () => {
      adminMarkers.current.forEach(m => m.setMap(null));
      adminMarkers.current = [];
      // Admin logic here if needed
  };

  const updateUserMarker = (type, coords) => {
    if (!map.current) return;
    if (type === "pickup") {
      if (pickupMarker.current) pickupMarker.current.setMap(null);
      pickupMarker.current = new window.google.maps.Marker({
        position: coords,
        map: map.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#8b5cf6',
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
          if (response.data.rows[0].elements[0].status === "OK") {
            const km = parseFloat(response.data.rows[0].elements[0].distance.text.replace(" km", ""));
            setDistanceKm(km);
          }
        } catch (err) {
          console.error("Distance calculation failed", err);
        }
      }
    };
    fetchDistance();
  }, [pickupCoords, dropCoords]);

  useEffect(() => {
    if (distanceKm) {
      let base = 40;
      const multipliers = { small: 1, medium: 1.5, large: 2.2, xl: 3.5 };
      let total = (base + (distanceKm * 10)) * multipliers[packageSize];
      if (isFragile) total += 50;
      if (isUrgent) total += 100;
      setPrice(Math.round(total));
    }
  }, [distanceKm, packageSize, isFragile, isUrgent]);

  const handleBookDelivery = async () => {
    if (!pickupCoords || !dropCoords || !phone) {
      return toast.warning("Please select locations and enter your phone number.");
    }

    const pickupData = {
      address: pickup,
      phone: phone,
      instructions: "Handle with care"
    };

    const deliveryData = [
      {
        address: drop,
        phone: phone, // Using same phone for now
        instructions: isFragile ? "FRAGILE ITEM" : "None"
      }
    ];

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/api/orders/create`, {
        pickup: JSON.stringify(pickupData),
        delivery: JSON.stringify(deliveryData),
        packageWeight: packageSize,
        deliveryType: isUrgent ? "Now" : "EndOfDay",
        price: price,
        senderPhone: phone,
        parcelValue: parseFloat(parcelValue) || 0,
        notifyRecipient: "false"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success(`Booking ${packageSize} delivery request for ₹${price}. A logistics partner will be assigned shortly!`);
      navigate("/myorders");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create delivery request");
    }
  };

  const renderAdminView = () => (
    <div className="admin-logistics-grid animate-fade-in">
       <div className="logistics-stats">
          <div className="stat-card">
              <span className="stat-label">Total Dispatches</span>
              <span className="stat-value">{orders.length}</span>
          </div>
          <div className="stat-card">
              <span className="stat-label">Urgent Dispatches</span>
              <span className="stat-value">{orders.filter(o => o.deliveryType === 'Now' || o.deliveryType === 'Scheduled').length}</span>
          </div>
          <div className="stat-card">
              <span className="stat-label">Pending Clearances</span>
              <span className="stat-value">{orders.filter(o => o.status === 'Pending').length}</span>
          </div>
          <div className="stat-card">
              <span className="stat-label">Total Revenue</span>
              <span className="stat-value">₹{orders.reduce((acc, curr) => acc + (curr.price || 0), 0)}</span>
          </div>
       </div>

       <div className="logistics-log-container">
          <div className="log-header">
              <span className="section-label"><FaTruckLoading /> Logistics Real-time Log</span>
              <div className="search-bar-wrapper">
                  <FaMapMarkerAlt className="input-icon" style={{ fontSize: '0.8rem', left: '15px' }} />
                  <input 
                    placeholder="Search by route..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
          </div>

          <div className="log-table-wrapper">
              <table className="log-table">
                  <thead>
                      <tr>
                          <th className="route-col">Route Info</th>
                          <th className="load-col">Load Info</th>
                          <th className="val-col">Value</th>
                          <th className="stat-col">Status</th>
                          <th className="ops-col">Ops</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredOrders.map(order => (
                          <tr key={order._id}>
                              <td className="route-col">
                                  <div style={{ fontWeight: 700, color: '#1e293b' }}>{order.pickup.address.split(',')[0]}</div>
                                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>To: {order.delivery[0].address.split(',')[0]}</div>
                              </td>
                              <td className="load-col">
                                  <div style={{ fontWeight: 600 }}>
                                    {order.packageWeight.toString().toLowerCase().includes('kg') 
                                      ? order.packageWeight 
                                      : `${order.packageWeight}kg`}
                                  </div>
                                  <div style={{ fontSize: '0.7rem' }}>{order.deliveryType}</div>
                              </td>
                              <td className="val-col">₹{order.parcelValue}</td>
                              <td className="stat-col">
                                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                                      {order.status}
                                  </span>
                              </td>
                              <td className="ops-col">
                                  <select 
                                    className="action-select"
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                  >
                                      <option value="Pending">Pending</option>
                                      <option value="Assigned">Assigned</option>
                                      <option value="PickedUp">In Transit</option>
                                      <option value="Delivered">Delivered</option>
                                  </select>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
       </div>
    </div>
  );

  const renderUserView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section className="logistics-section">
          <div className="section-label"><FaMapMarkerAlt /> Route Selection</div>
          <div className="input-group">
            <AddressAutocomplete
              placeholder="Package Pickup Address"
              initialValue={pickup}
              icon={FaMapMarkerAlt}
              onSelect={(data) => {
                setPickup(data.address);
                setPickupCoords(data.coords);
                updateUserMarker("pickup", data.coords);
              }}
            />
            <AddressAutocomplete
              placeholder="Delivery Destination"
              initialValue={drop}
              icon={FaMapMarkerAlt}
              onSelect={(data) => {
                setDrop(data.address);
                setDropCoords(data.coords);
                updateUserMarker("drop", data.coords);
              }}
            />
          </div>
        </section>

        <section className="logistics-section">
          <div className="section-label"><FaWeightHanging /> Package Specification</div>
          <div className="package-grid">
            {[
              { id: 'small', label: 'Small Box', desc: 'Up to 2kg', icon: <FaBox /> },
              { id: 'medium', label: 'Medium', desc: '2kg - 10kg', icon: <FaDollyFlatbed /> },
              { id: 'large', label: 'Heavy/Large', desc: '10kg - 30kg', icon: <FaTruckLoading /> },
              { id: 'xl', label: 'Industrial', desc: '30kg+', icon: <FaShieldAlt /> }
            ].map((pkg) => (
              <div 
                key={pkg.id}
                className={`package-card ${packageSize === pkg.id ? 'active' : ''}`}
                onClick={() => setPackageSize(pkg.id)}
              >
                <div style={{ fontSize: '1.2rem', color: packageSize === pkg.id ? '#8b5cf6' : '#94a3b8' }}>{pkg.icon}</div>
                <span className="package-title">{pkg.label}</span>
                <span className="package-desc">{pkg.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="logistics-section">
          <div className="section-label"><FaBolt /> Delivery Intel</div>
          <div className="care-options">
            <div 
              className={`care-chip ${isFragile ? 'active' : ''}`}
              onClick={() => setIsFragile(!isFragile)}
            >
              <FaShieldAlt /> Fragile Handling
            </div>
            <div 
              className={`care-chip ${isUrgent ? 'active' : ''}`}
              onClick={() => setIsUrgent(!isUrgent)}
            >
              <FaBolt /> Priority Express
            </div>
          </div>
          <div className="delivery-input-group" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="delivery-input-wrapper">
              <FaPhoneAlt className="input-icon" />
              <input 
                type="text" 
                placeholder="Phone Number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="delivery-input-wrapper">
              <span className="input-icon" style={{ fontWeight: 800, color: '#94a3b8' }}>₹</span>
              <input 
                type="number" 
                placeholder="Parcel Value" 
                value={parcelValue}
                onChange={(e) => setParcelValue(e.target.value)}
              />
            </div>
          </div>
        </section>

        <div className="delivery-actions">
          {price && (
            <div className="animate-slide-up" style={{ padding: '1rem', background: '#f5f3ff', borderRadius: '15px', border: '1px dashed #c084fc', textAlign: 'center' }}>
               <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase' }}>Estimated Logistics Fee</span>
               <p style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1e1b4b' }}>₹{price}</p>
            </div>
          )}
          <button 
            className="primary-logistics-btn"
            onClick={handleBookDelivery}
            disabled={!pickupCoords || !dropCoords || !phone}
          >
            <FaBox /> Dispatch Package
          </button>
          <button className="floating-action-btn" style={{ position: 'static', width: '100%', justifyContent: 'center' }} onClick={() => navigate("/")}>
             <FaArrowLeft /> Return to lifestyle
          </button>
        </div>
    </div>
  );

  return (
    <div className="delivery-container">
      <aside className={`logistics-hub ${role === 'admin' ? 'admin-mode' : ''} animate-fade-in`}>
        <header className="logistics-hub-header" style={{ position: 'relative' }}>
          <span className="logistics-tag">Aasa Logistics {role === 'admin' ? 'Command' : 'AI'}</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{role === 'admin' ? 'Command Center' : 'Intelligent Delivery'}</h2>
            {localStorage.getItem('role') === 'admin' && (
              <button 
                onClick={() => setRole(role === 'admin' ? 'user' : 'admin')}
                style={{ background: '#f5f3ff', border: '1px solid #c084fc', padding: '4px 8px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800, color: '#7c3aed', cursor: 'pointer' }}
              >
                SWAP VIEW
              </button>
            )}
          </div>
        </header>

        {role === 'admin' ? renderAdminView() : renderUserView()}
      </aside>

      <main className="map-viewport">
        <div ref={mapContainerRef} className="map-container"></div>
      </main>
    </div>
  );
}
