import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HEAD_TO_HEAD_COMPARISONS, VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { useEcommerce } from '../context/EcommerceContext';
import { Award, Zap, ChevronRight, CheckCircle2, XCircle, ArrowLeft, ShoppingBag, ExternalLink } from 'lucide-react';

export default function ComparisonDetailPage() {
  const { vsId } = useParams();
  const { formatPrice, currency } = useEcommerce();

  const comparison = HEAD_TO_HEAD_COMPARISONS.find(c => c.id === vsId);

  if (!comparison) {
    return (
      <div className="glass-panel" style={{ padding: '80px 20px', textAlign: 'center', margin: '40px auto', maxWidth: '600px', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Comparison Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          The head-to-head matchup you are looking for does not exist.
        </p>
        <Link to="/" className="btn-gradient-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Return to Home Catalog
        </Link>
      </div>
    );
  }

  // Find underlying product records if available
  const prodAObj = VLOGGING_PRODUCTS.find(p => p.id === comparison.prodA?.id);
  const prodBObj = VLOGGING_PRODUCTS.find(p => p.id === comparison.prodB?.id);

  return (
    <div style={{ padding: '16px 0 60px' }}>
      {/* Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/#compare-battles-section" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Gear Battles</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#00f2fe', fontWeight: 700 }}>{comparison.title}</span>
      </nav>

      {/* Comparison Header */}
      <div className="glass-panel glow-border" style={{ padding: '32px', borderRadius: '20px', marginBottom: '36px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff9900', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
          <Zap size={16} /> High Buyer-Intent E-Commerce Gear Battle
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '10px' }}>
          {comparison.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto 20px' }}>
          {comparison.subtitle}
        </p>

        {/* Winner Announcement Banner */}
        <div style={{
          background: 'rgba(246, 211, 101, 0.12)',
          border: '1px solid rgba(246, 211, 101, 0.4)',
          borderRadius: '14px',
          padding: '14px 20px',
          maxWidth: '750px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          color: '#f6d365',
          fontSize: '0.95rem',
          fontWeight: 800
        }}>
          <Award size={22} style={{ flexShrink: 0 }} />
          <span>Verdict: {comparison.winner}</span>
        </div>
      </div>

      {/* Side by Side Product Showcases */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* Product A */}
        <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.78rem', color: '#00f2fe', fontWeight: 800 }}>CONTENDER A</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00f2fe' }}>
              {prodAObj ? formatPrice(prodAObj.priceINR, prodAObj.priceUSD) : comparison.prodA.price}
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px' }}>
            {comparison.prodA.name}
          </h2>

          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ color: '#00f2fe', fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>Key Advantages:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {comparison.prodA.pros.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} color="#00f2fe" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '22px' }}>
            <h4 style={{ color: '#ff6b6b', fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>Trade-Offs:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {comparison.prodA.cons.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.88rem' }}>
                  <XCircle size={16} color="#ff6b6b" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {prodAObj && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to={`/product/${prodAObj.id}`} className="btn-filter-pill" style={{ textDecoration: 'none', flex: 1, textAlign: 'center', padding: '10px' }}>
                  Full Review
                </Link>
                <Link 
                  to={prodAObj.prices[0].url} 
                  rel="nofollow sponsored"
                  className="cta-button" 
                  style={{ textDecoration: 'none', flex: 1.5, textAlign: 'center', fontSize: '0.85rem', padding: '10px' }}
                >
                  <ShoppingBag size={15} /> Buy on {prodAObj.prices[0].store}
                </Link>
              </div>
              {prodAObj.prices.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {prodAObj.prices.slice(1).map((pr, pidx) => (
                    <Link
                      key={pidx}
                      to={pr.url}
                      rel="nofollow sponsored"
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.78rem',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>{pr.store}: {formatPrice(pr.priceINR, pr.priceUSD)}</span>
                      <ExternalLink size={12} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product B */}
        <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.78rem', color: '#f6d365', fontWeight: 800 }}>CONTENDER B</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f6d365' }}>
              {prodBObj ? formatPrice(prodBObj.priceINR, prodBObj.priceUSD) : comparison.prodB.price}
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px' }}>
            {comparison.prodB.name}
          </h2>

          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ color: '#f6d365', fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>Key Advantages:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {comparison.prodB.pros.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} color="#f6d365" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '22px' }}>
            <h4 style={{ color: '#ff6b6b', fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>Trade-Offs:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {comparison.prodB.cons.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.88rem' }}>
                  <XCircle size={16} color="#ff6b6b" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {prodBObj && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to={`/product/${prodBObj.id}`} className="btn-filter-pill" style={{ textDecoration: 'none', flex: 1, textAlign: 'center', padding: '10px' }}>
                  Full Review
                </Link>
                <Link 
                  to={prodBObj.prices[0].url} 
                  rel="nofollow sponsored"
                  className="cta-button" 
                  style={{ textDecoration: 'none', flex: 1.5, textAlign: 'center', fontSize: '0.85rem', padding: '10px' }}
                >
                  <ShoppingBag size={15} /> Buy on {prodBObj.prices[0].store}
                </Link>
              </div>
              {prodBObj.prices.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {prodBObj.prices.slice(1).map((pr, pidx) => (
                    <Link
                      key={pidx}
                      to={pr.url}
                      rel="nofollow sponsored"
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.78rem',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>{pr.store}: {formatPrice(pr.priceINR, pr.priceUSD)}</span>
                      <ExternalLink size={12} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Spec Comparison Grid */}
      {comparison.comparisonTable && (
        <div className="glass-panel glow-border" style={{ padding: '30px', borderRadius: '18px', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '20px', textAlign: 'center' }}>
            Direct Specification Showdown
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>Feature / Spec</th>
                  <th style={{ padding: '12px', color: '#00f2fe', fontSize: '0.98rem', fontWeight: 800 }}>{comparison.prodA.name}</th>
                  <th style={{ padding: '12px', color: '#f6d365', fontSize: '0.98rem', fontWeight: 800 }}>{comparison.prodB.name}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.comparisonTable.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{row.feature}</td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{row.a}</td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* In-Depth Final Verdict */}
      <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px' }}>
          Creator Lab Final Takeaway & Buyer Advice
        </h3>
        <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          {comparison.verdict}
        </p>
      </div>
    </div>
  );
}
