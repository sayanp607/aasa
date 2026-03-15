import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./orders.css";
import { API_BASE_URL } from "../main";
import { 
  FaBox, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaWeightHanging, 
  FaClock, 
  FaTrash, 
  FaArrowLeft, 
  FaShieldAlt, 
  FaTruck, 
  FaSearch, 
  FaUserShield,
  FaFilter
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isAdminView, setIsAdminView] = useState(false);
  const [role] = useState(localStorage.getItem("role") || "user");
  const [filters, setFilters] = useState({
    address: "",
    deliveryType: "",
    status: "",
    date: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view orders");
      navigate("/user/login");
      return;
    }
    fetchOrders();
  }, [isAdminView]);

  useEffect(() => {
    applyFilters();
  }, [filters, orders]);

  const fetchOrders = async () => {
    try {
      const endpoint = isAdminView ? `${API_BASE_URL}/api/orders/all` : `${API_BASE_URL}/api/orders/my`;
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  const handleDelete = async (id, status) => {
    if (status !== "Pending" && status !== "Assigned") {
      toast.warning("Only Pending or Assigned orders can be deleted");
      return;
    }
    if (!window.confirm("Are you sure to delete this order?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order deleted successfully");
      fetchOrders();
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/api/orders/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Status updated to ${newStatus}`);
      fetchOrders();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = orders.filter((order) => {
      const addressMatch =
        order.pickup.address.toLowerCase().includes(filters.address.toLowerCase()) ||
        order.delivery[0].address.toLowerCase().includes(filters.address.toLowerCase());

      const typeMatch = filters.deliveryType ? order.deliveryType === filters.deliveryType : true;
      const statusMatch = filters.status ? order.status === filters.status : true;
      const dateMatch = filters.date
        ? new Date(order.createdAt).toLocaleDateString("en-CA") === filters.date
        : true;

      return addressMatch && typeMatch && statusMatch && dateMatch;
    });
    setFilteredOrders(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#f59e0b';
      case 'Assigned': return '#0ea5e9';
      case 'PickedUp': return '#8b5cf6';
      case 'Delivered': return '#22c55e';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="orders-wrapper">
      <div className="orders-header-section">
        <button onClick={() => navigate("/")} className="premium-back-btn">
          <FaArrowLeft /> Home
        </button>
        
        <div className="orders-title-block">
          <h2>{isAdminView ? "Command Center" : "Your Logistics Log"}</h2>
          <p>{isAdminView ? "System-wide dispatched orders" : "Real-time updates on your deliveries"}</p>
        </div>

        {role === 'admin' && (
          <button 
            className={`admin-toggle-btn ${isAdminView ? 'active' : ''}`}
            onClick={() => setIsAdminView(!isAdminView)}
          >
            <FaUserShield /> {isAdminView ? "Switch to Personal" : "Switch to Admin Hub"}
          </button>
        )}
      </div>

      <div className="orders-filters-glass">
        <div className="search-box">
          <FaSearch className="filter-icon" />
          <input
            name="address"
            placeholder="Search by address or route..."
            value={filters.address}
            onChange={handleFilterChange}
          />
        </div>
        
        <div className="filter-grid">
          <div className="filter-item">
            <FaCalendarAlt className="filter-icon" />
            <input name="date" type="date" value={filters.date} onChange={handleFilterChange} />
          </div>

          <div className="filter-item">
            <FaClock className="filter-icon" />
            <select name="deliveryType" value={filters.deliveryType} onChange={handleFilterChange}>
              <option value="">All Types</option>
              <option value="Now">Now</option>
              <option value="EndOfDay">End Of Day</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>

          <div className="filter-item">
            <FaFilter className="filter-icon" />
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="PickedUp">Picked Up</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders-state animate-fade-in">
          <FaBox className="empty-icon" />
          <h3>No dispatches found</h3>
          <p>Your logistics log is currently empty.</p>
          <button onClick={() => navigate("/delivery")} className="btn-premium">Dispatch Package</button>
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <div key={order._id} className="premium-order-card animate-slide-up">
              <div className="card-header">
                <span className="order-id">Logistics ID: {order._id.slice(-6).toUpperCase()}</span>
                <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) + '15', color: getStatusColor(order.status) }}>
                  {order.status}
                </span>
              </div>

              <div className="card-locations">
                <div className="location-item">
                  <div className="dot pickup"></div>
                  <div className="location-info">
                    <span className="label">PICKUP SOURCE</span>
                    <p className="address">{order.pickup.address}</p>
                    <p className="phone"><FaUserShield /> {order.pickup.phone}</p>
                  </div>
                </div>
                <div className="location-item">
                  <div className="dot drop"></div>
                  <div className="location-info">
                    <span className="label">DELIVERY DESTINATION</span>
                    <p className="address">{order.delivery[0].address}</p>
                    <p className="phone"><FaUserShield /> {order.delivery[0].phone}</p>
                  </div>
                </div>
              </div>

              <div className="card-footer-grid">
                <div className="footer-item">
                  <FaWeightHanging />
                  <div>
                    <span className="label">WEIGHT</span>
                    <p>{order.packageWeight}</p>
                  </div>
                </div>
                <div className="footer-item">
                  <FaTruck />
                  <div>
                    <span className="label">TYPE</span>
                    <p>{order.deliveryType}</p>
                  </div>
                </div>
                <div className="footer-item">
                  <FaShieldAlt style={{ color: '#10b981' }} />
                  <div>
                    <span className="label">PARCEL VALUE</span>
                    <p>₹{order.parcelValue || 0}</p>
                  </div>
                </div>
                <div className="footer-item">
                  <span className="currency">₹</span>
                  <div>
                    <span className="label">LOGISTICS FEE</span>
                    <p className="price-val">{order.price}</p>
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <div className="time-stamp">
                   <FaClock /> {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                <div className="btn-group">
                  {isAdminView ? (
                    <select 
                      className="admin-status-select"
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Assigned">Assigned</option>
                      <option value="PickedUp">Picked Up</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  ) : (
                    (order.status === "Pending" || order.status === "Assigned") && (
                      <button onClick={() => handleDelete(order._id, order.status)} className="trash-btn">
                        <FaTrash /> Cancel Order
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
