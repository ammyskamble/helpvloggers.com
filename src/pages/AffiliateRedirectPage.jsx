import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { VLOGGING_SMARTPHONES } from '../data/vloggingSmartphones';
import { AFFILIATE_CONFIG, getAmazonAffiliateUrl } from '../config/affiliateConfig';
import { ExternalLink, ShieldCheck, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

export default function AffiliateRedirectPage() {
  const { store, slug } = useParams();
  const [countdown, setCountdown] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const cleanStore = (store || '').toLowerCase().replace(/[\._]/g, '-');
  const product = VLOGGING_PRODUCTS.find(p => p.id === slug) || VLOGGING_SMARTPHONES.find(p => p.id === slug);
  const productName = product?.title || product?.name || slug?.replace(/-/g, ' ');

  // Find store pricing info if product exists
  const storePriceEntry = product?.prices?.find(p => {
    const pStore = p.store.toLowerCase().replace(/[\._]/g, '-');
    return pStore.includes(cleanStore) || cleanStore.includes(pStore);
  });

  // Determine Destination URL and Retailer Info
  let destinationUrl = '';
  let storeName = 'Amazon.in';
  let storeColor = '#ff9900';

  if (cleanStore.includes('amazon')) {
    const isIndia = cleanStore.includes('in') || (!cleanStore.includes('com') && !cleanStore.includes('us'));
    storeName = isIndia ? 'Amazon.in' : 'Amazon.com';
    storeColor = '#ff9900';

    destinationUrl = getAmazonAffiliateUrl({
      country: isIndia ? 'IN' : 'US',
      asin: storePriceEntry?.asin || product?.asin,
      directAffiliateUrl: storePriceEntry?.directAffiliateUrl || product?.directAffiliateUrl,
      searchQuery: productName,
      slug
    });
  } else if (cleanStore.includes('flipkart')) {
    storeName = 'Flipkart';
    storeColor = '#2874f0';
    destinationUrl = storePriceEntry?.directAffiliateUrl || `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}&affid=${AFFILIATE_CONFIG.flipkart.affiliateId}`;
  } else if (cleanStore.includes('croma')) {
    storeName = 'Croma';
    storeColor = '#00e676';
    destinationUrl = storePriceEntry?.directAffiliateUrl || `https://www.croma.com/searchB?q=${encodeURIComponent(productName)}`;
  } else if (cleanStore.includes('reliance')) {
    storeName = 'Reliance Digital';
    storeColor = '#e42529';
    destinationUrl = storePriceEntry?.directAffiliateUrl || `https://www.reliancedigital.in/search?q=${encodeURIComponent(productName)}`;
  } else if (cleanStore.includes('bhphoto')) {
    storeName = 'B&H Photo Video';
    storeColor = '#0066cc';
    destinationUrl = storePriceEntry?.directAffiliateUrl || `https://www.bhphotovideo.com/c/search?Ntt=${encodeURIComponent(productName)}`;
  } else if (cleanStore.includes('dji')) {
    storeName = 'DJI Official Store';
    storeColor = '#000000';
    destinationUrl = storePriceEntry?.directAffiliateUrl || `https://store.dji.com/search?keyword=${encodeURIComponent(productName)}`;
  } else {
    storeName = store ? store.toUpperCase() : 'Partner Retailer';
    storeColor = '#00f2fe';
    destinationUrl = `https://www.google.com/search?q=${encodeURIComponent(productName)}+buy`;
  }

  const handleProceed = () => {
    setIsRedirecting(true);
    window.open(destinationUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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
          Visiting {storeName}
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
                {productName}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Selected retailer: <span style={{ color: '#00f2fe', fontWeight: 700 }}>{storeName}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{
          background: 'rgba(0, 242, 254, 0.08)',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          borderRadius: '10px',
          padding: '10px 14px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#00f2fe',
          fontSize: '0.85rem',
          fontWeight: 700
        }}>
          <Loader2 size={16} className="spin-animation" />
          <span>Redirecting to {storeName} in {countdown} seconds...</span>
        </div>

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
            <span>Proceed to {storeName} Now</span>
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
