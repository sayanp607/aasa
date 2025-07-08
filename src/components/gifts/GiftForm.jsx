import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../main'; // Assuming you use this for editing image preview

const GiftForm = ({ onSubmit, initialData, category }) => {
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

      // Set existing image preview
      if (initialData.image) {
        setPreviewImage(`${API_BASE_URL}/uploads/${initialData.image}`);
      }
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
    if (formData.image) {
      data.append('image', formData.image);
    }

    if (initialData && initialData._id) {
      data.append('_id', initialData._id);
    }

    await onSubmit(data);

    // Reset form after submission
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      image: null
    });
    setPreviewImage(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px', marginBottom: '20px' }}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {previewImage && (
        <img
          src={previewImage}
          alt="Gift Preview"
          style={{ width: '150px', height: '150px', objectFit: 'cover', marginTop: '10px', borderRadius: '5px' }}
        />
      )}

      <br />
      <button type="submit">{initialData ? 'Update Gift' : 'Add Gift'}</button>
    </form>
  );
};

export default GiftForm;
