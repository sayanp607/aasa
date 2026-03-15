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

const Bandaje = () => {
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

  const imageData = [
    {
      title: "Day 0",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1800",
      paragraphs: [
        "1) Greeting Namaste. Pickup from Bangalore",
        "(9:30pm-10:00pm Shantala Silks Famous Trekking Pickup Spot)",
        "(10:30pm-11:00pm Goraguntepalya near metro station)",
        "2) Start journey towards Durgadahalli.",
      ],
    },
    {
      title: "Day 1",
      image:
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&q=80&w=1800",
      paragraphs: [
        "1) Greeting Namaste. @ 05:00AM in Mudigere.",
        "2) Quick Refreshment, and Cherishing Warm And Nutritional Breakfast With @ 08:00 AM",
        "3) Trekking Instructions and Safety Protocols @ 08:45 AM.",
        "4) After a Group Picture, Departing towards ballarayana durga base point @ 09:00 AM.",
        "5) Reaching POINT 01- Durga Base point @ 10:30 AM.",
        "6) Starting our trek towards ballarayana durga fort @ 10:40 AM.",
        "7) Crossing Dense Deciduous Valleys @ 11:00 AM.",
        "8) Reach first point @ 11:30 AM.",
        "9) Start trek towards bandaje falls after a quick relief @ 11:45 AM.",
        "10) Pushing All Limits to Reach Bandaje Arbi waterfalls @ 12:30 PM.",
        "11) Enjoying the Marvelous Creation of Western Ghats and waterfall as far as our Eyes can Stretch and have packed lunch with the view.",
        "12) Starting to Hike back our journey towards base point @ 14:00 hours.",
        "13) Cherishing Golden Hour Sunset @ 15:00 hours and Coming back to the base point by 18:30 hours.",
        "14) Reach Tent camp site / homestay have a coffee and snack break.",
        "15) After Refreshing,starting the Campfire @ 19:30 hours onwards.",
        "16) Some Group Games and Group Conversations while Bonfires.",
        "17) Savouring Delicious Dinner @ 21:00 hours.",
        "18) Goodnight at @ 22:00 Hours.",
      ],
    },
    {
      title: "Day 2",
      image:
        "https://images.unsplash.com/photo-1517821099601-8fae3ff77cd2?auto=format&fit=crop&q=80&w=1800",
      paragraphs: [
        "19) Waking up to Bird's Symphony at 05:30 AM.",
        "20) Cherishing Breakfast at 10:00 AM.",
        "21) Packing Up and Departing for a Panoramic Kodige waterfalls.",
        "22) Have ball full of time in waterfalls.",
        "23) Pack luggage and start journey towards mudigere 11:00 hours.",
        "24) Reach back to mudigere have lunch and depart to bangalore 13:00 hours.",
        "25) Reach to drop location at bangalore by 21:30 hours.",
      ],
    },
  ];

  const handleBooking = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/tripcart/add`,
        {
          activity: "Bandaje Falls Trek",
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
      .get(`${API_BASE_URL}/api/rappelling/dates?activity=Bandaje Falls Trek`)
      .then((res) => {
        console.log("API Response:", res.data);
        setAvailableDates(res.data);
      });
  }, []);

  useEffect(() => {
    refreshDates();
    axios
      .get(`${API_BASE_URL}/api/rappelling/price?activity=Bandaje Falls Trek`)
      .then((res) => {
        setCurrentPrice(res.data?.value || null);
      });
  }, []);

  const handleAdd = () => {
    if (!newDate) return;
    axios
      .post(`${API_BASE_URL}/api/rappelling/dates`, {
        activity: "Bandaje Falls Trek",
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
        activity: "Bandaje Falls Trek",
        value: newPrice,
      })
      .then(() => {
        setNewPrice("");
        setCurrentPrice(newPrice);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `${API_BASE_URL}/api/rappelling/dates/${id}?activity=Bandaje Falls Trek`,
      )
      .then(() => {
        refreshDates();
      });
  };

  const refreshDates = () => {
    axios
      .get(`${API_BASE_URL}/api/rappelling/dates?activity=Bandaje Falls Trek`)
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
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2400"
        alt="Bandaje Falls Trek"
      />
      <div className="rappelling-content-wrapper">
        <div className="rappelling-page">
          <div className="content">
            <h1>Bandaje Falls Trek</h1>
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
                2 Day 1 Night
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
              Bandaje falls trek is an Exciting Combination of Archaic Fort
              residing at an High Altitude and A Trek through Shola Green
              Forests to Explore a Magnificent 1000ft tall Plunging Bandaje
              Waterfall is Definite to Thrill you with the Emblazoned Hues of
              Nature,
            </p>

            <p>
              As the Trek Comprises of 4 Terrains in a Single day, Starting from
              Initial Densely Deciduous Jungles and as We Gear up our Trek, We
              Come out of the Canopy and Open ourselves to High Altitudes of
              Lush Greenery, Each and Every Segment of this Journey Encompasses
              with Visual Delights as the Clouds Traverse besides us and
              Windprone Areas Leave us Spellbound with its Impulse.
            </p>

            <p>
              Finally the Trails of the Trek is Set up to Converge the Streams
              of Mountain Waters that Take a Plunge from the Cliff and Unveil a
              Grand Valley that Serves a Visual Delight and Serendipity to our
              Mind.
            </p>

            <h2>Highlights</h2>
            <ul>
              <li>Ballarayana durga fort.</li>
              <li>Ranijhari view point.</li>
              <li>Bandaje Falls..</li>
              <li>Kodige Falls.</li>
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
              <p>✅ Pickup (Bangalore) & Drop (Bangalore).</p>
              <p>✅ Private Transport to viewpoints.</p>
              <p>✅ guide charges.</p>
              <p>
                ✅ 2 breakfast, 1 packed lunch and 1 dinner (Malnad style
                cuisine).
              </p>
              <p>
                ✅ Tentstay / dormitory 2 or 3 people sharing with fire camp.
              </p>
            </div>
            <div className="excluded">
              <p>❌ Insurance.</p>
              <p>❌ Additional Services</p>
              <p>❌ 2nd Day lunch is self sponsored.</p>
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
              <div>⛺ Tent Stay</div>
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

export default Bandaje;
