import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Clock, ShoppingBag, Flame, ArrowRight } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';
import { VLOGGING_PRODUCTS } from '../data/vloggingProducts';

export default function FlashDealsBanner() {
  const { formatPrice } = useEcommerce();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 27, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = VLOGGING_PRODUCTS.filter(p => p.isDealOfDay || p.discountPercent >= 45).slice(0, 4);

  return (
    <section style={{ margin: '30px 0 45px' }}>
      <div 
        className="glass-panel glow-border"
        style={{
          borderRadius: '18px',
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(255, 153, 0, 0.08), rgba(255, 87, 34, 0.08))',
          border: '1px solid rgba(255, 153, 0, 0.3)'
        }}
      >
        {/* Deal Ticker Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ff9900', color: '#050714', padding: '6px 12px', borderRadius: '8px', fontWeight: 900, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} fill="#050714" /> LIGHTNING DEALS
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>
              Today's Top Creator Deals
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 0, 0, 0.5)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(255, 153, 0, 0.3)' }}>
            <Clock size={15} color="#ff9900" />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Ends in:</span>
            <span style={{ fontWeight: 900, color: '#ff9900', fontSize: '0.9rem', letterSpacing: '1px' }}>
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {dealProducts.map(p => (
            <div 
              key={p.id}
              className="glass-panel"
              style={{
                borderRadius: '14px',
                padding: '16px',
                background: 'rgba(10, 15, 30, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ background: '#ff0844', color: '#fff', fontSize: '0.72rem', fontWeight: 900, padding: '2px 8px', borderRadius: '4px' }}>
                    {p.discountPercent}% OFF
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#38ef7d', fontWeight: 800 }}>
                    ⚡ Limited Stock
                  </span>
                </div>

                <Link to={`/product/${p.id}`}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
                </Link>

                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '6px' }}>
                  <Link to={`/product/${p.id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                    {p.title}
                  </Link>
                </h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {p.brand} • {p.subCategoryName}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ff9900' }}>
                    {formatPrice(p.priceINR, p.priceUSD)}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ₹{p.mrpINR.toLocaleString('en-IN')}
                  </span>
                </div>

                <Link 
                  to={p.prices[0].url}
                  className="cta-button"
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    fontSize: '0.82rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '6px',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #ff9900 0%, #ff5722 100%)'
                  }}
                >
                  <ShoppingBag size={14} /> Grab on {p.prices[0].store}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
