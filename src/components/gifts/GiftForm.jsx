import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../main';
import { FaUpload, FaImage, FaUndo } from 'react-icons/fa';

const GiftForm = ({ onSubmit, initialData, category, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        stock: initialData.stock || '',
        image: null
      });

      if (initialData.image) {
        setPreviewImage(`${API_BASE_URL}${initialData.image}`);
      }
    } else {
      setFormData({ name: '', description: '', price: '', stock: '', image: null });
      setPreviewImage(null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('category', category);
    if (formData.image) data.append('image', formData.image);
    if (initialData && initialData._id) data.append('_id', initialData._id);

    await onSubmit(data);
    if (!initialData) {
      setFormData({ name: '', description: '', price: '', stock: '', image: null });
      setPreviewImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="gift-executive-form">
      <div className="form-field">
        <label>Visual Identity</label>
        <div className="image-preview-area" onClick={() => document.getElementById('gift-img-input').click()}>
          {previewImage ? (
            <img src={previewImage} alt="Gift Preview" />
          ) : (
            <div className="placeholder-text">
              <FaImage size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
              <p>Upload Handcrafted Asset</p>
            </div>
          )}
          <input 
            id="gift-img-input"
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            style={{ display: 'none' }} 
          />
        </div>
      </div>

      <div className="form-field">
        <label>Item Name</label>
        <input name="name" placeholder="Name your treasure" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-field">
        <label>Artisan Description</label>
        <textarea name="description" placeholder="Describe the story behind this item..." value={formData.description} onChange={handleChange} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-field">
          <label>Price (₹)</label>
          <input type="number" name="price" placeholder="Valuation" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Inventory Count</label>
          <input type="number" name="stock" placeholder="Units" value={formData.stock} onChange={handleChange} required />
        </div>
      </div>

      <button type="submit" className="gift-submit-btn">
        <FaUpload /> {initialData ? 'Commit Evolution' : 'Add to Collection'}
      </button>

      {initialData && (
        <button type="button" className="admin-cat-pill" onClick={onCancel} style={{ marginTop: '0.5rem', width: '100%', border: '1px solid #e2e8f0' }}>
          <FaUndo /> Discard Changes
        </button>
      )}
    </form>
  );
};

export default GiftForm;
