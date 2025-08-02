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


const WildWaterfallRappelling = () => {
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

const imageData = [
  {
    title: "Wild Waterfall Rappelling Expedition - Sirsi",
    image: "/wild1.jpeg",
    paragraphs: [
      "Arrival in Sirsi with a warm welcome and pickup service.",
      "Freshening up at the Junglestay.",
      "Cherishing a hot breakfast to start the day.",
      "Trek to Akashaganga Waterfalls for an exciting adventure.",
      "Recharged lunch at the waterfall, enjoying the serene surroundings.",
      "Back to Junglestay for a campfire, unwinding by the warmth.",
      "Delicious dinner enjoyed hot, followed by lights off; goodnight."
    ]
  },
  {
    title: "Wild Waterfall Rappelling Expedition - Jog Falls",
    image: "/wild2.jpeg",
    paragraphs: [
      "Malenadu cuisine breakfast to kickstart the day.",
      "Begin the Medicinal Plants Walk in the forest, heading towards the Adrenaline Adventure spot.",
      "Arrive at the waterfall rappelling point, with expert demonstrations.",
      "Experience the thrill of rappelling down the waterfall!",
      "Return to JungleNest for a herbal bath, followed by a hearty, nutritious lunch.",
      "Freshening up and cherishing snacks after the adventure.",
      "A small walk to take in the panoramic monsoon viewpoint.",
      "Departing to Bangalore at night."
    ]
  }
];



const handleBooking = async () => {
  try {
    await axios.post(`${API_BASE_URL}/api/tripcart/add`, {
      activity: "wild Waterfall Rappelling",
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
  axios.get(`${API_BASE_URL}/api/rappelling/dates?activity=Wild Waterfall Rappelling`)
    .then((res) => {
      console.log("API Response:", res.data);
      setAvailableDates(res.data);
    });
}, []);

useEffect(() => {
  refreshDates();
  axios.get(`${API_BASE_URL}/api/rappelling/price?activity=Wild Waterfall Rappelling`)
    .then(res => {
      setCurrentPrice(res.data?.value || null);
    });
}, []);

const handleAdd = () => {
  if (!newDate) return;
  axios.post(`${API_BASE_URL}/api/rappelling/dates`, {
    activity: "Wild Waterfall Rappelling",
    date: newDate
  }).then(() => {
    setNewDate("");
    refreshDates();
  });
};

const handleSetPrice = () => {
  if (!newPrice) return;
  axios.post(`${API_BASE_URL}/api/rappelling/price`, {
    activity: "Wild Waterfall Rappelling",
    value: newPrice
  }).then(() => {
    setNewPrice("");
    setCurrentPrice(newPrice);
  });
};



const handleDelete = (id) => {
  axios.delete(`${API_BASE_URL}/api/rappelling/dates/${id}?activity=Wild Waterfall Rappelling`)
    .then(() => {
      refreshDates();
    });
};

const refreshDates = () => {
  axios.get(`${API_BASE_URL}/api/rappelling/dates?activity=Wild Waterfall Rappelling`)
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
      <img className="main-image" src="/wild.jpg" alt="Wild Waterfall Rappelling" />
 <div className="rappelling-content-wrapper">
      <div className="rappelling-page">
        <div className="content">
          <h1>Wild Waterfall Rappelling Expeditions</h1>
          <div className="info">
            <p><strong>Not Rated</strong></p>
            <p>from 0 review</p>
          </div>

  <div className="section-separator"></div>

          <div className="activity-details">
            <div><strong><LuClock4/>  Duration:</strong> 1</div>
            <div><strong><TbCancel/>  Cancellation:</strong>Up to 4 days</div>
            <div><strong><RiGroupLine/> Group Size:</strong> 8 people</div>
            <div><strong><LiaLanguageSolid /> Languages:</strong> ___</div>
          </div>

            <div className="section-separator"></div>

          <h2>Overview</h2>
          <p>Join HighHawks for an Exhilarating Waterfall Rappelling Trek in Karnataka.
where adventure meets nature.</p>
          <p><strong>What People Are Saying:</strong> google review ⭐⭐⭐⭐⭐</p>

          <h2>What is Waterfall Rappelling?</h2>
          <p>Waterfall rappelling, also known as abseiling, is a heart-racing adventure sport where you descend a waterfall using ropes and harnesses. Perfect for thrill-seekers ready to push their limits, this exhilarating experience combines excitement with the beauty of nature. Under the guidance of experts, you’ll strap into a harness and navigate a stunning waterfall during your Waterfall Rappelling trek, with the refreshing rush of water splashing around you.</p>

          <h2>Why Choose Waterfall Rappelling in Karnataka?</h2>
          <p>Karnataka is renowned for its rich biodiversity and scenic waterfalls, making it a top destination for adventure sports like our Waterfall Rappelling trek.

Imagine the sound of rushing water and the thrill of descending amidst lush greenery. Each location offers a unique experience that connects you with nature and invigorates your spirit.</p>

          <h2>What to Expect on Your Rappelling Expedition</h2>
          <ul>
            <p>Certified professionals lead our waterfall rappelling expeditions, ensuring your safety at every step. Before you begin, we provide a detailed briefing and essential training, so you will have the confidence to enjoy this exhilarating adventure.</p>
            <li><strong>Safety First:</strong>  We provide helmets, harnesses, and gloves to keep you fully protected throughout the experience.</li>
            <li><strong>Scenic Beauty:</strong> Enjoy rappelling down magnificent waterfalls while surrounded by Karnataka’s forests and hills.</li>
            <li><strong>Custom Experience:</strong> Whether you’re an experienced adventurer or a first-time participant, we tailor the expeditions to match your comfort level, ensuring everyone has a memorable experienc.</li>
          </ul>
          <h2>
            Day 1: Scenic Waterfall Base Trek
          </h2>
          <p>Start your adventure with a guided trek to the breathtaking waterfall base. This scenic hike takes you through vibrant forests and picturesque landscapes, culminating at the stunning waterfall where you can relax and soak in the beauty of nature. Enjoy a packed lunch at the base while you prepare for the excitement ahead.</p>
          <h2>Day 2: Thrilling Waterfall Rappelling Experience</h2>
          <p>Our waterfall rappelling expeditions are led by certified professionals who prioritize your safety at every step. Before you begin, we provide a detailed briefing and essential training, giving you the confidence to enjoy this thrilling experience.

Join Us at HighHawks for Your Waterfall Rappelling Adventure!
Embark on an adventure that will leave you with unforgettable memories and a profound sense of accomplishment. Don’t miss the chance to experience waterfall rappelling in Karnataka!</p>
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
  {imageData.map((item, index) => (
    <div key={index} className="toggle-image-container">
      <div
        className="arrow-toggle"
        onClick={() => handleToggleImage(index)}
      >Wild Waterfall Rappelling Expedition ▼
      </div>

      {(openImageIndex === index || openImageIndex === "all") && (
        <div className="image-text-pair">
          <img
            src={item.image}
            alt={`Waterfall ${index + 1}`}
            className="toggle-image"
          />
          <div className="toggle-text">
            {item.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  ))}
</div>


  <div className="section-separator"></div>
          <h2>Included / Excluded</h2>
          <div className="included">
            <p>✅ Transportation (Sirsi to Sirsi)</p>
            <p>✅ Malenadu Special Breakfast</p>
            <p>✅ Hot Lunch & Dinner</p>
            <p>✅ Herbal Bath</p>
            <p>✅ Medicinal Plants Walk in the Forest</p>
            <p>✅ Basic Rope Knowledge Training by Experts</p>
            <p>✅ Waterfall Rappelling (with safety harness and permission)
</p>
            <p>✅ Certification on Basic Rappelling Completion</p>
            <p>✅ Guide Charges</p>
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
            <div>🍽 Food & Nightlife</div>
            <div>🥾 Medium Trek</div>
          </div>

     <div className="section-separator"></div>

          <h2>Attractions</h2>
          <div className="icon-row">
            <div>⛰ Mountain</div>
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

export default WildWaterfallRappelling;
