import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { ExternalLink, ShieldCheck, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

const STORE_CONFIG = {
  amazon: { name: 'Amazon', color: '#ff9900', urlPattern: (slug) => `https://www.amazon.com/s?k=${slug.replace(/-/g, '+')}&tag=helpvloggers-20` },
  bhphoto: { name: 'B&H Photo Video', color: '#0066cc', urlPattern: (slug) => `https://www.bhphotovideo.com/c/search?Ntt=${slug.replace(/-/g, '+')}` },
  adorama: { name: 'Adorama', color: '#d92525', urlPattern: (slug) => `https://www.adorama.com/l/?searchinfo=${slug.replace(/-/g, '+')}` },
  bestbuy: { name: 'Best Buy', color: '#fff200', urlPattern: (slug) => `https://www.bestbuy.com/site/searchpage.jsp?st=${slug.replace(/-/g, '+')}` },
  dji: { name: 'DJI Official Store', color: '#000000', urlPattern: (slug) => `https://store.dji.com/search?keyword=${slug.replace(/-/g, '+')}` }
};

export default function AffiliateRedirectPage() {
  const { store, slug } = useParams();
  const [countdown, setCountdown] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const product = VLOGGING_PRODUCTS.find(p => p.id === slug);
  const storeInfo = STORE_CONFIG[store?.toLowerCase()] || {
    name: store ? store.toUpperCase() : 'Partner Retailer',
    color: '#00f2fe',
    urlPattern: (s) => `https://www.google.com/search?q=${s}+buy`
  };

  const destinationUrl = storeInfo.urlPattern(slug || 'vlogging-gear');

  const handleProceed = () => {
    setIsRedirecting(true);
    window.open(destinationUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
      <div className="glass-panel glow-border" style={{ padding: '40px 30px', borderRadius: '24px' }}>
        {/* Security Shield */}
        <div style={{ 
          width: '64px', 
          height: '64px', 
          borderRadius: '50%', 
          background: 'rgba(0, 242, 254, 0.1)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 20px',
          border: '1px solid rgba(0, 242, 254, 0.3)'
        }}>
          <ShieldCheck size={32} color="#00f2fe" />
        </div>

        <span style={{ fontSize: '0.8rem', color: '#00f2fe', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
          Secure Outbound Forwarding
        </span>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '10px 0 16px' }}>
          Visiting {storeInfo.name}
        </h1>

        {product && (
          <div style={{ 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.08)', 
            borderRadius: '14px', 
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} 
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>
                {product.title}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Selected retailer: <span style={{ color: '#00f2fe', fontWeight: 700 }}>{storeInfo.name}</span>
              </div>
            </div>
          </div>
        )}

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
          HelpVloggers partners with verified retailers. When you purchase through our links, we may earn an affiliate commission at zero additional cost to you.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={handleProceed}
            className="cta-button"
            id="proceed-outbound-btn"
            style={{ 
              width: '100%', 
              fontSize: '1rem', 
              padding: '14px 20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '10px',
              textDecoration: 'none'
            }}
          >
            <span>Proceed to {storeInfo.name}</span>
            <ExternalLink size={18} />
          </button>

          <Link
            to={product ? `/product/${product.id}` : '/'}
            className="btn-filter-pill"
            style={{ 
              width: '100%', 
              textAlign: 'center', 
              justifyContent: 'center', 
              textDecoration: 'none',
              padding: '10px',
              fontSize: '0.85rem'
            }}
          >
            <ArrowLeft size={16} style={{ marginRight: 6 }} /> Stay on HelpVloggers
          </Link>
        </div>
      </div>
    </div>
  );
}
