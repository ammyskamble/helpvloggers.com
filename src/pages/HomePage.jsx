import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VLOGGING_PRODUCTS, BLOG_CLUSTERS } from '../data/vloggingProducts';
import { useEcommerce } from '../context/EcommerceContext';
import { ShoppingBag, ArrowRight, Star, Clock, CheckCircle, ShieldCheck } from 'lucide-react';

import CategoryBrandBanners from '../components/CategoryBrandBanners';
import SmartphoneVloggingGuide from '../components/SmartphoneVloggingGuide';

const INDIA_TABS = [
  { id: 'in-all', label: '🔥 Top Indian Deals', filter: (p) => p.market === 'india' && p.discountPercent >= 50, subPageUrl: '/shop?market=india&discount=50' },
  { id: 'in-digitek', label: 'Digitek 🇮🇳', filter: (p) => p.brand.toLowerCase() === 'digitek', subPageUrl: '/shop?brand=Digitek&market=india' },
  { id: 'in-boya', label: 'Boya', filter: (p) => p.brand.toLowerCase() === 'boya', subPageUrl: '/shop?brand=Boya&market=india' },
  { id: 'in-grenaro', label: 'Grenaro 🇮🇳', filter: (p) => p.brand.toLowerCase() === 'grenaro', subPageUrl: '/shop?brand=Grenaro&market=india' },
  { id: 'in-budget', label: 'Under ₹1,500 🇮🇳', filter: (p) => p.market === 'india' && p.priceINR <= 1500, subPageUrl: '/shop?priceRange=under-1000&market=india' }
];

const GLOBAL_TABS = [
  { id: 'gl-all', label: '🔥 Top Global Deals', filter: (p) => p.market === 'global' && p.discountPercent >= 15, subPageUrl: '/shop?market=global&discount=15' },
  { id: 'gl-dji', label: 'DJI Flagship', filter: (p) => p.brand.toLowerCase() === 'dji', subPageUrl: '/shop?brand=DJI&market=global' },
  { id: 'gl-sony', label: 'Sony Cinema', filter: (p) => p.brand.toLowerCase() === 'sony', subPageUrl: '/shop?brand=Sony&market=global' },
  { id: 'gl-smallrig', label: 'SmallRig Rigs', filter: (p) => p.brand.toLowerCase() === 'smallrig', subPageUrl: '/shop?brand=SmallRig&market=global' },
  { id: 'gl-ulanzi', label: 'Ulanzi & SanDisk', filter: (p) => p.brand.toLowerCase() === 'ulanzi' || p.brand.toLowerCase() === 'sandisk', subPageUrl: '/shop?market=global' }
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "YouTube Content Creator (120K Subs)",
    city: "New Delhi, India",
    comment: "I was confused between Digitek DWM-101 and Boya wireless mics. The honest frequency comparison and direct discount links on HelpVloggers saved me ₹2,000. Super clean and easy to follow."
  },
  {
    name: "Neha Kapoor",
    role: "Voiceover Artist & Podcaster",
    city: "Mumbai, India",
    comment: "One of the few creator review sites that actually explains real audio quality and background noise handling instead of copying spec sheets. The test recommendations are spot-on."
  },
  {
    name: "Ravi Chauhan",
    role: "Tech Reviewer & Streamer",
    city: "Bengaluru, India",
    comment: "The DJI Mic 2 vs Digitek comparison was straight to the point. Love how the Indian and Global prices are kept crystal clear with direct Amazon.in and Flipkart discounts."
  }
];

const BRANDS_LIST = [
  { name: "Digitek", tag: "India #1 Mics" },
  { name: "Boya", tag: "Omni Lapels" },
  { name: "DJI", tag: "Mic 2 & Pocket 3" },
  { name: "Sony", tag: "ZV Vlogging Cams" },
  { name: "Grenaro", tag: "Reels & Shorts Mics" },
  { name: "SmallRig", tag: "Mobile Cinema Cages" },
  { name: "Tygot", tag: "Gorilla Tripods" },
  { name: "Osaka", tag: "Pocket Bi-Color LED" }
];

export default function HomePage() {
  const { market, setMarket, formatPrice } = useEcommerce();
  const [activeIndiaTabId, setActiveIndiaTabId] = useState('in-all');
  const [activeGlobalTabId, setActiveGlobalTabId] = useState('gl-all');

  const currentTabs = market === 'global' ? GLOBAL_TABS : INDIA_TABS;
  const activeTabId = market === 'global' ? activeGlobalTabId : activeIndiaTabId;
  const setActiveTabId = market === 'global' ? setActiveGlobalTabId : setActiveIndiaTabId;

  const currentTab = currentTabs.find(t => t.id === activeTabId) || currentTabs[0];
  const featuredProducts = VLOGGING_PRODUCTS.filter(currentTab.filter).slice(0, 4);

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* 1. 5 BIG BRAND CATEGORY BANNERS (Exact MicPrice.com 530px Full-Width & Horizontal Slider Animation) */}
      <CategoryBrandBanners />

      {/* Main Content Container */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 20px 0' }}>
        {/* 2. FEW PRODUCTS (MicPrice.com Featured Products Section with Distinct Market Sections) */}
        <section id="featured-products-section" style={{ marginBottom: '55px' }}>
        {/* Market Switcher Row (India vs Global Section - No Conflict!) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '14px', 
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0 }}>
                Featured Products
              </h2>
              <span style={{ 
                background: market === 'india' ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 153, 0, 0.15)',
                color: market === 'india' ? '#00f2fe' : '#ff9900',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                {market === 'india' ? '🇮🇳 Indian Creator Market' : '🌐 Global Pro Market'}
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
              {market === 'india' 
                ? 'Hand-tested creator mics & rigs with direct discounts on Amazon.in and Flipkart (₹ INR)'
                : 'Flagship 4K cinema gear, DJI wireless mics & SmallRig rigs tested for pro creators ($ USD)'
              }
            </p>
          </div>

          {/* Clean Segmented Market Switcher */}
          <div style={{ 
            display: 'inline-flex', 
            background: 'rgba(10, 15, 30, 0.9)', 
            border: '1px solid rgba(255, 255, 255, 0.12)', 
            borderRadius: '24px', 
            padding: '3px' 
          }}>
            <button
              onClick={() => setMarket('india')}
              style={{
                background: market === 'india' ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'transparent',
                color: market === 'india' ? '#050714' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 16px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🇮🇳 India Market (₹ INR)
            </button>
            <button
              onClick={() => setMarket('global')}
              style={{
                background: market === 'global' ? 'linear-gradient(135deg, #ff9900, #ff5500)' : 'transparent',
                color: market === 'global' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 16px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🌐 Global Market ($ USD)
            </button>
          </div>
        </div>

        {/* Brand Category Filter Pills (Tailored to active market) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {currentTabs.map(tab => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  style={{
                    padding: '7px 18px',
                    borderRadius: '20px',
                    background: isActive 
                      ? (market === 'india' ? '#00f2fe' : '#ff9900') 
                      : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? '#050714' : 'var(--text-secondary)',
                    border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <Link 
            to={currentTab.subPageUrl}
            style={{ 
              color: market === 'india' ? '#00f2fe' : '#ff9900', 
              fontWeight: 700, 
              fontSize: '0.85rem', 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px' 
            }}
          >
            <span>View All ({currentTab.label})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Exactly 4 Featured Product Cards (MicPrice.com Card Style with GET DISCOUNT Button) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '26px' }}>
          {featuredProducts.map(product => (
            <div 
              key={product.id}
              className="glass-panel glow-border"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(10, 13, 36, 0.65)',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              {/* Product Photo with Sale Badge */}
              <div style={{ height: '190px', position: 'relative', overflow: 'hidden', background: '#0a0d24' }}>
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </Link>

                {product.discountPercent > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: '#ff2d55',
                    color: '#fff',
                    padding: '3px 9px',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    letterSpacing: '0.5px'
                  }}>
                    - {product.discountPercent}%
                  </div>
                )}

                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'rgba(0, 0, 0, 0.75)',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}>
                  <Star size={11} fill="#f6d365" color="#f6d365" /> {product.rating}
                </div>
              </div>

              {/* Product Details */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <span style={{ color: market === 'india' ? '#00f2fe' : '#ff9900', fontWeight: 800 }}>{product.brand}</span>
                    <span>{product.origin || 'Verified'}</span>
                  </div>

                  <h3 style={{ fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.35, marginBottom: '10px', height: '38px', overflow: 'hidden' }}>
                    <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {product.title}
                    </Link>
                  </h3>

                  {/* Price Block */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: market === 'india' ? '#00f2fe' : '#ff9900' }}>
                      {formatPrice(product.priceINR, product.priceUSD)}
                    </span>
                    {product.mrpINR && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        {market === 'india' 
                          ? `₹${product.mrpINR.toLocaleString('en-IN')}`
                          : `$${((product.mrpINR / 83) || product.priceUSD * 1.3).toFixed(2)}`
                        }
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct GET DISCOUNT Button (MicPrice.com Style) */}
                <Link
                  to={product.prices[0]?.url || `/product/${product.id}`}
                  rel="nofollow sponsored"
                  style={{
                    padding: '10px 14px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    textDecoration: 'none',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #ff9900 0%, #ff5500 100%)',
                    color: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(255, 153, 0, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ShoppingBag size={15} />
                  <span>GET DISCOUNT</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to={market === 'india' ? '/shop?market=india' : '/shop?market=global'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 26px',
              borderRadius: '24px',
              background: market === 'india' ? 'rgba(0, 242, 254, 0.08)' : 'rgba(255, 153, 0, 0.08)',
              border: market === 'india' ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid rgba(255, 153, 0, 0.3)',
              color: market === 'india' ? '#00f2fe' : '#ff9900',
              fontWeight: 800,
              fontSize: '0.85rem',
              textDecoration: 'none'
            }}
          >
            <span>View All {market === 'india' ? 'Indian' : 'Global'} Products in Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 3. WHICH SMARTPHONE IS BETTER FOR VLOGGING (Interactive Lab & Spec Shootout) */}
      <SmartphoneVloggingGuide />

      {/* 4. FEW BLOGS RELATED TO PRODUCT (MicPrice.com Latest Blog Section) */}
      <section style={{ marginBottom: '55px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0 }}>
            Latest Buying Guides & Reviews
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
            Real test recordings and honest opinions to help you choose the right gear
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
          {BLOG_CLUSTERS.slice(0, 3).map(blog => {
            const relatedProducts = (blog.relatedProductIds || [])
              .map(id => VLOGGING_PRODUCTS.find(p => p.id === id))
              .filter(Boolean);

            return (
              <div 
                key={blog.id} 
                className="glass-panel glow-border"
                style={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(10, 13, 36, 0.65)'
                }}
              >
                <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                  <Link to={`/blog/${blog.id}`}>
                    <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Link>
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(0, 0, 0, 0.85)',
                    color: '#ff9900',
                    border: '1px solid rgba(255, 153, 0, 0.4)',
                    padding: '3px 9px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 800
                  }}>
                    {blog.category}
                  </div>
                </div>

                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      <Clock size={12} /> {blog.readTime} • By {blog.author}
                    </div>

                    <h3 style={{ fontSize: '1.02rem', fontWeight: 800, lineHeight: 1.35, marginBottom: '8px' }}>
                      <Link to={`/blog/${blog.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {blog.title}
                      </Link>
                    </h3>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                      {blog.excerpt}
                    </p>

                    {/* Featured Products Mentioned in this Guide */}
                    {relatedProducts.length > 0 && (
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '8px',
                        padding: '8px 10px',
                        marginBottom: '14px',
                        fontSize: '0.75rem'
                      }}>
                        <div style={{ color: '#ff9900', fontWeight: 800, marginBottom: '4px', textTransform: 'uppercase', fontSize: '0.68rem' }}>
                          Featured In This Guide:
                        </div>
                        {relatedProducts.map(p => (
                          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', margin: '3px 0' }}>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>• {p.title}</span>
                            <span style={{ color: '#00f2fe', fontWeight: 800, flexShrink: 0 }}>{formatPrice(p.priceINR, p.priceUSD)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/blog/${blog.id}`}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(0, 242, 254, 0.08)',
                      border: '1px solid rgba(0, 242, 254, 0.3)',
                      color: '#00f2fe',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Read Full Guide & Review</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CREATOR TESTIMONIALS (MicPrice.com Testimonials Section) */}
      <section style={{ marginBottom: '55px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>
            What Creators Say About HelpVloggers
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
            Independent field reviews trusted by YouTubers, vloggers, and reel artists
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {TESTIMONIALS.map((t, i) => (
            <div 
              key={i} 
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(10, 15, 32, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '2px', color: '#f6d365', marginBottom: '10px' }}>
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={14} fill="#f6d365" color="#f6d365" />
                  ))}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, fontStyle: 'italic' }}>
                  "{t.comment}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '12px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #00f2fe, #ff9900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#050714', fontSize: '0.85rem' }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.role} • {t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BRAND TRUST STRIP (MicPrice.com Brand Logos) */}
      <section style={{ 
        padding: '24px 20px', 
        borderRadius: '16px', 
        background: 'rgba(10, 13, 30, 0.5)', 
        border: '1px solid rgba(255, 255, 255, 0.06)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 800 }}>
            Featured Creator Brands & Verified Discounts
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          {BRANDS_LIST.map((b, idx) => (
            <Link 
              key={idx} 
              to={`/shop?brand=${b.name}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00f2fe';
                e.currentTarget.style.background = 'rgba(0, 242, 254, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <span style={{ fontSize: '1rem', fontWeight: 900, color: '#fff' }}>{b.name}</span>
              <span style={{ fontSize: '0.68rem', color: '#ff9900', fontWeight: 700 }}>{b.tag}</span>
            </Link>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
