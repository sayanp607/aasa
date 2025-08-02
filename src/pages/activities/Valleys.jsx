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

const Valleys = () => {
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
      activity: "7 Valleys Trek Sirsi ",
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
  axios.get(`${API_BASE_URL}/api/rappelling/dates?activity=7 Valleys Trek Sirsi`)
    .then((res) => {
      console.log("API Response:", res.data);
      setAvailableDates(res.data);
    });
}, []);

useEffect(() => {
  refreshDates();
  axios.get(`${API_BASE_URL}/api/rappelling/price?activity=7 Valleys Trek Sirsi`)
    .then(res => {
      setCurrentPrice(res.data?.value || null);
    });
}, []);

const handleAdd = () => {
  if (!newDate) return;
  axios.post(`${API_BASE_URL}/api/rappelling/dates`, {
    activity: "7 Valleys Trek Sirsi",
    date: newDate
  }).then(() => {
    setNewDate("");
    refreshDates();
  });
};

const handleSetPrice = () => {
  if (!newPrice) return;
  axios.post(`${API_BASE_URL}/api/rappelling/price`, {
    activity: "7 Valleys Trek Sirsi",
    value: newPrice
  }).then(() => {
    setNewPrice("");
    setCurrentPrice(newPrice);
  });
};


const handleDelete = (id) => {
  axios.delete(`${API_BASE_URL}/api/rappelling/dates/${id}?activity=7 Valleys Trek Sirsi`)
    .then(() => {
      refreshDates();
    });
};
const imageData = [
  {
    title: "Day 1",
    image: "/valley1.jpeg",
paragraphs: [
  "SATURDAY:",
  "Arrive at Sirsi’s JungleNest by 6:00 AM.",
  "Refresh and explore the campus, enjoy a nutritious breakfast at 7:30 AM.",
  "Briefing on the \"7 Valleys of Sirsi\" trek.",
  "Depart in 4x4 Jeeps for the trek starting point, reach the last civilization point by 8:30 AM.",
  "Start the trek at 9:00 AM with fruits and packed lunch.",
  "Explore basalt caves, ancient Shivalinga, and Western Ghats’ biodiversity, wading in the river.",
  "Cook lunch together by the river at 1:00 PM.",
  "Explore waterfalls, relax in the pool with life jackets, and complete the trek by 4:30 PM.",
  "Enjoy the sunset from the Birdview Point at 5:30 PM.",
  "Return to JungleNest by 7:00 PM and refresh with a herbal bath.",
  "SATURDAY NIGHT:",
  "Enjoy hot snacks in the evening.",
  "Campfire with stories, games, music, and laughter.",
  "Authentic hot dinner with fresh organic food from the Western Ghats at 9:30 PM.",
  
]



  }, {
    title: "Day 2",
    // image: "/netravati3.jpg",
   paragraphs: [
  "SUNDAY:",
  "Wake up to bird melodies from 6:00-7:00 AM.",
  "Birdwatching at the Tree House, followed by a hot, healthy breakfast at 8:00 AM.",
  "Depart for Ganeshpal for swimming and a spectacular view of River Shalmala.",
  "Enjoy swimming and relaxing at the river.",
  "Return to the homestay by 1:00 PM.",
  "Refresh and enjoy a traditional Malenadu lunch.",
  "Depart for a nature walk to witness a once-in-a-lifetime sunset.",
  "Return to JungleNest, pack bags with memories.",
  "Depart for Sirsi around 7:00 PM."
]



  }
];

const refreshDates = () => {
  axios.get(`${API_BASE_URL}/api/rappelling/dates?activity=7 Valleys Trek Sirsi`)
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
      <img className="main-image" src="/valleys.png" alt="7 Valleys Trek Sirsi – A Scenic Adventure in Karnataka" />
 <div className="rappelling-content-wrapper">
      <div className="rappelling-page">
        <div className="content">
          <h1>7 Valleys Trek Sirsi – A Scenic Adventure in Karnataka
</h1>
          <div className="info">
            <p><strong>Not Rated</strong></p>
            <p>from 0 review</p>
          </div>

  <div className="section-separator"></div>

        <div className="activity-details">
                    <div><strong><LuClock4/>  Duration:</strong> 2 Days 1 Night</div>
                    <div><strong><TbCancel/>  Cancellation:</strong>No Cancellation</div>
                    <div><strong><RiGroupLine/> Group Size:</strong> 12 people</div>
                    <div><strong><LiaLanguageSolid /> Languages:</strong> ___</div>
                  </div>

            <div className="section-separator"></div>

          <h2>Overview</h2>
          <h2>7 Valleys Trek in Sirsi – A Journey Through Nature’s Paradise</h2>
          <p>Located in the heart of the Western Ghats, the 7 Valleys Trek in Sirsi is a treasure trove of natural beauty. This immersive journey leads adventurers through seven mesmerizing valleys, each with its own distinct allure. With lush greenery, serene landscapes, and an atmosphere of tranquility, this trek is perfect for anyone seeking to experience the wonders of nature.

</p>

          <h2>Why the 7 Valleys Trek Should Be on Your Bucket List</h2>
          <p>The 7 Valleys Trek offers an exceptional mix of adventure and peace, making it an ideal getaway for those yearning to reconnect with the natural world.</p>

  <ul>
            <li><strong>A Haven for Nature Enthusiasts:</strong>Traverse dense forests, serene valleys, and scenic meadows that feel untouched by time. The trek also provides a rare opportunity to witness the rich biodiversity of the Western Ghats, a UNESCO World Heritage site.</li>
            <li><strong>A Balance of Thrill and Calm:</strong> The trek’s varied terrain offers a thrilling challenge while its tranquil surroundings allow you to relax and rejuvenate.</li>
            <li><strong>Discover Karnataka’s Hidden Gems:</strong> This trek takes you through some of the most pristine and lesser-known parts of Karnataka, offering a serene escape from daily life.</li>
          </ul>
          <h2>Trek Highlights – Exploring the Seven Valleys</h2>
            <ul>
            <li><strong>Seven Distinct Valleys:</strong>Each valley presents a unique experience, from misty, dense forests to expansive grassy meadows, showcasing the diverse beauty of nature.</li>
            <li><strong>Majestic Waterfalls:
</strong> The trek is adorned with breathtaking waterfalls like Unchalli Falls and Magod Falls, where the cascading water and serene surroundings create a magical ambiance.
</li>
            <li><strong>Panoramic Viewpoints:
</strong>Climbing to higher elevations rewards trekkers with sweeping views of the Western Ghats, featuring rolling hills, deep valleys, and lush forests.</li>
<li><strong>Rich Wildlife:</strong>The region teems with diverse flora and fauna, including exotic birds and rare mammals. Keep an eye out for vibrant plants and elusive wildlife along the trails.</li>
          </ul>
         
          <span>Embark on the 7 Valleys Trek to immerse yourself in the untouched beauty of Karnataka’s Western Ghats. It’s a journey that promises adventure, serenity, and unforgettable memories.

For more information, visit Karnataka Tourism.</span>
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
      >{item.title}▼
      </div>

      {(openImageIndex === index || openImageIndex === "all") && (
        <div className="image-text-pair">
          <img
            src={item.image}
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
            <p>✅ Pickup & Drop (Sirsi)</p>
            <p>✅ Private transport to viewpoints</p>
            <p>✅ Guide charges</p>
            <p>✅ 2 breakfasts, 2 packed lunches, 1 dinner</p>
            <p>✅ Tent stay (2-3 people per tent) with campfire</p>
            <p>✅ Waterfall Rappelling with gear</p>
            <p>✅ Certification</p>
            <p>✅ Guide Charges</p>
            <p>✅ Insurance</p>
          </div>
          <div className="excluded">
            <p>❌ Insurance</p>
            <p>❌ Additional Services</p>
            <p>❌ Things not mentioned in Inclusions</p>
          </div>

  <div className="section-separator"></div>
          <h2>Duration</h2>
          <p> 🕒 Insurance.</p>

  <div className="section-separator"></div>
          <h2>Activity Types</h2>
          <div className="icon-row">
               <div>🍽 Food & Nightlife</div>
            <div>🥾 Medium Trek</div>
              <div>🔥 Fire Camp</div>
              <div>⛺ Tent Stay</div>
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

export default Valleys;
