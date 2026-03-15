import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../main';
import ShippingForm from '../components/ShippingForm'; // Adjust if path is different
import './CartPage.css';
import { toast } from 'react-toastify';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [giftCartItems, setGiftCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [shippingId, setShippingId] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSizePrice, setSelectedSizePrice] = useState(0);
  const [selectedSizeStock, setSelectedSizeStock] = useState(0);
  const [orderedQuantity, setOrderedQuantity] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedGift, setSelectedGift] = useState(null);
  const [giftShippingInfo, setGiftShippingInfo] = useState(null);
  const [giftQuantity, setGiftQuantity] = useState(1);

  const handleSizeChange = (itemId, clothSizes, selectedSize) => {
  const szObj = clothSizes.find(sz => sz.size === selectedSize);
  if (!szObj) return;

  setSelectedSizes(prev => ({
    ...prev,
    [itemId]: {
      size: selectedSize,
      price: szObj.price,
      stock: szObj.stock,
    }
  }));
};



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
      toast.info("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
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
      toast.info("Gift removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove gift");
    }
  };

 const initiateBuy = (item) => {
  setSelectedCloth(item.clothId);
  setShippingId(null);
  setSelectedSize(item.size);
  const sizeObj = item.clothId?.sizes?.find(sz => sz.size === item.size);
  if (sizeObj) {
    setSelectedSizePrice(sizeObj.price);
    setSelectedSizeStock(sizeObj.stock);
  }
  setOrderedQuantity(1);
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

        toast.success('Order placed successfully!');
        setSelectedCloth(null);
        setShippingId(null);
        fetchCart();
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleGiftPayment = async () => {
  const total = selectedGift.price * giftQuantity;

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
        await axios.post(`${API_BASE_URL}/api/order/place-gift-order`, {
          giftId: selectedGift._id,
          amount: total,
          quantity: giftQuantity,
          paymentId: response.razorpay_payment_id,
          shippingId: giftShippingInfo._id
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        toast.success("Gift order placed!");
        setSelectedGift(null);
        setGiftShippingInfo(null);
        setGiftQuantity(1);
        fetchGiftCart(); // Refresh gift cart
      },

      prefill: {
        name: giftShippingInfo.fullName,
        contact: giftShippingInfo.phone
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment failed", err);
    toast.error("Payment failed");
  }
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
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px' }}>
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

  <button className="remove-btn" onClick={() => handleRemoveGift(item.giftId._id)}>Remove</button>

<button
  disabled={item.giftId.stock === 0}
  onClick={() => {
    if (item.giftId.stock === 0) return;
    setSelectedGift(item.giftId);
    setGiftShippingInfo(null);
    setGiftQuantity(1);
  }}
>
  {item.giftId.stock === 0 ? 'Out of Stock' : 'Buy'}
</button>

</div>

              ))}
            </div>
          )}

          <h3>Cloth Items</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-grid">
       {cartItems.map((item, idx) => {
  const selection = selectedSizes[item._id] || {};
  const cloth = item.clothId;

  return (
    <div key={idx} className="cart-card">
      <h4>{cloth?.name}</h4>

      <label>
        Choose Size:
        <select
          onChange={(e) =>
            handleSizeChange(item._id, cloth.sizes, e.target.value)
          }
          value={selection.size || ''}
        >
          <option value="">-- Select --</option>
          {cloth.sizes.map((sz, i) => (
            <option key={i} value={sz.size} disabled={sz.stock === 0}>
              {sz.size} (₹{sz.price} | Stock: {sz.stock === 0 ? 'Out of Stock' : sz.stock})
            </option>
          ))}
        </select>
      </label>

      {selection.size && (
        <>
          <p>Price: ₹{selection.price}</p>
          <p>Stock: {selection.stock}</p>
        </>
      )}

      <button className="remove-btn" onClick={() => handleRemoveCloth(cloth._id, selection.size)}>Remove</button>
 <button
  className="buy-button"
  disabled={selection.size && selection.stock === 0}
  onClick={() => {
    if (!selection.size) {
      toast.warning('Please select a size first.');
      return;
    }
    initiateBuy({
      clothId: cloth,
      size: selection.size
    });
  }}
>
  {selection.size && selection.stock === 0 ? 'Out of Stock' : 'Buy'}
</button>


    </div>
  );
})}


            </div>
          )}
        </>
      )}

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
            <h3 className="popup-title">Confirm Order for: {selectedCloth.name}</h3>
            <p>Size: {selectedSize}</p>

            <div className="quantity-section">
              <h4>Quantity:</h4>
           <button
  className="quantity-btn"
  onClick={decreaseQuantity}
  disabled={orderedQuantity <= 1}
>
  -
</button>

<span style={{ margin: '0 20px', fontSize: '24px' }}>{orderedQuantity}</span>

<button
  className="quantity-btn"
  onClick={increaseQuantity}
  disabled={orderedQuantity >= selectedSizeStock}
>
  +
</button>

            </div>

            <div className="total-amount">
              <h4>Total Amount: ₹{selectedSizePrice * orderedQuantity}</h4>
            </div>

            <button className="proceed-button" onClick={handlePay}>
              Proceed to Pay ₹{selectedSizePrice * orderedQuantity}
            </button>
          </div>
        </div>
      )}
      {selectedGift && !giftShippingInfo && (
  <div className="popup-overlay">
    <div className="popup-container">
      <h3 className="popup-title">Shipping Details for: {selectedGift.name}</h3>
      <ShippingForm onShippingSaved={setGiftShippingInfo} />
    </div>
  </div>
)}

{selectedGift && giftShippingInfo && (
  <div className="popup-overlay">
    <div className="popup-container">
      <h3 className="popup-title">Confirm Gift Order: {selectedGift.name}</h3>
      <p>Price: ₹{selectedGift.price}</p>

      <div className="quantity-section">
        <h4>Quantity:</h4>
        <button className="quantity-btn" onClick={() => setGiftQuantity(prev => Math.max(1, prev - 1))}>-</button>
        <span style={{ margin: '0 20px', fontSize: '24px' }}>{giftQuantity}</span>
       <button
  className="quantity-btn"
  onClick={() =>
    setGiftQuantity(prev => (prev < selectedGift.stock ? prev + 1 : prev))
  }
  disabled={giftQuantity >= selectedGift.stock}
>
  +
</button>

      </div>

      <div className="total-amount">
        <h4>Total: ₹{selectedGift.price * giftQuantity}</h4>
      </div>

      <button className="proceed-button" onClick={handleGiftPayment}>
        Proceed to Pay ₹{selectedGift.price * giftQuantity}
      </button>

      <button className="cancel-btn" onClick={() => {
        setSelectedGift(null);
        setGiftShippingInfo(null);
        setGiftQuantity(1);
      }}>
        Cancel
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default CartPage;
