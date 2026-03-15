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

const WaterfallRappelling = () => {
  const [openImageIndex, setOpenImageIndex] = useState(null);
  const [allExpanded, setAllExpanded] = useState(false);
  const isAdmin = localStorage.getItem("role") === "admin";
  const [newDate, setNewDate] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const [adults, setAdults] = useState(1);
  const [guestNames, setGuestNames] = useState([{ title: "Mr", name: "" }]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [title, setTitle] = useState("Mr");
  const [availableDates, setAvailableDates] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);

  const waterfallImages = [
    "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=1800",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=1800",
  ];

  const handleAdultsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setAdults(value);
    const updatedNames = [...guestNames];
    if (value > guestNames.length) {
      while (updatedNames.length < value) updatedNames.push("");
    } else {
      updatedNames.length = value;
    }
    setGuestNames(updatedNames);
  };

  const handleBooking = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/tripcart/add`,
        {
          activity: "Waterfall Rappelling",
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
      .get(`${API_BASE_URL}/api/rappelling/dates?activity=Waterfall Rappelling`)
      .then((res) => {
        console.log("API Response:", res.data);
        setAvailableDates(res.data);
      });
  }, []);

  useEffect(() => {
    refreshDates();
    axios
      .get(`${API_BASE_URL}/api/rappelling/price?activity=Waterfall Rappelling`)
      .then((res) => {
        setCurrentPrice(res.data?.value || null);
      });
  }, []);

  const handleAdd = () => {
    if (!newDate) return;
    axios
      .post(`${API_BASE_URL}/api/rappelling/dates`, {
        activity: "Waterfall Rappelling",
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
        activity: "Waterfall Rappelling",
        value: newPrice,
      })
      .then(() => {
        setNewPrice("");
        setCurrentPrice(newPrice);
      });
  };

  const handleUpdate = (id) => {
    axios
      .put(`${API_BASE_URL}/api/rappelling/dates/${id}`, {
        activity: "Waterfall Rappelling",
        date: newDate,
        price: newPrice,
      })
      .then(() => {
        setNewDate("");
        setNewPrice("");
        setEditingId(null);
        refreshDates();
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `${API_BASE_URL}/api/rappelling/dates/${id}?activity=Waterfall Rappelling`,
      )
      .then(() => {
        refreshDates();
      });
  };

  const refreshDates = () => {
    axios
      .get(`${API_BASE_URL}/api/rappelling/dates?activity=Waterfall Rappelling`)
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
        src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=2400"
        alt="Waterfall Rappelling"
      />
      <div className="rappelling-content-wrapper">
        <div className="rappelling-page">
          <div className="content">
            <h1>Waterfall Rappelling Expeditions</h1>
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
                1
              </div>
              <div>
                <strong>
                  <TbCancel /> Cancellation:
                </strong>
                Up to 4 days
              </div>
              <div>
                <strong>
                  <RiGroupLine /> Group Size:
                </strong>{" "}
                8 people
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
            <p>Looking for an adrenaline-pumping adventure in Karnataka? ...</p>
            <p>
              <strong>Checkout what people say:</strong> google review
              ⭐⭐⭐⭐⭐
            </p>

            <h2>What is Waterfall Rappelling?</h2>
            <p>
              Waterfall rappelling, also known as abseiling, is a heart-racing
              ...
            </p>

            <h2>Why Choose Waterfall Rappelling in Karnataka?</h2>
            <p>Karnataka boasts rich biodiversity and scenic waterfalls, ...</p>

            <h2>What to Expect on Your Rappelling Expedition</h2>
            <ul>
              <li>
                <strong>Safety First:</strong> Helmets, harnesses, gloves
                provided.
              </li>
              <li>
                <strong>Scenic Beauty:</strong> Rappel down beautiful
                waterfalls.
              </li>
              <li>
                <strong>Custom Experience:</strong> Beginners to pros welcome.
              </li>
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
              {[0, 1].map((index) => (
                <div key={index} className="toggle-image-container">
                  <div
                    className="arrow-toggle"
                    onClick={() => handleToggleImage(index)}
                  >
                    Waterfall Rappelling Expeditions ▼
                  </div>
                  {(openImageIndex === index || openImageIndex === "all") && (
                    <img
                      src={waterfallImages[index]}
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
              <p>✅ Transportation (Sirsi to Sirsi)</p>
              <p>✅ Malenadu Special Breakfast</p>
              <p>✅ Hot Lunch & Herbal Bath</p>
              <p>✅ Medicinal Plants Walk in the Forest</p>
              <p>✅ Basic Rope Knowledge Training</p>
              <p>✅ Waterfall Rappelling with gear</p>
              <p>✅ Certification</p>
              <p>✅ Guide Charges</p>
              <p>✅ Insurance</p>
            </div>
            <div className="excluded">
              <p>❌ Additional Services</p>
              <p>❌ Things not mentioned in Inclusions</p>
            </div>

            <div className="section-separator"></div>
            <h2>Duration</h2>
            <p> 🕒 1 Day</p>

            <div className="section-separator"></div>
            <h2>Activity Types</h2>
            <div className="icon-row">
              <div>🍽 Food</div>
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
                          setEditingId(slot._id);
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

export default WaterfallRappelling;
