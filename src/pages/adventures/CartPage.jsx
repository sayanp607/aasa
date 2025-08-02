import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const TripCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
const navigate=useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = localStorage.getItem('user');
        if (!user) return;

        const response = await axios.get('http://localhost:5000/api/tripcart', {
          headers: {
            'x-user-data': user,
          },
        });
        setCartItems(response.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = (item) => {
  navigate('/billing', { state: { item } });
};


  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: '20px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            <h3>{item.activity}</h3>
            <p>Date: {item.date}</p>
            <p>Total Guests: {item.totalGuests}</p>
            <p>Price Per Head: ₹{item.pricePerHead}</p>
            <p>Total Price: ₹{item.totalPrice}</p>
            <h4>Guests:</h4>
            <ul>
              {item.guests.map((g, i) => (
                <li key={i}>{g.title} {g.name}</li>
              ))}
            </ul>
            <button onClick={() => handleCheckout(item)}>Proceed to Checkout</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TripCartPage;
