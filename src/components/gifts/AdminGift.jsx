import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GiftCard from './GiftCard';
import GiftForm from './GiftForm';
import { API_BASE_URL } from '../../main';
import SearchBar from './SearchBar';
import "./admingift.css"
const categories = ['Corporate Gifts', 'Personalised Gifts', 'Birthday Gifts', 'Anniversary Gifts'];

const AdminGift = () => {
  const [gifts, setGifts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [editGift, setEditGift] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchGifts();
    setSearchTerm('');
    setSuggestions([]);
  }, [selectedCategory]);

  const fetchGifts = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/gifts/category/${selectedCategory}`);
    setGifts(res.data);
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const res = await axios.get(`${API_BASE_URL}/api/gifts/search?q=${query}&category=${selectedCategory}`);
    setSuggestions(res.data);
  };

const handleAddOrUpdate = async (formData) => {
  try {
    const isEdit = formData.get('_id'); // extract from FormData

    if (isEdit) {
      await axios.put(`${API_BASE_URL}/api/gifts/edit/${formData.get('_id')}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Gift updated!');
    } else {
      await axios.post(`${API_BASE_URL}/api/gifts/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Gift added!');
    }

    setEditGift(null);
    fetchGifts();
  } catch (err) {
    alert(err?.response?.data?.message || 'Operation failed');
  }
};



  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE_URL}/api/gifts/delete/${id}`);
    fetchGifts();
  };

  const handleSelectSuggestion = (gift) => {
    setGifts([gift]); // Show only the selected gift
    setSearchTerm(gift.name);
    setSuggestions([]);
  };

  return (
   <div className="admin-container">
  <h2>Admin - {selectedCategory}</h2>

  <div className="category-buttons">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => {
          setSelectedCategory(cat);
          setEditGift(null);
        }}
        className={selectedCategory === cat ? 'active' : ''}
      >
        {cat}
      </button>
    ))}
  </div>

  <div className="search-bar-container">
    <SearchBar
      value={searchTerm}
      onChange={(val) => {
        setSearchTerm(val);
        fetchSuggestions(val);
      }}
      onSelectSuggestion={handleSelectSuggestion}
      suggestions={suggestions}
    />
  </div>

  <div className="gift-form-container">
    <GiftForm
      onSubmit={handleAddOrUpdate}
      initialData={editGift}
      category={selectedCategory}
    />
  </div>

  <div className="gift-grid">
    {gifts.map((gift) => (
      <div className="gift-card" key={gift._id}>
        <GiftCard
          gift={gift}
          onEdit={setEditGift}
          onDelete={handleDelete}
        />
      </div>
    ))}
  </div>
</div>

  );
};

export default AdminGift;
