import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import ShippingForm from '../ShippingForm';
import './UserCloth.css';
const UserCloth = () => {
  const [cloths, setCloths] = useState([]);
  const [filteredCloths, setFilteredCloths] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [shippingId, setShippingId] = useState(null);
  const [orderedQuantity, setOrderedQuantity] = useState(1);
const [selectedSizes, setSelectedSizes] = useState({});
const [selectedSize, setSelectedSize] = useState({});
  const [selectedSizePrice, setSelectedSizePrice] = useState(0);
  const [selectedSizeStock, setSelectedSizeStock] = useState(0);
  const [showSizes, setShowSizes] = useState({});

  const priceRanges = [
    { label: 'All', value: '' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: '₹1000 - ₹2000', value: '1000-2000' },
  ];

  useEffect(() => {
    fetchCloths();
  }, []);

  const fetchCloths = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/admin/cloth/public/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setCloths(res.data);
    setFilteredCloths(res.data);
  };

  const handleFilter = (value) => {
    setSelectedPrice(value);
    if (!value) {
      setFilteredCloths(cloths);
      return;
    }
    const [min, max] = value.split('-').map(Number);
    const filtered = cloths.filter(c => {
      return c.sizes.some(sizeObj => sizeObj.price >= min && sizeObj.price <= max);
    });
    setFilteredCloths(filtered);
  };

  const toggleSizes = (clothId) => {
    setShowSizes(prev => ({ ...prev, [clothId]: !prev[clothId] }));
  };

  const initiateBuy = (cloth) => {
    setSelectedCloth(cloth);
    setShippingId(null);
    setOrderedQuantity(1);
    setSelectedSize('');
    setSelectedSizePrice(0);
    setSelectedSizeStock(0);
  };

  const handleSizeSelection = (e) => {
    const sizeVal = e.target.value;
    setSelectedSize(sizeVal);
    const sizeObj = selectedCloth.sizes.find(sz => sz.size === sizeVal);
    setSelectedSizePrice(sizeObj.price);
    setSelectedSizeStock(sizeObj.stock);
    setOrderedQuantity(1); // reset quantity when size changes
  };

  const handlePay = async () => {
    const totalAmount = selectedSizePrice * orderedQuantity;

    const res = await axios.post(`${API_BASE_URL}/api/order/create-payment-order`, { amount: totalAmount }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    const { id: order_id } = res.data;

    const options = {
      key: 'rzp_test_5Dp4Elo76csOCm',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'E-Commerce Cloth',
      order_id,
      handler: async function (response) {
        await axios.post(`${API_BASE_URL}/api/order/place-order`, {
          clothId: selectedCloth._id,
          amount: totalAmount,
          quantity: orderedQuantity,
          paymentId: response.razorpay_payment_id,
          shippingId: shippingId,
          size: selectedSize
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        alert('Order placed successfully!');
        setSelectedCloth(null);
        setShippingId(null);
        fetchCloths();
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const increaseQuantity = () => {
    if (orderedQuantity < selectedSizeStock) {
      setOrderedQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (orderedQuantity > 1) {
      setOrderedQuantity(prev => prev - 1);
    }
  };
const handleAddToCart = async (cloth) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/cart/add`, {
      userId: JSON.parse(localStorage.getItem('user')).id,
      clothId: cloth._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (res.data.alreadyExists) {
      alert("Item is already added in the cart!");
    } else {
      alert("Added to cart!");
    }

  } catch (err) {
    console.error("Add to Cart Error:", err);
    alert("Error adding to cart");
  }
};



  return (
  <div className="usercloth-container">
    <h2 className="usercloth-header">Available Cloths</h2>

    <select className="price-filter" onChange={(e) => handleFilter(e.target.value)} value={selectedPrice}>
      {priceRanges.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
    </select>

    <div className="cloth-grid">
      {filteredCloths.map(cloth => (
      <div key={cloth._id} className="cloth-card">
  {cloth.image && (
    <img src={`${API_BASE_URL}/uploads/${cloth.image}`} alt="cloth" className="cloth-image" />
  )}
  <h4>{cloth.name}</h4>
  <p>{cloth.description}</p>
  <p>Price starts at ₹{cloth.sizes[0]?.price}</p>

 


  <button className="add-to-cart-button" onClick={() => handleAddToCart(cloth)}>
    Add to Cart
  </button>

  <button className="buy-button" onClick={() => initiateBuy(cloth)}>Buy</button>

  <button className="view-button" onClick={() => toggleSizes(cloth._id)}>
  {showSizes[cloth._id] ? "Hide Sizes" : "View All Sizes"}
</button>

{showSizes[cloth._id] && (
  <div className="size-info">
    {cloth.sizes.map((sz, idx) => (
      <p key={idx}>
        Size: {sz.size} | Price: ₹{sz.price} | Stock: {sz.stock === 0 ? 'Out of Stock' : sz.stock}
      </p>
    ))}
  </div>
)}

</div>

      ))}
    </div>

{selectedCloth && !shippingId && (
  <div className="popup-overlay">
    <div className="popup-container">
      <h3 className="popup-title">Shipping Details for: {selectedCloth.name}</h3>
      <ShippingForm onShippingSaved={setShippingId} />
    </div>
  </div>
)}


   {selectedCloth && shippingId && (
  <div className="popup-overlay">
    <div className="popup-container">
      <h3 className="popup-title">Size Selection for: {selectedCloth.name}</h3>

      <select value={selectedSize} onChange={handleSizeSelection} className="price-filter">
        <option value="">-- Select Size --</option>
        {selectedCloth.sizes.map((sz, idx) => (
          <option key={idx} value={sz.size} disabled={sz.stock === 0}>
            {sz.size} (₹{sz.price} | Stock: {sz.stock === 0 ? 'Out of Stock' : sz.stock})
          </option>
        ))}
      </select>

      {selectedSize && (
        <>
          <div className="quantity-section">
            <h4>Quantity:</h4>
            <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
            <span style={{ margin: '0 20px', fontSize: '24px' }}>{orderedQuantity}</span>
            <button className="quantity-btn" onClick={increaseQuantity}>+</button>
          </div>

          <div className="total-amount">
            <h4>Total Amount: ₹{selectedSizePrice * orderedQuantity}</h4>
          </div>

          <button className="proceed-button" onClick={handlePay}>
            Proceed to Pay ₹{selectedSizePrice * orderedQuantity}
          </button>
           
        </>
      )}
    </div>
  </div>
)}

  </div>
);
};

export default UserCloth;
