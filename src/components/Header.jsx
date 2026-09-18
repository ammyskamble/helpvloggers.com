import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Search, Heart, MapPin, ShoppingBag, ArrowRight, X, Globe } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';
import { TAXONOMY, VLOGGING_PRODUCTS } from '../data/vloggingProducts';

export default function Header({ searchQuery, setSearchQuery, onOpenBuilder }) {
  const navigate = useNavigate();
  const { 
    market, setMarket, 
    currency, toggleCurrency, 
    wishlist, 
    selectedPincode, setSelectedPincode, 
    searchCategory, setSearchCategory,
    formatPrice,
    searchQuery: contextQuery,
    setSearchQuery: contextSetQuery
  } = useEcommerce();

  const query = searchQuery !== undefined && searchQuery !== null ? searchQuery : (contextQuery || '');
  const setQuery = setSearchQuery || contextSetQuery;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchWrapRef = useRef(null);

  // Close search suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter instant search suggestions (up to 5 items)
  const matchingSuggestions = query.trim() ? VLOGGING_PRODUCTS.filter(p => {
    const q = query.toLowerCase();
    const matchesText = p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.targetKeyword.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q);
    const matchesCat = searchCategory === 'all' || p.category === searchCategory;
    const matchesMarket = market === 'all' || p.market === market || !p.market;
    return matchesText && matchesCat && matchesMarket;
  }).slice(0, 5) : [];

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsDropdownOpen(false);
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query)}&cat=${searchCategory}&market=${market}`);
    } else {
      navigate(`/shop?market=${market}`);
    }
  };

  const handleSelectSuggestion = (productId) => {
    setIsDropdownOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* 1. Top Announcement Bar with Clear India / Global Market Switcher */}
      <div style={{
        background: 'linear-gradient(90deg, #ff9900 0%, #ff5722 50%, #00f2fe 100%)',
        color: '#050714',
        fontSize: '0.78rem',
        fontWeight: 800,
        padding: '6px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🇮🇳 <strong>Great Indian Creator Fest:</strong> Up to 65% OFF on Digitek, Boya & Ring Lights</span>
          <span style={{ background: '#050714', color: '#ff9900', padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
            DEALS LIVE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Region / Market Switcher (India vs Global - No Conflict) */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(5, 7, 20, 0.85)', borderRadius: '20px', padding: '2px' }}>
            <button
              onClick={() => setMarket('india')}
              style={{
                background: market === 'india' ? '#00f2fe' : 'transparent',
                color: market === 'india' ? '#050714' : '#fff',
                border: 'none',
                borderRadius: '16px',
                padding: '4px 12px',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🇮🇳 India Market (₹ INR)
            </button>
            <button
              onClick={() => setMarket('global')}
              style={{
                background: market === 'global' ? '#ff9900' : 'transparent',
                color: market === 'global' ? '#050714' : '#fff',
                border: 'none',
                borderRadius: '16px',
                padding: '4px 12px',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🌐 Global Market ($ USD)
            </button>
          </div>

          {/* Pincode Selector (When India is active) */}
          {market === 'india' && (
            <div 
              onClick={() => {
                const code = prompt('Enter delivery pincode (e.g. 110001 Delhi, 560001 Bengaluru, 400001 Mumbai):', '400001');
                if (code) setSelectedPincode(code);
              }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'underline', color: '#050714' }}
            >
              <MapPin size={12} /> Deliver: {selectedPincode}
            </div>
          )}
        </div>
      </div>

      {/* 2. Main E-Commerce Brand & Search Bar */}
      <div className="header-bar glass-panel" style={{ borderRadius: 0, padding: '12px 24px' }}>
        <Link to="/" className="logo-brand" style={{ textDecoration: 'none' }}>
          <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #ff9900 0%, #00f2fe 100%)' }}>
            <Camera size={22} color="#050714" />
          </div>
          <div>
            <span style={{ letterSpacing: '-0.5px', fontSize: '1.25rem', fontWeight: 900 }}>HelpVloggers</span>
            <span style={{ color: '#ff9900', fontSize: '0.7rem', display: 'block', fontWeight: 800, letterSpacing: '0.5px' }}>
              {market === 'india' ? '🇮🇳 INDIA CREATOR HUB' : '🌐 GLOBAL CREATOR HUB'}
            </span>
          </div>
        </Link>

        {/* E-Commerce Search Bar with Instant Suggestions Dropdown (MicPrice / Amazon Unified Style) */}
        <div ref={searchWrapRef} style={{ position: 'relative', maxWidth: '640px', flex: 1, margin: '0 16px' }}>
          <form 
            onSubmit={handleSearchSubmit} 
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              margin: 0,
              background: 'rgba(15, 23, 42, 0.9)',
              border: isDropdownOpen ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: isDropdownOpen ? '0 0 15px rgba(0, 242, 254, 0.25)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {/* Category Filter Select */}
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#00f2fe',
                border: 'none',
                borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '10px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                outline: 'none',
                cursor: 'pointer',
                maxWidth: '145px'
              }}
            >
              <option value="all" style={{ background: '#0a0d24', color: '#fff' }}>All Categories</option>
              {TAXONOMY.map(cat => (
                <option key={cat.id} value={cat.id} style={{ background: '#0a0d24', color: '#fff' }}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Input */}
            <input
              type="text"
              placeholder={market === 'india' 
                ? "Search Indian gear (Digitek mic, Boya BY-M1, Tygot, Ring light)..."
                : "Search global gear (DJI Mic 2, Sony ZV-E10, SmallRig, Pocket 3)..."
              }
              value={query || ''}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#fff',
                padding: '10px 16px',
                fontSize: '0.88rem',
                outline: 'none',
                minWidth: '120px'
              }}
            />

            {/* Clear button */}
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setIsDropdownOpen(false);
                }}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 8px' }}
                title="Clear search"
              >
                <X size={15} />
              </button>
            )}

            {/* Search Submit Button with Icon and Text (MicPrice style!) */}
            <button 
              type="submit" 
              style={{ 
                background: 'linear-gradient(135deg, #ff9900 0%, #ff5722 100%)', 
                color: '#fff', 
                border: 'none', 
                padding: '10px 20px', 
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center',
                gap: '6px',
                height: '100%',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <Search size={15} />
              <span>Search</span>
            </button>
          </form>

          {/* Live Autocomplete Suggestions Dropdown (MicPrice / Amazon Style) */}
          {isDropdownOpen && query.trim() && (
            <div 
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '6px',
                borderRadius: '12px',
                background: '#090d22',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
                zIndex: 250,
                overflow: 'hidden'
              }}
            >
              {matchingSuggestions.length > 0 ? (
                <div>
                  <div style={{ padding: '8px 14px', fontSize: '0.72rem', color: 'var(--text-muted)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Matching Products ({matchingSuggestions.length})
                  </div>
                  {matchingSuggestions.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectSuggestion(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 242, 254, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: 40, height: 40, borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} 
                      />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          <span style={{ color: '#00f2fe' }}>{item.brand}</span> • {item.categoryName}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ color: '#00f2fe', fontWeight: 900, fontSize: '0.9rem' }}>
                          {formatPrice(item.priceINR, item.priceUSD)}
                        </div>
                        {item.discountPercent > 0 && (
                          <div style={{ color: '#ff2d55', fontSize: '0.7rem', fontWeight: 800 }}>
                            -{item.discountPercent}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div 
                    onClick={handleSearchSubmit}
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(0, 242, 254, 0.08)',
                      color: '#00f2fe',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      textAlign: 'center',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>View all matching results in Catalog</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No gear matches "{query}". Press Enter to search all.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Wishlist Link */}
          <div 
            onClick={() => alert(`Your Wishlist contains ${wishlist.length} creator products.`)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#fff' }}
          >
            <div style={{ position: 'relative' }}>
              <Heart size={20} color={wishlist.length > 0 ? '#ff0844' : '#94a3b8'} fill={wishlist.length > 0 ? '#ff0844' : 'none'} />
              {wishlist.length > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#ff0844', color: '#fff', fontSize: '0.65rem', borderRadius: '10px', padding: '1px 5px', fontWeight: 900 }}>
                  {wishlist.length}
                </span>
              )}
            </div>
            <span style={{ display: 'none', lg: 'inline' }}>Wishlist</span>
          </div>

          {/* Shop All Link */}
          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <ShoppingBag size={15} color="#00f2fe" />
            <span>Catalog</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
