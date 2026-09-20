import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VLOGGING_PRODUCTS, BLOG_CLUSTERS, HEAD_TO_HEAD_COMPARISONS } from '../data/vloggingProducts';
import { useEcommerce } from '../context/EcommerceContext';
import { Star, Volume2, ShieldCheck, ShoppingBag, ChevronRight, CheckCircle2, XCircle, ArrowLeft, ExternalLink, Zap, Heart, Truck, Tag, BookOpen, ArrowRight } from 'lucide-react';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { currency, formatPrice, wishlist, toggleWishlist, compareList, toggleCompare } = useEcommerce();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const product = VLOGGING_PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="glass-panel" style={{ padding: '80px 20px', textAlign: 'center', margin: '40px auto', maxWidth: '600px', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Product Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          The product you are looking for does not exist or has been relocated.
        </p>
        <Link to="/" className="btn-gradient-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Return to Home Catalog
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const handleAudioToggle = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      setTimeout(() => setIsPlayingAudio(false), 4500);
    }
  };

  const relatedComparisons = HEAD_TO_HEAD_COMPARISONS.filter(
    c => c.prodA.id === product.id || c.prodB.id === product.id
  );

  const relatedBlogs = BLOG_CLUSTERS.filter(
    b => b.relatedProductIds && b.relatedProductIds.includes(product.id)
  );

  const bestStore = product.prices.find(p => p.bestDeal) || product.prices[0];

  return (
    <div style={{ padding: '20px 0 60px' }}>
      {/* 3-Tier Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${product.category}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          {product.categoryName}
        </Link>
        {product.subCategoryName && (
          <>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--text-muted)' }}>{product.subCategoryName}</span>
          </>
        )}
        <ChevronRight size={14} />
        <span style={{ color: '#00f2fe', fontWeight: 700 }}>{product.title}</span>
      </nav>

      {/* Product Hero Layout: Image + Buying Box */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '50px' }}>
        {/* Left: Product Image & Badges */}
        <div>
          <div className="glass-panel glow-border" style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{ width: '100%', height: '420px', objectFit: 'cover' }} 
            />

            {product.discountPercent > 0 && (
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: '#ff0844',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 900,
                padding: '4px 10px',
                borderRadius: '6px'
              }}>
                {product.discountPercent}% OFF
              </div>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(5, 7, 20, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Heart size={20} color={isWishlisted ? "#ff0844" : "#fff"} fill={isWishlisted ? "#ff0844" : "none"} />
            </button>

            <div className="keyword-tag-float">
              🏷️ Micro-Category: "{product.microCategoryName || product.targetKeyword}"
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
            <span className="badge-pill badge-top-pick">{product.badge}</span>
            <span className="badge-pill" style={{ background: 'rgba(255, 153, 0, 0.15)', color: '#ff9900' }}>
              {product.brand}
            </span>
            <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}>
              {product.origin || 'Certified Equipment'}
            </span>
          </div>
        </div>

        {/* Right: Key Specs, Pricing Box & Multi-Store Grid */}
        <div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 900, marginBottom: '10px', lineHeight: 1.25 }}>
            {product.title}
          </h1>

          {/* Ratings */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', color: '#f6d365' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#f6d365" />
              ))}
            </div>
            <span style={{ fontWeight: 800, fontSize: '1rem' }}>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              ({product.reviewCount.toLocaleString()} verified creator reviews)
            </span>
          </div>

          {/* E-Commerce Price Block */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            borderRadius: '14px',
            padding: '18px 22px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#00f2fe' }}>
                {formatPrice(product.priceINR, product.priceUSD)}
              </span>
              {product.mrpINR && (
                <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  M.R.P.: ₹{product.mrpINR.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span style={{ background: 'rgba(255, 8, 68, 0.2)', color: '#ff0844', border: '1px solid #ff0844', padding: '2px 8px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 800 }}>
                  You Save: ₹{(product.mrpINR - product.priceINR).toLocaleString('en-IN')} ({product.discountPercent}% OFF)
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38ef7d', fontSize: '0.88rem', marginTop: '6px', fontWeight: 700 }}>
              <Truck size={16} /> {product.deliverySpeed || "Fast Shipping across India"}
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>
            {product.summary}
          </p>

          {/* Audio Test Widget for Microphones */}
          {product.audioSamples && (
            <div className="audio-widget" style={{ marginBottom: '20px' }}>
              <button className="play-btn" onClick={handleAudioToggle}>
                <Volume2 size={20} />
              </button>
              <div>
                <div style={{ fontWeight: 800, color: '#00f2fe' }}>
                  {isPlayingAudio ? "🔊 Playing 30mph Outdoor Wind Noise Test..." : "🎧 Test Audio Benchmark"}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {isPlayingAudio ? "Active Noise Cancellation Test Active" : product.audioSamples.windy}
                </div>
              </div>
            </div>
          )}

          {/* Multi-Store Price Grid */}
          <div className="glass-panel glow-border" style={{ padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ff9900', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingBag size={16} /> Multi-Store Live Price Comparison
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {product.prices.map((p, idx) => (
                <div 
                  key={idx} 
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: p.bestDeal ? 'rgba(255, 153, 0, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    border: p.bestDeal ? '1px solid rgba(255, 153, 0, 0.35)' : '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.store}</span>
                    {p.bestDeal && (
                      <span style={{ marginLeft: '8px', fontSize: '0.72rem', background: '#ff9900', color: '#050714', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                        LOWEST PRICE
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontWeight: 900, fontSize: '1.15rem', color: '#00f2fe' }}>
                      {formatPrice(p.priceINR, p.priceUSD)}
                    </span>
                    <Link
                      to={p.url}
                      className="btn-filter-pill"
                      style={{ padding: '6px 12px', fontSize: '0.8rem', textDecoration: 'none' }}
                    >
                      Visit Store <ExternalLink size={12} style={{ marginLeft: 4 }} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Buy CTA */}
            <Link
              to={bestStore.url}
              className="cta-button"
              style={{ 
                width: '100%', 
                marginTop: '16px', 
                textAlign: 'center', 
                display: 'flex', 
                justifyContent: 'center', 
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #ff9900 0%, #ff5722 100%)',
                fontSize: '1rem',
                padding: '12px 20px'
              }}
            >
              <ShoppingBag size={18} /> Buy on {bestStore.store} ({formatPrice(bestStore.priceINR, bestStore.priceUSD)})
            </Link>
          </div>
        </div>
      </div>

      {/* Dedicated Editorial Review & In-Depth Buying Guide Link */}
      {relatedBlogs.length > 0 && (
        <div 
          className="glass-panel glow-border" 
          style={{ 
            padding: '26px 30px', 
            borderRadius: '20px', 
            marginBottom: '40px',
            background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(255, 153, 0, 0.06) 100%)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff9900', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              <BookOpen size={14} /> Full Editorial Lab Review Available
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              {relatedBlogs[0].title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
              {relatedBlogs[0].excerpt}
            </p>
            {relatedBlogs[0].launchTimeline && (
              <div style={{ fontSize: '0.75rem', color: '#00f2fe', marginTop: '8px', fontWeight: 700 }}>
                🚀 {relatedBlogs[0].launchTimeline}
              </div>
            )}
          </div>

          <Link
            to={`/blog/${relatedBlogs[0].id}`}
            className="btn-gradient-primary"
            style={{
              textDecoration: 'none',
              padding: '12px 22px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <span>Read In-Depth Review & FAQs</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Deep Specs & Pros/Cons Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '18px' }}>
            Technical Specifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(product.specs).map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{label}</span>
                <span style={{ fontWeight: 700, color: '#fff' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '18px' }}>
            Creator Lab Pros & Cons
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#00f2fe', fontSize: '0.92rem', fontWeight: 800, marginBottom: '10px' }}>
              ✓ Advantages
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {product.pros ? product.pros.map((pro, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#00f2fe" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{pro}</span>
                </div>
              )) : (
                <div style={{ fontSize: '0.9rem' }}>High-value creator build.</div>
              )}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#ff6b6b', fontSize: '0.92rem', fontWeight: 800, marginBottom: '10px' }}>
              ⚠ Trade-offs
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {product.cons ? product.cons.map((con, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.9rem' }}>
                  <XCircle size={16} color="#ff6b6b" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{con}</span>
                </div>
              )) : (
                <div style={{ fontSize: '0.9rem' }}>Requires compatible mounting adapters.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
