import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import EcommerceSidebarFilter from '../components/EcommerceSidebarFilter';
import { VLOGGING_PRODUCTS, TAXONOMY, CATEGORIES } from '../data/vloggingProducts';
import { useEcommerce } from '../context/EcommerceContext';
import { 
  ChevronRight, ArrowLeft, Sparkles, Layers, HelpCircle, 
  ChevronDown, CheckCircle2, ArrowUpDown, Filter, Grid, Tag
} from 'lucide-react';

const CATEGORY_ALIASES = {
  'vlogging-mics': 'audio-microphones',
  'vlogging-cameras': 'cameras-recorders',
  'smartphone-vlogging': 'smartphone-rigs',
  'vlogging-lighting': 'creator-lighting',
  'creator-accessories': 'creator-tech'
};

const CATEGORY_BUYING_TIPS = {
  'audio-microphones': {
    title: "How to Choose the Best Vlogging Microphone in India (2026)",
    tips: [
      "Choose dual-channel wireless for interviews: Even if you vlog solo, a 2 TX + 1 RX kit (Digitek DWM-101 or Boya) lets you mic up guests without extra gear.",
      "Look for 32-bit float for pro shoots: DJI Mic 2 never clips or distorts audio even during loud street festivals or rallies.",
      "Deadcat windscreens are mandatory: Foam caps only stop breath pops. Real faux fur windscreens are required to kill 30km/h outdoor wind rumble."
    ],
    faqs: [
      { q: "Is a budget wireless mic like Digitek or Boya good enough for YouTube?", a: "Yes! Digitek DWM-101 and Boya BY-M1 are the most popular creator mics in India. For under ₹3,500, they offer DSP noise reduction and direct USB-C/Lightning connectivity with smartphones." },
      { q: "Do I need an audio interface to connect a vlogging mic to iPhone 15/16 or Android?", a: "No! Modern mics feature native digital USB-C and Lightning outputs that plug directly into your phone without any dongles." }
    ]
  },
  'cameras-recorders': {
    title: "What to Look for in a 4K Vlogging Camera",
    tips: [
      "Fully articulating flip touchscreen: Crucial for framing yourself while holding the camera at arm's length.",
      "Reliable Eye-Autofocus & Product Showcase: Ensures focus never hunts into the background when you show products to the lens.",
      "Overheating limits: Look for cameras with large batteries and efficient processors capable of sustained 4K 60p recording."
    ],
    faqs: [
      { q: "Can I use my smartphone instead of buying a dedicated vlogging camera?", a: "Yes! Modern smartphones with 48MP/50MP sensors produce stellar 4K video. However, dedicated cameras like the Sony ZV-E10 II provide optical zoom, interchangeable lenses, and true background bokeh." },
      { q: "Is the DJI Osmo Pocket 3 worth it over an action camera?", a: "Absolutely for lifestyle vlogging. The Osmo Pocket 3 features a 1-inch sensor for clean low-light video and a motorized 3-axis mechanical gimbal, avoiding digital crop stabilization." }
    ]
  },
  'smartphone-rigs': {
    title: "Essential Smartphone Vlogging Rig Checklist",
    tips: [
      "Rigidity stops jitter: Dual-handle video cages distribute hand weight evenly, eliminating micro-shakes.",
      "Cold shoes are vital: Ensure your cage has at least 2 cold shoes to mount both an LED fill light and a wireless mic receiver.",
      "MagSafe quick-release: Magnetic clamps let you detach your phone in 1 second to take calls."
    ],
    faqs: [
      { q: "Do smartphone rigs fit both iPhone and Android?", a: "Yes, universal cages like SmallRig and Digitek phone clamps feature adjustable springs and silicone grips that fit screen sizes from 4.7 to 6.9 inches with cases." }
    ]
  },
  'gimbals-tripods': {
    title: "Gimbal vs Flexible Tripod: Which One Do You Need?",
    tips: [
      "Gimbals are for active walking: Motorized 3-axis gimbals track your face and smooth out running and walking footsteps.",
      "Flexible tripods are for static and run-and-gun: Flexible GorillaPods wrap around railings, sit on cafe tables, and double as selfie sticks.",
      "Payload limits: Always check payload capacity before mounting mirrorless cameras on smartphone gimbals."
    ],
    faqs: [
      { q: "What is the best budget tripod for Indian YouTube creators?", a: "The Digitek DPTR-890VD (with fluid pan-head for ₹2,499) and the Tygot 10-inch Gorilla Tripod (₹349) are the highest-rated budget choices in India." }
    ]
  },
  'creator-lighting': {
    title: "Lighting Tips for Cinematic Face Illumination",
    tips: [
      "Catchlights make eyes look alive: A small pocket light at eye level creates catching specular reflections in your eyes.",
      "High CRI rating (95+): Low-quality LEDs make skin look green or yellow. Look for CRI 95+ or RGBWW diodes.",
      "Bi-color temperature control: Match ambient light—use 3200K for warm indoor ambiance and 5600K for daylight."
    ],
    faqs: [
      { q: "Is an 18-inch ring light better than a mini LED panel?", a: "Ring lights (like Digitek DRL-18H) are best for beauty, makeup tutorials, and talking-head desk videos. For outdoor and travel vlogging, mini RGB panels (like Osaka or Ulanzi VL49) are much more portable." }
    ]
  },
  'creator-tech': {
    title: "Must-Have Tech Accessories for Content Creators",
    tips: [
      "V30 / V60 rated SD cards: Never lose footage to buffer errors. 4K 60p and 120p video require guaranteed sustained write speeds.",
      "High-wattage PD power banks: A 100W+ power bank keeps your camera, wireless mics, and phone running all day during travel shoots.",
      "Portable teleprompters: Save hours of editing mistakes by reading bullet points directly through 70/30 beam-splitter glass."
    ],
    faqs: [
      { q: "Can I use a cheap Class 10 SD card for 4K video?", a: "No. Standard Class 10 cards lack sustained write speeds, causing cameras to abruptly stop recording. Look for cards marked V30 or V60 (like SanDisk Extreme PRO)." }
    ]
  }
};

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const subSlug = searchParams.get('sub') || 'all';
  const microSlug = searchParams.get('micro') || 'all';

  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // Normalize category slug with alias support
  const canonicalCategorySlug = CATEGORY_ALIASES[categorySlug] || categorySlug;

  // Lookup taxonomy item
  const taxonomyCategory = TAXONOMY.find(t => t.id === canonicalCategorySlug);
  const flatCategory = CATEGORIES.find(c => c.id === canonicalCategorySlug);

  const categoryName = taxonomyCategory?.name || flatCategory?.name || (categorySlug ? categorySlug.replace(/-/g, ' ').toUpperCase() : 'Category');

  // Find active sub-category & micro-category
  const activeSubCategory = taxonomyCategory?.subCategories.find(s => s.id === subSlug);
  const activeMicroCategory = activeSubCategory?.microCategories.find(m => m.id === microSlug);

  const buyingGuide = CATEGORY_BUYING_TIPS[canonicalCategorySlug] || {
    title: `How to Choose ${categoryName}`,
    tips: ["Verify creator compatibility and payload balance", "Compare prices across Amazon.in, Flipkart & Croma", "Check battery life for outdoor shoots"],
    faqs: []
  };

  // Base products for category
  const baseCategoryProducts = VLOGGING_PRODUCTS.filter(p => {
    return p.category === canonicalCategorySlug || p.category === categorySlug;
  });

  let categoryProducts = [...baseCategoryProducts];

  // Filter by Sub-Category
  if (subSlug !== 'all') {
    categoryProducts = categoryProducts.filter(p => p.subCategory === subSlug);
  }

  // Filter by Micro-Category
  if (microSlug !== 'all') {
    categoryProducts = categoryProducts.filter(p => p.microCategory === microSlug);
  }

  // Faceted filtering
  if (selectedBrand !== 'all') {
    categoryProducts = categoryProducts.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
  }

  if (selectedDiscount > 0) {
    categoryProducts = categoryProducts.filter(p => p.discountPercent >= selectedDiscount);
  }

  if (minRating > 0) {
    categoryProducts = categoryProducts.filter(p => p.rating >= minRating);
  }

  if (selectedPriceRange !== 'all') {
    if (selectedPriceRange === 'under-1000') categoryProducts = categoryProducts.filter(p => p.priceINR < 1000);
    else if (selectedPriceRange === '1000-5000') categoryProducts = categoryProducts.filter(p => p.priceINR >= 1000 && p.priceINR <= 5000);
    else if (selectedPriceRange === '5000-25000') categoryProducts = categoryProducts.filter(p => p.priceINR > 5000 && p.priceINR <= 25000);
    else if (selectedPriceRange === 'above-25000') categoryProducts = categoryProducts.filter(p => p.priceINR > 25000);
  }

  // Sorting logic
  if (sortBy === 'price-low') {
    categoryProducts = [...categoryProducts].sort((a, b) => a.priceINR - b.priceINR);
  } else if (sortBy === 'price-high') {
    categoryProducts = [...categoryProducts].sort((a, b) => b.priceINR - a.priceINR);
  } else if (sortBy === 'rating') {
    categoryProducts = [...categoryProducts].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'discount') {
    categoryProducts = [...categoryProducts].sort((a, b) => b.discountPercent - a.discountPercent);
  }

  const handleSubCategorySelect = (subId) => {
    if (subId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ sub: subId });
    }
  };

  const handleMicroCategorySelect = (microId) => {
    if (microId === 'all') {
      setSearchParams({ sub: subSlug });
    } else {
      setSearchParams({ sub: subSlug, micro: microId });
    }
  };

  const handleResetFilters = () => {
    setSelectedBrand('all');
    setSelectedPriceRange('all');
    setSelectedDiscount(0);
    setMinRating(0);
    setSearchParams({});
  };

  return (
    <div style={{ padding: '16px 0 60px' }}>
      {/* 3-Tier Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Categories</Link>
        <ChevronRight size={14} />
        <Link 
          to={`/category/${canonicalCategorySlug}`} 
          style={{ 
            color: subSlug === 'all' ? '#00f2fe' : 'var(--text-secondary)', 
            textDecoration: 'none', 
            fontWeight: subSlug === 'all' ? 700 : 500 
          }}
        >
          {categoryName}
        </Link>

        {activeSubCategory && (
          <>
            <ChevronRight size={14} />
            <Link 
              to={`/category/${canonicalCategorySlug}?sub=${activeSubCategory.id}`}
              style={{ 
                color: microSlug === 'all' ? '#00f2fe' : 'var(--text-secondary)', 
                textDecoration: 'none', 
                fontWeight: microSlug === 'all' ? 700 : 500 
              }}
            >
              {activeSubCategory.name}
            </Link>
          </>
        )}

        {activeMicroCategory && (
          <>
            <ChevronRight size={14} />
            <span style={{ color: '#ff9900', fontWeight: 700 }}>
              {activeMicroCategory.name}
            </span>
          </>
        )}
      </nav>

      {/* Category Header Banner */}
      <div 
        className="glass-panel glow-border" 
        style={{ 
          padding: '28px 32px', 
          borderRadius: '18px', 
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(10, 13, 36, 0.9), rgba(20, 24, 60, 0.8))'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#00f2fe', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              <Layers size={16} /> E-Commerce Creator Catalog
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '8px' }}>
              {activeMicroCategory ? activeMicroCategory.name : activeSubCategory ? activeSubCategory.name : categoryName}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '750px', lineHeight: 1.5 }}>
              Compare prices across Amazon.in, Flipkart, and Croma. Real-time Indian stock, lab-tested audio and video gear for YouTubers, vloggers, and Instagram reel creators.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
            <div style={{ background: 'rgba(255, 153, 0, 0.15)', border: '1px solid rgba(255, 153, 0, 0.3)', color: '#ff9900', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>
              🇮🇳 Fast Delivery Across India
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {categoryProducts.length} verified products available
            </span>
          </div>
        </div>

        {/* 2nd Tier: Sub-Category Navigation Explorer */}
        {taxonomyCategory?.subCategories && taxonomyCategory.subCategories.length > 0 && (
          <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '0.78rem', color: '#00f2fe', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} /> Sub-Categories in {categoryName}:
              </div>
              {subSlug !== 'all' && (
                <button
                  onClick={() => handleSubCategorySelect('all')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ff9900',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Reset to All Sub-Categories
                </button>
              )}
            </div>
            
            <div className="no-scrollbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              <button
                onClick={() => handleSubCategorySelect('all')}
                className={`btn-filter-pill ${subSlug === 'all' ? 'active' : ''}`}
                style={{ 
                  fontSize: '0.84rem', 
                  padding: '7px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '20px',
                  flexShrink: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                <span>All {categoryName}</span>
                <span style={{ 
                  fontSize: '0.72rem', 
                  opacity: 0.8,
                  background: subSlug === 'all' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                  padding: '1px 6px',
                  borderRadius: '10px'
                }}>
                  {baseCategoryProducts.length}
                </span>
              </button>

              {taxonomyCategory.subCategories.map(sub => {
                const count = baseCategoryProducts.filter(p => p.subCategory === sub.id).length;
                const isSubActive = subSlug === sub.id;

                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSubCategorySelect(sub.id)}
                    className={`btn-filter-pill ${isSubActive ? 'active' : ''}`}
                    style={{ 
                      fontSize: '0.84rem', 
                      padding: '7px 16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      borderRadius: '20px',
                      flexShrink: 0,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span>{sub.name}</span>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      opacity: 0.85,
                      background: isSubActive ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                      padding: '1px 6px',
                      borderRadius: '10px'
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3rd Tier: Micro-Category Navigation Chips (Filtered under active Sub-Category) */}
        {activeSubCategory?.microCategories && activeSubCategory.microCategories.length > 0 && (
          <div style={{ 
            marginTop: '16px', 
            padding: '14px 18px', 
            borderRadius: '12px',
            background: 'rgba(0, 242, 254, 0.04)',
            border: '1px solid rgba(0, 242, 254, 0.18)' 
          }}>
            <div style={{ fontSize: '0.74rem', color: '#00f2fe', textTransform: 'uppercase', fontWeight: 800, marginBottom: '10px', letterSpacing: '0.6px' }}>
              Micro-Types for {activeSubCategory.name}:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => handleMicroCategorySelect('all')}
                style={{
                  fontSize: '0.8rem',
                  padding: '5px 14px',
                  borderRadius: '16px',
                  border: microSlug === 'all' ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: microSlug === 'all' ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'rgba(255, 255, 255, 0.04)',
                  color: microSlug === 'all' ? '#050714' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: microSlug === 'all' ? 800 : 500,
                  transition: 'all 0.2s ease'
                }}
              >
                All Micro-Types
              </button>
              {activeSubCategory.microCategories.map(micro => {
                const count = baseCategoryProducts.filter(p => p.subCategory === subSlug && p.microCategory === micro.id).length;
                const isMicroActive = microSlug === micro.id;

                return (
                  <button
                    key={micro.id}
                    onClick={() => handleMicroCategorySelect(micro.id)}
                    style={{
                      fontSize: '0.8rem',
                      padding: '5px 14px',
                      borderRadius: '16px',
                      border: isMicroActive ? '1px solid #ff9900' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: isMicroActive ? 'linear-gradient(135deg, #ff9900, #ff5500)' : 'rgba(255, 255, 255, 0.04)',
                      color: isMicroActive ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: isMicroActive ? 800 : 500,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{micro.name}</span>
                    {count > 0 && (
                      <span style={{ 
                        fontSize: '0.7rem', 
                        opacity: 0.85,
                        background: isMicroActive ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                        padding: '1px 5px',
                        borderRadius: '8px'
                      }}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Marketplace Grid: Sidebar + Products */}
      <div className="marketplace-layout">
        {/* Left Sidebar Faceted Filter */}
        <EcommerceSidebarFilter
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          selectedDiscount={selectedDiscount}
          setSelectedDiscount={setSelectedDiscount}
          minRating={minRating}
          setMinRating={setMinRating}
          onReset={handleResetFilters}
        />

        {/* Right Content Area */}
        <div>
          {/* Marketplace Toolbar */}
          <div 
            className="glass-panel"
            style={{
              padding: '14px 20px',
              borderRadius: '14px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 800, fontSize: '1rem' }}>
                {categoryProducts.length} Items Found
              </span>
              {(subSlug !== 'all' || microSlug !== 'all' || selectedBrand !== 'all' || selectedPriceRange !== 'all') && (
                <button 
                  onClick={handleResetFilters}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#ff6b6b', 
                    fontSize: '0.8rem', 
                    cursor: 'pointer', 
                    textDecoration: 'underline',
                    marginLeft: '8px'
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={15} color="#00f2fe" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="featured" style={{ background: '#0a0d24' }}>Featured / Top Deals</option>
                <option value="price-low" style={{ background: '#0a0d24' }}>Price: Low to High</option>
                <option value="price-high" style={{ background: '#0a0d24' }}>Price: High to Low</option>
                <option value="discount" style={{ background: '#0a0d24' }}>Biggest Discount (% OFF)</option>
                <option value="rating" style={{ background: '#0a0d24' }}>Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {categoryProducts.length > 0 ? (
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '16px', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No products match your selected filters.</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Try clearing filters or checking other sub-categories.</p>
              <button 
                onClick={handleResetFilters}
                className="btn-filter-pill"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Wirecutter/B&H Style Category Buying Tips */}
      <div className="glass-panel glow-border" style={{ padding: '30px', borderRadius: '18px', margin: '40px 0 30px' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles color="#00f2fe" size={20} /> {buyingGuide.title}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {buyingGuide.tips.map((tip, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={18} color="#00f2fe" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rich Snippets FAQ Accordion */}
      {buyingGuide.faqs && buyingGuide.faqs.length > 0 && (
        <div className="glass-panel" style={{ padding: '30px', borderRadius: '18px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle color="#f6d365" size={20} /> Frequently Asked Questions about {categoryName}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {buyingGuide.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: '#00f2fe' }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 16px 14px', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
