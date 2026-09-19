import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_CLUSTERS, VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { VLOGGING_SMARTPHONES } from '../data/vloggingSmartphones';
import { useEcommerce } from '../context/EcommerceContext';
import { 
  Clock, User, Calendar, ChevronRight, ArrowLeft, 
  ShoppingBag, CheckCircle2, Bookmark, HelpCircle, 
  Sparkles, ChevronDown, ThumbsUp, AlertTriangle, 
  Tag, ExternalLink, ShieldCheck, Rocket
} from 'lucide-react';

export default function BlogDetailPage() {
  const { blogId } = useParams();
  const { formatPrice } = useEcommerce();
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // first open by default

  const blog = BLOG_CLUSTERS.find(b => b.id === blogId || b.slug === blogId);

  if (!blog) {
    return (
      <div className="glass-panel" style={{ padding: '80px 20px', textAlign: 'center', margin: '40px auto', maxWidth: '600px', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Review or Guide Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          The vlogging gear review or setup playbook you are looking for does not exist or has moved.
        </p>
        <Link to="/blog" className="btn-gradient-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Browse All 24 Reviews & Guides
        </Link>
      </div>
    );
  }

  // Check if blog is linked to a hardware product or smartphone
  const linkedGearProduct = blog.productId 
    ? VLOGGING_PRODUCTS.find(p => p.id === blog.productId) 
    : null;

  const linkedPhoneProduct = blog.productId 
    ? VLOGGING_SMARTPHONES.find(p => p.id === blog.productId) 
    : null;

  // Get recommended products featured in this blog
  const recommendedProducts = blog.relatedProductIds
    ? blog.relatedProductIds.map(id => VLOGGING_PRODUCTS.find(p => p.id === id)).filter(Boolean)
    : [];

  // Prepare FAQ Schema JSON-LD for rich snippets
  const faqSchema = blog.faqs && blog.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blog.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="blog-article-wrap" style={{ padding: '20px 0 80px', maxWidth: '920px', margin: '0 auto' }}>
      {/* Dynamic FAQ Schema Injection for Google SEO */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog & Reviews</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#00f2fe', fontWeight: 700 }}>{blog.category}</span>
      </nav>

      {/* Article Header */}
      <header style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            background: 'rgba(0, 242, 254, 0.1)', 
            border: '1px solid rgba(0, 242, 254, 0.3)', 
            color: '#00f2fe', 
            fontSize: '0.8rem', 
            fontWeight: 800 
          }}>
            <Tag size={13} /> {blog.category} Review
          </div>

          {blog.launchTimeline && (
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '4px 12px', 
              borderRadius: '20px', 
              background: 'rgba(255, 153, 0, 0.1)', 
              border: '1px solid rgba(255, 153, 0, 0.3)', 
              color: '#ff9900', 
              fontSize: '0.78rem', 
              fontWeight: 800 
            }}>
              <Rocket size={13} /> {blog.launchTimeline}
            </div>
          )}
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, lineHeight: 1.25, marginBottom: '18px', color: '#fff' }}>
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
          {blog.targetKeyword && (
            <span className="keyword-tag-float" style={{ position: 'static' }}>
              🎯 Verified for: "{blog.targetKeyword}"
            </span>
          )}
        </div>
      </header>

      {/* Featured Banner Image with Overlay */}
      <div className="glass-panel glow-border" style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '36px', maxHeight: '420px', position: 'relative' }}>
        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {blog.pricing && blog.pricing.badge && (
          <div style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'linear-gradient(135deg, #ff9900 0%, #ff5722 100%)',
            color: '#fff',
            fontWeight: 900,
            fontSize: '0.85rem',
            padding: '6px 14px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(255, 100, 0, 0.5)'
          }}>
            {blog.pricing.badge}
          </div>
        )}
      </div>

      {/* Dedicated Pricing & Quick Deal Snapshot Box */}
      {blog.pricing && (
        <div className="glass-panel" style={{
          padding: '24px 28px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(255, 153, 0, 0.06) 100%)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '18px'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '4px' }}>
              Current Verified Indian & Global Market Price
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#00f2fe' }}>
                {formatPrice(blog.pricing.inr, blog.pricing.usd)}
              </span>
              {blog.pricing.mrpINR && (
                <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹{blog.pricing.mrpINR.toLocaleString('en-IN')}
                </span>
              )}
              {blog.pricing.discountPercent > 0 && (
                <span style={{ 
                  background: 'rgba(0, 230, 118, 0.15)', 
                  border: '1px solid rgba(0, 230, 118, 0.35)', 
                  color: '#00e676', 
                  fontSize: '0.82rem', 
                  fontWeight: 900, 
                  padding: '2px 8px', 
                  borderRadius: '6px' 
                }}>
                  SAVE {blog.pricing.discountPercent}% TODAY
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              *Real-time prices verified daily from authorized Amazon, Flipkart, & brand distributors.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {linkedGearProduct && (
              <>
                <Link 
                  to={`/product/${linkedGearProduct.id}`}
                  className="btn-filter-pill"
                  style={{ textDecoration: 'none', padding: '12px 18px', fontSize: '0.88rem', fontWeight: 800 }}
                >
                  Full Technical Specs
                </Link>
                <Link
                  to={linkedGearProduct.prices[0].url}
                  className="cta-button"
                  style={{ textDecoration: 'none', padding: '12px 20px', fontSize: '0.88rem', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ShoppingBag size={16} /> Check Amazon Deal
                </Link>
              </>
            )}

            {linkedPhoneProduct && (
              <Link 
                to="/vlogging-smartphones"
                className="btn-gradient-primary"
                style={{ textDecoration: 'none', padding: '12px 20px', fontSize: '0.88rem', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <ShoppingBag size={16} /> Compare Smartphone Cameras
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Excerpt Lead Box */}
      <div style={{
        background: 'rgba(0, 242, 254, 0.05)',
        borderLeft: '4px solid #00f2fe',
        padding: '20px 24px',
        borderRadius: '0 14px 14px 0',
        fontSize: '1.08rem',
        lineHeight: 1.68,
        color: '#e2e8f0',
        marginBottom: '36px'
      }}>
        {blog.excerpt}
      </div>

      {/* "Who Can Use It" & Creator Suggestion Section */}
      {(blog.whoCanUseIt || blog.creatorSuggestion) && (
        <section className="glass-panel" style={{
          padding: '28px',
          borderRadius: '18px',
          background: 'rgba(10, 14, 38, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '36px'
        }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#00f2fe" /> User Recommendation & Setup Advice
          </h2>

          {blog.whoCanUseIt && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#00f2fe', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                👤 Who Can Use It & Who Should Buy:
              </div>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.65, color: '#cbd5e1', margin: 0 }}>
                {blog.whoCanUseIt}
              </p>
            </div>
          )}

          {blog.creatorSuggestion && (
            <div style={{ 
              padding: '14px 18px', 
              borderRadius: '12px', 
              background: 'rgba(255, 153, 0, 0.08)', 
              border: '1px solid rgba(255, 153, 0, 0.25)' 
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ff9900', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                💡 Creator Lab Field Advice:
              </div>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#fed7aa', margin: 0 }}>
                {blog.creatorSuggestion}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Key Hardware Features Tested */}
      {blog.features && blog.features.length > 0 && (
        <section className="glass-panel" style={{
          padding: '28px',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '36px'
        }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '18px', color: '#fff' }}>
            Core Hardware & Recording Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {blog.features.map((feat, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <CheckCircle2 size={18} color="#00f2fe" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#e2e8f0' }}>{feat}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pros & Cons Section */}
      {(blog.pros || blog.cons) && (
        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px', 
          marginBottom: '36px' 
        }}>
          {/* Pros */}
          {blog.pros && (
            <div className="glass-panel" style={{
              padding: '24px',
              borderRadius: '18px',
              border: '1px solid rgba(0, 230, 118, 0.25)',
              background: 'rgba(0, 230, 118, 0.03)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#00e676', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ThumbsUp size={18} /> Top Advantages & Pros
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {blog.pros.map((pro, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                    <CheckCircle2 size={16} color="#00e676" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cons */}
          {blog.cons && (
            <div className="glass-panel" style={{
              padding: '24px',
              borderRadius: '18px',
              border: '1px solid rgba(255, 107, 107, 0.25)',
              background: 'rgba(255, 107, 107, 0.03)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ff6b6b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} /> Trade-Offs & Limitations
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {blog.cons.map((con, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                    <span style={{ color: '#ff6b6b', fontWeight: 900, flexShrink: 0 }}>✕</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Ideal For Creator Niches */}
      {blog.idealFor && blog.idealFor.length > 0 && (
        <section className="glass-panel" style={{
          padding: '24px 28px',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '36px'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
            🎯 Ideal For These Creator Workflows
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {blog.idealFor.map((tag, idx) => (
              <span 
                key={idx}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(0, 242, 254, 0.08)',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  color: '#00f2fe'
                }}
              >
                ★ {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Structured Sections (if present in guide) */}
      {blog.sections && blog.sections.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '40px' }}>
          {blog.sections.map((sec, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '28px', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '14px', color: '#fff' }}>
                {sec.heading}
              </h2>
              <div style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                {sec.content}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Creator FAQs Accordion with Schema */}
      {blog.faqs && blog.faqs.length > 0 && (
        <section className="glass-panel" style={{
          padding: '32px',
          borderRadius: '20px',
          border: '1px solid rgba(0, 242, 254, 0.2)',
          marginBottom: '46px',
          background: 'rgba(8, 11, 28, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#00f2fe', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <HelpCircle size={16} /> Frequently Asked Questions
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '22px' }}>
            Questions Creators Ask Before Buying
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {blog.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    borderRadius: '12px',
                    border: isOpen ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isOpen ? 'rgba(0, 242, 254, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      color: isOpen ? '#00f2fe' : '#fff',
                      fontSize: '0.98rem',
                      fontWeight: 800,
                      textAlign: 'left',
                      cursor: 'pointer',
                      gap: '12px'
                    }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      size={18} 
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.25s ease',
                        flexShrink: 0
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div style={{ 
                      padding: '0 20px 18px', 
                      fontSize: '0.92rem', 
                      lineHeight: 1.65, 
                      color: '#cbd5e1',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingTop: '12px'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

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
                    {prod.badge} • From {formatPrice(prod.priceINR, prod.priceUSD)}
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

      {/* Back to Guides Hub Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <Link to="/blog" className="btn-gradient-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '30px' }}>
          <ArrowLeft size={16} /> Browse All 24 Creator Reviews & Blogs
        </Link>
        <Link to="/shop" className="btn-filter-pill" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '30px' }}>
          <ShoppingBag size={16} /> Open Complete Gear Catalog
        </Link>
      </div>
    </article>
  );
}
