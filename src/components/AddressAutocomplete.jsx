import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AddressAutocomplete.css";

const AddressAutocomplete = ({ 
  placeholder, 
  onSelect, 
  initialValue = "", 
  className = "",
  icon: Icon
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!value.trim() || value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Debounce Nominatim requests by 300ms to be polite to OSM servers
    debounceTimer.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value.trim())}&addressdetails=1&limit=5`;
        const res = await axios.get(url, {
          headers: { 'Accept-Language': 'en' }
        });
        if (res.data && Array.isArray(res.data)) {
          setSuggestions(res.data);
          setShowSuggestions(true);
        }
      } catch (err) {
        console.error("OSM Geocoding Error:", err);
      }
    }, 300);
  };

  const handleSuggestionClick = (item) => {
    const fullText = item.display_name;
    setInputValue(fullText);
    setShowSuggestions(false);

    if (onSelect) {
      onSelect({
        address: fullText,
        coords: {
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
        },
        placeId: item.place_id
      });
    }
  };

  const getMainText = (item) => {
    if (item.name) return item.name;
    if (item.address?.road) return item.address.road;
    if (item.address?.suburb) return item.address.suburb;
    return item.display_name.split(",")[0];
  };

  const getSecondaryText = (item) => {
    const parts = item.display_name.split(",");
    return parts.slice(1).join(",").trim() || item.display_name;
  };

  return (
    <div className={`autocomplete-wrapper ${className}`} ref={wrapperRef}>
      <div className="autocomplete-input-container">
        {Icon && <Icon className="input-icon" />}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          autoComplete="off"
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSuggestionClick(item)}
            >
              <span className="suggestion-main">{getMainText(item)}</span>
              <span className="suggestion-secondary">{getSecondaryText(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
