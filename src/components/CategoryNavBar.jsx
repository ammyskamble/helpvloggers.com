import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TAXONOMY } from '../data/vloggingProducts';
import { Flame, Mic, Camera, Smartphone, Sliders, Sparkles, Package, ChevronDown, Layers, ShoppingBag, Home } from 'lucide-react';

const ICON_MAP = {
  'audio-microphones': Mic,
  'cameras-recorders': Camera,
  'smartphone-rigs': Smartphone,
  'gimbals-tripods': Sliders,
  'creator-lighting': Sparkles,
  'creator-tech': Package
};

export default function CategoryNavBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <nav className="category-subnav glass-panel" style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '4px 16px',
      position: 'sticky',
      top: '90px',
      zIndex: 90,
      backdropFilter: 'blur(16px)',
      background: 'rgba(7, 10, 24, 0.95)'
    }}>
      <div 
        className="no-scrollbar"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
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
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'var(--text-secondary)'
          }}
        >
          <Home size={14} color="#ff9900" /> Home
        </NavLink>

        {/* Shop All Gear Sub-Page */}
        <NavLink
          to="/shop"
          className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'var(--text-secondary)'
          }}
        >
          <ShoppingBag size={14} color="#00f2fe" /> Shop All Gear
        </NavLink>

        {/* Smartphone Vlogging Guide Sub-Page */}
        <NavLink
          to="/smartphones"
          className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'var(--text-secondary)'
          }}
        >
          <Smartphone size={14} color="#00e676" /> Best Vlogging Phones
        </NavLink>

        {/* 3-Tier Category Mega Menus */}
        {TAXONOMY.map(cat => {
          const IconComponent = ICON_MAP[cat.id] || Sparkles;
          const isDropdownOpen = activeDropdown === cat.id;

          return (
            <div 
              key={cat.id}
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown(cat.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink
                to={`/category/${cat.id}`}
                className={({ isActive }) => `subnav-pill ${isActive ? 'active' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                <IconComponent size={14} />
                <span>{cat.name}</span>
                <ChevronDown size={12} style={{ opacity: 0.6 }} />
              </NavLink>

              {/* Mega Dropdown Menu (Sub-Categories & Micro-Categories) */}
              {isDropdownOpen && (
                <div 
                  className="glass-panel"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    minWidth: '580px',
                    padding: '20px',
                    borderRadius: '14px',
                    background: '#090d20',
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
                    zIndex: 200,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '20px',
                    whiteSpace: 'normal'
                  }}
                >
                  {cat.subCategories.map(sub => (
                    <div key={sub.id}>
                      <Link 
                        to={`/category/${cat.id}?sub=${sub.id}`}
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          color: '#00f2fe',
                          textDecoration: 'none',
                          display: 'block',
                          marginBottom: '8px',
                          borderBottom: '1px solid rgba(0, 242, 254, 0.2)',
                          paddingBottom: '4px'
                        }}
                      >
                        📂 {sub.name}
                      </Link>

                      {/* Micro-Categories */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '8px' }}>
                        {sub.microCategories.map(micro => (
                          <Link
                            key={micro.id}
                            to={`/category/${cat.id}?sub=${sub.id}&micro=${micro.id}`}
                            style={{
                              fontSize: '0.78rem',
                              color: 'var(--text-secondary)',
                              textDecoration: 'none',
                              lineHeight: 1.3
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#ff9900'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                          >
                            › {micro.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
