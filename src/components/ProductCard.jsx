import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Volume2, ShoppingBag, ArrowRight, Truck, Check, ArrowLeftRight } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';

export default function ProductCard({ product }) {
  const { currency, formatPrice, wishlist, toggleWishlist, compareList, toggleCompare } = useEcommerce();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const handleAudioToggle = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      setTimeout(() => setIsPlayingAudio(false), 4000);
    }
  };

  const lowestStore = product.prices.find(p => p.bestDeal) || product.prices[0];

  return (
    <div className="product-card glass-panel glow-border" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Top Badges & Wishlist Action */}
      <div className="card-img-wrap" style={{ position: 'relative' }}>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} className="card-img" />
        </Link>

        {/* % OFF Discount Tag */}
        {product.discountPercent > 0 && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: '#ff0844',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 900,
            padding: '3px 8px',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(255, 8, 68, 0.4)'
          }}>
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(5, 7, 20, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.2s ease'
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} color={isWishlisted ? "#ff0844" : "#fff"} fill={isWishlisted ? "#ff0844" : "none"} />
        </button>

        {/* Sub-Category Tag */}
        <div className="keyword-tag-float" style={{ bottom: '10px', left: '10px' }}>
          🏷️ {product.subCategoryName || product.categoryName}
        </div>
      </div>

      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Brand & Origin */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ff9900', textTransform: 'uppercase' }}>
            {product.brand}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {product.origin || 'Certified Creator Gear'}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="card-title" style={{ fontSize: '1.05rem', minHeight: '44px', marginBottom: '8px' }}>
          <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {product.title}
          </Link>
        </h3>

        {/* Rating & Review Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', color: '#f6d365' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#f6d365" />
            ))}
          </div>
          <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{product.rating}</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({product.reviewCount.toLocaleString()} ratings)</span>
        </div>

        {/* Price Box with MRP strike-through */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '10px',
          padding: '10px 14px',
          marginBottom: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#00f2fe' }}>
              {formatPrice(product.priceINR, product.priceUSD)}
            </span>
            {product.mrpINR && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                M.R.P.: ₹{product.mrpINR.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#38ef7d', marginTop: '2px' }}>
            <Truck size={13} /> {product.deliverySpeed || "Fast Express Shipping Available"}
          </div>
        </div>

        {/* Multi-Store Real-Time Price Rows */}
        <div className="price-matrix" style={{ marginBottom: '14px', flex: 1 }}>
          <div className="price-matrix-title" style={{ fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>🛒 Live Multi-Store Deals</span>
            <span style={{ color: '#00f2fe' }}>Verified</span>
          </div>
          {product.prices.map((p, idx) => (
            <Link
              key={idx}
              to={p.url}
              className="price-store-row"
              style={{ textDecoration: 'none', padding: '6px 8px' }}
            >
              <span className="store-name" style={{ fontSize: '0.8rem' }}>
                {p.bestDeal && <span style={{ color: '#ff9900', marginRight: 4 }}>★</span>}
                {p.store}
              </span>
              <span className="store-price" style={{ fontSize: '0.85rem' }}>
                {currency === 'INR' ? `₹${p.priceINR.toLocaleString('en-IN')}` : `$${p.priceUSD.toFixed(2)}`}
              </span>
            </Link>
          ))}
        </div>

        {/* Add to Compare Checkbox & Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.78rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: isCompared ? '#00f2fe' : 'var(--text-muted)' }}>
            <input 
              type="checkbox" 
              checked={isCompared} 
              onChange={() => toggleCompare(product.id)}
            />
            {isCompared ? "In Compare Tray" : "Add to Compare"}
          </label>

          <Link to={`/product/${product.id}`} style={{ color: '#00f2fe', textDecoration: 'none', fontWeight: 700 }}>
            Specs →
          </Link>
        </div>

        {/* Primary E-Commerce Buy CTA */}
        <Link
          to={lowestStore.url}
          className="cta-button"
          style={{ 
            textDecoration: 'none', 
            padding: '10px 14px', 
            fontSize: '0.85rem',
            background: 'linear-gradient(135deg, #ff9900 0%, #ff5722 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <ShoppingBag size={16} /> Buy on {lowestStore.store} ({formatPrice(lowestStore.priceINR, lowestStore.priceUSD)})
        </Link>
      </div>
    </div>
  );
}
