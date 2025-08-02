import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';

export default function MytripOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.id) {
      axios.get(`${API_BASE_URL}/api/triporder/user/${user.id}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error('Failed to load orders:', err));
    }
  }, [user]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

              {order.items.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                  <p><strong>Trip Title:</strong> {item.tripId?.title || item.tripTitle}</p>
                  <p><strong>Total Persons:</strong> {item.userNames?.length || item.quantity}</p>
                  <p><strong>Trip Date:</strong> {item.selectedDate}</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
