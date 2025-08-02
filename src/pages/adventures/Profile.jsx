import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';

const UsertripProfile = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Parse user from localStorage

    if (!user || !user.id) {
      console.error("User not logged in or malformed user data");
      return;
    }

    axios.get(`${API_BASE_URL}/api/triporder/my-orders`, {
      headers: {
        'x-user-data': JSON.stringify(user),  // Send user in header
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      setOrders(res.data);
    })
    .catch((err) => {
      console.error("Failed to fetch orders:", err.response?.data || err.message);
    });
  }, []);

  return (
  <div>
  <h2>Your Previous Orders</h2>
  {orders.length === 0 ? (
    <p>No orders found.</p>
  ) : (
    orders.map(order => (
      <div
        key={order._id}
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          marginBottom: "15px",
          borderRadius: "8px"
        }}
      >
        {order.item ? (
          <>
            <h3>{order.item.activity || "Activity Not Named"}</h3>
            <p><strong>Date:</strong> {order.item.date}</p>
            <p><strong>Total Guests:</strong> {order.item.guests?.length}</p>
            <p><strong>Price Per Head:</strong> ₹{order.item.pricePerHead}</p>
            <p><strong>Total Price:</strong> ₹{order.item.totalPrice}</p>
            <h4>Guests:</h4>
            <ul>
              {order.item.guests.map((guest, i) => (
                <li key={i}>{guest.title} {guest.name}</li>
              ))}
            </ul>
            <p><em>Ordered on:</em> {new Date(order.createdAt).toLocaleString()}</p>
          </>
        ) : (
          <p><em>Item details not available for this order.</em></p>
        )}
      </div>
    ))
  )}
</div>

  );
};

export default UsertripProfile;
