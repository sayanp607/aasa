import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import ShippingForm from '../ShippingForm';
import { FaSearch, FaShoppingBag, FaExpand, FaFire, FaTimes, FaArrowRight } from 'react-icons/fa';
import './UserCloth.css';
import { toast } from 'react-toastify';

const UserCloth = () => {
  const [cloths, setCloths] = useState([]);
  const [filteredCloths, setFilteredCloths] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [shippingId, setShippingId] = useState(null);
  const [orderedQuantity, setOrderedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSizePrice, setSelectedSizePrice] = useState(0);
  const [selectedSizeStock, setSelectedSizeStock] = useState(0);
  const [showSizes, setShowSizes] = useState({});

  const priceRanges = [
    { label: 'All Picks', value: '' },
    { label: 'Under ₹1000', value: '0-1000' },
    { label: '₹1000 - ₹2000', value: '1000-2000' },
    { label: 'Premium (₹2000+)', value: '2000-100000' },
  ];

  useEffect(() => {
    fetchCloths();
  }, []);

  const fetchCloths = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/cloth/public/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCloths(res.data);
      setFilteredCloths(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const applyFilters = (search, price) => {
    let temp = cloths;
    
    if (search) {
      temp = temp.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (price) {
      const [min, max] = price.split('-').map(Number);
      temp = temp.filter(c => c.sizes.some(s => s.price >= min && s.price <= max));
    }

    setFilteredCloths(temp);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    applyFilters(val, selectedPriceRange);
  };

  const handlePriceFilter = (range) => {
    setSelectedPriceRange(range);
    applyFilters(searchQuery, range);
  };

  const initiateBuy = (cloth) => {
    setSelectedCloth(cloth);
    setShippingId(null);
    setOrderedQuantity(1);
    setSelectedSize('');
    setSelectedSizePrice(0);
    setSelectedSizeStock(0);
  };

  const selectSizeChip = (sz) => {
    setSelectedSize(sz.size);
    setSelectedSizePrice(sz.price);
    setSelectedSizeStock(sz.stock);
    setOrderedQuantity(1);
  };

  const handlePay = async () => {
    const totalAmount = selectedSizePrice * orderedQuantity;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/order/create-payment-order`, { amount: totalAmount }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const { id: order_id } = res.data;
      const options = {
        key: 'rzp_test_5Dp4Elo76csOCm',
        amount: totalAmount * 100,
        currency: 'INR',
        name: 'Aasa Fashion',
        order_id,
        handler: async function (response) {
          try {
            await axios.post(`${API_BASE_URL}/api/order/place-order`, {
              clothId: selectedCloth._id,
              amount: totalAmount,
              quantity: orderedQuantity,
              paymentId: response.razorpay_payment_id,
              shippingId: shippingId._id || shippingId, // Ensure it's an ID
              size: selectedSize
            }, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchCloths();
            toast.success('Order placed successfully! Welcome to the Aasa Family.');
            setSelectedCloth(null);
            setShippingId(null);
            fetchCloths();
          } catch (err) {
            console.error("Order Placement Error:", err);
            toast.error("Payment successful but failed to record order. Please contact support.");
            fetchCloths();
          }
        }
      };
      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Payment Initiation Error:", error);
      toast.error("Failed to initiate payment");
    }
  };

  const handleAddToCart = async (cloth) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        toast.warning("Please login first");
        return;
      }
      
      const res = await axios.post(`${API_BASE_URL}/api/cart/add`, {
        userId: user.id,
        clothId: cloth._id
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.data.alreadyExists) {
        toast.info("Item already in boutique bag!");
      } else {
        toast.success("Added to boutique bag!");
      }
    } catch (err) {
      toast.error("Error adding to bag");
    }
  };

  return (
    <div className="usercloth-container">
      <header className="boutique-header animate-fade-in">
        <div className="header-info">
          <span className="premium-tag">Limited Collections</span>
          <h2 className="boutique-title">Style Explorer</h2>
          <p className="boutique-subtitle">Curated wardrobes for the modern individual.</p>
        </div>

        <div className="explorer-controls">
          <div className="search-pill">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search collections..." 
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="filter-pill-row">
            {priceRanges.map(p => (
              <button 
                key={p.value} 
                className={`filter-pill ${selectedPriceRange === p.value ? 'active' : ''}`}
                onClick={() => handlePriceFilter(p.value)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="cloth-grid">
        {filteredCloths.map((cloth, idx) => (
          <div key={cloth._id} className="boutique-card" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="card-media">
              {idx % 3 === 0 && <span className="trending-badge"><FaFire /> Trending</span>}
              {cloth.image && (
                <img src={`${API_BASE_URL}/uploads/${cloth.image}`} alt={cloth.name} className="cloth-image" />
              )}
              <div className="card-actions-overlay">
                <button className="icon-btn" onClick={() => initiateBuy(cloth)}><FaShoppingBag /></button>
                <button className="icon-btn" onClick={() => setShowSizes(prev => ({ ...prev, [cloth._id]: !prev[cloth._id] }))}><FaExpand /></button>
              </div>
            </div>

            <div className="card-content">
              <div className="card-header-row">
                <h4>{cloth.name}</h4>
                <span className="price-tag">₹{cloth.sizes[0]?.price}</span>
              </div>
              <p className="cloth-desc">{cloth.description}</p>
              
              <div className="card-footer-btns">
                <button className="add-bag-btn" onClick={() => handleAddToCart(cloth)}>
                  Add to Bag
                </button>
                <button className="buy-now-btn" onClick={() => initiateBuy(cloth)}>
                  View Details <FaArrowRight />
                </button>
              </div>

              {showSizes[cloth._id] && (
                <div className="size-preview animate-slide-up">
                  {cloth.sizes.map((sz, i) => (
                    <div key={i} className={`size-item ${sz.stock === 0 ? 'out' : ''}`}>
                      <span>{sz.size}</span>
                      <span>₹{sz.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCloth && (
        <div className="boutique-modal-overlay animate-fade-in">
          <div className="boutique-modal-content animate-pop-in">
            <button className="close-modal" onClick={() => setSelectedCloth(null)}><FaTimes /></button>
            
            {!shippingId ? (
              <div className="modal-step">
                <div className="step-header">
                  <span className="step-num">01</span>
                  <h3>Delivery Location</h3>
                </div>
                <ShippingForm onShippingSaved={setShippingId} inline={true} />
              </div>
            ) : (
              <div className="modal-step">
                <div className="step-header">
                  <span className="step-num">02</span>
                  <h3>Complete Your Order</h3>
                </div>
                
                <div className="modal-product-summary">
                  <img src={`${API_BASE_URL}/uploads/${selectedCloth.image}`} alt="" className="summary-img" />
                  <div className="summary-info">
                    <h4>{selectedCloth.name}</h4>
                    <p>{selectedCloth.description}</p>
                  </div>
                </div>

                <div className="size-selector-chips">
                  <h5>Select Preferred Size</h5>
                  <div className="chips-row">
                    {selectedCloth.sizes.map((sz, i) => (
                      <button 
                        key={i}
                        className={`size-chip ${selectedSize === sz.size ? 'selected' : ''} ${sz.stock === 0 ? 'disabled' : ''}`}
                        onClick={() => sz.stock > 0 && selectSizeChip(sz)}
                        disabled={sz.stock === 0}
                      >
                        <span className="chip-name">{sz.size}</span>
                        <span className="chip-price">₹{sz.price}</span>
                        {sz.stock < 5 && sz.stock > 0 && <span className="low-stock">Limited</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedSize && (
                  <div className="checkout-footer animate-slide-up">
                    <div className="quantity-dial">
                      <button onClick={() => orderedQuantity > 1 && setOrderedQuantity(q => q - 1)}>-</button>
                      <span>{orderedQuantity}</span>
                      <button onClick={() => orderedQuantity < selectedSizeStock && setOrderedQuantity(q => q + 1)}>+</button>
                    </div>
                    
                    <button className="final-pay-btn" onClick={handlePay}>
                      Confirm & Pay ₹{selectedSizePrice * orderedQuantity}
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

export default UserCloth;
