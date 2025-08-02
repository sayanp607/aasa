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

const Trek = () => {
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
      activity: "The Omkareshwara Trek",
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
  axios.get(`${API_BASE_URL}/api/rappelling/dates?activity=The Omkareshwara Trek`)
    .then((res) => {
      console.log("API Response:", res.data);
      setAvailableDates(res.data);
    });
}, []);

useEffect(() => {
  refreshDates();
  axios.get(`${API_BASE_URL}/api/rappelling/price?activity=The Omkareshwara Trek`)
    .then(res => {
      setCurrentPrice(res.data?.value || null);
    });
}, []);

const handleAdd = () => {
  if (!newDate) return;
  axios.post(`${API_BASE_URL}/api/rappelling/dates`, {
    activity: "The Omkareshwara Trek",
    date: newDate
  }).then(() => {
    setNewDate("");
    refreshDates();
  });
};
const imageData = [
  {
    title: "Day 1",
    image: "/trek1.jpg",
paragraphs: [
  "05:00 AM: Arrive in Sirsi. Meet HighHawks team at Shivaji Chowk.",
  "- 05:30 AM: Head to Jungle Nest Basecamp for refreshments.",
  "- 07:00 AM: Trek briefing, breakfast, then start trek to explore the 380ft Shivalinga waterfall.",
  "- Afternoon: Reach the valley, set up campsite.",
  "- Night: Enjoy Shiva Purana stories and Jagrane (devotional night vigil)."
]




  }, {
    title: "Day 2",
    image: "/trek2.jpg",
  paragraphs: [
  "- Early morning sunrise in the valley.",
  "- Nutritious breakfast followed by a hike along the river to explore a 116m waterfall base camp by 12:00 PM.",
  "- Lunch by the waterfall and trekking along the mountain ridge.",
  "- Return to civilization by 7:00 PM and back to Sirsi by 8:00 PM, completing the circuit responsibly."
]



  }
];


const handleSetPrice = () => {
  if (!newPrice) return;
  axios.post(`${API_BASE_URL}/api/rappelling/price`, {
    activity: "The Omkareshwara Trek",
    value: newPrice
  }).then(() => {
    setNewPrice("");
    setCurrentPrice(newPrice);
  });
};


const handleDelete = (id) => {
  axios.delete(`${API_BASE_URL}/api/rappelling/dates/${id}?activity=The Omkareshwara Trek
    `)
    .then(() => {
      refreshDates();
    });
};

const refreshDates = () => {
  axios.get(`${API_BASE_URL}/api/rappelling/dates?activity=The Omkareshwara Trek`)
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
      <img className="main-image" src="/omkareshwara.jpg" alt="The Omkareshwara Trek: Embark on a Spiritual Journey." />
 <div className="rappelling-content-wrapper">
      <div className="rappelling-page">
        <div className="content">
          <h1>The Omkareshwara Trek: Embark on a Spiritual Journey.
</h1>
          <div className="info">
            <p><strong>Not Rated</strong></p>
            <p>from 0 review</p>
          </div>

  <div className="section-separator"></div>

      <div className="activity-details">
                  <div><strong><LuClock4/>  Duration:</strong> 2 Days 1 Night</div>
                  <div><strong><TbCancel/>  Cancellation:</strong>No Cancellation</div>
                  <div><strong><RiGroupLine/> Group Size:</strong> 20 people</div>
                  <div><strong><LiaLanguageSolid /> Languages:</strong> ___</div>
                </div>

            <div className="section-separator"></div>

          <h2>Overview</h2>
          <p>LAbout Omkareshwara Trek</p>
          <p>The <strong>Omkareshwara Trek </strong>is an 11-kilometer journey of spiritual discovery and natural exploration. Starting at the ancient Shiva temple on the serene banks of the River Gangavali, this trek combines adventure, spirituality, and breathtaking scenery.

The temple, steeped in history and devotion, provides a tranquil setting to begin your journey. It is a sacred spot where trekkers can connect with nature and spirituality before embarking on the trail. The trek is designed to form a symbolic circuit resembling the sacred “ॐ,” making it a unique and meaningful experience.</p>

          <h2>What Makes This Trek Special?</h2>
          <ul>
            <li><strong>Streams and Waterfalls: </strong>The trail takes you through vibrant landscapes, where you’ll wade through pristine streams and uncover seven hidden waterfalls. Each waterfall offers a unique charm, surrounded by lush greenery and the sounds of cascading water.</li>
            <li><strong>Malenadu’s Natural Beauty:</strong> Malenadu is known for its rich biodiversity, dense forests, and picturesque views. This trek allows you to immerse yourself in the region’s untouched beauty.</li>
            <li><strong>Symbolic Significance</strong>  The “ॐ” shaped trail adds a spiritual dimension to the adventure, making it more than just a physical journey.</li>
          </ul>

          <h2>Who Should Join?</h2>
          <p>Whether you’re a nature enthusiast, an adventure seeker, or someone looking for a spiritual retreat, the Omkareshwara Trek offers something for everyone. It’s perfect for individuals, families, and groups looking to escape the hustle of daily life and connect with nature.</p>

          
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
            <p>✅ Pickup (Sirsi) & Drop (Sirsi).</p>
            <p>✅ Private Transport to viewpoints.</p>
            <p>✅ guide charges.</p>
            <p>✅ 2 breakfast, 2 packed lunch and 2 dinner (Malnad style cuisine).</p>
            <p>✅ Tentstay / dormitory 2 or 3 people sharing with fire camp.</p>
    
          </div>
          <div className="excluded">
            <p>❌ Insurance.</p>
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
            <div>🥾 Difficult Trek</div>
              <div>🔥 Fire Camp</div>
          </div>

     <div className="section-separator"></div>

          <h2>Attractions</h2>
          <div className="icon-row">
            <div>⛰ Mountain</div>
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

export default Trek;
