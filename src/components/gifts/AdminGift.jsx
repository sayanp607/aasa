import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GiftCard from './GiftCard';
import GiftForm from './GiftForm';
import { API_BASE_URL } from '../../main';
import SearchBar from './SearchBar';
import { FaBoxes, FaExclamationTriangle, FaPlusCircle, FaMagic } from 'react-icons/fa';
import "./admingift.css";
import { toast } from 'react-toastify';

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
    try {
      const res = await axios.get(`${API_BASE_URL}/api/gifts/category/${selectedCategory}`);
      setGifts(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/gifts/search?q=${query}&category=${selectedCategory}`);
      setSuggestions(res.data);
    } catch (err) {
      console.error("Search Error:", err);
    }
  };

  const handleAddOrUpdate = async (formData) => {
    try {
      const isEdit = formData.get('_id');
      if (isEdit) {
        await axios.put(`${API_BASE_URL}/api/gifts/edit/${formData.get('_id')}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Handcrafted item updated!');
      } else {
        await axios.post(`${API_BASE_URL}/api/gifts/add`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('New handcrafted item added to collection!');
      }
      setEditGift(null);
      fetchGifts();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this item from the collection?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/gifts/delete/${id}`);
        fetchGifts();
        toast.info("Item removed from collection");
      } catch (err) {
        toast.error("Failed to remove item");
      }
    }
  };

  const handleSelectSuggestion = (gift) => {
    setGifts([gift]);
    setSearchTerm(gift.name);
    setSuggestions([]);
  };

  const totalStock = gifts.reduce((acc, curr) => acc + (curr.stock || 0), 0);
  const lowStockCount = gifts.filter(g => g.stock <= 5).length;

  return (
    <div className="admin-gift-page animate-fade-in">
      <header className="dashboard-header">
        <div className="header-main-info">
          <span className="executive-tag">Executive Suite</span>
          <h2>Gift Collection Management</h2>
          <p>Curate and manage your handcrafted inventory.</p>
        </div>

        <div className="inventory-intelligence">
          <div className="intel-box">
            <span className="label"><FaBoxes /> Total Stock</span>
            <span className="value">{totalStock}</span>
          </div>
          <div className="intel-box">
            <span className="label" style={{ color: lowStockCount > 0 ? '#ef4444' : '#64748b' }}>
              <FaExclamationTriangle /> Critical Stock
            </span>
            <span className="value" style={{ color: lowStockCount > 0 ? '#ef4444' : '#0f172a' }}>
              {lowStockCount}
            </span>
          </div>
        </div>
      </header>

      <div className="admin-dual-zone">
        <aside className="creation-zone">
          <div className="executive-card">
            <h3>{editGift ? <><FaMagic /> Refine Collection</> : <><FaPlusCircle /> Expand Collection</>}</h3>
            <GiftForm
              onSubmit={handleAddOrUpdate}
              initialData={editGift}
              category={selectedCategory}
              onCancel={() => setEditGift(null)}
            />
          </div>
        </aside>

        <section className="management-zone">
          <div className="management-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="admin-categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setEditGift(null); }}
                  className={`admin-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <SearchBar
              value={searchTerm}
              onChange={(val) => { setSearchTerm(val); fetchSuggestions(val); }}
              onSelectSuggestion={handleSelectSuggestion}
              suggestions={suggestions}
            />
          </div>

          <div className="live-preview-grid">
            {gifts.map((gift) => (
              <div key={gift._id} className={gift.stock <= 5 ? 'low-stock-warning' : ''}>
                <GiftCard
                  gift={gift}
                  onEdit={setEditGift}
                  onDelete={handleDelete}
                />
                <div className="stock-status-bar" style={{ padding: '0 1.25rem 1.25rem' }}>
                   {gift.stock <= 5 ? (
                      <span className="stock-indicator critical">CRITICAL: {gift.stock} left</span>
                   ) : (
                      <span className="stock-indicator healthy">HEALTHY: {gift.stock} in stock</span>
                   )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminGift;
