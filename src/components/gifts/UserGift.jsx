import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import SearchBar from './SearchBar';
import GiftCard from './GiftCard';
import ShippingForm from '../ShippingForm';
import './UserGift.css';
import { FaGift, FaTimes, FaShoppingBag, FaArrowRight, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const categories = ['Corporate Gifts', 'Personalised Gifts', 'Birthday Gifts', 'Anniversary Gifts'];

const UserGift = () => {
  const [gifts, setGifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [buyingGift, setBuyingGift] = useState(null);
  const [shippingId, setShippingId] = useState(null);
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
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        toast.warning("Please login first");
        return;
      }
      
      const res = await axios.post(`${API_BASE_URL}/api/cart/add-gift`, {
        userId: user.id,
        giftId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.data.alreadyExists) {
        toast.info("Gift already in boutique bag!");
      } else {
        toast.success("Gift added to boutique bag!");
      }
    } catch (err) {
      toast.error("Error adding gift to bag");
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
        name: "Aasa Boutique",
        description: `Purchase: ${buyingGift.name}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            await axios.post(`${API_BASE_URL}/api/order/place-gift-order`, {
              giftId: buyingGift._id,
              amount: total,
              quantity,
              paymentId: response.razorpay_payment_id,
              shippingId: shippingId._id || shippingId
            }, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            toast.success("Order placed successfully! This handcrafted treasure is on its way.");
            setBuyingGift(null);
            setShippingId(null);
            setQuantity(1);
            fetchGifts();
          } catch (err) {
            toast.error("Payment successful but failed to record order. Please contact support.");
          }
        }
      };
      new window.Razorpay(options).open();
    } catch (err) {
      toast.error("Failed to initiate payment");
    }
  };

  useEffect(() => {
    fetchGifts();
    setSearchTerm('');
  }, [selectedCategory]);

  return (
    <div className="user-gift-container">
      <header className="gift-hero-banner">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <span className="premium-tag">Artesian Collection</span>
          <h2>Crafting Your Story</h2>
          <p>Turn your imagination into reality with our beautifully crafted treasures.</p>
        </div>
      </header>

      <div className="gift-controls">
        <div className="categories-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-pill ${cat === selectedCategory ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

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
        {gifts.map((g, idx) => (
          <GiftCard
            key={g._id}
            gift={g}
            onBuy={setBuyingGift}
            onAddToCart={handleAddToGiftCart}
          />
        ))}
      </div>

      {buyingGift && (
        <div className="gift-modal-overlay animate-fade-in">
          <div className="gift-modal-content animate-pop-in">
            <button className="close-modal" onClick={() => { setBuyingGift(null); setShippingId(null); }}>
              <FaTimes />
            </button>
            
            {!shippingId ? (
              <div className="modal-step">
                <div className="step-header">
                  <span className="step-num">01</span>
                  <h3>Gift Delivery Location</h3>
                </div>
                <ShippingForm onShippingSaved={setShippingId} inline={true} />
              </div>
            ) : (
              <div className="modal-step">
                <div className="step-header">
                  <span className="step-num">02</span>
                  <h3>Complete Your Gift Order</h3>
                </div>
                
                <div className="gift-summary-mini">
                  <img src={`${API_BASE_URL}${buyingGift.image}`} alt="" className="mini-img" />
                  <div className="mini-info">
                    <h3>{buyingGift.name}</h3>
                    <p>₹{buyingGift.price}</p>
                  </div>
                </div>

                {buyingGift.stock === 0 ? (
                  <div className="out-stock-alert">This handcrafted item is currently unavailable.</div>
                ) : (
                  <div className="checkout-footer">
                    <div className="quantity-dial">
                      <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><FaMinus /></button>
                      <span>{quantity}</span>
                      <button onClick={() => setQuantity(q => Math.min(buyingGift.stock, q + 1))}><FaPlus /></button>
                    </div>
                    
                    <button className="final-pay-btn" onClick={handlePayment}>
                      Confirm & Pay ₹{buyingGift.price * quantity} <FaArrowRight />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGift;
