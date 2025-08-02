import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../main';
import axios from 'axios';
import Modal from 'react-modal';

const BillingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

const placeOrder = async () => {
  try {
    const userData = JSON.stringify(JSON.parse(localStorage.getItem("user")));

    const response = await axios.post(`${API_BASE_URL}/api/triporder/place`, {
      item,
      billingInfo
    }, {
      headers: {
        'x-user-data': userData,
        'Content-Type': 'application/json'
      }
    });
        // ✅ Show popup after successful order
    setIsModalOpen(true);

    // ✅ Redirect to confirmation page with booking details
    // navigate("/order-confirmation", {
    //   state: {
    //     item,
    //     billingInfo,
    //     orderId: response.data?.orderId // if your API returns an order ID
    //   }
    // });

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Order failed!");
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/tripprofile');
  };

  return (
    <div>
      <h2>Billing Details</h2>
      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <button onClick={placeOrder}>Place Order</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Order Confirmation"
        style={{
          content: {
            maxWidth: '400px',
            margin: 'auto',
            textAlign: 'center',
            padding: '30px',
            borderRadius: '10px'
          }
        }}
      >
        <h2>🎉 Purchase Successful!</h2>
        <p>You will receive an email confirmation at <strong>{billingInfo.email}</strong>.</p>
        <button onClick={handleCloseModal} style={{ marginTop: '20px' }}>Go to Profile</button>
      </Modal>
    </div>
  );
};

export default BillingPage;
