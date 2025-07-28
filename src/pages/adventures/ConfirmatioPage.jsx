import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import { useParams } from 'react-router-dom';

function ConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/triporder/${orderId}`)
      .then(res => setOrder(res.data))
      .catch(console.error);
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  const { customer } = order;
  return (
    <div>
      <h2>{customer.firstName}, your order has been received!</h2>
      <h3>Customer Details</h3>
      <p>Name: {customer.firstName} {customer.lastName}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>

      <h3>Billing Address</h3>
      <p>{customer.address}</p>
    </div>
  );
}

export default ConfirmationPage;
