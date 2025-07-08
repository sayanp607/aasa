import React from 'react';
import { API_BASE_URL } from '../../main';

const GiftCard = ({ gift, onBuy, onEdit, onDelete, onAddToCart }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '10px',
      width: '250px',
      margin: '10px'
    }}>
      <img
        src={`${API_BASE_URL}${gift.image}`}
        alt={gift.name}
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <h4>{gift.name}</h4>
      <p>{gift.description}</p>
      <p>₹{gift.price}</p>
<p><strong>In Stock:</strong> {gift.stock}</p>
<div className="gift-card-buttons">
        {onBuy && (
    <button
      className="buy-btn"
      onClick={() => gift.stock > 0 && onBuy(gift)}
      disabled={gift.stock === 0}
    >
      {gift.stock === 0 ? 'Out of Stock' : 'Buy'}
    </button>
  )}


      {onAddToCart && <button className="add-btn" onClick={() => onAddToCart(gift._id)}>Add to Cart</button>}
          </div>
      {onEdit && <button onClick={() => onEdit(gift)}>Edit</button>}
      {onDelete && <button onClick={() => onDelete(gift._id)}>Delete</button>}
      </div>

  );
};

export default GiftCard;
