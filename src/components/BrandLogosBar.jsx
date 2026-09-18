import React from 'react';
import { Link } from 'react-router-dom';

const BRANDS = [
  { name: "Digitek", origin: "India's #1 Creator Brand", query: "Digitek" },
  { name: "Boya", origin: "Global Audio Standard", query: "Boya" },
  { name: "DJI", origin: "Pro Gimbal & 32-Bit Audio", query: "DJI" },
  { name: "Grenaro", origin: "Wireless Collar Mics", query: "Grenaro" },
  { name: "Sony", origin: "Cinema & 4K Mirrorless", query: "Sony" },
  { name: "Maono", origin: "Studio & Podcast Gear", query: "Maono" },
  { name: "Osaka", origin: "Bi-Color LED Lights", query: "Osaka" },
  { name: "Tygot", origin: "Flexible Gorilla Pods", query: "Tygot" },
  { name: "SmallRig", origin: "Universal Metal Cages", query: "SmallRig" }
];

export default function BrandLogosBar() {
  return (
    <div className="glass-panel" style={{ padding: '24px 30px', borderRadius: '16px', margin: '40px 0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <div style={{ fontSize: '0.75rem', color: '#ff9900', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Official Authorised Retail Links
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
          Shop by Popular Creator Brands
        </h3>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '12px',
        alignItems: 'center' 
      }}>
        {BRANDS.map(brand => (
          <Link
            key={brand.name}
            to={`/shop?brand=${encodeURIComponent(brand.query)}`}
            style={{
              padding: '12px 8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              textAlign: 'center',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#00f2fe';
              e.currentTarget.style.background = 'rgba(0, 242, 254, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            }}
          >
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#fff', letterSpacing: '0.5px' }}>
              {brand.name}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {brand.origin}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
