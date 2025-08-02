import React, { useState,useEffect } from "react";
import "./WaterfallRappelling.css";
import axios from "axios";
import {API_BASE_URL} from "../../main"
import {useNavigate} from "react-router-dom"
import NavbarTrip from "../Navbartrip";
import { LuClock4 } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";
import { RiGroupLine } from "react-icons/ri";
import { LiaLanguageSolid } from "react-icons/lia";

const Malenadu = () => {
  const [openImageIndex, setOpenImageIndex] = useState(null);
  const [allExpanded, setAllExpanded] = useState(false);
const isAdmin = localStorage.getItem("role") === "admin";
  const [newDate, setNewDate] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const navigate = useNavigate();
const [adults, setAdults] = useState(1);
const [guestNames, setGuestNames] = useState([{ title: 'Mr', name: '' }]);

const [selectedDate, setSelectedDate] = useState("");
const [availableDates, setAvailableDates] = useState([]);
const [currentPrice, setCurrentPrice] = useState(null);




const handleBooking = async () => {
  try {
    await axios.post(`${API_BASE_URL}/api/tripcart/add`, {
      activity: "MONSOONS IN MALENADU",
      date: selectedDate,
      guests: guestNames, // each guest { title, name }
      pricePerHead: currentPrice
    }, {
      headers: {
        'x-user-data': localStorage.getItem('user') // ensure it's JSON
      }
    });
    // redirect to cart
    navigate('/tripcart');
  } catch (err) {
    console.error(err);
  }
};


// Fetch available slots from backend
useEffect(() => {
  axios.get(`${API_BASE_URL}/api/rappelling/dates?activity=MONSOONS IN MALENADU`)
    .then((res) => {
      console.log("API Response:", res.data);
      setAvailableDates(res.data);
    });
}, []);

useEffect(() => {
  refreshDates();
  axios.get(`${API_BASE_URL}/api/rappelling/price?activity=MONSOONS IN MALENADU`)
    .then(res => {
      setCurrentPrice(res.data?.value || null);
    });
}, []);

const handleAdd = () => {
  if (!newDate) return;
  axios.post(`${API_BASE_URL}/api/rappelling/dates`, {
    activity: "MONSOONS IN MALENADU",
    date: newDate
  }).then(() => {
    setNewDate("");
    refreshDates();
  });
};

const handleSetPrice = () => {
  if (!newPrice) return;
  axios.post(`${API_BASE_URL}/api/rappelling/price`, {
    activity: "MONSOONS IN MALENADU",
    value: newPrice
  }).then(() => {
    setNewPrice("");
    setCurrentPrice(newPrice);
  });
};



const handleDelete = (id) => {
  axios.delete(`${API_BASE_URL}/api/rappelling/dates/${id}?activity=MONSOONS IN MALENADU`)
    .then(() => {
      refreshDates();
    });
};

const refreshDates = () => {
  axios.get(`${API_BASE_URL}/api/rappelling/dates?activity=MONSOONS IN MALENADU`)
    .then((res) => setAvailableDates(res.data));
};

const handleToggleImage = (index) => {
  if (openImageIndex === index) {
    setOpenImageIndex(null);
  } else {
    setOpenImageIndex(index);
    setAllExpanded(false); // User manually clicked, so no full expand mode
  }
};

const handleExpandAll = () => {
  setOpenImageIndex("all");
  setAllExpanded(true);
};

const handleCollapseAll = () => {
  setOpenImageIndex(null);
  setAllExpanded(false);
};


  return (
    <div className="rappelling-wrapper">
      <NavbarTrip/>
      <img className="main-image" src="/monsoons.jpg" alt="MONSOONS IN MALENADU
" />
 <div className="rappelling-content-wrapper">
      <div className="rappelling-page">
        <div className="content">
          <h1>MONSOONS IN MALENADU
</h1>
          <div className="info">
            <p><strong>Not Rated</strong></p>
            <p>from 0 review</p>
          </div>

  <div className="section-separator"></div>

      <div className="activity-details">
                  <div><strong><LuClock4/>  Duration:</strong> 2 Days 1 Night</div>
                  <div><strong><TbCancel/>  Cancellation:</strong> No Cancellation</div>
                  <div><strong><RiGroupLine/> Group Size:</strong> 20 people</div>
                  <div><strong><LiaLanguageSolid /> Languages:</strong> ___</div>
                </div>

            <div className="section-separator"></div>

          <h2>Overview</h2>
          <p>Experience the breathtaking magic of monsoon in Sirsi with Team Highhawks ! </p>

          <p>Embark on an exhilarating trek through lush green landscapes, where the rain-kissed paddy fields stretch as far as the eye can see. As you navigate the enchanting trails, be prepared to be awestruck by the mesmerizing waterfall views that cascade down the mountains, creating a symphony of nature’s beauty. Feel the mist on your skin and let the rhythmic sound of the falling water rejuvenate your senses.</p>

          <p>But the adventure doesn’t stop there! Engage in thrilling games amidst the scenic backdrop of Malenadu. Test your agility and conquer the challenging terrain while bonding with your fellow trekkers. Whether it’s a friendly race or a team-building activity, the rain-soaked paddy fields provide the perfect playground for unforgettable moments of fun and excitement.
            <p>And when it comes to satisfying your taste buds, Malenadu cuisine is an absolute delight. Indulge in a gastronomic journey as you savor authentic local delicacies prepared with fresh ingredients sourced from the bountiful region. From aromatic spices to rich flavors, each bite will transport you to a world of culinary bliss.</p>
            <p>So, join Team Highhawks as we unravel the wonders of monsoon in Sirsi. Discover the allure of waterfall views, embrace the joy of paddy field games, and relish the tantalizing flavors of Malenadu cuisine. This is a journey you don’t want to miss! </p>

</p>

          <h2>What to Expect on Your Rappelling Expedition</h2>
          <ul>
            <li><strong>Safety First:</strong> Helmets, harnesses, gloves provided.</li>
            <li><strong>Scenic Beauty:</strong> Rappel down beautiful waterfalls.</li>
            <li><strong>Custom Experience:</strong> Beginners to pros welcome.</li>
          </ul>
  <div className="section-separator"></div>
          <h2>What You Will Do</h2>
          <div className="button-row">
            {!allExpanded && (
              <button className="expand-btn" onClick={handleExpandAll}>Expand All</button>
            )}
            {allExpanded && (
              <button className="collapse-btn" onClick={handleCollapseAll}>Collapse All</button>
            )}
          </div>

          <div className="image-section">
            {[0, 1].map((index) => (
              <div key={index} className="toggle-image-container">
                <div
                  className="arrow-toggle"
                  onClick={() => handleToggleImage(index)}
                >
                 MONSOONS IN MALENADU
 ▼ 
                </div>
                {(openImageIndex === index || openImageIndex === "all") && (
                  <img
                    src={`/malenadu${index + 1}.jpg`}
                    alt={`Waterfall ${index + 1}`}
                    className="toggle-image"
                  />
                )}
              </div>
            ))}
          </div>
  <div className="section-separator"></div>
          <h2>Included / Excluded</h2>
          <div className="included">
            <p>✅ Pickup (Sirsi) & Drop (Sirsi).</p>
            <p>✅ Private Transport to viewpoints.</p>
            <p>✅ Guide charges.</p>
            <p>✅ 2 breakfast,2 lunch and 1 dinner.</p>
            <p>✅ fire camp.
</p>
          </div>
          <div className="excluded">
            <p>❌ Insurance</p>
            <p>❌ Additional Services</p>
            <p>❌ Things not mentioned in Inclusions</p>
          </div>

  <div className="section-separator"></div>
          <h2>Duration</h2>
          <p> 🕒 2 Day 1 Night</p>

  <div className="section-separator"></div>
          <h2>Activity Types</h2>
          <div className="icon-row">
            <div>🍽 Food</div>
            <div>🥾 Medium Trek</div>
            <div>🔥 Fire Camp</div>
          </div>

     <div className="section-separator"></div>

          <h2>Attractions</h2>
          <div className="icon-row">
            <div>🌊 River</div>
            <div>🌅 Sunset</div>
            <div>💧 Waterfall</div>
          </div>
        </div>
      </div>
<aside className="book-now-box">
  {isAdmin ? (
    <>
      <h3>Admin: Manage Dates & Price</h3>

      {/* Add Date Section */}
      <label>Date</label>
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
      />
      <button className="book-now-btn" onClick={handleAdd}>Add Date</button>

      {/* Set Price Section */}
      <label style={{ marginTop: "1rem" }}>Set Base Price (₹)</label>
      <input
        type="number"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
      <button className="book-now-btn" onClick={handleSetPrice}>Set Price</button>

      <div style={{ marginTop: "1.5rem" }}>
        <h4>Available Dates</h4>
        {availableDates?.length > 0 &&
          availableDates.map((slot) => (
            <div
              key={slot._id}
              style={{
                borderBottom: "1px solid #ccc",
                paddingBottom: "8px",
                marginBottom: "8px",
              }}
            >
              <strong>{slot.date}</strong>
              <br />
              <button
                onClick={() => {
                  setNewDate(slot.date);
                }}
              >
                Edit
              </button>{" "}
              <button onClick={() => handleDelete(slot._id)}>Delete</button>
            </div>
          ))}
      </div>
    </>
  ) : (
    <>
      <h3>Book Your Slot</h3>

      {/* Show "From ₹" Global Price on top */}
      {currentPrice && (
        <p
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "10px",
          }}
        >
          From ₹{currentPrice}
        </p>
      )}

      <label>Date</label>
      <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
        <option value="">Select Date</option>
        {availableDates.map((slot) => (
          <option key={slot._id} value={slot.date}>
            {slot.date}
          </option>
        ))}
      </select>


      <label>Adults (Age 18+)</label>
      <select
        value={adults}
        onChange={(e) => {
          const newAdults = parseInt(e.target.value);
          setAdults(newAdults);
          const updatedGuestNames = [...guestNames];
        while (updatedGuestNames.length < newAdults) {
  updatedGuestNames.push({ title: 'Mr', name: '' });
}

          while (updatedGuestNames.length > newAdults) {
            updatedGuestNames.pop();
          }
          setGuestNames(updatedGuestNames);
        }}
      >
        {[...Array(10).keys()].map((i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

     {/* Guest Title + Name Inputs */}
{guestNames.map((guest, index) => (
  <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
    {/* Title Select */}
    <select
      value={guest.title || "Mr"}
      onChange={(e) => {
        const updatedGuests = [...guestNames];
        updatedGuests[index].title = e.target.value;
        setGuestNames(updatedGuests);
      }}
      required
    >
      <option value="Mr">Mr</option>
      <option value="Mrs">Mrs</option>
      <option value="Miss">Miss</option>
    </select>

    {/* Name Input */}
    <input
      type="text"
      placeholder={`Guest Name ${index + 1}`}
      value={guest.name}
      onChange={(e) => {
        const updatedGuests = [...guestNames];
        updatedGuests[index].name = e.target.value;
        setGuestNames(updatedGuests);
      }}
      required
    />
  </div>
))}


  

      <button className="book-now-btn" onClick={handleBooking}>
        Book Now
      </button>
    </>
  )}
</aside>


    </div>
    </div>
  );
};

export default Malenadu;
