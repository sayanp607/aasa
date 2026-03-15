import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import "./AdminOrders.css";
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('cloth');
  const [statusOptions] = useState(['Ordered', 'Packing', 'Delivery', 'Out for delivery', 'Delivered']);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/order/all-orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setOrders(res.data);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/order/update-status/${orderId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Order status updated');
      fetchOrders();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update status');
    }
  };

  const clothOrders = orders.filter(order => order.cloth);
  const giftOrders = orders.filter(order => order.gift);

  return (
    <div className="admin-orders-container">
      <h2 className="admin-orders-heading">All Orders (Admin)</h2>

      {/* 🔁 Tabs */}
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

      {/* Cloth Orders Table */}
      {activeTab === 'cloth' && (
        <div className="admin-orders-table-wrapper">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Cloth</th>
                <th>Size</th>
                <th>Ordered Quantity</th>
                <th>Amount</th>
                <th>Payment ID</th>
                <th>Status</th>
                <th>Shipping Address</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {clothOrders.map(order => (
                <tr key={order._id}>
                  <td>{order.userId?.email}</td>
                  <td>{order.cloth?.name}</td>
                  <td>{order.size || 'N/A'}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.paymentId}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="status-select"
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {order.shippingId ? (
                      <div className="shipping-info">
                        <div>{order.shippingId.fullName}</div>
                        <div>{order.shippingId.phone}</div>
                        <div>{order.shippingId.addressLine1}</div>
                        <div>{order.shippingId.addressLine2}</div>
                        <div>{order.shippingId.city}, {order.shippingId.state} - {order.shippingId.pincode}</div>
                        <div>{order.shippingId.country}</div>
                      </div>
                    ) : (
                      "No Address"
                    )}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Gift Orders Table */}
      {activeTab === 'gift' && (
        <div className="admin-orders-table-wrapper">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Gift</th>
                <th>Category</th>
                <th>Ordered Quantity</th>
                <th>Amount</th>
                <th>Payment ID</th>
                <th>Status</th>
                <th>Shipping Address</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {giftOrders.map(order => (
                <tr key={order._id}>
                  <td>{order.userId?.email}</td>
                  <td>{order.gift?.name}</td>
                  <td>{order.gift?.category}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.paymentId}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="status-select"
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {order.shippingId ? (
                      <div className="shipping-info">
                        <div>{order.shippingId.fullName}</div>
                        <div>{order.shippingId.phone}</div>
                        <div>{order.shippingId.addressLine1}</div>
                        <div>{order.shippingId.addressLine2}</div>
                        <div>{order.shippingId.city}, {order.shippingId.state} - {order.shippingId.pincode}</div>
                        <div>{order.shippingId.country}</div>
                      </div>
                    ) : (
                      "No Address"
                    )}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
