import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [giftCartItems, setGiftCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;
      const res = await axios.get(`${API_BASE_URL}/api/cart/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const fetchGiftCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;
      const res = await axios.get(`${API_BASE_URL}/api/cart/gift/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setGiftCartItems(res.data);
    } catch (err) {
      console.error("Error fetching gift cart:", err);
    }
  };

  const handleRemoveCloth = async (clothId, size) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.delete(`${API_BASE_URL}/api/cart/remove`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { userId: user.id, clothId, size }
      });
      setCartItems(prev => prev.filter(item => !(item.clothId._id === clothId && item.size === size)));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  const handleRemoveGift = async (giftId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.delete(`${API_BASE_URL}/api/cart/remove-gift`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { userId: user.id, giftId }
      });
      setGiftCartItems(prev => prev.filter(item => item.giftId._id !== giftId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove gift");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && localStorage.getItem('token')) {
      setIsLoggedIn(true);
      fetchCart();
      fetchGiftCart();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="cart-page-container">
      <h2>My Cart</h2>

      {!isLoggedIn ? (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#f00', fontSize: '18px' }}>
          Please login to view your cart.
        </p>
      ) : (
        <>
          <h3>Gift Items</h3>
          {giftCartItems.length === 0 ? (
            <p>No gifts added yet.</p>
          ) : (
            <div className="cart-grid">
              {giftCartItems.map((item, idx) => (
                <div key={idx} className="cart-card">
                  <h4>{item.giftId?.name}</h4>
                  <p>Price: ₹{item.giftId?.price}</p>
                  <p>Category: {item.giftId?.category}</p>
                  <button onClick={() => handleRemoveGift(item.giftId._id)}>Remove</button>
                </div>
              ))}
            </div>
          )}

          <h3>Cloth Items</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-grid">
              {cartItems.map((item, idx) => (
                <div key={idx} className="cart-card">
                  <h4>{item.clothId?.name}</h4>
                  <p>Size: {item.size}</p>
                  <p>Price: ₹{item.clothId?.sizes?.[0]?.price || 'N/A'}</p>
                  <button onClick={() => handleRemoveCloth(item.clothId._id, item.size)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
