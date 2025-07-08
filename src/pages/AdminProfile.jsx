import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import { API_BASE_URL } from "../main";

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    address: "",
    deliveryType: "",
    weightMin: "",
    weightMax: "",
    valueMin: "",
    valueMax: "",
    priceMin: "",
    priceMax: "",
    status: "",
    date:"",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, orders]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/orders/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      alert("Access Denied or Failed to Load Orders");
      navigate("/login");
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

    const weight = parseFloat(order.packageWeight) || 0;
    const weightMatch =
      (!filters.weightMin || weight >= parseFloat(filters.weightMin)) &&
      (!filters.weightMax || weight <= parseFloat(filters.weightMax));

    const value = parseFloat(order.parcelValue) || 0;
    const valueMatch =
      (!filters.valueMin || value >= parseFloat(filters.valueMin)) &&
      (!filters.valueMax || value <= parseFloat(filters.valueMax));

    const price = parseFloat(order.price) || 0;
    const priceMatch =
      (!filters.priceMin || price >= parseFloat(filters.priceMin)) &&
      (!filters.priceMax || price <= parseFloat(filters.priceMax));

    const statusMatch = filters.status ? order.status === filters.status : true;

    const dateMatch = filters.date
      ? new Date(order.createdAt).toLocaleDateString("en-CA") === filters.date
      : true;

    return addressMatch && typeMatch && weightMatch && valueMatch && priceMatch && statusMatch && dateMatch;
  });

  setFilteredOrders(filtered);
};


  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/api/orders/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Panel - Manage Orders</h2>

      <div className="filters">
        <input name="address" placeholder="Search by Address" value={filters.address} onChange={handleFilterChange} />
        <input
  name="date"
  type="date"
  value={filters.date}
  onChange={handleFilterChange}
/>


        <select name="deliveryType" value={filters.deliveryType} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="Now">Now</option>
          <option value="EndOfDay">End Of Day</option>
          <option value="Scheduled">Scheduled</option>
        </select>

        <input name="weightMin" type="number" placeholder="Min Weight (kg)" onChange={handleFilterChange} />
        <input name="weightMax" type="number" placeholder="Max Weight (kg)" onChange={handleFilterChange} />

        <input name="valueMin" type="number" placeholder="Min Parcel Value" onChange={handleFilterChange} />
        <input name="valueMax" type="number" placeholder="Max Parcel Value" onChange={handleFilterChange} />

        <input name="priceMin" type="number" placeholder="Min Price" onChange={handleFilterChange} />
        <input name="priceMax" type="number" placeholder="Max Price" onChange={handleFilterChange} />

        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="PickedUp">Picked Up</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <ul className="order-list">
        {filteredOrders.map((order) => (
          <li key={order._id} className="order-card">
            <p><strong>Pickup:</strong> {order.pickup.address} ({order.pickup.phone})</p>
            <p><strong>Delivery:</strong> {order.delivery[0].address} ({order.delivery[0].phone})</p>
            <p><strong>Type:</strong> {order.deliveryType}</p>
            <p><strong>Weight:</strong> {order.packageWeight}</p>
            <p><strong>Value:</strong> ₹{order.parcelValue}</p>
            <p><strong>Price:</strong> ₹{order.price}</p>
             <p>
        <strong>Created At:</strong>{" "}
        {new Date(order.createdAt).toLocaleString()}
      </p>
            <p><strong>Status:</strong> 
              <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="PickedUp">Picked Up</option>
                <option value="Delivered">Delivered</option>
              </select>
            </p>
            {order.image && (
              <img src={`${API_BASE_URL}/uploads/${order.image}`} alt="Order" className="order-img" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
