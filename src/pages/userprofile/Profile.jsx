import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import { FaShoppingBag, FaGift, FaBox, FaRupeeSign, FaCalendarAlt, FaBarcode, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import "./UserProfile.css";

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  // const [cartItems, setCartItems] = useState([]);
  // const [giftCartItems, setGiftCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('cloth'); // 👈 tab state

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/order/my-orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);




 

  const clothOrders = orders.filter(order => order.cloth);
  const giftOrders = orders.filter(order => order.gift);

  return (
    <>
     

      <div className="user-orders-container">
        <div className="profile-header-section">
          <h2 className="order-heading">Profile & Orders</h2>
          <p className="order-subheading">Manage your purchases and track shipments</p>
        </div>

        {/* ✅ Tab Switch */}
        <div className="tabs-wrapper">
          <button
            onClick={() => setActiveTab('cloth')}
            className={`tab-btn ${activeTab === 'cloth' ? 'active cloth' : ''}`}
          >
            <FaShoppingBag className="tab-icon" />
            Cloth Orders
          </button>

          <button
            onClick={() => setActiveTab('gift')}
            className={`tab-btn ${activeTab === 'gift' ? 'active gift' : ''}`}
          >
            <FaGift className="tab-icon" />
            Gift Orders
          </button>
        </div>

        {/* ✅ Order Display */}
        <div className="orders-grid">
          {(activeTab === 'cloth' ? clothOrders : giftOrders).length === 0 ? (
            <p className="no-orders">No {activeTab} orders found.</p>
          ) : (
            (activeTab === 'cloth' ? clothOrders : giftOrders).map(order => (
              <div key={order._id} className="order-card">
                {order.cloth && order.cloth.image && (
                  <img
                    src={`${API_BASE_URL}/uploads/${order.cloth.image}`}
                    alt="Order"
                    className="order-img"
                  />
                )}
                {order.gift && order.gift.image && (
                  <img
                    src={`${API_BASE_URL}${order.gift.image}`}
                    alt="Order"
                    className="order-img"
                  />
                )}

                <div className="order-header">
                  <div className="title-group">
                    <h3>{order.cloth?.name || order.gift?.name}</h3>
                    <span className="category-label">
                      {order.cloth ? 'Cloth' : 'Gift'}
                    </span>
                  </div>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                    {order.status}
                  </span>
                </div>

                <div className="order-info-stats">
                  <div className="stat-item">
                    <FaBox className="stat-icon" />
                    <div className="stat-text">
                      <label>{order.cloth ? 'Size' : 'Category'}</label>
                      <span>{order.cloth ? order.size : order.gift.category}</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <FaRupeeSign className="stat-icon" />
                    <div className="stat-text">
                      <label>Amount</label>
                      <span>₹{order.amount}</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <FaBarcode className="stat-icon" />
                    <div className="stat-text">
                      <label>Quantity</label>
                      <span>{order.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="payment-reference">
                   <strong>Ref:</strong> {order.paymentId}
                </div>

                <div className="shipping-info-box">
                  <div className="shipping-header">
                    <FaMapMarkerAlt className="shipping-icon" />
                    <strong>Shipping Address</strong>
                  </div>
                  {order.shippingId ? (
                    <div className="address-details">
                      <div className="name-phone">
                        <span className="ship-name">{order.shippingId.fullName}</span>
                        <span className="ship-phone"><FaPhone size={10} /> {order.shippingId.phone}</span>
                      </div>
                      <div className="address-line">
                        {order.shippingId.addressLine1}, {order.shippingId.addressLine2 && order.shippingId.addressLine2 + ","} {order.shippingId.city}, {order.shippingId.state} - {order.shippingId.pincode}
                      </div>
                    </div>
                  ) : (
                    <div className="no-address-msg">No shipping address recorded</div>
                  )}
                </div>

                <div className="order-footer">
                  <FaCalendarAlt className="date-icon" />
                  <span>Ordered on {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Ordered': return '#007bff';
    case 'Packing': return '#ffa500';
    case 'Delivery': return '#d12c4f';
    case 'Delivered': return '#28a745';
    case 'Out for delivery': return '#fa8072';
    default: return '#555';
  }
};

export default UserProfile;
