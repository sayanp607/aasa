import React, { useState, useEffect, useRef } from "react";
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
  const autocompleteService = useRef(null);
  const geocoder = useRef(null);
  const sessionToken = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (window.google && !autocompleteService.current) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      geocoder.current = new window.google.maps.Geocoder();
      sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
    }

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

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    if (autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          sessionToken: sessionToken.current,
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
          }
        }
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.description);
    setShowSuggestions(false);

    if (geocoder.current) {
      geocoder.current.geocode({ placeId: suggestion.place_id }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          onSelect({
            address: suggestion.description,
            coords: {
              lat: location.lat(),
              lng: location.lng(),
            },
            placeId: suggestion.place_id
          });
          // Refresh session token for next search
          sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
        }
      });
    }
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
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="suggestion-main">{suggestion.structured_formatting.main_text}</span>
              <span className="suggestion-secondary">{suggestion.structured_formatting.secondary_text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
