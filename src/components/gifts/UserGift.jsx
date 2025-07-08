import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import SearchBar from './SearchBar';
import GiftCard from './GiftCard';
import ShippingForm from '../ShippingForm';
import './UserGift.css';

const categories = ['Corporate Gifts', 'Personalised Gifts', 'Birthday Gifts', 'Anniversary Gifts'];

const UserGift = () => {
  const [gifts, setGifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [buyingGift, setBuyingGift] = useState(null); // 👈 for modal
  const [shippingInfo, setShippingInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchGifts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/gifts/category/${selectedCategory}`);
      setGifts(res.data);
    } catch (err) {
      console.error("Failed to fetch gifts", err);
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(`${API_BASE_URL}/api/gifts/search?q=${query}&category=${selectedCategory}`);
      setSuggestions(res.data);
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
    }
  };

  const handleSelectSuggestion = (gift) => {
    setGifts([gift]);
    setSearchTerm(gift.name);
    setSuggestions([]);
  };

  const handleAddToGiftCart = async (giftId) => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const res = await axios.post(`${API_BASE_URL}/api/cart/add-gift`, {
        userId,
        giftId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.data.alreadyExists) {
        alert("Gift is already added in the cart");
      } else {
        alert("Gift added to cart");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding gift to cart");
    }
  };
const handlePayment = async () => {
  const total = buyingGift.price * quantity;

  try {
    const { data: order } = await axios.post(`${API_BASE_URL}/api/order/create-payment-order`, {
      amount: total
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    const options = {
      key: "rzp_test_5Dp4Elo76csOCm",
      amount: order.amount,
      currency: order.currency,
      name: "Gift Store",
      description: "Purchase Gift",
      order_id: order.id,

      handler: async (response) => {
        alert("Payment successful!");

        // ✅ Only place order, no manual stock reduction here
        await axios.post(`${API_BASE_URL}/api/order/place-gift-order`, {
          giftId: buyingGift._id,
          amount: total,
          quantity,
          paymentId: response.razorpay_payment_id,
          shippingId: shippingInfo._id
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        // Fetch updated gift list (reflect reduced stock)
        const updatedRes = await axios.get(`${API_BASE_URL}/api/gifts/category/${selectedCategory}`);
        setGifts(updatedRes.data);

        // Reset states
        setBuyingGift(null);
        setShippingInfo(null);
        setQuantity(1);
      },

      prefill: {
        name: shippingInfo.fullName,
        contact: shippingInfo.phone
      }
    };

    // Hide modal before payment popup opens
    setBuyingGift(null);
    setShippingInfo(null);
    setQuantity(1);

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    alert("Payment failed");
    console.error(err);
  }
};



  useEffect(() => {
    fetchGifts();
    setSearchTerm('');
  }, [selectedCategory]);

 return (
  <div className="user-gift-container">
    <h2 className="heading">
      TURN YOUR IMAGINATION INTO REALITY,<br />YOUR STORY, BEAUTIFULLY CRAFTED
    </h2>

    <div className="categories">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={cat === selectedCategory ? 'active' : ''}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>

    <div className="search-bar-container">
      <SearchBar
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          fetchSuggestions(val);
        }}
        onSelectSuggestion={handleSelectSuggestion}
        suggestions={suggestions}
      />
    </div>

    <div className="gift-grid">
      {gifts.map((g) => (
        <div className="gift-card" key={g._id}>
          <GiftCard
            gift={g}
            onBuy={() => setBuyingGift(g)}
            onAddToCart={handleAddToGiftCart}
          />
        </div>
      ))}
    </div>

    {/* 💳 Buy Modal */}
    {buyingGift && (
      <div className="modal">
        <div className="modal-content">
          <h3>Buy: {buyingGift.name}</h3>
          <p>Price: ₹{buyingGift.price}</p>
          <p>Stock Available: {buyingGift.stock}</p>

          {!shippingInfo ? (
            <ShippingForm onShippingSaved={setShippingInfo} />
          ) : (
            <>
              {buyingGift.stock === 0 ? (
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                  ❌ This product is currently out of stock.
                </p>
              ) : (
                <>
                  <div className="quantity-wrapper">
  <label>Quantity:</label>
  <div className="quantity-controls">
    <button
      className="qty-btn"
      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
    >
      −
    </button>
    <span className="qty-value">{quantity}</span>
    <button
      className="qty-btn"
      onClick={() =>
        setQuantity((prev) =>
          Math.min(buyingGift.stock, prev + 1)
        )
      }
    >
      +
    </button>
  </div>
</div>

                  <p>Total: ₹{buyingGift.price * quantity}</p>
                  <button
                    onClick={handlePayment}
                    disabled={quantity < 1 || quantity > buyingGift.stock}
                    className="pay-btn"
                    style={{
                      background:
                        quantity < 1 || quantity > buyingGift.stock
                          ? '#ccc'
                          : '#28a745',
                      cursor:
                        quantity < 1 || quantity > buyingGift.stock
                          ? 'not-allowed'
                          : 'pointer',
                    }}
                  >
                    Pay Now
                  </button>
                </>
              )}
            </>
          )}

          <button
            className="cancel-btn"
            onClick={() => {
              setBuyingGift(null);
              setShippingInfo(null);
              setQuantity(1);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>
);

};

export default UserGift;
