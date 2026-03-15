import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import { FaMagic, FaPlusCircle, FaSearch, FaBoxes, FaExclamationTriangle, FaTrash, FaEdit, FaSave, FaImage, FaBoxOpen, FaChartLine, FaArrowLeft } from 'react-icons/fa';
import './AdminCloth.css';
import { toast } from 'react-toastify';

const AdminCloth = () => {
  const [cloths, setCloths] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sizes: [{ size: 'S', price: '', stock: '' }],
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [stats, setStats] = useState({ total: 0, lowStock: 0 });
  const sizesOptions = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

  const fetchCloths = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/cloth/get`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCloths(res.data);
      calculateStats(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to fetch cloths');
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const lowStock = data.filter(c => c.sizes.some(s => s.stock <= 5)).length;
    setStats({ total, lowStock });
  };

  useEffect(() => {
    fetchCloths();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index][field] = field === 'price' || field === 'stock' ? Number(value) : value;
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const addSize = () => {
    setFormData({ ...formData, sizes: [...formData.sizes, { size: 'S', price: '', stock: '' }] });
  };

  const removeSize = (index) => {
    setFormData({ ...formData, sizes: formData.sizes.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('sizes', JSON.stringify(formData.sizes));
    if (formData.image instanceof File) {
      submitData.append('image', formData.image);
    }

    try {
      if (editId) {
        await axios.patch(`${API_BASE_URL}/api/admin/cloth/${editId}`, submitData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          }
        });
        toast.success('Collections Updated Successfully');
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/cloth/add`, submitData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          }
        });
        toast.success('Exclusive Piece Performance Created');
      }
      resetForm();
      fetchCloths();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Operation Failed');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', sizes: [{ size: 'S', price: '', stock: '' }], image: null });
    setImagePreview(null);
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Revoke this collection from the boutique?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/cloth/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchCloths();
      toast.info('Item removed from collection');
    } catch (err) {
      toast.error('Deletion Failed');
    }
  };

  const handleEdit = (cloth) => {
    setFormData({
      name: cloth.name,
      description: cloth.description,
      sizes: cloth.sizes,
      image: cloth.image,
    });
    setImagePreview(`${API_BASE_URL}/uploads/${cloth.image}`);
    setEditId(cloth._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="admin-executive-container">
      {/* Dashboard Header */}
      <header className="admin-header">
        <div className="header-text">
          <span className="badge">Management Suite</span>
          <h2>Aasa Boutique Admin</h2>
        </div>
        
        <div className="stats-row">
          <div className="stat-card">
            <FaChartLine className="stat-icon" />
            <div>
              <p>Active Inventory</p>
              <h3>{stats.total} Pieces</h3>
            </div>
          </div>
          <div className={`stat-card ${stats.lowStock > 0 ? 'alert' : ''}`}>
            <FaBoxOpen className="stat-icon" />
            <div>
              <p>Low Stock Items</p>
              <h3>{stats.lowStock} Items</h3>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="management-grid">
        {/* Creation Zone */}
        <section className="creation-zone">
          <div className="zone-header">
            <h3>{editId ? 'Modify Collection' : 'Curate New Collection'}</h3>
            {editId && <button className="cancel-btn" onClick={resetForm}><FaArrowLeft /> Back</button>}
          </div>

          <form onSubmit={handleSubmit} className="premium-form">
            <div className="input-field">
              <label>Product Identity</label>
              <input type="text" name="name" placeholder="Piece Name (e.g. Silk Summer Breeze)" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="input-field">
              <label>Boutique Description</label>
              <textarea name="description" placeholder="A narrative about this piece..." value={formData.description} onChange={handleChange} required />
            </div>

            <div className="sizes-management">
              <div className="section-title">
                <label>Inventory Matrix</label>
                <button type="button" className="add-size-btn" onClick={addSize}><FaPlus /> Add Size Variant</button>
              </div>

              <div className="sizes-scroll-box">
                {formData.sizes.map((item, idx) => (
                  <div className="size-config-row" key={idx}>
                    <select value={item.size} onChange={(e) => handleSizeChange(idx, 'size', e.target.value)}>
                      {sizesOptions.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                    </select>
                    <input type="number" placeholder="Price" value={item.price} onChange={(e) => handleSizeChange(idx, 'price', e.target.value)} required />
                    <input type="number" placeholder="Stock" value={item.stock} onChange={(e) => handleSizeChange(idx, 'stock', e.target.value)} required />
                    {formData.sizes.length > 1 && (
                      <button type="button" className="remove-btn" onClick={() => removeSize(idx)}><FaTrash /></button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="image-upload-zone">
              <label className="upload-btn">
                <FaImage /> {formData.image ? 'Change Artwork' : 'Upload Product Artwork'}
                <input type="file" name="image" onChange={handleChange} hidden />
              </label>
            </div>

            <button className="submit-master-btn" type="submit">
              {editId ? <><FaSave /> Save Modifications</> : <><FaPlus /> Release to Gallery</>}
            </button>
          </form>
        </section>

        {/* Live Preview Zone */}
        <section className="preview-zone">
          <h3>Boutique Live Preview</h3>
          <div className="preview-card-wrapper">
            <div className="boutique-card-preview">
              <div className="preview-image-box">
                {imagePreview ? <img src={imagePreview} alt="Preview" /> : <div className="placeholder-img"><FaImage /> No Image Selected</div>}
                <span className="preview-badge">Preview</span>
              </div>
              <div className="preview-info">
                <h4>{formData.name || 'Your Masterpiece Name'}</h4>
                <p>{formData.description || 'The description will appear here...'}</p>
                <div className="preview-stats">
                  <span>Price: ₹{formData.sizes[0]?.price || '0'}</span>
                  <span>Variants: {formData.sizes.length}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Items Table View */}
      <section className="inventory-section">
        <h3>Current Boutique Gallery</h3>
        <div className="admin-cloth-grid">
          {cloths.map(cloth => (
            <div key={cloth._id} className="admin-piece-card">
              <div className="piece-media">
                <img src={`${API_BASE_URL}/uploads/${cloth.image}`} alt="" />
                <div className="piece-controls">
                  <button onClick={() => handleEdit(cloth)}><FaEdit /></button>
                  <button onClick={() => handleDelete(cloth._id)} className="delete"><FaTrash /></button>
                </div>
              </div>
              <div className="piece-details">
                <h4>{cloth.name}</h4>
                <div className="piece-stock-summary">
                  {cloth.sizes.map((sz, i) => (
                    <span key={i} className={`stock-pill ${sz.stock <= 5 ? 'low' : ''}`}>
                      {sz.size}: {sz.stock}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};


export default AdminCloth;
