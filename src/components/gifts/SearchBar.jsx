import React, { useState, useEffect } from 'react';
import './SearchBar.css'; // optional for styling

const SearchBar = ({ value, onChange, onSelectSuggestion, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setShowSuggestions(value.length > 0 && suggestions.length > 0);
  }, [value, suggestions]);

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search gifts..."
      />
      {showSuggestions && (
        <ul className="suggestion-list">
          {suggestions.map((gift) => (
            <li
              key={gift._id}
              onClick={() => {
                onSelectSuggestion(gift);
                setShowSuggestions(false);
              }}
            >
              {gift.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
