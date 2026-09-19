import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TAXONOMY } from '../data/vloggingProducts';
import { Mic, Camera, Smartphone, Sliders, Sparkles, Package, ShoppingBag, Home, ChevronDown, ArrowRight } from 'lucide-react';

const ICON_MAP = {
  'audio-microphones': Mic,
  'cameras-recorders': Camera,
  'smartphone-rigs': Smartphone,
  'gimbals-tripods': Sliders,
  'creator-lighting': Sparkles,
  'creator-tech': Package
};

export default function CategoryNavBar() {
  const [hoveredCat, setHoveredCat] = useState(null);

  return (
    <nav className="category-subnav glass-panel" style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '6px 16px',
      position: 'sticky',
      top: '102px',
      zIndex: 90,
      backdropFilter: 'blur(16px)',
      background: 'rgba(7, 10, 24, 0.96)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
    }}>
      <div 
        className="no-scrollbar"
        style={{
          maxWidth: '1280px',
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
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            transition: 'all 0.2s ease'
          }}
        >
          <Home size={14} color="#ff9900" /> Home
        </NavLink>

        {/* Shop All Gear */}
        <NavLink
          to="/shop"
          className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            transition: 'all 0.2s ease'
          }}
        >
          <ShoppingBag size={14} color="#00f2fe" /> Shop All Gear
        </NavLink>

        {/* Smartphone Vlogging Guide with Quick Dropdown */}
        <div 
          style={{ position: 'relative' }}
          onMouseEnter={() => setHoveredCat('smartphones')}
          onMouseLeave={() => setHoveredCat(null)}
        >
          <NavLink
            to="/smartphones"
            className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            <Smartphone size={14} color="#00e676" />
            <span>Vlogging Smartphones</span>
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
                minWidth: '220px',
                borderRadius: '12px',
                background: '#090d22',
                border: '1px solid rgba(0, 230, 118, 0.3)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.85)',
                zIndex: 200,
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              <Link
                to="/smartphones"
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
                to="/smartphones"
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
                to="/smartphones"
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

        {/* Categories with Fast-Jump Sub-Category Dropdowns */}
        {TAXONOMY.map(cat => {
          const IconComponent = ICON_MAP[cat.id] || Sparkles;
          const isHovered = hoveredCat === cat.id;

          return (
            <div 
              key={cat.id}
              style={{ position: 'relative' }}
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
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <IconComponent size={14} />
                <span>{cat.name}</span>
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
                    minWidth: '230px',
                    borderRadius: '12px',
                    background: '#090d22',
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.85)',
                    zIndex: 200,
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
      </div>
    </nav>
  );
}
