import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
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
        <h2 className="order-heading">My  Orders</h2>

        {/* ✅ Tab Switch */}
        <div style={{ marginBottom: '20px' }}>
         <button
  onClick={() => setActiveTab('cloth')}
  style={{
    marginRight: 10,
    padding: '8px 16px',
    background: activeTab === 'cloth' ? '#007bff' : '#f0f0f0',
    color: activeTab === 'cloth' ? '#fff' : '#333',
    border: '1px solid #ccc',
    borderRadius: '4px'
  }}
>
  Cloth Orders
</button>

<button
  onClick={() => setActiveTab('gift')}
  style={{
    padding: '8px 16px',
    background: activeTab === 'gift' ? '#28a745' : '#f0f0f0',
    color: activeTab === 'gift' ? '#fff' : '#333',
    border: '1px solid #ccc',
    borderRadius: '4px'
  }}
>
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
                {(order.cloth?.image || order.gift?.image) && (
                  <img
                    src={`${API_BASE_URL}${order.cloth?.image || order.gift?.image}`}
                    alt="Order"
                    className="order-img"
                  />
                )}

                <div className="order-header">
                  <h3>{order.cloth?.name || order.gift?.name}</h3>
                  <span style={{ fontSize: "0.8rem", color: "#999", marginLeft: "10px" }}>
                    {order.cloth ? '(Cloth)' : '(Gift)'}
                  </span>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                    {order.status}
                  </span>
                </div>

                <div className="order-info">
                  {order.cloth && <p><strong>Size:</strong> {order.size}</p>}
                  {order.gift && <p><strong>Category:</strong> {order.gift.category}</p>}
                  <p><strong>Amount:</strong> ₹{order.amount}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Payment ID:</strong> {order.paymentId}</p>
                </div>

                <div className="shipping-info">
                  {order.shippingId ? (
                    <>
                      <div><strong>{order.shippingId.fullName}</strong></div>
                      <div>{order.shippingId.phone}</div>
                      <div>{order.shippingId.addressLine1}</div>
                      <div>{order.shippingId.addressLine2}</div>
                      <div>{order.shippingId.city}, {order.shippingId.state} - {order.shippingId.pincode}</div>
                      <div>{order.shippingId.country}</div>
                    </>
                  ) : (
                    "No Address"
                  )}
                </div>

                <div className="order-footer">
                  <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
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
