import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { EcommerceProvider } from './context/EcommerceContext';
import Header from './components/Header';
import VloggingKitBuilderModal from './components/VloggingKitBuilderModal';
import SchemaInjector from './components/SchemaInjector';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ComparisonDetailPage from './pages/ComparisonDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import BlogListPage from './pages/BlogListPage';
import AffiliateRedirectPage from './pages/AffiliateRedirectPage';
import SmartphoneGuidePage from './pages/SmartphoneGuidePage';
import { TAXONOMY } from './data/vloggingProducts';
import { ShieldCheck, Heart } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  return (
    <EcommerceProvider>
      <div className="app-root">
        <ScrollToTop />
        <SchemaInjector />

        {/* Global E-Commerce Header with Integrated Sticky Categories Drop-Down */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenBuilder={() => setIsBuilderOpen(true)}
        />

        {/* Main App Routes */}
        <main style={{ minHeight: '80vh', width: '100%' }}>
          <Routes>
            <Route path="/" element={<HomePage onOpenBuilder={() => setIsBuilderOpen(true)} />} />
            <Route path="/shop" element={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 60px' }}><ShopPage /></div>} />
            <Route path="/catalog" element={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 60px' }}><ShopPage /></div>} />
            <Route path="/category/:categorySlug" element={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 60px' }}><CategoryPage /></div>} />
            <Route path="/product/:productId" element={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 60px' }}><ProductDetailPage /></div>} />
            <Route path="/compare/:vsId" element={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 60px' }}><ComparisonDetailPage /></div>} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blogs" element={<BlogListPage />} />
            <Route path="/reviews" element={<BlogListPage />} />
            <Route path="/blog/:blogId" element={<div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 60px' }}><BlogDetailPage /></div>} />
            <Route path="/smartphones" element={<SmartphoneGuidePage />} />
            <Route path="/vlogging-smartphones" element={<SmartphoneGuidePage />} />
            <Route path="/go/:store/:slug" element={<AffiliateRedirectPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<HomePage onOpenBuilder={() => setIsBuilderOpen(true)} />} />
          </Routes>
        </main>

        {/* Interactive Kit Builder Modal */}
        <VloggingKitBuilderModal
          isOpen={isBuilderOpen}
          onClose={() => setIsBuilderOpen(false)}
        />

        {/* Global E-Commerce Marketplace Footer (MicPrice.com Style) */}
        <footer className="footer-wrap glass-panel" style={{ marginTop: '80px', background: '#050814', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '30px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '12px' }}>
                <span className="gradient-text">HelpVloggers</span>.com
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '14px' }}>
                India's premier independent vlogging gear and mic price comparison platform. We field-test microphones, 4K cameras, mobile cages, and lighting for YouTube creators and Instagram reel artists.
              </p>
              <div style={{ fontSize: '0.8rem', color: '#00f2fe', fontWeight: 600 }}>
                📍 Creator Lab: Raipur, Chhattisgarh & Mumbai, India
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ff9900', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Shop Sub-Pages
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <li>
                  <Link to="/shop" style={{ color: '#00f2fe', textDecoration: 'none', fontWeight: 700 }}>
                    ⚡ Shop All Creator Gear (/shop)
                  </Link>
                </li>
                {TAXONOMY.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.id}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ff9900', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Popular Creator Brands
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <li><Link to="/shop?brand=Digitek" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Digitek India Mics & Tripods</Link></li>
                <li><Link to="/shop?brand=Boya" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Boya Omnidirectional Lapels</Link></li>
                <li><Link to="/shop?brand=DJI" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>DJI Mic 2 & Osmo Pocket 3</Link></li>
                <li><Link to="/shop?brand=Grenaro" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Grenaro Wireless Lapels</Link></li>
                <li><Link to="/shop?brand=Sony" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Sony ZV Vlogging Cameras</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ff9900', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Creator Blogs & Reviews
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <li>
                  <Link to="/blog" style={{ color: '#00f2fe', textDecoration: 'none', fontWeight: 700 }}>
                    🔥 All 24 Product Reviews (/blog)
                  </Link>
                </li>
                <li><Link to="/vlogging-smartphones" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Vlogging Smartphones Hub</Link></li>
                <li><Link to="/blog/digitek-dwm-101-review" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Digitek DWM-101 Review</Link></li>
                <li><Link to="/blog/boya-by-m1-review" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Boya BY-M1 Lapel Review</Link></li>
                <li><Link to="/blog/dji-mic-2-review" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>DJI Mic 2 32-Bit Float Review</Link></li>
                <li><Link to="/blog/sony-zv-e10-ii-review" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Sony ZV-E10 II Camera Review</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ff9900', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Affiliate Compliance
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.6, marginBottom: '12px' }}>
                HelpVloggers.com is an independent participant in the Amazon Services LLC Associates Program, Amazon.in Associates, and Flipkart Affiliate programs designed to provide a means for sites to earn referral fees.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00e676', fontSize: '0.75rem', fontWeight: 700 }}>
                <ShieldCheck size={16} /> 100% Verified Editorial Testing
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © 2026 HelpVloggers.com. All Rights Reserved. Built with precision for Indian & Global Creators.
          </div>
        </footer>
      </div>
    </EcommerceProvider>
  );
}
