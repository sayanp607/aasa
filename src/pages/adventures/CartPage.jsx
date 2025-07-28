import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TripCartPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('trip_cart')) || [];
    setItems(storedCart);
  }, []);

  const removeItem = (indexToRemove) => {
    const updatedCart = items.filter((_, index) => index !== indexToRemove);
    setItems(updatedCart);
    localStorage.setItem('trip_cart', JSON.stringify(updatedCart));
  };

  const total = items.reduce((sum, i) => sum + (i.tripPrice * i.userNames.length), 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        items.map((i, idx) => (
          <div key={idx}>
            <p>
              {i.tripTitle} — ₹{i.tripPrice * i.userNames.length} ({i.userNames.length} pax)
            </p>
            <p>Date: {new Date(i.selectedDate).toDateString()}</p>
            <button onClick={() => removeItem(idx)}>Remove</button>
          </div>
        ))
      )}

      <h3>Total: ₹{total}</h3>
      {items.length > 0 && (
        <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      )}
    </div>
  );
}

export default TripCartPage;
