import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { useEcommerce } from '../context/EcommerceContext';
import { 
  ShoppingBag, Flame, ArrowRight, Star, ExternalLink, 
  Sparkles, CheckCircle2, Heart, ArrowLeftRight 
} from 'lucide-react';

const TABS = [
  { id: 'top-deals', label: '🔥 Top Deals', filter: (p) => p.discountPercent >= 40, viewAllUrl: '/shop?discount=40', viewAllText: 'View All Discount Deals' },
  { id: 'digitek', label: 'Digitek 🇮🇳', filter: (p) => p.brand.toLowerCase() === 'digitek', viewAllUrl: '/shop?brand=Digitek', viewAllText: 'View All Digitek Products' },
  { id: 'boya', label: 'Boya', filter: (p) => p.brand.toLowerCase() === 'boya', viewAllUrl: '/shop?brand=Boya', viewAllText: 'View All Boya Microphones' },
  { id: 'dji', label: 'DJI Pro', filter: (p) => p.brand.toLowerCase() === 'dji', viewAllUrl: '/shop?brand=DJI', viewAllText: 'View All DJI Gear' },
  { id: 'grenaro', label: 'Grenaro 🇮🇳', filter: (p) => p.brand.toLowerCase() === 'grenaro', viewAllUrl: '/shop?brand=Grenaro', viewAllText: 'View All Grenaro Products' },
  { id: 'cameras', label: '4K Cameras', filter: (p) => p.category === 'cameras-recorders', viewAllUrl: '/category/cameras-recorders', viewAllText: 'View All Cameras & Recorders' },
  { id: 'lighting', label: 'Studio Lighting', filter: (p) => p.category === 'creator-lighting', viewAllUrl: '/category/creator-lighting', viewAllText: 'View All Lighting Gear' }
];

export default function FeaturedProductsTabs() {
  const [activeTabId, setActiveTabId] = useState('top-deals');
  const { formatPrice, wishlist, toggleWishlist, compareList, toggleCompare } = useEcommerce();

  const activeTab = TABS.find(t => t.id === activeTabId) || TABS[0];
  const matchingProducts = VLOGGING_PRODUCTS.filter(activeTab.filter).slice(0, 4);

  return (
    <section style={{ margin: '40px 0' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff9900', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
            <Sparkles size={15} /> MicPrice Style Featured Showcase
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0 }}>
            Featured Creator Gear & Daily Deals
          </h2>
        </div>
        <Link 
          to={activeTab.viewAllUrl} 
          style={{ 
            color: '#00f2fe', 
            fontWeight: 700, 
            fontSize: '0.88rem', 
            textDecoration: 'none', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '4px' 
          }}
        >
          <span>{activeTab.viewAllText}</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* Clean Brand / Category Filter Tabs (Responsive Wrapping - Fits Mobile Screens 100%) */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '8px', 
          paddingBottom: '12px', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '24px',
          width: '100%'
        }}
      >
        {TABS.map(tab => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              style={{
                padding: '7px 15px',
                borderRadius: '20px',
                background: isActive ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'rgba(255, 255, 255, 0.04)',
                color: isActive ? '#000' : 'var(--text-secondary)',
                border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4 Curated Showcase Cards (Clean Horizontal Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {matchingProducts.map(product => {
          const isWishlisted = wishlist.includes(product.id);
          const isCompared = compareList.includes(product.id);
          const primaryPrice = product.prices[0];

          return (
            <div 
              key={product.id}
              className="glass-panel"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(10, 13, 36, 0.6)'
              }}
            >
              {/* Card Image Area */}
              <div style={{ height: '190px', position: 'relative', overflow: 'hidden', background: '#0a0d24' }}>
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                  />
                </Link>

                {/* Discount Badge */}
                {product.discountPercent > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: '#ff2d55',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 900
                  }}>
                    - {product.discountPercent}% OFF
                  </div>
                )}

                {/* Quick Action Heart */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: 'none',
                    color: isWishlisted ? '#ff2d55' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Heart size={15} fill={isWishlisted ? '#ff2d55' : 'none'} />
                </button>
              </div>

              {/* Card Content Area */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    <span style={{ color: '#00f2fe', fontWeight: 700 }}>{product.brand}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f6d365' }}>
                      <Star size={12} fill="#f6d365" /> {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.35, marginBottom: '10px', height: '38px', overflow: 'hidden' }}>
                    <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {product.title}
                    </Link>
                  </h3>

                  {/* Price Block with M.R.P. Strikethrough */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00f2fe' }}>
                      {formatPrice(product.priceINR, product.priceUSD)}
                    </span>
                    {product.mrpINR && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ₹{product.mrpINR.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {/* MicPrice Style GET DISCOUNT Action Button */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    to={primaryPrice.url}
                    rel="nofollow sponsored"
                    className="cta-button"
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      background: 'linear-gradient(135deg, #ff9900, #ff5500)',
                      boxShadow: 'none'
                    }}
                  >
                    <ShoppingBag size={14} />
                    <span>GET DISCOUNT</span>
                  </Link>

                  <Link
                    to={`/product/${product.id}`}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                    title="View Lab Review"
                  >
                    Specs
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Direct Link to Sub-Page */}
      <div style={{ textAlign: 'center' }}>
        <Link
          to={activeTab.viewAllUrl}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            borderRadius: '25px',
            background: 'rgba(0, 242, 254, 0.08)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            color: '#00f2fe',
            fontWeight: 800,
            fontSize: '0.9rem',
            textDecoration: 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <span>{activeTab.viewAllText}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
