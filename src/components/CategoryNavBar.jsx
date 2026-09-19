import React from 'react';
import { NavLink } from 'react-router-dom';
import { TAXONOMY } from '../data/vloggingProducts';
import { Mic, Camera, Smartphone, Sliders, Sparkles, Package, ShoppingBag, Home } from 'lucide-react';

const ICON_MAP = {
  'audio-microphones': Mic,
  'cameras-recorders': Camera,
  'smartphone-rigs': Smartphone,
  'gimbals-tripods': Sliders,
  'creator-lighting': Sparkles,
  'creator-tech': Package
};

export default function CategoryNavBar() {
  return (
    <nav className="category-subnav glass-panel" style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '6px 16px',
      position: 'sticky',
      top: '90px',
      zIndex: 90,
      backdropFilter: 'blur(16px)',
      background: 'rgba(7, 10, 24, 0.95)'
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
          whiteSpace: 'nowrap',
          padding: '2px 0'
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

        {/* Smartphone Vlogging Guide */}
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
          <Smartphone size={14} color="#00e676" /> Vlogging Smartphones
        </NavLink>

        {/* Clean Category Navigation Pills (Subcategories live on their respective pages) */}
        {TAXONOMY.map(cat => {
          const IconComponent = ICON_MAP[cat.id] || Sparkles;

          return (
            <NavLink
              key={cat.id}
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
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
