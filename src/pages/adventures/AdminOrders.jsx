import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';

const AdmintripOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'admin') {
      alert('Access Denied: Admins only!');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/triporder/all-orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (role !== 'admin') {
    return <h2 style={{ color: 'red' }}>Unauthorized Access</h2>;
  }

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h2>All Orders (Admin View)</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Activity</th>
              <th>Date</th>
              <th>Guests</th>
              <th>Billing Info</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>{order.item?.activity || 'N/A'}</td>
                <td>{order.item?.date || 'N/A'}</td>
                <td>
                  {order.item?.guests?.length > 0
                    ? order.item.guests.map(g => `${g.title} ${g.name}`).join(', ')
                    : 'N/A'}
                </td>
                <td>
                  {order.billingInfo?.firstName} {order.billingInfo?.lastName}<br />
                  {order.billingInfo?.email}<br />
                  {order.billingInfo?.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdmintripOrders;
