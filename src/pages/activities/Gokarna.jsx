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

const Gokarna = () => {
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
      activity: "Gokarna Beach Trek",
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
  axios.get(`${API_BASE_URL}/api/rappelling/dates?activity=Gokarna Beach Trek `)
    .then((res) => {
      console.log("API Response:", res.data);
      setAvailableDates(res.data);
    });
}, []);

useEffect(() => {
  refreshDates();
  axios.get(`${API_BASE_URL}/api/rappelling/price?activity=Gokarna Beach Trek `)
    .then(res => {
      setCurrentPrice(res.data?.value || null);
    });
}, []);

const handleAdd = () => {
  if (!newDate) return;
  axios.post(`${API_BASE_URL}/api/rappelling/dates`, {
    activity: "Gokarna Beach Trek ",
    date: newDate
  }).then(() => {
    setNewDate("");
    refreshDates();
  });
};

const handleSetPrice = () => {
  if (!newPrice) return;
  axios.post(`${API_BASE_URL}/api/rappelling/price`, {
    activity: "Gokarna Beach Trek ",
    value: newPrice
  }).then(() => {
    setNewPrice("");
    setCurrentPrice(newPrice);
  });
};


const handleDelete = (id) => {
  axios.delete(`${API_BASE_URL}/api/rappelling/dates/${id}?activity=Gokarna Beach Trek `)
    .then(() => {
      refreshDates();
    });
};

const refreshDates = () => {
  axios.get(`${API_BASE_URL}/api/rappelling/dates?activity=Gokarna Beach Trek `)
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

const imageData = [
  {
    title: "Day 1",
    // image: "/netravati2.jpg",
 paragraphs: [
  "• 06:30 AM: Assemble near at Kumta Bus Stand.",
  "• 07:00 AM: Pickup and transfer to a private beachside resort in Kumta.",
  "• 08:00 AM: Breakfast (Included).",
  "• 09:00 AM: Start the 5 Beach Trek in Gokarna: Paradise Beach, Half Moon Beach, Om Beach, Kudle Beach, Gokarna Main Beach.",
  "• 01:00 PM: Lunch (Included).",
  "• 02:30 PM: Trek through Yana Caves' limestone formations.",
  "• 04:30 PM: Refresh at Vibhooti Falls.",
  "• 06:00 PM: Return to the beachside resort.",
  "• 06:30 PM: Sunset view & Speed boat ride.",
  "• 09:00 PM: Campfire dinner (Included). Overnight stay."
]

  }, {
    title: "Day 2",
    // image: "/netravati3.jpg",
    paragraphs: [
  "• 06:30 AM: Breakfast (Included).",
  "• 07:30 AM: Honnavar backwater and mangrove walk.",
  "• 09:30 AM: Visit Eco Beach.",
  "• 11:00 AM: Explore Mirjan Fort.",
  "• 01:00 PM: Lunch (self-sponsored).",
  "• 03:00 PM: Free time for local markets or leisure.",
  "• 04:30 PM: Trip ends at Kumta Bus Stand."
]

  }
];


  return (
    <div className="rappelling-wrapper">
      <NavbarTrip/>
      <img className="main-image" src="/gokarna.jpg" alt="Gokarna Beach Trek and Honnavar Mangroves" />
 <div className="rappelling-content-wrapper">
      <div className="rappelling-page">
        <div className="content">
          <h1>Gokarna Beach Trek and Honnavar Mangroves
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
          <p>Looking for a perfect mix of adventure, nature, and relaxation?</p>
          <p>The Gokarna Beach Trek and Honnavar Mangroves experience is just what you need! Over two days, you’ll explore stunning beaches, lush green mangroves, refreshing waterfalls, and even a historic fort.</p>

          <h2>Day 1</h2>
          <p>The adventure kicks off bright and early in Kumta, where we’ll head straight to Gokarna for the famous 5 Beach Trek. You’ll walk along the breathtaking coastlines of Paradise Beach, Half Moon Beach, Om Beach, Kudle Beach, and Gokarna Main Beach. Each beach has its own charm and is perfect for some great photos and peaceful moments.

After a delicious lunch, we’ll visit the unique Yana Caves, where massive limestone formations stand tall amidst lush forests. Next up is Vibhooti Falls, a serene spot where you can unwind and soak in the beauty of nature.

As the day winds down, enjoy a fun speed boat ride and catch a magical sunset by the beach. The evening ends with a cozy campfire, a tasty dinner, and an overnight stay at a beautiful beachside resort.</p>

          <h2>Day 2</h2>
          <p>Start the day with a refreshing walk through the tranquil Honnavar Mangroves. It’s a peaceful escape into nature, surrounded by backwaters and greenery. Then, head to Eco Beach to enjoy the coastal vibes and relax by the shore.

The final stop is Mirjan Fort, a historic gem with stunning architecture and serene surroundings. After lunch, you’ll have free time to explore local markets or just unwind before wrapping up the trip in Kumta.</p>

          <h2>Why You’ll Love It</h2>
          <p>This trip has it all—beaches, waterfalls, caves, mangroves, and even a bit of history. It’s the perfect way to recharge, explore, and create unforgettable memories.</p>
          <ul>
            <li><strong>Small group size</strong> for a more personal and enjoyable experience.
</li>
            <li><strong>Resort-side stay </strong>  offering comfort and stunning views right by the beach.</li>
            <li><strong>Fun, experienced trek guides</strong>who make the journey exciting and safe for everyone.</li>
          </ul>

          <h2>Highlights</h2>
          <ul>
            <li>5 Beach Trek in Gokarna</li>
            <li>Yana Caves</li>
            <li>Vibhooti Falls</li>
            <li>Speed Boat Ride
              <li>Sunset View</li>
              <li>Campfire Night</li>
              <li>Mangrove Walk</li>
              <li>Eco Beach</li>
              liMirjan Fort
            </li>
            
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
            <p>✅ Pickup and drop-off from Kumta Bus Stand.</p>
            <p>✅ Stay at a private beachside resort in Kumta.</p>
            <p>✅ Meals: 2 Breakfasts (Day 1 & Day 2), 1 Dinner (Day 1 Campfire), 1 Lunch (Day 1).</p>
            <p>✅ Speed boat ride.</p>
            <p>✅ Guided 5 Beach Trek.</p>
            <p>✅ Entry tickets (Yana Caves, Vibhooti Falls, etc.).</p>
            <p>✅ Campfire experience.</p>
           
          </div>
          <div className="excluded">
            <p>❌ Travel to/from Kumta.</p>
            <p>❌ Day 2 lunch and personal expenses.</p>
            <p>❌ Activities not listed in the itinerary.</p>
          </div>

  <div className="section-separator"></div>
          <h2>Duration</h2>
          <p> 🕒 2 Day 1 Night</p>

  <div className="section-separator"></div>
          <h2>Activity Types</h2>
          <div className="icon-row">
        <div>🍽 Food & Nightlife</div>
            <div>🥾 Easy Trek</div>
              <div>🔥 Fire Camp</div>

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

export default Gokarna;
