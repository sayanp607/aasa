// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./userdashboard.css";
import { API_BASE_URL } from "../main";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    pickupAddress: "",
    pickupPhone: "",
    pickupInstructions: "",
    deliveryAddress: "",
    deliveryPhone: "",
    deliveryInstructions: "",
    deliveryType: "",
    packageWeight: "",
    itemType: "",
    parcelValue: "",
    senderPhone: "",
  recipientEmail: "",   // <-- Add this
  notifyRecipient: false,
    price: ""
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      alert("Failed to load orders");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const form = new FormData();

    const priceValue = Number(formData.price);
    if (isNaN(priceValue)) {
      alert("Enter a valid price");
      return;
    }

    const pickupData = {
      address: formData.pickupAddress,
      phone: formData.pickupPhone,
      instructions: formData.pickupInstructions
    };

    const deliveryData = [
      {
        address: formData.deliveryAddress,
        phone: formData.deliveryPhone,
        instructions: formData.deliveryInstructions
      }
    ];

    form.append("pickup", JSON.stringify(pickupData));
    form.append("delivery", JSON.stringify(deliveryData));
    form.append("deliveryType", formData.deliveryType);
    form.append("packageWeight", formData.packageWeight);
    form.append("itemType", formData.itemType);
    form.append("parcelValue", formData.parcelValue);
    form.append("senderPhone", formData.senderPhone);
    form.append("price", priceValue);
    form.append("recipientEmail", formData.recipientEmail);
form.append("notifyRecipient", formData.notifyRecipient ? "true" : "false");



    if (e.target.image.files[0]) {
      form.append("image", e.target.image.files[0]);
    }

    await axios.post(`${API_BASE_URL}/api/orders/create`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Order Created");
    fetchOrders();
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Failed to create order");
  }
};
const calculatePrice = () => {
  const { pickupAddress, deliveryAddress, packageWeight } = formData;

  if (!pickupAddress || !deliveryAddress || !packageWeight) {
    alert("Enter pickup, delivery addresses and package weight first");
    return;
  }

  const service = new window.google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: [pickupAddress],
      destinations: [deliveryAddress],
      travelMode: "DRIVING",
      unitSystem: window.google.maps.UnitSystem.METRIC,
    },
    (response, status) => {
      if (status !== "OK") {
        alert("Error fetching distance");
        return;
      }

      const distanceText = response.rows[0].elements[0].distance.text; // "5.2 km"
      const distanceKm = parseFloat(distanceText.replace(" km", ""));
      const weight = parseFloat(packageWeight);

      let price = 0;

      if (distanceKm <= 3) {
        price = weight <= 2 ? 47 : 67;
      } 
      else if (distanceKm <= 7) {
        price = weight <= 2 ? 67 : 87;
      } 
      else if (distanceKm <= 15) {
        price = weight <= 2 ? 97 : 127;
      } 
      else if (distanceKm <= 25) {
        price = weight <= 2 ? 137 : 167;
      } 
      // else {
      //   price = 100 + distanceKm * 5;
      // }

      setFormData({ ...formData, price });
    }
  );
};



  return (
    <div className="dashboard-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h2>Create New Order</h2>
  <button onClick={() => navigate("/myorders")} className="orders-btn">
    My Orders 📦
  </button>
</div>

      <h2>Your Orders</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <h4>Pickup Details</h4>
      <input
  name="pickupAddress"
  placeholder="Pickup Address"
  required
  value={formData.pickupAddress}
  onChange={handleChange}
  ref={(ref) => {
    if (ref && !window.pickupAutocomplete) {
      window.pickupAutocomplete = new window.google.maps.places.Autocomplete(ref, {
        types: ["geocode"],
      });
      window.pickupAutocomplete.addListener("place_changed", () => {
        const place = window.pickupAutocomplete.getPlace();
        setFormData((prev) => ({
          ...prev,
          pickupAddress: place.formatted_address || ref.value,
        }));
      });
    }
  }}
/>

        <input name="pickupPhone" placeholder="Pickup Phone" required onChange={handleChange} />
        <input name="pickupInstructions" placeholder="Pickup Instructions" onChange={handleChange} />

        <h4>Delivery Details</h4>
        <input
  name="deliveryAddress"
  placeholder="Delivery Address"
  required
  value={formData.deliveryAddress}
  onChange={handleChange}
  ref={(ref) => {
    if (ref && !window.deliveryAutocomplete) {
      window.deliveryAutocomplete = new window.google.maps.places.Autocomplete(ref, {
        types: ["geocode"],
      });
      window.deliveryAutocomplete.addListener("place_changed", () => {
        const place = window.deliveryAutocomplete.getPlace();
        setFormData((prev) => ({
          ...prev,
          deliveryAddress: place.formatted_address || ref.value,
        }));
      });
    }
  }}
/>

        <input name="deliveryPhone" placeholder="Delivery Phone" required onChange={handleChange} />
        <input name="deliveryInstructions" placeholder="Delivery Instructions" onChange={handleChange} />

       <select name="deliveryType" value={formData.deliveryType} onChange={handleChange} required>
  <option value="">Select Delivery Type</option>
  <option value="Now">Now</option>
  <option value="EndOfDay">End Of Day</option>
  <option value="Scheduled">Scheduled</option>
</select>

        <input name="packageWeight" placeholder="Package Weight" required onChange={handleChange} />
        <input name="itemType" placeholder="Item Type" required onChange={handleChange} />
        <input name="parcelValue" placeholder="Parcel Value" required onChange={handleChange} />
        <input name="senderPhone" placeholder="Sender Phone" required onChange={handleChange} />
        <input type="checkbox" name="notifyRecipient" onChange={handleChange} /> Notify Recipient
       <input
  name="recipientEmail"
  placeholder="Recipient Email"
  type="email"
  required={formData.notifyRecipient}  // Required only if Notify Recipient is checked
  onChange={handleChange}
/>

<button type="button" onClick={calculatePrice}>Calculate Price</button>
<input
  type="number"
  name="price"
  placeholder="Price"
  value={formData.price}
  readOnly
/>

        <input type="file" name="image" accept="image/*" required/>
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
}
