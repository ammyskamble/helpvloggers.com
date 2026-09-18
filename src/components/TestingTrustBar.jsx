import React from 'react';
import { ShieldCheck, CheckCircle2, ShoppingBag, Award, Zap, Info } from 'lucide-react';

export default function TestingTrustBar() {
  return (
    <section className="trust-bar-wrap" style={{ margin: '30px 0 45px' }}>
      <div 
        className="glass-panel"
        style={{
          padding: '18px 24px',
          borderRadius: '16px',
          background: 'linear-gradient(90deg, rgba(0, 242, 254, 0.04), rgba(79, 172, 254, 0.04))',
          border: '1px solid rgba(0, 242, 254, 0.15)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f2fe', flexShrink: 0 }}>
            <Award size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fff' }}>120+ Hours Real Field Testing</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Wind noise & 4K overheat benchmarked</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(246, 211, 101, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f6d365', flexShrink: 0 }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fff' }}>100% Independent Lab Reviews</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Zero paid rankings or brand sponsorships</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(0, 242, 254, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f2fe', flexShrink: 0 }}>
            <ShoppingBag size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fff' }}>5-Store Real-Time Price Matrix</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Amazon, B&H, Adorama, Best Buy & DJI</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(56, 239, 125, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38ef7d', flexShrink: 0 }}>
            <Zap size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fff' }}>Verified Mount Compatibility</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tested cold-shoes, payload & USB-C audio</div>
          </div>
        </div>
      </div>
    </section>
  );
}
