import React from 'react';
import { API_BASE_URL } from '../../main';
import { FaShoppingBag, FaCartPlus, FaEdit, FaTrash, FaGift } from 'react-icons/fa';

const GiftCard = ({ gift, onBuy, onEdit, onDelete, onAddToCart }) => {
  return (
    <div className="boutique-gift-card">
      <div className="gift-card-media">
        <span className="gift-badge"><FaGift /> Handcrafted</span>
        <img
          src={`${API_BASE_URL}${gift.image}`}
          alt={gift.name}
          className="gift-card-image"
        />
      </div>

      <div className="gift-card-content">
        <h4>{gift.name}</h4>
        <p className="line-clamp-2">{gift.description}</p>
        
        <div className="gift-card-footer">
          <span className="gift-price">₹{gift.price}</span>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {onAddToCart && (
              <button className="gift-action-btn" onClick={() => onAddToCart(gift._id)}>
                <FaCartPlus />
              </button>
            )}
            
            {onBuy && (
              <button 
                className="buy-now-trigger" 
                onClick={() => gift.stock > 0 && onBuy(gift)}
                disabled={gift.stock === 0}
              >
                {gift.stock === 0 ? 'Out of Stock' : <><FaShoppingBag /> Buy Now</>}
              </button>
            )}
          </div>
        </div>

        {(onEdit || onDelete) && (
          <div className="admin-actions-overlay" style={{ marginTop: '1rem', display: 'flex', gap: '8px' }}>
            {onEdit && <button className="gift-action-btn" onClick={() => onEdit(gift)}><FaEdit /></button>}
            {onDelete && <button className="gift-action-btn" onClick={() => onDelete(gift._id)} style={{ color: '#ef4444' }}><FaTrash /></button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftCard;
