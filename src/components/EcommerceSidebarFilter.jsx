import React from 'react';
import { Filter, Star, Check, RotateCcw } from 'lucide-react';

export default function EcommerceSidebarFilter({
  selectedBrand,
  setSelectedBrand,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedDiscount,
  setSelectedDiscount,
  minRating,
  setMinRating,
  selectedMarket = 'all',
  setSelectedMarket,
  onReset
}) {
  const markets = [
    { label: "All Creator Markets", value: "all" },
    { label: "🇮🇳 Indian Market (₹ INR)", value: "india" },
    { label: "🌐 Global Pro Market ($ USD)", value: "global" }
  ];

  const brands = [
    "Digitek", "Boya", "Grenaro", "Maono", "Tygot", "Osaka", "DJI", "Sony", "SmallRig", "Ulanzi", "SanDisk"
  ];

  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under ₹1,000 (Budget Starters)", value: "under-1000" },
    { label: "₹1,000 - ₹5,000 (Top Creators)", value: "1000-5000" },
    { label: "₹5,000 - ₹25,000 (Pro Mobile)", value: "5000-25000" },
    { label: "Above ₹25,000 (Studio & 4K Cams)", value: "above-25000" }
  ];

  const discounts = [
    { label: "All Discounts", value: 0 },
    { label: "50% or more (Mega Savings)", value: 50 },
    { label: "30% or more", value: 30 },
    { label: "10% or more", value: 10 }
  ];

  return (
    <aside 
      className="glass-panel"
      style={{
        borderRadius: '16px',
        padding: '22px',
        width: '100%',
        maxWidth: '280px',
        background: 'rgba(10, 15, 30, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        height: 'fit-content'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '0.95rem' }}>
          <Filter size={16} color="#00f2fe" /> Filters
        </div>
        <button 
          onClick={onReset}
          style={{ background: 'none', border: 'none', color: '#ff6b6b', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* 0. Market Facet (India vs Global - No Conflict) */}
      {setSelectedMarket && (
        <div style={{ marginBottom: '22px' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ff9900', textTransform: 'uppercase', marginBottom: '10px' }}>
            Market & Currency
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {markets.map(m => (
              <label 
                key={m.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  color: selectedMarket === m.value ? '#ff9900' : 'var(--text-secondary)',
                  fontWeight: selectedMarket === m.value ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="marketFacet"
                  checked={selectedMarket === m.value}
                  onChange={() => setSelectedMarket(m.value)}
                />
                {m.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 1. Price Range Facet */}
      <div style={{ marginBottom: '22px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00f2fe', textTransform: 'uppercase', marginBottom: '10px' }}>
          Price Range (₹ INR)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {priceRanges.map(pr => (
            <label 
              key={pr.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: selectedPriceRange === pr.value ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === pr.value}
                onChange={() => setSelectedPriceRange(pr.value)}
              />
              {pr.label}
            </label>
          ))}
        </div>
      </div>

      {/* 2. Brand Facet */}
      <div style={{ marginBottom: '22px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00f2fe', textTransform: 'uppercase', marginBottom: '10px' }}>
          Creator Brands
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: selectedBrand === 'all' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer' }}>
            <input
              type="radio"
              name="brand"
              checked={selectedBrand === 'all'}
              onChange={() => setSelectedBrand('all')}
            />
            All Brands
          </label>
          {brands.map(b => (
            <label 
              key={b}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: selectedBrand === b ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="brand"
                checked={selectedBrand === b}
                onChange={() => setSelectedBrand(b)}
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      {/* 3. Discount Facet */}
      <div style={{ marginBottom: '22px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00f2fe', textTransform: 'uppercase', marginBottom: '10px' }}>
          Discount Offer
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {discounts.map(d => (
            <label 
              key={d.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: selectedDiscount === d.value ? '#ff9900' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="discount"
                checked={selectedDiscount === d.value}
                onChange={() => setSelectedDiscount(d.value)}
              />
              {d.label}
            </label>
          ))}
        </div>
      </div>

      {/* 4. Customer Rating Facet */}
      <div>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00f2fe', textTransform: 'uppercase', marginBottom: '10px' }}>
          Customer Rating
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { label: "All Ratings", val: 0 },
            { label: "4.5★ & Above (Top Rated)", val: 4.5 },
            { label: "4.0★ & Above", val: 4.0 }
          ].map(r => (
            <label 
              key={r.val}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: minRating === r.val ? '#f6d365' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === r.val}
                onChange={() => setMinRating(r.val)}
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
