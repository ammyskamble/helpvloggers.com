import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShoppingBag, ArrowRight, Star, Flame, Sparkles } from 'lucide-react';
import { VLOGGING_PRODUCTS } from '../data/vloggingProducts';

export default function EditorsQuickPicks() {
  const topPicks = [
    {
      categoryRole: "BEST OVERALL VLOGGING MIC",
      productId: "dji-mic-2",
      tagline: "Unclippable 32-bit float audio, direct iPhone/Android Bluetooth & compact charging case.",
      accentColor: "#00f2fe"
    },
    {
      categoryRole: "BEST OVERALL VLOGGING CAMERA",
      productId: "sony-zv-e10-ii",
      tagline: "Cinematic APS-C bokeh, fast Eye-AF, product showcase mode & 4K 60p 10-bit recording.",
      accentColor: "#f6d365"
    },
    {
      categoryRole: "BEST FOR TRAVEL & DAILY VLOGS",
      productId: "dji-osmo-pocket-3",
      tagline: "Large 1-inch sensor in your pocket, butter-smooth 3-axis gimbal & rotatable vertical TikTok screen.",
      accentColor: "#38ef7d"
    },
    {
      categoryRole: "BEST BUDGET SMARTPHONE RIG",
      productId: "smallrig-universal-phone-cage",
      tagline: "Stops walking micro-jitters with dual handles; 5 cold shoes for your mic and fill light.",
      accentColor: "#ff9966"
    }
  ];

  return (
    <section style={{ margin: '40px 0 50px' }}>
      <div className="section-header" style={{ marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#00f2fe', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Award size={16} /> Wirecutter-Style Quick Verdict
          </div>
          <h2 className="section-title" style={{ fontSize: '1.6rem' }}>
            Editor's Top Vlogging Gear Picks at a Glance (2026)
          </h2>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have time to read 21 reviews? Here are our lab winners.
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px' }}>
        {topPicks.map((pick, i) => {
          const product = VLOGGING_PRODUCTS.find(p => p.id === pick.productId);
          if (!product) return null;

          const lowestPrice = Math.min(...product.prices.map(p => p.price));
          const bestDeal = product.prices.find(p => p.price === lowestPrice) || product.prices[0];

          return (
            <div 
              key={i} 
              className="glass-panel glow-border"
              style={{
                borderRadius: '16px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: pick.accentColor }}></div>

              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: pick.accentColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {pick.categoryRole}
                </span>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: '8px 0', lineHeight: 1.3 }}>
                  <Link to={`/product/${product.id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                    {product.title}
                  </Link>
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', color: '#f6d365' }}>
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} fill="#f6d365" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{product.rating}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({product.reviewCount})</span>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px' }}>
                  {pick.tagline}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Lowest verified price:</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00f2fe' }}>
                    ${lowestPrice.toFixed(2)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn-filter-pill"
                    style={{ textDecoration: 'none', flex: 1, textAlign: 'center', justifyContent: 'center', fontSize: '0.8rem', padding: '8px 10px' }}
                  >
                    Lab Review <ArrowRight size={13} style={{ marginLeft: 3 }} />
                  </Link>
                  <Link
                    to={bestDeal.url}
                    className="cta-button"
                    style={{ textDecoration: 'none', flex: 1.4, textAlign: 'center', fontSize: '0.8rem', padding: '8px 12px' }}
                  >
                    <ShoppingBag size={14} /> Buy {bestDeal.store}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
