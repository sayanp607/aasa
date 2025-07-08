import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../main';
import './AdminCloth.css';

const AdminCloth = () => {
  const [cloths, setCloths] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sizes: [{ size: 'S', price: '', stock: '' }],
    image: null,
  });

  const [editId, setEditId] = useState(null);
  const sizesOptions = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

  const fetchCloths = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/cloth/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCloths(res.data);
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to fetch cloths');
    }
  };

  useEffect(() => {
    fetchCloths();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
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
    const updatedSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: updatedSizes });
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
        alert('Cloth updated successfully');
        setEditId(null);
      } else {
        await axios.post(`${API_BASE_URL}/api/admin/cloth/add`, submitData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          }
        });
        alert('Cloth created successfully');
      }

      setFormData({ name: '', description: '', sizes: [{ size: 'S', price: '', stock: '' }], image: null });
      fetchCloths();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to save cloth');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/cloth/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Deleted successfully');
      fetchCloths();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete cloth');
    }
  };

  const handleEdit = (cloth) => {
    setFormData({
      name: cloth.name,
      description: cloth.description,
      sizes: cloth.sizes,
      image: cloth.image,
    });
    setEditId(cloth._id);
  };

    return (
    <div className="admin-container">
      <h2 className="admin-title">{editId ? 'Edit Cloth' : 'Admin Cloth Management'}</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="name" placeholder="Cloth Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

        <h4>Sizes, Prices & Stocks</h4>
        {formData.sizes.map((item, idx) => (
          <div className="size-row" key={idx}>
            <select
              value={item.size}
              onChange={(e) => handleSizeChange(idx, 'size', e.target.value)}
            >
              {sizesOptions.map(sz => <option key={sz} value={sz}>{sz}</option>)}
            </select>

            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleSizeChange(idx, 'price', e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={item.stock}
              onChange={(e) => handleSizeChange(idx, 'stock', e.target.value)}
              required
            />

            {formData.sizes.length > 1 && (
              <button type="button" onClick={() => removeSize(idx)}>Remove</button>
            )}
          </div>
        ))}

        <button  className='btn' type="button" onClick={addSize}>Add Size</button>
        <input className='inputimg' type="file" name="image" onChange={handleChange} />
        <button className='btn' type="submit">{editId ? 'Update Cloth' : 'Add Cloth'}</button>
      </form>

      <h3>Available Cloths</h3>
      <div className="admin-cloth-list">
        {cloths.map(cloth => (
          <div key={cloth._id} className="admin-cloth-card">
            {cloth.image && (
              <img src={`${API_BASE_URL}/uploads/${cloth.image}?v=${Date.now()}`} alt="cloth" />
            )}
            <h4>{cloth.name}</h4>
            <p>{cloth.description}</p>
            <div>
              <strong>Sizes:</strong>
              <ul>
                {cloth.sizes.map((sz, idx) => (
                  <li key={idx}>{sz.size}: ₹{sz.price} | Stock: {sz.stock}</li>
                ))}
              </ul>
            </div>
            <div className="card-actions">
              <button onClick={() => handleEdit(cloth)}>Edit</button>
              <button onClick={() => handleDelete(cloth._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCloth;
