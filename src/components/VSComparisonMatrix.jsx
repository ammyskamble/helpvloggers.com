import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HEAD_TO_HEAD_COMPARISONS, VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { useEcommerce } from '../context/EcommerceContext';
import { Award, Zap, ArrowRight, ArrowLeftRight, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function VSComparisonMatrix() {
  const { formatPrice } = useEcommerce();
  const [selectedAId, setSelectedAId] = useState('digitek-dwm-101');
  const [selectedBId, setSelectedBId] = useState('boya-by-m1');
  const [isComparingCustom, setIsComparingCustom] = useState(false);

  const prodA = VLOGGING_PRODUCTS.find(p => p.id === selectedAId) || VLOGGING_PRODUCTS[0];
  const prodB = VLOGGING_PRODUCTS.find(p => p.id === selectedBId) || VLOGGING_PRODUCTS[1];

  return (
    <section style={{ margin: '60px 0' }}>
      <div className="section-header">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#00f2fe', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Zap size={16} /> RTINGS & Wirecutter Head-to-Head Engine
          </div>
          <h2 className="section-title">
            Head-to-Head Creator Gear Battles & Comparison Tool
          </h2>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>High Buyer Intent VS Landing Hubs</span>
      </div>

      {/* Interactive Live Comparison Selector */}
      <div 
        className="glass-panel glow-border"
        style={{
          padding: '24px',
          borderRadius: '18px',
          marginBottom: '35px',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.05), rgba(246, 211, 101, 0.05))'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <ArrowLeftRight size={18} color="#00f2fe" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
            Compare Any 2 Creator Products Side-by-Side
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#00f2fe', fontWeight: 700, marginBottom: '6px' }}>
              Select Contender A:
            </label>
            <select
              value={selectedAId}
              onChange={(e) => setSelectedAId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            >
              {VLOGGING_PRODUCTS.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0a0d24', color: '#fff' }}>
                  {p.title} ({formatPrice(p.priceINR, p.priceUSD)})
                </option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 900, color: '#ff9900', fontSize: '1.2rem', paddingTop: '16px' }}>
            VS
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#f6d365', fontWeight: 700, marginBottom: '6px' }}>
              Select Contender B:
            </label>
            <select
              value={selectedBId}
              onChange={(e) => setSelectedBId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(246, 211, 101, 0.3)',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            >
              {VLOGGING_PRODUCTS.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0a0d24', color: '#fff' }}>
                  {p.title} ({formatPrice(p.priceINR, p.priceUSD)})
                </option>
              ))}
            </select>
          </div>

          <div style={{ paddingTop: '20px' }}>
            <button
              onClick={() => setIsComparingCustom(!isComparingCustom)}
              className="cta-button"
              style={{ width: '100%', padding: '11px 16px', fontSize: '0.9rem' }}
            >
              {isComparingCustom ? "Hide Live Comparison" : "⚡ Show Spec Showdown"}
            </button>
          </div>
        </div>

        {/* Dynamic Spec Comparison Box */}
        {isComparingCustom && (
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div style={{ padding: '16px', background: 'rgba(0, 242, 254, 0.08)', borderRadius: '12px', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#00f2fe', fontWeight: 800 }}>CONTENDER A</div>
                <h4 style={{ fontSize: '1.05rem', margin: '4px 0 8px' }}>{prodA.title}</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00f2fe', marginBottom: '12px' }}>
                  {formatPrice(prodA.priceINR, prodA.priceUSD)}
                </div>
                <Link to={`/product/${prodA.id}`} className="btn-filter-pill" style={{ fontSize: '0.8rem', textDecoration: 'none' }}>
                  View Full Specs & Store Deals →
                </Link>
              </div>

              <div style={{ padding: '16px', background: 'rgba(246, 211, 101, 0.08)', borderRadius: '12px', border: '1px solid rgba(246, 211, 101, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#f6d365', fontWeight: 800 }}>CONTENDER B</div>
                <h4 style={{ fontSize: '1.05rem', margin: '4px 0 8px' }}>{prodB.title}</h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f6d365', marginBottom: '12px' }}>
                  {formatPrice(prodB.priceINR, prodB.priceUSD)}
                </div>
                <Link to={`/product/${prodB.id}`} className="btn-filter-pill" style={{ fontSize: '0.8rem', textDecoration: 'none' }}>
                  View Full Specs & Store Deals →
                </Link>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px', color: 'var(--text-muted)' }}>Rating</td>
                    <td style={{ padding: '10px', color: '#00f2fe', fontWeight: 700 }}>★ {prodA.rating} ({prodA.reviewCount} reviews)</td>
                    <td style={{ padding: '10px', color: '#f6d365', fontWeight: 700 }}>★ {prodB.rating} ({prodB.reviewCount} reviews)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px', color: 'var(--text-muted)' }}>Category</td>
                    <td style={{ padding: '10px' }}>{prodA.categoryName}</td>
                    <td style={{ padding: '10px' }}>{prodB.categoryName}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px', color: 'var(--text-muted)' }}>Origin</td>
                    <td style={{ padding: '10px', color: '#ff9900' }}>{prodA.origin || 'Global Market'}</td>
                    <td style={{ padding: '10px', color: '#ff9900' }}>{prodB.origin || 'Global Market'}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px', color: 'var(--text-muted)' }}>Target Keyword</td>
                    <td style={{ padding: '10px' }}>"{prodA.targetKeyword}"</td>
                    <td style={{ padding: '10px' }}>"{prodB.targetKeyword}"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Curated Editorial Battles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {HEAD_TO_HEAD_COMPARISONS.map(comp => (
          <div className="glass-panel glow-border" key={comp.id} style={{ padding: '24px', borderRadius: '16px' }}>
            <div style={{ fontSize: '0.75rem', color: '#00f2fe', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              {comp.subtitle}
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '12px' }}>
              <Link to={`/compare/${comp.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {comp.title}
              </Link>
            </h3>
            
            <div style={{
              background: 'rgba(246, 211, 101, 0.1)',
              border: '1px solid rgba(246, 211, 101, 0.3)',
              borderRadius: '10px',
              padding: '10px 14px',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#f6d365'
            }}>
              <Award size={18} /> Verdict: {comp.winner}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
              {comp.verdict || comp.summary}
            </p>

            <Link
              to={`/compare/${comp.id}`}
              style={{
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#00f2fe',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
            >
              Read Full Spec & Benchmark Breakdown <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
