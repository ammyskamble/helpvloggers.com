import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
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

  return (
    <nav 
      className="category-subnav" 
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(0, 242, 254, 0.12)',
        padding: '5px 16px',
        background: 'rgba(7, 10, 26, 0.98)',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35)',
        width: '100%'
      }}
    >
      <div 
        className="no-scrollbar category-subnav-inner"
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

        {/* Categories Quick Dropdown Trigger Pill */}
        <button
          type="button"
          className="subnav-pill subnav-categories-dropdown-btn"
          onClick={() => setIsMobileCatDropdownOpen(!isMobileCatDropdownOpen)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 800,
            background: isMobileCatDropdownOpen ? 'rgba(0, 242, 254, 0.25)' : 'rgba(0, 242, 254, 0.1)',
            border: '1px solid rgba(0, 242, 254, 0.35)',
            color: '#00f2fe',
            flexShrink: 0,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <Sparkles size={13} color="#00f2fe" />
          <span>Categories ▾</span>
        </button>

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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '14px' }}>
            <Link
              to="/vlogging-smartphones"
              onClick={() => setIsMobileCatDropdownOpen(false)}
              style={{ padding: '10px', borderRadius: '10px', background: 'rgba(0, 230, 118, 0.08)', border: '1px solid rgba(0, 230, 118, 0.25)', textDecoration: 'none', color: '#fff', display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00e676', fontWeight: 800, fontSize: '0.8rem' }}>
                <Smartphone size={14} /> Smartphones
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Top 5 Ranked & Specs</span>
            </Link>

            <Link
              to="/shop"
              onClick={() => setIsMobileCatDropdownOpen(false)}
              style={{ padding: '10px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.25)', textDecoration: 'none', color: '#fff', display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00f2fe', fontWeight: 800, fontSize: '0.8rem' }}>
                <ShoppingBag size={14} /> Full Catalog
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Shop 70+ Creator Gear</span>
            </Link>

            {TAXONOMY.map(cat => {
              const IconComponent = ICON_MAP[cat.id] || Sparkles;
              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  onClick={() => setIsMobileCatDropdownOpen(false)}
                  style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', textDecoration: 'none', color: '#fff', display: 'flex', flexDirection: 'column', gap: '4px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontWeight: 800, fontSize: '0.8rem' }}>
                    <IconComponent size={14} color="#00f2fe" /> {SHORT_LABELS[cat.id] || cat.name}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{cat.name}</span>
                </Link>
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
