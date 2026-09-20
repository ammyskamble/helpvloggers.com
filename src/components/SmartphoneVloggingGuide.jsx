import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  VLOGGING_SMARTPHONES, 
  FEATURE_SHOOTOUT_MATRIX, 
  PHONE_VS_CAMERA_DECISION, 
  SMARTPHONE_CREATOR_RIG 
} from '../data/vloggingSmartphones';
import { useEcommerce } from '../context/EcommerceContext';
import { 
  Smartphone, 
  Video, 
  ShieldCheck, 
  Zap, 
  Mic, 
  Flame, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  SlidersHorizontal, 
  HardDrive, 
  Sparkles, 
  ExternalLink,
  Camera,
  Layers,
  ArrowRight,
  TrendingUp,
  BatteryCharging
} from 'lucide-react';

export default function SmartphoneVloggingGuide() {
  const { market, formatPrice } = useEcommerce();
  const [selectedPhoneId, setSelectedPhoneId] = useState('iphone-16-pro');
  const [activeMatrixFilter, setActiveMatrixFilter] = useState('All');

  const selectedPhone = VLOGGING_SMARTPHONES.find(p => p.id === selectedPhoneId) || VLOGGING_SMARTPHONES[0];

  const matrixCategories = ['All', 'Video & Optics', 'Stabilization', 'Audio', 'Platform Integration', 'Endurance'];

  const filteredMatrix = activeMatrixFilter === 'All' 
    ? FEATURE_SHOOTOUT_MATRIX 
    : FEATURE_SHOOTOUT_MATRIX.filter(m => m.category === activeMatrixFilter);

  return (
    <section 
      id="smartphone-vlogging-guide" 
      className="glass-panel glow-border"
      style={{
        borderRadius: '24px',
        padding: '36px 24px',
        marginBottom: '60px',
        background: 'linear-gradient(180deg, rgba(13, 19, 44, 0.95) 0%, rgba(7, 10, 26, 0.98) 100%)',
        border: '1px solid rgba(0, 242, 254, 0.18)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
      }}
    >
      {/* 1. Header & Authority Hook */}
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 242, 254, 0.1)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          padding: '6px 16px',
          borderRadius: '20px',
          color: '#00f2fe',
          fontSize: '0.8rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '14px'
        }}>
          <Smartphone size={15} /> 2026 Mobile Creator Testing Lab
        </div>

        <h2 style={{ fontSize: '2.1rem', fontWeight: 900, lineHeight: 1.25, margin: '0 0 12px' }}>
          Which Smartphone is <span className="gradient-text">Better for Vlogging?</span>
        </h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
          Over 85% of YouTube creators and Instagram reel artists film entirely on smartphones. We lab-tested stabilization, ProRes Log grading, front selfie autofocus, wind audio, and thermal endurance to rank the absolute best phones for creators.
        </p>
      </div>

      {/* 2. Top Smartphone Selector Tabs */}
      <div 
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '32px',
          justifyContent: 'flex-start'
        }}
      >
        {VLOGGING_SMARTPHONES.map(phone => {
          const isSelected = phone.id === selectedPhoneId;
          return (
            <button
              key={phone.id}
              onClick={() => setSelectedPhoneId(phone.id)}
              style={{
                flexShrink: 0,
                padding: '12px 18px',
                borderRadius: '14px',
                background: isSelected 
                  ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.25) 0%, rgba(79, 172, 254, 0.15) 100%)' 
                  : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? '1.5px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                transition: 'all 0.25s ease',
                boxShadow: isSelected ? '0 8px 24px rgba(0, 242, 254, 0.2)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ 
                  background: isSelected ? '#00f2fe' : 'rgba(255, 255, 255, 0.1)',
                  color: isSelected ? '#050714' : '#fff',
                  borderRadius: '6px',
                  padding: '1px 6px',
                  fontSize: '0.72rem',
                  fontWeight: 900
                }}>
                  #{phone.rank}
                </span>
                <span style={{ fontWeight: 800, fontSize: '0.88rem', color: isSelected ? '#00f2fe' : '#fff' }}>
                  {phone.name.split(' / ')[0]}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: isSelected ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)' }}>
                {phone.badge.split(' ')[0]} {phone.brand}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Deep-Dive Showcase for Selected Phone */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        background: 'rgba(5, 8, 22, 0.7)',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        marginBottom: '40px'
      }}>
        {/* Left Column: Device Hero, Badges, Price, Pros & Cons */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{
                background: 'rgba(255, 153, 0, 0.15)',
                color: '#ff9900',
                border: '1px solid rgba(255, 153, 0, 0.35)',
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 800
              }}>
                {selectedPhone.badge}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00e676', fontSize: '0.82rem', fontWeight: 800 }}>
                <ShieldCheck size={16} /> Tested Score: {selectedPhone.scores.overall} / 10
              </div>
            </div>

            <h3 style={{ fontSize: '1.7rem', fontWeight: 900, margin: '0 0 6px', color: '#fff' }}>
              {selectedPhone.name}
            </h3>

            <p style={{ color: '#00f2fe', fontSize: '0.88rem', fontWeight: 700, margin: '0 0 16px' }}>
              "{selectedPhone.tagline}"
            </p>

            {/* Product Image & Key Specs Pill Banner */}
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              height: '240px',
              marginBottom: '20px',
              background: '#0a0d26'
            }}>
              <img 
                src={selectedPhone.image} 
                alt={selectedPhone.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '12px 16px',
                background: 'linear-gradient(to top, rgba(5, 7, 20, 0.95), transparent)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
                  Max: <span style={{ color: '#00f2fe' }}>{selectedPhone.specs.maxVideoResolution}</span>
                </div>
                <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
                  Log: <span style={{ color: '#ff9900' }}>{selectedPhone.specs.logProfile.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            {/* Price & Buying Actions */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff' }}>
                  {formatPrice(selectedPhone.priceINR, selectedPhone.priceUSD)}
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  {formatPrice(selectedPhone.mrpINR, Math.round(selectedPhone.priceUSD * 1.15))}
                </span>
                <span style={{ color: '#00e676', fontSize: '0.82rem', fontWeight: 800 }}>
                  Save {selectedPhone.discountPercent}%
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link
                  to={`/go/amazon-in/${selectedPhone.id}`}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #ff9900 0%, #ff5500 100%)',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Check Amazon Price</span>
                  <ExternalLink size={14} />
                </Link>

                <Link
                  to={`/go/flipkart/${selectedPhone.id}`}
                  style={{
                    flex: 1,
                    background: 'rgba(0, 242, 254, 0.1)',
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    color: '#00f2fe',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Check Flipkart</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>

            {/* Pros & Cons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(0, 230, 118, 0.05)', border: '1px solid rgba(0, 230, 118, 0.15)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00e676', fontWeight: 800, fontSize: '0.82rem', marginBottom: '8px' }}>
                  <CheckCircle2 size={16} /> Why Creators Love It
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedPhone.pros.slice(0, 3).map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'rgba(255, 45, 85, 0.05)', border: '1px solid rgba(255, 45, 85, 0.15)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ff2d55', fontWeight: 800, fontSize: '0.82rem', marginBottom: '8px' }}>
                  <XCircle size={16} /> Limitations
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedPhone.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(0, 242, 254, 0.05)',
            borderLeft: '3px solid #00f2fe',
            padding: '12px 14px',
            borderRadius: '0 8px 8px 0',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5
          }}>
            <strong style={{ color: '#fff' }}>Lab Verdict: </strong> {selectedPhone.verdict}
          </div>
        </div>

        {/* Right Column: Lab Benchmarks, All Features & Full Specs Breakdown */}
        <div>
          {/* Creator Benchmark Scores */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#00f2fe', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} /> HelpVloggers Lab Benchmarks (Out of 10)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {[
                { label: 'Video Quality', val: selectedPhone.scores.videoQuality, color: '#00f2fe' },
                { label: 'Stabilization', val: selectedPhone.scores.stabilization, color: '#00e676' },
                { label: 'Front Camera', val: selectedPhone.scores.frontCamera, color: '#f6d365' },
                { label: 'Mic & Audio', val: selectedPhone.scores.audioQuality, color: '#ff9900' },
                { label: 'Low-Light Video', val: selectedPhone.scores.lowLight, color: '#ff2d55' },
                { label: 'Thermal Endurance', val: selectedPhone.scores.thermals, color: '#a18cd1' }
              ].map((bench, idx) => (
                <div 
                  key={idx} 
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>{bench.label}</span>
                    <strong style={{ color: bench.color }}>{bench.val}</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${(bench.val / 10) * 100}%`, height: '100%', background: bench.color, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vlogging Features Deep-Dive */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#ff9900', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} /> Dedicated Creator Features
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedPhone.vloggingFeatures.map((feat, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    padding: '12px 14px'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} color="#ff9900" /> {feat.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {feat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Technical Specifications Grid */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={16} /> Complete Creator Spec Sheet
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '0.76rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px 10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Main Camera: </span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedPhone.specs.mainCamera}</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px 10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Front Selfie: </span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedPhone.specs.frontCamera}</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px 10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Ultra-Wide: </span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedPhone.specs.ultraWide}</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px 10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Telephoto Zoom: </span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{selectedPhone.specs.telephoto}</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px 10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>External SSD: </span>
                <span style={{ color: '#00f2fe', fontWeight: 700 }}>{selectedPhone.specs.externalSSD}</span>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px 10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Battery & Pack: </span>
                <span style={{ color: '#00e676', fontWeight: 700 }}>{selectedPhone.specs.batteryCapacity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Head-to-Head Feature Shootout Matrix */}
      <div style={{ marginBottom: '45px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '0 0 4px', color: '#fff' }}>
              Side-by-Side Feature Shootout Matrix
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
              Compare video resolution, Log codecs, stabilization scores, and thermal limits across all 5 phones
            </p>
          </div>

          {/* Matrix Category Filter Pills */}
          <div className="no-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', maxWidth: '100%' }}>
            {matrixCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveMatrixFilter(cat)}
                style={{
                  flexShrink: 0,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: activeMatrixFilter === cat ? '#00f2fe' : 'rgba(255, 255, 255, 0.05)',
                  color: activeMatrixFilter === cat ? '#050714' : 'var(--text-secondary)',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: activeMatrixFilter === cat ? 800 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Matrix Table Container with Sticky Headers & Hover Highlighting */}
        <div style={{
          overflowX: 'auto',
          overflowY: 'auto',
          maxHeight: '560px',
          maxWidth: '100%',
          width: '100%',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          background: 'rgba(10, 14, 32, 0.85)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, textAlign: 'left', minWidth: '860px' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <tr style={{ background: '#0b1028', borderBottom: '2px solid rgba(0, 242, 254, 0.3)' }}>
                <th style={{ 
                  position: 'sticky', 
                  left: 0, 
                  zIndex: 12, 
                  background: '#0b1028', 
                  padding: '14px 18px', 
                  fontSize: '0.82rem', 
                  fontWeight: 900, 
                  color: '#00f2fe',
                  borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '2px 0 8px rgba(0,0,0,0.5)'
                }}>
                  Core Vlogging Metric
                </th>
                <th style={{ padding: '14px 16px', fontSize: '0.82rem', fontWeight: 900, color: '#fff' }}>iPhone 16 Pro</th>
                <th style={{ padding: '14px 16px', fontSize: '0.82rem', fontWeight: 900, color: '#fff' }}>S24 Ultra</th>
                <th style={{ padding: '14px 16px', fontSize: '0.82rem', fontWeight: 900, color: '#fff' }}>Pixel 9 Pro</th>
                <th style={{ padding: '14px 16px', fontSize: '0.82rem', fontWeight: 900, color: '#fff' }}>OnePlus 12</th>
                <th style={{ padding: '14px 16px', fontSize: '0.82rem', fontWeight: 900, color: '#ff9900' }}>👑 Lab Winner</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatrix.map((row, idx) => (
                <tr 
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                    fontSize: '0.8rem',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 242, 254, 0.08)';
                    const stickyCell = e.currentTarget.querySelector('td:first-child');
                    if (stickyCell) stickyCell.style.background = '#11183c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent';
                    const stickyCell = e.currentTarget.querySelector('td:first-child');
                    if (stickyCell) stickyCell.style.background = '#090d24';
                  }}
                >
                  <td style={{ 
                    position: 'sticky', 
                    left: 0, 
                    zIndex: 8, 
                    background: '#090d24', 
                    padding: '12px 18px', 
                    fontWeight: 800, 
                    color: '#fff',
                    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '2px 0 8px rgba(0,0,0,0.5)',
                    transition: 'background 0.15s ease'
                  }}>
                    <div>{row.feature}</div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{row.category}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{row.iphone16Pro}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{row.s24Ultra}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{row.pixel9Pro}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{row.oneplus12}</td>
                  <td style={{ padding: '12px 16px', color: '#00e676', fontWeight: 900 }}>
                    {row.winner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. "Smartphone vs Dedicated Camera" Decision Helper */}
      <div style={{
        background: 'rgba(7, 12, 30, 0.8)',
        borderRadius: '18px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        marginBottom: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '0 0 6px', color: '#fff' }}>
            {PHONE_VS_CAMERA_DECISION.title}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: 0 }}>
            Do you actually need a ₹80,000 Sony ZV-E10 II or DJI Pocket 3, or will a flagship smartphone do everything?
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(0, 242, 254, 0.04)', border: '1px solid rgba(0, 242, 254, 0.15)', borderRadius: '14px', padding: '18px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 900, color: '#00f2fe', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Smartphone size={16} /> Why 85% of Vloggers Should Stick With a Phone
            </h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PHONE_VS_CAMERA_DECISION.smartphonePros.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'rgba(255, 153, 0, 0.04)', border: '1px solid rgba(255, 153, 0, 0.15)', borderRadius: '14px', padding: '18px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 900, color: '#ff9900', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera size={16} /> When a Dedicated Camera is Worth Every Penny
            </h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PHONE_VS_CAMERA_DECISION.dedicatedCameraPros.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '14px 18px',
          fontSize: '0.82rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div>
            <strong style={{ color: '#00f2fe' }}>Stick With Your Phone: </strong>
            <span style={{ color: 'var(--text-secondary)' }}>{PHONE_VS_CAMERA_DECISION.recommendation.stickWithPhoneIf}</span>
          </div>
          <div>
            <strong style={{ color: '#ff9900' }}>Upgrade to Dedicated Camera: </strong>
            <span style={{ color: 'var(--text-secondary)' }}>{PHONE_VS_CAMERA_DECISION.recommendation.upgradeToDedicatedIf}</span>
          </div>
        </div>
      </div>

      {/* 6. "Turn Your Smartphone into a Pro Cinema Rig" Gear Formula */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <span style={{
            color: '#ff9900',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Creator Mobile Rig Formula
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '4px 0', color: '#fff' }}>
            Turn Your Smartphone Into a Broadcast Studio
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', margin: 0 }}>
            Pair your phone with these 4 essentials to get 95% of a ₹2,00,000 cinema camera look
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {SMARTPHONE_CREATOR_RIG.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel glow-border"
              style={{
                borderRadius: '14px',
                padding: '16px',
                background: 'rgba(12, 16, 38, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ color: '#00f2fe', fontSize: '0.78rem', fontWeight: 800, marginBottom: '6px' }}>
                  {item.step}
                </div>
                <div style={{ color: '#fff', fontSize: '0.92rem', fontWeight: 800, marginBottom: '8px' }}>
                  {item.recommendedItem}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: '14px' }}>
                  {item.reason}
                </p>
              </div>

              <Link
                to={item.link}
                style={{
                  background: 'rgba(0, 242, 254, 0.08)',
                  border: '1px solid rgba(0, 242, 254, 0.25)',
                  color: '#00f2fe',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>View Tested Gear</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
