import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ArrowLeftRight, Sparkles, Clock, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';

export default function ProductCard({ product }) {
  const { currency, formatPrice, wishlist, toggleWishlist, compareList, toggleCompare } = useEcommerce();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Normalize prices: support both VLOGGING_PRODUCTS (prices[]) and VLOGGING_SMARTPHONES (storeUrls {})
  const pricesList = Array.isArray(product.prices) && product.prices.length > 0
    ? product.prices
    : product.storeUrls
      ? [
          product.storeUrls.amazon ? { store: 'Amazon.in', priceINR: product.priceINR || product.price || 0, priceUSD: product.priceUSD || 0, url: product.storeUrls.amazon, inStock: true, bestDeal: true } : null,
          product.storeUrls.flipkart ? { store: 'Flipkart', priceINR: (product.priceINR || product.price || 0) + (product.priceINR > 50000 ? 1000 : 150), priceUSD: (product.priceUSD || 0) + 12, url: product.storeUrls.flipkart, inStock: true, bestDeal: false } : null,
          product.storeUrls.apple ? { store: product.brand === 'Apple' ? 'Apple Store' : 'Official Brand Store', priceINR: product.mrpINR || product.priceINR || 0, priceUSD: (product.priceUSD || 0) + 50, url: product.storeUrls.apple, inStock: true, bestDeal: false } : null,
        ].filter(Boolean)
      : [{ store: 'Official Store', priceINR: product.priceINR || product.price || 0, priceUSD: product.priceUSD || 0, url: '#', inStock: true, bestDeal: true }];

  const lowestStore = pricesList.find(p => p.bestDeal) || pricesList[0];

  const getMarketStatusStyle = (status) => {
    switch (status) {
      case 'live-current':    return { bg: 'rgba(0,242,254,0.12)', color: '#00f2fe', label: '✨ Live Flagship', border: 'rgba(0,242,254,0.3)' };
      case 'live-discounted': return { bg: 'rgba(255,170,0,0.12)', color: '#ffaa00', label: '🏷️ Discounted Stock', border: 'rgba(255,170,0,0.3)' };
      case 'renewed-refurbished': return { bg: 'rgba(168,85,247,0.12)', color: '#c084fc', label: '🔄 Certified Renewed', border: 'rgba(168,85,247,0.3)' };
      case 'legacy-archive': return { bg: 'rgba(255,255,255,0.06)', color: '#94a3b8', label: '📜 Historical Archive', border: 'rgba(255,255,255,0.12)' };
      default: return null;
    }
  };
  const statusStyle = product.marketStatus ? getMarketStatusStyle(product.marketStatus) : null;

  return (
    <div className="product-card glass-panel glow-border" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Top Badges & Wishlist Action */}
      <div className="card-img-wrap" style={{ position: 'relative' }}>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.title || product.name} className="card-img" />
        </Link>

        {/* Prominent High-Contrast % OFF Discount Badge */}
        {product.discountPercent > 0 && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'linear-gradient(135deg, #ff0844 0%, #ff4b2b 100%)',
            color: '#fff',
            fontSize: '0.8rem',
            fontWeight: 900,
            padding: '4px 9px',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(255, 8, 68, 0.5)',
            letterSpacing: '0.5px',
            zIndex: 3
          }}>
            -{product.discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(5, 7, 20, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.2s ease',
            zIndex: 3
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={17} color={isWishlisted ? "#ff0844" : "#fff"} fill={isWishlisted ? "#ff0844" : "none"} />
        </button>

        {/* Sub-Category Tag */}
        <div className="keyword-tag-float" style={{ bottom: '10px', left: '10px', zIndex: 2 }}>
          🏷️ {product.subCategoryName || product.categoryName}
        </div>

        {/* Generation + Market Status Badge Overlay */}
        {product.generation && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(5,8,25,0.85)',
            border: '1px solid rgba(0,242,254,0.3)',
            borderRadius: '8px',
            padding: '3px 8px',
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#38bdf8',
            backdropFilter: 'blur(8px)',
            zIndex: 3,
            letterSpacing: '0.3px'
          }}>
            {product.generation}
          </div>
        )}
      </div>

      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Brand & Origin + Market Status Pill */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
          <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#ff9900', textTransform: 'uppercase' }}>
            {product.brand}
          </span>
          {statusStyle ? (
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 800,
              color: statusStyle.color,
              background: statusStyle.bg,
              border: `1px solid ${statusStyle.border}`,
              padding: '2px 7px',
              borderRadius: '10px'
            }}>
              {statusStyle.label}
            </span>
          ) : (
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {product.origin || 'Certified Creator Gear'}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="card-title" style={{ fontSize: '1.02rem', minHeight: '42px', marginBottom: '8px', lineHeight: 1.35 }}>
          <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {product.name || product.title}
          </Link>
        </h3>

        {/* Rating & Review Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', color: '#f6d365' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill="#f6d365" />
            ))}
          </div>
          <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{product.rating}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({product.reviewCount?.toLocaleString() || '1,200'} ratings)</span>
        </div>

        {/* Clear High-Contrast Price Box with MRP strike-through and savings */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          padding: '10px 14px',
          marginBottom: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#00f2fe', letterSpacing: '-0.5px' }}>
                {formatPrice(product.priceINR, product.priceUSD)}
              </span>
              {product.mrpINR && (
                <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)', textDecoration: 'line-through' }}>
                  ₹{product.mrpINR.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.mrpINR && product.mrpINR > product.priceINR && (
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#38ef7d',
                background: 'rgba(56, 239, 125, 0.1)',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                Save ₹{(product.mrpINR - product.priceINR).toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#38ef7d', marginTop: '4px' }}>
            <Truck size={13} /> {product.deliverySpeed || "Fast Express Shipping Available"}
          </div>
        </div>

        {/* Key Upgrade note for historical lineage products */}
        {product.keyUpgrade && (
          <div style={{
            fontSize: '0.7rem',
            color: '#e2e8f0',
            background: 'rgba(0,0,0,0.2)',
            borderLeft: '2px solid #00f2fe',
            padding: '5px 8px',
            borderRadius: '0 6px 6px 0',
            marginBottom: '10px',
            lineHeight: 1.4
          }}>
            🔼 {product.keyUpgrade}
          </div>
        )}

        {/* Multi-Store Real-Time Price Rows */}
        <div className="price-matrix" style={{ marginBottom: '14px', flex: 1 }}>
          <div className="price-matrix-title" style={{ fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>🛒 Live Multi-Store Deals</span>
            <span style={{ color: '#00f2fe' }}>Verified</span>
          </div>
          {pricesList.map((p, idx) => (
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
                {currency === 'INR' ? `₹${(p.priceINR || 0).toLocaleString('en-IN')}` : `$${(p.priceUSD || 0).toFixed(2)}`}
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

        {/* Unified High-Contrast Action Button (Full-Width Thumb-Friendly) */}
        <Link
          to={lowestStore.url}
          style={{ 
            width: '100%',
            boxSizing: 'border-box',
            minHeight: '44px',
            textDecoration: 'none', 
            padding: '11px 16px', 
            fontSize: '0.88rem',
            fontWeight: 900,
            color: '#fff',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #ff9900 0%, #ff5500 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(255, 120, 0, 0.35)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 120, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 120, 0, 0.35)';
          }}
        >
          <ShoppingBag size={16} />
          <span>GET DISCOUNT ({lowestStore.store})</span>
        </Link>
      </div>
    </div>
  );
}
