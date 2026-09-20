import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { TAXONOMY } from '../data/vloggingProducts';
import { 
  Mic, Camera, Smartphone, Sliders, Sparkles, Package, ShoppingBag, 
  Home, ChevronDown, ArrowRight, BookOpen, ArrowLeftRight, X
} from 'lucide-react';

const ICON_MAP = {
  'audio-microphones': Mic,
  'cameras-recorders': Camera,
  'smartphone-rigs': Smartphone,
  'gimbals-tripods': Sliders,
  'creator-lighting': Sparkles,
  'creator-tech': Package
};

const SHORT_LABELS = {
  'audio-microphones': 'Mics',
  'cameras-recorders': 'Cameras',
  'smartphone-rigs': 'Rigs',
  'gimbals-tripods': 'Tripods',
  'creator-lighting': 'Lighting',
  'creator-tech': 'Tech'
};

export default function CategoryNavBar({ onOpenBuilder }) {
  const [hoveredCat, setHoveredCat] = useState(null);
  const [isMobileCatDropdownOpen, setIsMobileCatDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown on route change
  useEffect(() => {
    setIsMobileCatDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMobileCatDropdownOpen(false);
      }
    }
    if (isMobileCatDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isMobileCatDropdownOpen]);

  const isCategoryActive = location.pathname.startsWith('/category/') || location.pathname.startsWith('/compare');

  return (
    <nav 
      className="category-subnav" 
      ref={dropdownRef}
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(0, 242, 254, 0.12)',
        padding: '5px 16px',
        background: 'rgba(7, 10, 26, 0.98)',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35)',
        width: '100%',
        position: 'relative'
      }}
    >
      <div 
        className="category-subnav-desktop no-scrollbar category-subnav-inner"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          whiteSpace: 'nowrap',
          padding: '2px 4px'
        }}
      >
        {/* 1. Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 13px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            flexShrink: 0,
            transition: 'all 0.2s ease'
          }}
        >
          <Home size={14} color="#ff9900" /> 
          <span>Home</span>
        </NavLink>

        {/* 2. Shop All Gear */}
        <NavLink
          to="/shop"
          className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 13px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            flexShrink: 0,
            transition: 'all 0.2s ease'
          }}
        >
          <ShoppingBag size={14} color="#00f2fe" /> 
          <span className="nav-label-desktop">Shop All Gear</span>
          <span className="nav-label-mobile">Shop</span>
        </NavLink>

        {/* 3. Vlogging Smartphones Hub */}
        <div 
          style={{ position: 'relative', flexShrink: 0 }}
          onMouseEnter={() => setHoveredCat('smartphones')}
          onMouseLeave={() => setHoveredCat(null)}
        >
          <NavLink
            to="/vlogging-smartphones"
            className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 13px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              color: 'var(--text-secondary)',
              flexShrink: 0,
              transition: 'all 0.2s ease'
            }}
          >
            <Smartphone size={14} color="#00e676" />
            <span className="nav-label-desktop">Smartphones Hub</span>
            <span className="nav-label-mobile">Phones</span>
            <ChevronDown size={11} style={{ opacity: 0.6 }} />
          </NavLink>

          {hoveredCat === 'smartphones' && (
            <div 
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '4px',
                minWidth: '240px',
                borderRadius: '12px',
                background: '#090d22',
                border: '1px solid rgba(0, 230, 118, 0.3)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.85)',
                zIndex: 300,
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px'
              }}
            >
              <Link
                to="/vlogging-smartphones"
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 230, 118, 0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span>🏆 Top 5 Flagships Ranked</span>
                <ArrowRight size={12} color="#00e676" />
              </Link>
              <Link
                to="/vlogging-smartphones"
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                ⚡ Side-by-Side Spec Matrix
              </Link>
              <Link
                to="/vlogging-smartphones"
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                🔬 Lab Benchmark Scores
              </Link>
            </div>
          )}
        </div>

        {/* 4. Taxonomy Category Tabs with Fast-Jump Dropdowns */}
        {TAXONOMY.map(cat => {
          const IconComponent = ICON_MAP[cat.id] || Sparkles;
          const isHovered = hoveredCat === cat.id;
          const shortLabel = SHORT_LABELS[cat.id] || cat.name;

          return (
            <div 
              key={cat.id}
              style={{ position: 'relative', flexShrink: 0 }}
              onMouseEnter={() => setHoveredCat(cat.id)}
              onMouseLeave={() => setHoveredCat(null)}
            >
              <NavLink
                to={`/category/${cat.id}`}
                className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 13px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: 'var(--text-secondary)',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                <IconComponent size={14} />
                <span className="nav-label-desktop">{cat.name}</span>
                <span className="nav-label-mobile">{shortLabel}</span>
                {cat.subCategories && cat.subCategories.length > 0 && (
                  <ChevronDown size={11} style={{ opacity: 0.6 }} />
                )}
              </NavLink>

              {/* Quick Jump Dropdown Menu */}
              {isHovered && cat.subCategories && cat.subCategories.length > 0 && (
                <div 
                  className="glass-panel"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '4px',
                    minWidth: '240px',
                    borderRadius: '12px',
                    background: '#090d22',
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.85)',
                    zIndex: 300,
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <div style={{ padding: '4px 10px', fontSize: '0.7rem', color: '#00f2fe', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Quick Jump:
                  </div>
                  {cat.subCategories.map(sub => (
                    <Link
                      key={sub.id}
                      to={`/category/${cat.id}?sub=${sub.id}`}
                      style={{
                        padding: '7px 10px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 242, 254, 0.1)';
                        e.currentTarget.style.color = '#00f2fe';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      › {sub.name}
                    </Link>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '4px 0' }} />
                  <Link
                    to={`/category/${cat.id}`}
                    style={{
                      padding: '7px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: '#ff9900',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 153, 0, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span>View All {cat.name}</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          );
        })}

        {/* 5. Reviews & Blogs Tab */}
        <NavLink
          to="/blog"
          className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 13px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            color: '#00e676',
            flexShrink: 0,
            transition: 'all 0.2s ease'
          }}
        >
          <BookOpen size={14} color="#00e676" />
          <span className="nav-label-desktop">Reviews & Blogs</span>
          <span className="nav-label-mobile">Reviews</span>
          <span style={{
            background: 'rgba(0, 230, 118, 0.18)',
            color: '#00e676',
            border: '1px solid rgba(0, 230, 118, 0.35)',
            fontSize: '0.66rem',
            fontWeight: 800,
            padding: '1px 6px',
            borderRadius: '10px'
          }}>
            24
          </span>
        </NavLink>

        {/* 6. Comparisons Tab */}
        <NavLink
          to="/compare/digitek-dwm101-vs-boya-byv20"
          className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 13px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            flexShrink: 0,
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeftRight size={14} color="#f6d365" />
          <span className="nav-label-desktop">Comparisons</span>
          <span className="nav-label-mobile">Compare</span>
        </NavLink>

        {/* 7. Kit Builder Trigger Button */}
        {onOpenBuilder && (
          <button
            type="button"
            onClick={onOpenBuilder}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 13px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, rgba(255, 153, 0, 0.15), rgba(255, 87, 34, 0.15))',
              border: '1px solid rgba(255, 153, 0, 0.35)',
              color: '#ff9900',
              cursor: 'pointer',
              flexShrink: 0,
              marginLeft: 'auto',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 153, 0, 0.3), rgba(255, 87, 34, 0.3))';
              e.currentTarget.style.borderColor = '#ff9900';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 153, 0, 0.15), rgba(255, 87, 34, 0.15))';
              e.currentTarget.style.borderColor = 'rgba(255, 153, 0, 0.35)';
            }}
          >
            <Sparkles size={14} color="#ff9900" />
            <span className="nav-label-desktop">Kit Builder</span>
            <span className="nav-label-mobile">Builder</span>
          </button>
        )}
      </div>

      {/* ── MOBILE 5-ITEM ZERO-SCROLL SUBNAV BAR (≤ 768px: Fits 100% viewport width, zero horizontal scrolling) ── */}
      <div className="category-subnav-mobile">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `category-mobile-tab ${isActive ? 'active' : ''}`}
        >
          <Home size={15} color="#ff9900" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) => `category-mobile-tab ${isActive ? 'active' : ''}`}
        >
          <ShoppingBag size={15} color="#00f2fe" />
          <span>Shop</span>
        </NavLink>

        <NavLink
          to="/vlogging-smartphones"
          className={({ isActive }) => `category-mobile-tab ${isActive ? 'active' : ''}`}
        >
          <Smartphone size={15} color="#00e676" />
          <span>Phones</span>
        </NavLink>

        <NavLink
          to="/blog"
          className={({ isActive }) => `category-mobile-tab ${isActive ? 'active' : ''}`}
        >
          <BookOpen size={15} color="#4facfe" />
          <span>Reviews</span>
        </NavLink>

        <button
          type="button"
          className={`category-mobile-tab ${isCategoryActive || isMobileCatDropdownOpen ? 'active' : ''}`}
          onClick={() => setIsMobileCatDropdownOpen(!isMobileCatDropdownOpen)}
          aria-label="Toggle All Categories Menu"
        >
          <Sparkles size={15} color={isCategoryActive || isMobileCatDropdownOpen ? '#00f2fe' : 'var(--text-secondary)'} />
          <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            Categories
            <ChevronDown size={10} style={{ transform: isMobileCatDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
          </span>
        </button>
      </div>

      {/* Streamlined Categories Popover Panel */}
      {isMobileCatDropdownOpen && (
        <div 
          className="glass-panel mobile-categories-popover"
          style={{
            position: 'absolute',
            top: '100%',
            left: '8px',
            right: '8px',
            marginTop: '6px',
            borderRadius: '16px',
            background: 'rgba(8, 12, 30, 0.98)',
            border: '1px solid rgba(0, 242, 254, 0.35)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.85)',
            padding: '16px',
            zIndex: 1500,
            maxHeight: '75vh',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#00f2fe" /> All Categories & Tools
            </div>
            <button
              type="button"
              onClick={() => setIsMobileCatDropdownOpen(false)}
              aria-label="Close categories menu"
              style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
            <Link
              to="/vlogging-smartphones"
              onClick={() => setIsMobileCatDropdownOpen(false)}
              style={{ padding: '9px 12px', borderRadius: '10px', background: 'rgba(0, 230, 118, 0.08)', border: '1px solid rgba(0, 230, 118, 0.25)', textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Smartphone size={16} color="#00e676" />
              <div>
                <div style={{ color: '#00e676', fontWeight: 800, fontSize: '0.8rem' }}>Smartphones</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Top 5 Ranked</div>
              </div>
            </Link>

            <Link
              to="/shop"
              onClick={() => setIsMobileCatDropdownOpen(false)}
              style={{ padding: '9px 12px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.25)', textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ShoppingBag size={16} color="#00f2fe" />
              <div>
                <div style={{ color: '#00f2fe', fontWeight: 800, fontSize: '0.8rem' }}>Full Catalog</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Shop All 70+ Gear</div>
              </div>
            </Link>
          </div>

          {/* All 6 Categories with Direct Sub-Category Jump Tags */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {TAXONOMY.map(cat => {
              const IconComponent = ICON_MAP[cat.id] || Sparkles;
              return (
                <div 
                  key={cat.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)'
                  }}
                >
                  <Link
                    to={`/category/${cat.id}`}
                    onClick={() => setIsMobileCatDropdownOpen(false)}
                    style={{
                      textDecoration: 'none',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: cat.subCategories?.length ? '8px' : '0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.82rem' }}>
                      <IconComponent size={15} color="#00f2fe" />
                      <span>{cat.name}</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#00f2fe', fontWeight: 700 }}>
                      All →
                    </span>
                  </Link>

                  {/* Subcategories Clean Wrapping Chips */}
                  {cat.subCategories && cat.subCategories.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {cat.subCategories.map(sub => (
                        <Link
                          key={sub.id}
                          to={`/category/${cat.id}?sub=${sub.id}`}
                          onClick={() => setIsMobileCatDropdownOpen(false)}
                          style={{
                            fontSize: '0.72rem',
                            padding: '3px 9px',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to="/blog"
              onClick={() => setIsMobileCatDropdownOpen(false)}
              style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', textDecoration: 'none', color: '#fff', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <BookOpen size={14} color="#00f2fe" /> Reviews & Buying Guides
            </Link>
            {onOpenBuilder && (
              <button
                type="button"
                onClick={() => { setIsMobileCatDropdownOpen(false); onOpenBuilder(); }}
                style={{ padding: '9px 12px', borderRadius: '8px', background: 'rgba(255, 153, 0, 0.15)', border: '1px solid rgba(255, 153, 0, 0.35)', color: '#ff9900', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Sparkles size={14} /> Kit Builder
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
