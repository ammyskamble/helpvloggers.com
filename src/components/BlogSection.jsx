import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_CLUSTERS, VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { BookOpen, Clock, ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';

export default function BlogSection() {
  const { formatPrice } = useEcommerce();

  return (
    <section style={{ margin: '50px 0 20px' }}>
      <div className="section-header" style={{ marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff9900', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
            <ShoppingBag size={15} /> Verified Creator Buying Guides
          </div>
          <h2 className="section-title">
            Expert Buying Advice & Studio Setup Guides
          </h2>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lab-Tested Recommendations Before You Buy</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {BLOG_CLUSTERS.map(blog => {
          // Find featured products referenced in this guide
          const relatedProducts = (blog.relatedProductIds || [])
            .map(id => VLOGGING_PRODUCTS.find(p => p.id === id))
            .filter(Boolean);

          return (
            <div 
              className="glass-panel glow-border" 
              key={blog.id} 
              style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(10, 13, 36, 0.95) 100%)'
              }}
            >
              <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
                <Link to={`/blog/${blog.id}`}>
                  <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Link>
                <div className="keyword-tag-float" style={{ background: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 153, 0, 0.4)', color: '#ff9900' }}>
                  🛒 {blog.category}
                </div>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  <Clock size={13} /> {blog.readTime} • Researched by {blog.author}
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '8px', lineHeight: 1.35 }}>
                  <Link to={`/blog/${blog.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {blog.title}
                  </Link>
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', flex: 1, lineHeight: 1.5 }}>
                  {blog.excerpt}
                </p>

                {/* Featured Products Included in This Guide */}
                {relatedProducts.length > 0 && (
                  <div style={{ 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    border: '1px solid rgba(255, 255, 255, 0.06)', 
                    borderRadius: '10px', 
                    padding: '10px 12px', 
                    marginBottom: '14px' 
                  }}>
                    <div style={{ fontSize: '0.72rem', color: '#ff9900', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                      Recommended Gear In This Guide:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {relatedProducts.map(p => (
                        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                          <span style={{ color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '190px' }}>
                            • {p.title}
                          </span>
                          <span style={{ color: '#00f2fe', fontWeight: 700, flexShrink: 0 }}>
                            {formatPrice(p.priceINR, p.priceUSD)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    to={`/blog/${blog.id}`}
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      borderRadius: '8px',
                      background: 'rgba(0, 242, 254, 0.1)',
                      color: '#00f2fe',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      border: '1px solid rgba(0, 242, 254, 0.3)',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Read Buying Guide</span>
                    <ArrowRight size={14} />
                  </Link>

                  {relatedProducts.length > 0 && (
                    <Link
                      to={`/product/${relatedProducts[0].id}`}
                      style={{
                        padding: '9px 12px',
                        borderRadius: '8px',
                        background: 'rgba(255, 153, 0, 0.15)',
                        color: '#ff9900',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        border: '1px solid rgba(255, 153, 0, 0.3)',
                        textDecoration: 'none'
                      }}
                    >
                      <ShoppingBag size={14} />
                      <span>Shop Gear</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
