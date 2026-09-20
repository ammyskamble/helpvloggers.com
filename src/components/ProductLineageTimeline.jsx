import React from 'react';
import { Link } from 'react-router-dom';
import { History, ArrowRight, CheckCircle2, ShoppingBag, Sparkles, Clock } from 'lucide-react';
import { VLOGGING_SMARTPHONES } from '../data/vloggingSmartphones';
import { VLOGGING_PRODUCTS } from '../data/vloggingProducts';

export default function ProductLineageTimeline({ currentProduct }) {
  if (!currentProduct) return null;

  // Search in both smartphone and general datasets
  const allProducts = [...VLOGGING_SMARTPHONES, ...VLOGGING_PRODUCTS];

  // Identify seriesId
  const seriesId = currentProduct.seriesId || (currentProduct.brand ? `${currentProduct.brand.toLowerCase()}-series` : null);

  if (!seriesId) return null;

  // Find all items belonging to the same series
  const seriesItems = allProducts
    .filter(p => p.seriesId === seriesId)
    .sort((a, b) => (a.launchYear || 0) - (b.launchYear || 0));

  if (seriesItems.length <= 1) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'live-current':
        return <span style={{ padding: '3px 8px', borderRadius: '12px', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', fontSize: '0.72rem', fontWeight: 700, border: '1px solid rgba(0, 242, 254, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Sparkles size={10} /> Live Market Flagship</span>;
      case 'live-discounted':
        return <span style={{ padding: '3px 8px', borderRadius: '12px', background: 'rgba(255, 170, 0, 0.15)', color: '#ffaa00', fontSize: '0.72rem', fontWeight: 700, border: '1px solid rgba(255, 170, 0, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><ShoppingBag size={10} /> Discounted New Stock</span>;
      case 'renewed-refurbished':
        return <span style={{ padding: '3px 8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', fontSize: '0.72rem', fontWeight: 700, border: '1px solid rgba(168, 85, 247, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={10} /> Certified Renewed</span>;
      case 'legacy-archive':
      default:
        return <span style={{ padding: '3px 8px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.08)', color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={10} /> Historical Archive</span>;
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))',
      border: '1px solid rgba(0, 242, 254, 0.25)',
      borderRadius: '20px',
      padding: '24px',
      marginTop: '32px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
      backdropFilter: 'blur(12px)'
    }}>
      {/* Header section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg, #00f2fe, #4facfe)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
            <History size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              📜 Model Lineage & Version Evolution History
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: '#94a3b8' }}>
              From initial release to current live online market listings ({seriesItems.length} Generations)
            </p>
          </div>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#00f2fe', fontWeight: 700, background: 'rgba(0, 242, 254, 0.08)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
          Series: {seriesItems[0]?.brand} {seriesItems[0]?.seriesId?.replace('-series', '').toUpperCase()}
        </div>
      </div>

      {/* Lineage Stepper / Horizontal Scroll */}
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '16px',
        paddingTop: '8px',
        scrollbarWidth: 'thin'
      }}>
        {seriesItems.map((item, idx) => {
          const isCurrent = item.id === currentProduct.id;
          return (
            <div
              key={item.id}
              style={{
                minWidth: '260px',
                maxWidth: '280px',
                flexShrink: 0,
                background: isCurrent ? 'rgba(0, 242, 254, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                border: isCurrent ? '2px solid #00f2fe' : '1px solid rgba(0, 242, 254, 0.4)',
                borderRadius: '16px',
                padding: '16px',
                position: 'relative',
                transition: 'all 0.25s ease'
              }}
            >
              {/* Active Indicator Pin */}
              {isCurrent && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '16px',
                  background: '#00f2fe',
                  color: '#000',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  padding: '2px 10px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Viewing Now
                </div>
              )}

              {/* Year & Generation Tag */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800 }}>
                  {item.generation || `Gen ${idx + 1}`}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                  🗓️ {item.launchYear || 'N/A'}
                </span>
              </div>

              {/* Product Name */}
              <h4 style={{ margin: '0 0 8px', fontSize: '0.95rem', fontWeight: 700, color: '#fff', lineHeight: 1.35 }}>
                {item.name || item.title}
              </h4>

              {/* Market Status Badge */}
              <div style={{ marginBottom: '10px' }}>
                {getStatusBadge(item.marketStatus)}
              </div>

              {/* Key Upgrade Summary */}
              {item.keyUpgrade && (
                <div style={{
                  fontSize: '0.76rem',
                  color: '#e2e8f0',
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  lineHeight: 1.4,
                  borderLeft: '2px solid #00f2fe'
                }}>
                  <strong>Upgrade:</strong> {item.keyUpgrade}
                </div>
              )}

              {/* Pricing & Store Availability */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffaa00' }}>
                    ₹{(item.priceINR || item.price || 0).toLocaleString('en-IN')}
                  </div>
                  {item.priceUSD && (
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                      (~${item.priceUSD})
                    </div>
                  )}
                </div>

                {!isCurrent ? (
                  <Link
                    to={`/product/${item.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#00f2fe',
                      textDecoration: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: '1px solid rgba(0, 242, 254, 0.2)'
                    }}
                  >
                    View <ArrowRight size={12} />
                  </Link>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: '#00f2fe', fontWeight: 800 }}>Active</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
