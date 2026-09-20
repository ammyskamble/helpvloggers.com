import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Camera, Search, Heart, MapPin, ShoppingBag, ArrowRight, X, Globe, Layers, ChevronDown, Smartphone, Mic, Sliders, Zap, Sparkles, BookOpen, Menu } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';
import { TAXONOMY, VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import CategoryNavBar from './CategoryNavBar';

const CATEGORY_ITEMS = [
  {
    id: "audio-microphones",
    name: "Audio & Microphones",
    icon: Mic,
    accent: "#00f2fe",
    desc: "Wireless lapels, shotgun & studio USB mics",
    subs: [
      { id: "wireless-mics", name: "Wireless Mics" },
      { id: "shotgun-mics", name: "Shotgun Mics" },
      { id: "podcast-studio-mics", name: "Studio Mics" }
    ]
  },
  {
    id: "cameras-recorders",
    name: "Cameras & 4K Video",
    icon: Camera,
    accent: "#f43f5e",
    desc: "4K mirrorless, pocket gimbals & action cams",
    subs: [
      { id: "mirrorless-vlog-cams", name: "4K Cameras" },
      { id: "pocket-gimbal-cams", name: "Pocket Cams" },
      { id: "action-360-cams", name: "Action Cams" }
    ]
  },
  {
    id: "smartphone-rigs",
    name: "Smartphone Rigs & Cages",
    icon: Smartphone,
    accent: "#00e676",
    desc: "Dual handles, metal cages & cold shoe clamps",
    subs: [
      { id: "phone-cages", name: "Metal Cages" },
      { id: "grip-handles", name: "Dual Grips" },
      { id: "cold-shoe-mounts", name: "Cold Shoes" }
    ]
  },
  {
    id: "gimbals-tripods",
    name: "Gimbals & Tripods",
    icon: Sliders,
    accent: "#ff9900",
    desc: "3-axis motorized stabilizers & fluid heads",
    subs: [
      { id: "phone-gimbals", name: "Phone Gimbals" },
      { id: "camera-tripods", name: "Fluid Tripods" },
      { id: "flexible-tripods", name: "GorillaPods" }
    ]
  },
  {
    id: "creator-lighting",
    name: "Lighting & Power",
    icon: Zap,
    accent: "#f6d365",
    desc: "Bi-color ring lights, pocket RGBs & V30 SD cards",
    subs: [
      { id: "ring-lights", name: "Ring Lights" },
      { id: "rgb-pocket-lights", name: "RGB Lights" },
      { id: "high-speed-sd-cards", name: "V30 Cards" }
    ]
  }
];

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
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);
  const location = useLocation();
  const searchWrapRef = useRef(null);
  const categoriesMenuRef = useRef(null);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedCat(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close search suggestions and categories menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(e.target)) {
        setIsCategoriesOpen(false);
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
    <>
      {/* 1. Top Slimmer, Dismissible Announcement Bar (Slides away naturally on scroll) */}
      {isAnnouncementVisible && (
        <div className="announcement-bar-top" style={{
          background: 'linear-gradient(90deg, #ff9900 0%, #ff5722 50%, #00f2fe 100%)',
          color: '#050714',
          fontSize: '0.74rem',
          fontWeight: 800,
          padding: '4px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          transition: 'all 0.25s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="announcement-bar-text-full">🇮🇳 <strong>Creator Fest:</strong> Up to 65% OFF on Digitek, Boya & LED Lighting</span>
            <span className="announcement-bar-text-mobile">🇮🇳 <strong>Creator Fest:</strong> Up to 65% OFF</span>
            <span style={{ background: '#050714', color: '#ff9900', padding: '1px 5px', borderRadius: '4px', fontSize: '0.65rem' }}>
              DEALS LIVE
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Region / Market Switcher (Desktop only in top banner, available in mobile menu) */}
            <div className="announcement-market-switcher" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(5, 7, 20, 0.85)', borderRadius: '16px', padding: '1px' }}>
                <button
                  onClick={() => setMarket('india')}
                  style={{
                    background: market === 'india' ? '#00f2fe' : 'transparent',
                    color: market === 'india' ? '#050714' : '#fff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '3px 10px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  🇮🇳 India (₹)
                </button>
                <button
                  onClick={() => setMarket('global')}
                  style={{
                    background: market === 'global' ? '#ff9900' : 'transparent',
                    color: market === 'global' ? '#050714' : '#fff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '3px 10px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  🌐 Global ($)
                </button>
              </div>

              {/* Pincode Selector (When India is active) */}
              {market === 'india' && (
                <div 
                  className="announcement-pincode"
                  onClick={() => {
                    const code = prompt('Enter delivery pincode (e.g. 110001 Delhi, 560001 Bengaluru, 400001 Mumbai):', '400001');
                    if (code) setSelectedPincode(code);
                  }}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', textDecoration: 'underline', color: '#050714', fontSize: '0.72rem' }}
                >
                  <MapPin size={11} /> {selectedPincode}
                </div>
              )}
            </div>

            {/* Dismiss Announcement Button */}
            <button
              onClick={() => setIsAnnouncementVisible(false)}
              aria-label="Dismiss Announcement"
              title="Dismiss announcement bar"
              style={{
                background: 'rgba(5, 7, 20, 0.25)',
                border: 'none',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#050714',
                padding: 0,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(5, 7, 20, 0.45)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(5, 7, 20, 0.25)'}
            >
              <X size={11} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Sticky Header (No backdropFilter on outer container to prevent fixed-child containing block trap!) */}
      <header className="sticky-header-container" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="header-bar glass-panel" style={{ borderRadius: 0, padding: '10px 20px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <Link to="/" className="logo-brand" style={{ textDecoration: 'none' }}>
          <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #ff9900 0%, #00f2fe 100%)' }}>
            <Camera size={22} color="#050714" />
          </div>
          <div>
            <span style={{ letterSpacing: '-0.5px', fontSize: '1.25rem', fontWeight: 900 }}>HelpVloggers</span>
            <span className="logo-sub" style={{ color: '#ff9900', fontSize: '0.7rem', display: 'block', fontWeight: 800, letterSpacing: '0.5px' }}>
              {market === 'india' ? '🇮🇳 INDIA CREATOR HUB' : '🌐 GLOBAL CREATOR HUB'}
            </span>
          </div>
        </Link>



        {/* E-Commerce Search Bar with Centered Modern Layout & Instant Suggestions */}
        <div ref={searchWrapRef} className="search-box-wrap" style={{ position: 'relative', maxWidth: '680px', flex: 1, margin: '0 24px' }}>
          <form 
            onSubmit={handleSearchSubmit} 
            className="header-search-form"
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              margin: 0,
              background: 'rgba(11, 17, 38, 0.95)',
              border: isDropdownOpen ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              overflow: 'hidden',
              boxShadow: isDropdownOpen 
                ? '0 0 20px rgba(0, 242, 254, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.1)' 
                : '0 2px 10px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.25s ease'
            }}
          >
            {/* Category Filter Select */}
            <select
              className="search-cat-select"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#00f2fe',
                border: 'none',
                borderRight: '1px solid rgba(255, 255, 255, 0.14)',
                padding: '12px 16px',
                fontSize: '0.82rem',
                fontWeight: 800,
                outline: 'none',
                cursor: 'pointer',
                maxWidth: '150px'
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
              className="header-search-input"
              placeholder={market === 'india' 
                ? "Search Indian creator gear (Digitek mic, Boya, Tygot tripod, Ring light)..."
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
                padding: '12px 18px',
                fontSize: '0.92rem',
                outline: 'none',
                minWidth: 0,
                width: '100%'
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
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 10px' }}
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}

            {/* Search Submit Button with High Contrast Gradient */}
            <button 
              type="submit" 
              className="search-submit-btn"
              style={{ 
                background: 'linear-gradient(135deg, #ff9900 0%, #ff5722 100%)', 
                color: '#fff', 
                border: 'none', 
                padding: '12px 24px', 
                fontWeight: 900,
                fontSize: '0.85rem',
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center',
                gap: '8px',
                height: '100%',
                boxShadow: '0 2px 12px rgba(255, 120, 0, 0.35)',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.95';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 120, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(255, 120, 0, 0.35)';
              }}
            >
              <Search size={16} />
              <span className="search-btn-label">Search</span>
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

        {/* Header Right Actions — desktop only */}
        <div className="header-right-desktop" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Wishlist */}
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
          </div>

          {/* Reviews & Blog Hub Link */}
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid rgba(0, 242, 254, 0.28)',
              color: '#00f2fe',
              fontSize: '0.82rem',
              fontWeight: 800,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <BookOpen size={15} color="#00f2fe" />
            <span>Reviews</span>
          </Link>

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
            <ShoppingBag size={15} color="#ff9900" />
            <span>Catalog</span>
          </Link>
        </div>

        {/* Mobile Right Controls: Wishlist + Hamburger */}
        <div className="mobile-header-actions" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
          <div 
            onClick={() => alert(`Your Wishlist contains ${wishlist.length} creator products.`)}
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '38px', 
              height: '38px', 
              borderRadius: '10px', 
              background: 'rgba(255, 255, 255, 0.06)', 
              border: '1px solid rgba(255, 255, 255, 0.1)' 
            }}
          >
            <div style={{ position: 'relative', display: 'flex' }}>
              <Heart size={18} color={wishlist.length > 0 ? '#ff0844' : '#cbd5e1'} fill={wishlist.length > 0 ? '#ff0844' : 'none'} />
              {wishlist.length > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#ff0844', color: '#fff', fontSize: '0.62rem', borderRadius: '10px', padding: '0 4px', fontWeight: 900 }}>
                  {wishlist.length}
                </span>
              )}
            </div>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              background: isMobileMenuOpen ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.07)',
              border: isMobileMenuOpen ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '10px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isMobileMenuOpen ? '#00f2fe' : '#ffffff',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease'
            }}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* 3. Sticky Dedicated Category & Navigation Tabs Bar */}
      <CategoryNavBar 
        onOpenBuilder={onOpenBuilder} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </header>

    {/* ── UNIFIED FULL-SCREEN SOLID MOBILE NAV DRAWER (ATTACHED DIRECTLY TO BODY VIA PORTAL) ── */}
    {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
      <div 
        className="mobile-nav-portal-overlay" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 999999,
          background: 'rgba(0, 0, 0, 0.78)',
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)'
        }}
      >
        {/* Backdrop click to close */}
        <div 
          style={{ position: 'absolute', inset: 0 }} 
          onClick={() => setIsMobileMenuOpen(false)} 
          aria-label="Close menu backdrop"
        />

        {/* Slide-out Drawer Panel with 100% Solid Dark Slate Background (Zero Bleed-Through) */}
        <div 
          className="mobile-nav-drawer-content"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            height: '100%',
            background: '#070a1e',
            borderLeft: '1px solid rgba(0, 242, 254, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000000,
            boxShadow: '-12px 0 40px rgba(0, 0, 0, 0.95)',
            overflowY: 'auto'
          }}
        >
          {/* Drawer Header with Brand, Market Toggle & Close Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: '#0a0e29',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #ff9900 0%, #00f2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Camera size={18} color="#050714" />
              </div>
              <span style={{ fontWeight: 900, fontSize: '1.1rem', color: '#fff' }}>HelpVloggers</span>
            </Link>
            
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Market & Currency Selector */}
          <div style={{ padding: '14px 18px', background: 'rgba(0, 242, 254, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
              Select Creator Market
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setMarket('india')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: market === 'india' ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: market === 'india' ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'rgba(255, 255, 255, 0.05)',
                  color: market === 'india' ? '#050714' : '#fff',
                  transition: 'all 0.2s ease'
                }}
              >
                🇮🇳 India (₹ INR)
              </button>
              <button
                onClick={() => setMarket('global')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: market === 'global' ? '1px solid #ff9900' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: market === 'global' ? 'linear-gradient(135deg, #ff9900, #ff5722)' : 'rgba(255, 255, 255, 0.05)',
                  color: market === 'global' ? '#050714' : '#fff',
                  transition: 'all 0.2s ease'
                }}
              >
                🌐 Global ($ USD)
              </button>
            </div>
          </div>

          {/* Quick Navigation Hub Links */}
          <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
              Quick Links
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '9px 12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', textDecoration: 'none', color: '#fff', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                🏠 Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '9px 12px', borderRadius: '8px', background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.25)', textDecoration: 'none', color: '#00f2fe', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                🛍️ Shop (70+)
              </Link>
              <Link
                to="/vlogging-smartphones"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '9px 12px', borderRadius: '8px', background: 'rgba(0, 230, 118, 0.08)', border: '1px solid rgba(0, 230, 118, 0.25)', textDecoration: 'none', color: '#00e676', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                📱 Phones #1–#5
              </Link>
              <Link
                to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '9px 12px', borderRadius: '8px', background: 'rgba(255, 153, 0, 0.08)', border: '1px solid rgba(255, 153, 0, 0.25)', textDecoration: 'none', color: '#ff9900', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                📖 24 Reviews
              </Link>
            </div>
          </div>

          {/* Interactive Kit Builder */}
          {onOpenBuilder && (
            <div style={{ padding: '10px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                type="button"
                onClick={() => { setIsMobileMenuOpen(false); onOpenBuilder(); }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(255, 153, 0, 0.2), rgba(255, 87, 34, 0.2))',
                  border: '1px solid rgba(255, 153, 0, 0.4)',
                  color: '#ff9900',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Sparkles size={16} /> Interactive Kit Builder Tool
              </button>
            </div>
          )}

          {/* Category & Subcategory Accordion */}
          <div style={{ padding: '14px 18px', flex: 1 }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px' }}>
              All Categories & Subcategories
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {TAXONOMY.map(cat => {
                const isExpanded = expandedCat === cat.id;
                const Icon = cat.id === 'audio-microphones' ? Mic : cat.id === 'cameras-recorders' ? Camera : cat.id === 'smartphone-rigs' ? Smartphone : cat.id === 'gimbals-tripods' ? Sliders : cat.id === 'creator-lighting' ? Zap : ShoppingBag;

                return (
                  <div
                    key={cat.id}
                    style={{
                      borderRadius: '10px',
                      background: isExpanded ? 'rgba(0, 242, 254, 0.06)' : 'rgba(255, 255, 255, 0.03)',
                      border: isExpanded ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid rgba(255, 255, 255, 0.07)',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {/* Accordion Header Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px' }}>
                      <Link
                        to={`/category/${cat.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          textDecoration: 'none',
                          color: isExpanded ? '#00f2fe' : '#fff',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          flex: 1
                        }}
                      >
                        <Icon size={16} color={isExpanded ? '#00f2fe' : '#94a3b8'} />
                        <span>{cat.name}</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                        aria-label={`Toggle ${cat.name} subcategories`}
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: 'none',
                          borderRadius: '6px',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isExpanded ? '#00f2fe' : '#94a3b8',
                          cursor: 'pointer'
                        }}
                      >
                        <ChevronDown size={14} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                      </button>
                    </div>

                    {/* Subcategories Accordion Drawer */}
                    {isExpanded && cat.subCategories && (
                      <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '8px' }}>
                        <Link
                          to={`/category/${cat.id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            color: '#00f2fe',
                            textDecoration: 'none',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            background: 'rgba(0, 242, 254, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>Browse All {cat.name}</span>
                          <ArrowRight size={12} />
                        </Link>

                        {cat.subCategories.map(sub => (
                          <Link
                            key={sub.id}
                            to={`/category/${cat.id}?sub=${sub.id}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                              fontSize: '0.78rem',
                              color: 'var(--text-secondary)',
                              textDecoration: 'none',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
                          >
                            <span style={{ color: '#00f2fe', fontWeight: 800 }}>•</span>
                            <span>{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>,
      document.body
    )}
  </>
  );
}
