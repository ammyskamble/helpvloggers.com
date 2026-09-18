import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_CLUSTERS, VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { Clock, User, Calendar, ChevronRight, ArrowLeft, ShoppingBag, CheckCircle2, Bookmark } from 'lucide-react';

export default function BlogDetailPage() {
  const { blogId } = useParams();

  const blog = BLOG_CLUSTERS.find(b => b.id === blogId);

  if (!blog) {
    return (
      <div className="glass-panel" style={{ padding: '80px 20px', textAlign: 'center', margin: '40px auto', maxWidth: '600px', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Guide Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          The vlogging setup playbook or troubleshooting guide you are looking for does not exist.
        </p>
        <Link to="/" className="btn-gradient-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Return to Home Catalog
        </Link>
      </div>
    );
  }

  // Get recommended products featured in this blog
  const recommendedProducts = blog.relatedProductIds
    ? blog.relatedProductIds.map(id => VLOGGING_PRODUCTS.find(p => p.id === id)).filter(Boolean)
    : [];

  return (
    <article style={{ padding: '20px 0 60px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-secondary)' }}>Guides</span>
        <ChevronRight size={14} />
        <span style={{ color: '#00f2fe', fontWeight: 700 }}>{blog.category}</span>
      </nav>

      {/* Article Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.3)', color: '#00f2fe', fontSize: '0.8rem', fontWeight: 800, marginBottom: '16px' }}>
          📌 {blog.category} Playbook
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, marginBottom: '18px' }}>
          {blog.title}
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <User size={15} color="#00f2fe" /> {blog.author}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={15} /> {blog.publishedDate || '2026 Edition'}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={15} /> {blog.readTime}
          </span>
          <span className="keyword-tag-float" style={{ position: 'static' }}>
            🎯 Target Query: "{blog.targetKeyword}"
          </span>
        </div>
      </div>

      {/* Featured Banner Image */}
      <div className="glass-panel glow-border" style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '40px', maxHeight: '420px' }}>
        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Excerpt Lead Box */}
      <div style={{
        background: 'rgba(0, 242, 254, 0.05)',
        borderLeft: '4px solid #00f2fe',
        padding: '20px 24px',
        borderRadius: '0 14px 14px 0',
        fontSize: '1.1rem',
        lineHeight: 1.65,
        color: '#e2e8f0',
        marginBottom: '40px'
      }}>
        {blog.excerpt}
      </div>

      {/* Structured Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', marginBottom: '60px' }}>
        {blog.sections && blog.sections.map((sec, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '28px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '14px', color: '#fff' }}>
              {sec.heading}
            </h2>
            <div style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
              {sec.content}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Gear in this Guide */}
      {recommendedProducts.length > 0 && (
        <div className="glass-panel glow-border" style={{ padding: '32px', borderRadius: '20px', marginBottom: '50px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark color="#00f2fe" size={20} /> Recommended Gear in This Guide
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            All tested products with verified real-time prices across major retailers:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {recommendedProducts.map(prod => (
              <div 
                key={prod.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <Link to={`/product/${prod.id}`} style={{ fontWeight: 800, color: '#fff', textDecoration: 'none', fontSize: '1rem' }}>
                    {prod.title}
                  </Link>
                  <div style={{ fontSize: '0.8rem', color: '#00f2fe', marginTop: 4 }}>
                    {prod.badge} • From ${prod.prices[0].price.toFixed(2)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link to={`/product/${prod.id}`} className="btn-filter-pill" style={{ textDecoration: 'none', padding: '6px 14px', fontSize: '0.8rem' }}>
                    Review & Specs
                  </Link>
                  <Link to={prod.prices[0].url} className="cta-button" style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.8rem' }}>
                    <ShoppingBag size={14} /> Buy on {prod.prices[0].store}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back to guides link */}
      <div style={{ textAlign: 'center' }}>
        <Link to="/" className="btn-filter-pill" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Back to Gear Catalog & Setup Playbooks
        </Link>
      </div>
    </article>
  );
}
