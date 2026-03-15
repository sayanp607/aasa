import React, { useState, useEffect } from "react";
import "./WaterfallRappelling.css";
import axios from "axios";
import { API_BASE_URL } from "../../main";
import { useNavigate } from "react-router-dom";
import NavbarTrip from "../Navbartrip";
import { LuClock4 } from "react-icons/lu";
import { TbCancel } from "react-icons/tb";
import { RiGroupLine } from "react-icons/ri";
import { LiaLanguageSolid } from "react-icons/lia";

const Netravati = () => {
  const [openImageIndex, setOpenImageIndex] = useState(null);
  const [allExpanded, setAllExpanded] = useState(false);
  const isAdmin = localStorage.getItem("role") === "admin";
  const [newDate, setNewDate] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const navigate = useNavigate();
  const [adults, setAdults] = useState(1);
  const [guestNames, setGuestNames] = useState([{ title: "Mr", name: "" }]);

  const [selectedDate, setSelectedDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);

  const handleBooking = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/tripcart/add`,
        {
          activity: "Netravati Trek",
          date: selectedDate,
          guests: guestNames, // each guest { title, name }
          pricePerHead: currentPrice,
        },
        {
          headers: {
            "x-user-data": localStorage.getItem("user"), // ensure it's JSON
          },
        },
      );
      // redirect to cart
      navigate("/tripcart");
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch available slots from backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/rappelling/dates?activity=Netravati Trek`)
      .then((res) => {
        console.log("API Response:", res.data);
        setAvailableDates(res.data);
      });
  }, []);

  useEffect(() => {
    refreshDates();
    axios
      .get(`${API_BASE_URL}/api/rappelling/price?activity=Netravati Trek`)
      .then((res) => {
        setCurrentPrice(res.data?.value || null);
      });
  }, []);

  const handleAdd = () => {
    if (!newDate) return;
    axios
      .post(`${API_BASE_URL}/api/rappelling/dates`, {
        activity: "Netravati Trek",
        date: newDate,
      })
      .then(() => {
        setNewDate("");
        refreshDates();
      });
  };

  const handleSetPrice = () => {
    if (!newPrice) return;
    axios
      .post(`${API_BASE_URL}/api/rappelling/price`, {
        activity: "Netravati Trek",
        value: newPrice,
      })
      .then(() => {
        setNewPrice("");
        setCurrentPrice(newPrice);
      });
  };

  const imageData = [
    {
      title: "Day 0",
      image:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1800",
      paragraphs: [
        "10:00 PM: Departure from Shantala Silk, Bangalore (Majestic).",
      ],
    },
    {
      title: "Day 1",
      image:
        "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=1800",
      paragraphs: [
        "5:30 AM: Arrive at Base Camp, drop off extra luggage",
        "7:30 AM: Freshen up & explore the campsite",
        "8:30 AM: Breakfast & permissions",
        "10:00 AM: Begin trek to Netravati Peak",
        "12:30 PM: Reach peak, enjoy packed lunch",
        "2:30 PM: Start descent",
        "5:30 PM: Arrive back at Base Camp",
        "6:30 PM: Tea & snacks",
        "7:30 PM: Campfire",
        "9:00 PM: Dinner",
      ],
    },
    {
      title: "Day 2",
      image:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1800",
      paragraphs: [
        "6:30 AM: Wake up & freshen up",
        "8:30 AM: Breakfast & depart for Hidden Waterfalls",
        "10:30 AM: Return to Base Camp, freshen up",
        "12:30 PM: Lunch at Base Camp",
        "2:30 PM: Visit Samse Tea Estate & temple",
        "3:30 PM: Begin return journey to Bangalore",
        "4:30 PM: Stop at Belur Chennakeshava Temple",
        "8:30 PM: Dinner (self-sponsored)",
        "10:00 PM: Arrive in Bangalore",
      ],
    },
  ];

  const handleDelete = (id) => {
    axios
      .delete(
        `${API_BASE_URL}/api/rappelling/dates/${id}?activity=Netravati Trek`,
      )
      .then(() => {
        refreshDates();
      });
  };

  const refreshDates = () => {
    axios
      .get(`${API_BASE_URL}/api/rappelling/dates?activity=Netravati Trek`)
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
      <NavbarTrip />
      <img
        className="main-image"
        src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=2400"
        alt="Netravati Trek: Experience the Beauty of the Western Ghats"
      />
      <div className="rappelling-content-wrapper">
        <div className="rappelling-page">
          <div className="content">
            <h1>Netravati Trek: Experience the Beauty of the Western Ghats</h1>
            <div className="info">
              <p>
                <strong>Not Rated</strong>
              </p>
              <p>from 0 review</p>
            </div>

            <div className="section-separator"></div>
            <div className="activity-details">
              <div>
                <strong>
                  <LuClock4 /> Duration:
                </strong>{" "}
                2 Days
              </div>
              <div>
                <strong>
                  <TbCancel /> Cancellation:
                </strong>
                No Cancellation
              </div>
              <div>
                <strong>
                  <RiGroupLine /> Group Size:
                </strong>{" "}
                20 people
              </div>
              <div>
                <strong>
                  <LiaLanguageSolid /> Languages:
                </strong>{" "}
                ___
              </div>
            </div>

            <div className="section-separator"></div>

            <h2>Overview</h2>

            <p>
              The Netravati Trek is a captivating journey for nature lovers and
              adventure enthusiasts alike. Located in the scenic valley, this
              trek offers an unforgettable experience filled with lush greenery,
              pristine river views, and diverse wildlife. Whether you’re a
              seasoned trekker or new to hiking, Netravati Trek provides an
              adventure that’s both exhilarating and serene.
            </p>

            <h2>Introduction to Netravati Trek</h2>
            <p>
              The Netravati River, flowing through the Western Ghats, carves a
              beautiful valley, making it a perfect destination for trekking.
              The trek is known for its challenging yet rewarding trails that
              offer panoramic views of the valley, making it a must-do for
              adventure seekers. Rich in flora and fauna, the region is a
              biodiversity hotspot, and the trek allows you to immerse yourself
              in nature.
            </p>

            <h2>Exploring the Netravati River Valley</h2>
            <p>
              The Netravati River Valley is one of the most scenic landscapes in
              southern India. Trekking here means walking through dense forests,
              crossing streams, and discovering hidden waterfalls. The valley’s
              beauty is enhanced by its vibrant birdlife and the occasional
              sighting of wildlife. Every turn in the trail offers something
              new, from mist-covered hills to picturesque river views.
            </p>

            <h2>Best Time for Netravati Trek</h2>
            <p>
              The ideal time for the Netravati Trek is during the post-monsoon
              and winter seasons, from September to February. During this
              period, the weather is cool, and the region’s flora is at its most
              vibrant. The river flows in full force, and the trails are in
              perfect condition for trekking. Avoid the trek during the monsoon
              season, as the trails can become slippery and dangerous.
            </p>

            <h2>Essential Tips for Netravati Trekkers</h2>
            <p>
              Before embarking on the Netravati Trek, ensure you are
              well-prepared. Wear comfortable trekking shoes with good grip,
              carry enough water and snacks, and pack light layers to adapt to
              changing weather. It’s advisable to trek with a guide or in a
              group, especially if you’re unfamiliar with the terrain.
            </p>

            <h2>Conclusion</h2>
            <p>
              The Netravati Trek is an adventure that promises stunning views,
              challenging trails, and a chance to reconnect with nature. Whether
              you’re exploring the valley’s rich biodiversity or soaking in the
              tranquil river scenes, this trek offers a memorable experience for
              anyone seeking an escape into the wild. Plan your trek today and
              discover the gems!
            </p>

            <h2>Highlights</h2>
            <ul>
              <li>
                Crisscrossing Streams, Hiking up the Velvety Grasslands, Soaking
                up in the Waterfalls then Climbing the Mountains above the
                Cloud.
              </li>
              <li>Warm fire camp.</li>
            </ul>
            <div className="section-separator"></div>
            <h2>What You Will Do</h2>
            <div className="button-row">
              {!allExpanded && (
                <button className="expand-btn" onClick={handleExpandAll}>
                  Expand All
                </button>
              )}
              {allExpanded && (
                <button className="collapse-btn" onClick={handleCollapseAll}>
                  Collapse All
                </button>
              )}
            </div>

            <div className="image-section">
              {imageData.map((item, index) => (
                <div key={index} className="toggle-image-container">
                  <div
                    className="arrow-toggle"
                    onClick={() => handleToggleImage(index)}
                  >
                    {item.title}▼
                  </div>

                  {(openImageIndex === index || openImageIndex === "all") && (
                    <div className="image-text-pair">
                      <img src={item.image} className="toggle-image" />
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
              <p>✅ Pickup & Drop: Bangalore</p>
              <p>
                ✅ Private Transport: To Samse Base Camp & scenic viewpoints
              </p>
              <p>✅ Entry Fees: Forest Entry ₹500</p>
              <p>✅ Guided Trek: Includes local expert</p>
              <p>
                ✅ Meals: 2 Breakfasts, 1 Packed Lunch, 1 Dinner (authentic
                Malnad cuisine)
              </p>
              <p>✅ Stay: Tent/Dorm (2-3 sharing) with fire camp</p>
            </div>
            <div className="excluded">
              <p>❌ Add-ons: Optional services available</p>
              <p>❌ Rules: Alcohol and smoking strictly prohibited</p>
              <p>❌ Day 2 Lunch: Self-sponsored</p>
              <p>❌ Exclusions: Items not listed in inclusions</p>
            </div>

            <div className="section-separator"></div>
            <h2>Duration</h2>
            <p> 🕒 2 Day 1 Night</p>

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
              <button className="book-now-btn" onClick={handleAdd}>
                Add Date
              </button>

              {/* Set Price Section */}
              <label style={{ marginTop: "1rem" }}>Set Base Price (₹)</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <button className="book-now-btn" onClick={handleSetPrice}>
                Set Price
              </button>

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
                      <button onClick={() => handleDelete(slot._id)}>
                        Delete
                      </button>
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
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
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
                    updatedGuestNames.push({ title: "Mr", name: "" });
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
                <div
                  key={index}
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
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

export default Netravati;
