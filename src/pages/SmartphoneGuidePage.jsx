import React from 'react';
import { Link } from 'react-router-dom';
import SmartphoneVloggingGuide from '../components/SmartphoneVloggingGuide';
import { ChevronRight, Home, Sparkles, Video, Mic, ShoppingBag } from 'lucide-react';
import { VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { useEcommerce } from '../context/EcommerceContext';

export default function SmartphoneGuidePage() {
  const { formatPrice } = useEcommerce();
  const compatibleGear = VLOGGING_PRODUCTS.filter(p => 
    p.category === 'smartphone-rigs' || 
    p.id === 'digitek-dwm-101' || 
    p.id === 'dji-osmo-mobile-6' || 
    p.id === 'ulanzi-vl49-rgb'
  ).slice(0, 4);

  return (
    <div className="smartphone-guide-page-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 60px' }}>
      {/* Breadcrumb Navigation */}
      <nav className="smartphone-guide-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Home size={14} /> Home
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: '#00f2fe', fontWeight: 700 }}>Smartphone Vlogging Guide</span>
      </nav>

      {/* Main Interactive Guide Component */}
      <SmartphoneVloggingGuide />

      {/* Recommended Mobile Creator Add-ons */}
      <section style={{ marginTop: '50px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 6px', color: '#fff' }}>
            Recommended Accessories for Smartphone Filmmakers
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Lab-tested wireless microphones, dual-handle cages, and RGB fill lights tested with iPhone and Android
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {compatibleGear.map(product => (
            <div
              key={product.id}
              className="glass-panel glow-border"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(10, 13, 36, 0.65)'
              }}
            >
              <div style={{ height: '170px', position: 'relative', overflow: 'hidden', background: '#0a0d24' }}>
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Link>
                {product.discountPercent > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: '#ff2d55',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 900
                  }}>
                    - {product.discountPercent}%
                  </div>
                )}
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#ff9900', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {product.brand}
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.35, marginBottom: '10px' }}>
                    <Link to={`/product/${product.id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                      {product.title}
                    </Link>
                  </h4>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#fff', marginBottom: '14px' }}>
                    {formatPrice(product.priceINR, product.priceUSD)}
                  </div>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  style={{
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #ff9900 0%, #ff5500 100%)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <ShoppingBag size={14} />
                  <span>View Details & Deals</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
