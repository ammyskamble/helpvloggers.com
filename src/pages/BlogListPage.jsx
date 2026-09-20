import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_CLUSTERS, VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { VLOGGING_SMARTPHONES } from '../data/vloggingSmartphones';
import { useEcommerce } from '../context/EcommerceContext';
import { 
  BookOpen, Search, Clock, Calendar, ArrowRight, 
  CheckCircle2, Sparkles, Tag, ChevronRight, ShoppingBag, 
  Filter, Award, ShieldCheck, Flame
} from 'lucide-react';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Reviews & Guides' },
  { id: 'audio-microphones', label: 'Microphones & Audio' },
  { id: 'cameras-recorders', label: 'Cameras & Pocket Cams' },
  { id: 'smartphones', label: 'Vlogging Smartphones' },
  { id: 'smartphone-rigs', label: 'Rigs & Cages' },
  { id: 'gimbals-tripods', label: 'Gimbals & Tripods' },
  { id: 'creator-lighting', label: 'Lighting & Power' }
];

export default function BlogListPage() {
  const { formatPrice } = useEcommerce();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter blogs based on activeTab and searchTerm
  const filteredBlogs = useMemo(() => {
    return BLOG_CLUSTERS.filter(blog => {
      // Tab matching
      let tabMatch = true;
      if (activeTab !== 'all') {
        const catLower = (blog.categorySlug || blog.category || '').toLowerCase();
        if (activeTab === 'smartphones') {
          tabMatch = catLower.includes('smartphone') || (blog.productId && blog.productId.includes('phone')) || (blog.productId && blog.productId.includes('s24')) || (blog.productId && blog.productId.includes('pixel')) || (blog.productId && blog.productId.includes('x100')) || (blog.productId && blog.productId.includes('s23'));
        } else {
          tabMatch = catLower.includes(activeTab.replace('-', ' ')) || catLower.includes(activeTab);
        }
      }

      // Search term matching
      let searchMatch = true;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const inTitle = (blog.title || '').toLowerCase().includes(q);
        const inExcerpt = (blog.excerpt || '').toLowerCase().includes(q);
        const inWho = (blog.whoCanUseIt || '').toLowerCase().includes(q);
        const inKeyword = (blog.targetKeyword || '').toLowerCase().includes(q);
        const inFeatures = (blog.features || []).some(f => f.toLowerCase().includes(q));
        const inIdeal = (blog.idealFor || []).some(i => i.toLowerCase().includes(q));
        searchMatch = inTitle || inExcerpt || inWho || inKeyword || inFeatures || inIdeal;
      }

      return tabMatch && searchMatch;
    });
  }, [activeTab, searchTerm]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 80px' }}>
      {/* Breadcrumb Bar */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#00f2fe', fontWeight: 700 }}>Creator Blog & Buying Guides</span>
      </nav>

      {/* Hero Header */}
      <header className="glass-panel blog-page-hero" style={{ 
        padding: '40px 32px', 
        borderRadius: '24px', 
        marginBottom: '36px',
        background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(255, 153, 0, 0.08) 50%, rgba(10, 13, 36, 0.95) 100%)',
        border: '1px solid rgba(0, 242, 254, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '820px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 14px', 
            borderRadius: '20px', 
            background: 'rgba(0, 242, 254, 0.15)', 
            border: '1px solid rgba(0, 242, 254, 0.35)', 
            color: '#00f2fe', 
            fontSize: '0.82rem', 
            fontWeight: 800, 
            marginBottom: '16px' 
          }}>
            <Flame size={15} color="#ff9900" />
            <span>Field-Tested Creator Reviews & Complete Buying Guides</span>
          </div>

          <h1 className="blog-hero-h1" style={{ fontSize: '2.6rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '14px', color: '#fff' }}>
            The HelpVloggers <span className="gradient-text">Gear Review Hub</span>
          </h1>

          <p className="blog-hero-sub" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
            Honest, no-BS lab tests for every single microphone, 4K vlogging camera, smartphone, gimbal, and studio light available in India and globally. We cover launch timelines, real street pricing, who can use it, pros and cons, and creator FAQs.
          </p>

          {/* Quick Search inside Hero */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            maxWidth: '560px', 
            background: 'rgba(6, 9, 24, 0.9)', 
            borderRadius: '30px', 
            padding: '4px 8px 4px 18px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}>
            <Search size={18} color="#00f2fe" style={{ marginRight: '10px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by gear name, model, mic type, or budget (e.g., Digitek, 32-bit, iPhone)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.92rem',
                outline: 'none',
                padding: '10px 0'
              }}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px 12px' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Category Filter Chips */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '32px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        {CATEGORY_TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flexShrink: 0,
                padding: '10px 18px',
                borderRadius: '24px',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.25), rgba(0, 242, 254, 0.1))' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: isActive ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.1)',
                color: isActive ? '#00f2fe' : 'var(--text-secondary)',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 16px rgba(0, 242, 254, 0.2)' : 'none'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
        <div>
          Showing <strong style={{ color: '#fff' }}>{filteredBlogs.length}</strong> creator reviews & playbooks
          {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00e676', fontSize: '0.82rem', fontWeight: 700 }}>
          <ShieldCheck size={16} /> 100% Unbiased Editorial Reviews
        </div>
      </div>

      {/* Blog Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '20px' }}>
          <BookOpen size={48} color="#00f2fe" style={{ margin: '0 auto 16px', opacity: 0.6 }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>No Reviews Found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            We could not find any reviews matching "{searchTerm}". Try another gear name or clear filters.
          </p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveTab('all'); }} 
            className="btn-gradient-primary"
            style={{ padding: '10px 24px', borderRadius: '20px', cursor: 'pointer', border: 'none' }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="blog-cards-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '26px' 
        }}>
          {filteredBlogs.map(blog => {
            const isProductReview = Boolean(blog.pricing);

            return (
              <article 
                key={blog.id} 
                className="glass-panel glow-border"
                style={{ 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(8, 11, 28, 0.95) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* Thumbnail Image + Badges */}
                <div style={{ height: '210px', position: 'relative', overflow: 'hidden' }}>
                  <Link to={`/blog/${blog.id}`}>
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </Link>
                  
                  {/* Category Pill */}
                  <div style={{ 
                    position: 'absolute', 
                    top: 14, 
                    left: 14, 
                    background: 'rgba(5, 7, 20, 0.85)', 
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 242, 254, 0.4)', 
                    color: '#00f2fe',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    letterSpacing: '0.4px'
                  }}>
                    {blog.category}
                  </div>

                  {/* Deal Badge */}
                  {blog.pricing && blog.pricing.badge && (
                    <div style={{ 
                      position: 'absolute', 
                      top: 14, 
                      right: 14, 
                      background: 'linear-gradient(135deg, #ff9900 0%, #ff5722 100%)', 
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      boxShadow: '0 4px 12px rgba(255, 100, 0, 0.4)'
                    }}>
                      {blog.pricing.badge}
                    </div>
                  )}

                  {/* Read Time Pill */}
                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 14,
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: '#e2e8f0',
                    fontSize: '0.72rem',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Clock size={12} /> {blog.readTime}
                  </div>
                </div>

                {/* Content Body */}
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Author & Launch Date */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    <span>By {blog.author}</span>
                    <span>{blog.publishedDate}</span>
                  </div>

                  {/* Title */}
                  <h2 style={{ fontSize: '1.18rem', fontWeight: 800, lineHeight: 1.35, marginBottom: '10px', color: '#fff' }}>
                    <Link to={`/blog/${blog.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {blog.title}
                    </Link>
                  </h2>

                  {/* Launch Timeline Badge */}
                  {blog.launchTimeline && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.74rem',
                      color: '#ff9900',
                      background: 'rgba(255, 153, 0, 0.1)',
                      border: '1px solid rgba(255, 153, 0, 0.25)',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      marginBottom: '12px',
                      fontWeight: 700
                    }}>
                      <span>🚀 {blog.launchTimeline}</span>
                    </div>
                  )}

                  {/* Pricing Bar */}
                  {blog.pricing && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'baseline', 
                      gap: '10px', 
                      padding: '8px 12px', 
                      borderRadius: '10px', 
                      background: 'rgba(0, 242, 254, 0.06)',
                      border: '1px solid rgba(0, 242, 254, 0.18)',
                      marginBottom: '14px'
                    }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Best Price:
                      </span>
                      <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#00f2fe' }}>
                        {formatPrice(blog.pricing.inr, blog.pricing.usd)}
                      </span>
                      {blog.pricing.mrpINR && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          ₹{blog.pricing.mrpINR.toLocaleString('en-IN')}
                        </span>
                      )}
                      {blog.pricing.discountPercent > 0 && (
                        <span style={{ fontSize: '0.72rem', color: '#00e676', fontWeight: 800 }}>
                          Save {blog.pricing.discountPercent}%
                        </span>
                      )}
                    </div>
                  )}

                  {/* Excerpt */}
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '16px', flex: 1 }}>
                    {blog.excerpt}
                  </p>

                  {/* "Who Can Use It" Snippet */}
                  {blog.whoCanUseIt && (
                    <div style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.78rem',
                      lineHeight: 1.45,
                      color: '#cbd5e1',
                      marginBottom: '16px'
                    }}>
                      <strong style={{ color: '#00f2fe' }}>👤 Who Should Buy: </strong>
                      {blog.whoCanUseIt}
                    </div>
                  )}

                  {/* Ideal For Badges */}
                  {blog.idealFor && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                      {blog.idealFor.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i} 
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: 'var(--text-muted)'
                          }}
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom Action CTAs */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <Link
                      to={`/blog/${blog.id}`}
                      className="btn-gradient-primary"
                      style={{
                        flex: 1,
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontSize: '0.84rem',
                        fontWeight: 800,
                        padding: '10px 14px',
                        borderRadius: '10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Read Full Review</span>
                      <ArrowRight size={14} />
                    </Link>

                    {blog.productId && (
                      <Link
                        to={blog.productId.includes('iphone') || blog.productId.includes('s24') || blog.productId.includes('pixel') || blog.productId.includes('vivo') || blog.productId.includes('s23') 
                          ? `/vlogging-smartphones` 
                          : `/product/${blog.productId}`}
                        className="btn-filter-pill"
                        style={{
                          textDecoration: 'none',
                          padding: '10px 14px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <ShoppingBag size={14} color="#ff9900" />
                        <span>Specs & Deal</span>
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* SEO Bottom Information Section */}
      <section className="glass-panel" style={{ 
        marginTop: '60px', 
        padding: '36px', 
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '14px', color: '#fff' }}>
          How HelpVloggers Evaluates Creator Gear
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '16px' }}>
          Every microphone, mobile camera cage, tripod, and vlogging smartphone listed on HelpVloggers undergoes rigorous testing in real creator environments. Our audio specialists in Raipur and Mumbai test wireless lapels against outdoor motorcycle traffic, monsoon wind, and noisy street markets to measure active DSP noise reduction algorithms and 32-bit float headroom before publishing recommendations.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ color: '#00f2fe', fontWeight: 800, marginBottom: '6px' }}>🎙️ Vocal Clarity Scoring</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tested with Type-C and Lightning smartphones at 1m, 10m, and 30m range.</div>
          </div>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ color: '#ff9900', fontWeight: 800, marginBottom: '6px' }}>💰 Best Deal Tracking</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Verified real-time pricing across Amazon India, Flipkart, and authorized brand stores.</div>
          </div>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ color: '#00e676', fontWeight: 800, marginBottom: '6px' }}>❓ Creator FAQs & Solutions</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Troubleshooting OTG latency, camera apps, and cold-shoe rig combinations.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
