import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import EcommerceSidebarFilter from '../components/EcommerceSidebarFilter';
import { VLOGGING_PRODUCTS, TAXONOMY, CATEGORIES } from '../data/vloggingProducts';
import { useEcommerce } from '../context/EcommerceContext';
import { 
  ChevronRight, ArrowUpDown, Filter, ShoppingBag, 
  Sparkles, Layers, ArrowLeft
} from 'lucide-react';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { market, setMarket, searchQuery: contextQuery, setSearchQuery: contextSetQuery } = useEcommerce();

  const initialQuery = searchParams.get('q') || '';
  const initialCat = searchParams.get('cat') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';
  const initialMarket = searchParams.get('market') || market || 'all';
  const initialDiscount = searchParams.get('discount') ? Number(searchParams.get('discount')) : 0;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedMarket, setSelectedMarket] = useState(initialMarket);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedDiscount, setSelectedDiscount] = useState(initialDiscount);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('cat');
    const brand = searchParams.get('brand');
    const m = searchParams.get('market');
    const disc = searchParams.get('discount');
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
    if (brand !== null) setSelectedBrand(brand);
    if (m !== null) setSelectedMarket(m);
    if (disc !== null) setSelectedDiscount(Number(disc));
  }, [searchParams]);

  const handleMarketChange = (newMarket) => {
    setSelectedMarket(newMarket);
    if (newMarket === 'india' || newMarket === 'global') {
      setMarket(newMarket);
    }
  };

  const handleResetFilters = () => {
    setSelectedBrand('all');
    setSelectedMarket('all');
    setSelectedPriceRange('all');
    setSelectedDiscount(0);
    setMinRating(0);
    setSearchQuery('');
    setSelectedCategory('all');
    if (contextSetQuery) contextSetQuery('');
    setSearchParams({});
  };

  // Filter products across all facets
  let filteredProducts = VLOGGING_PRODUCTS.filter(product => {
    // Search query
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.targetKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.subCategoryName && product.subCategoryName.toLowerCase().includes(searchQuery.toLowerCase()));

    // Market separation (India vs Global - No Conflict!)
    const matchesMarket = selectedMarket === 'all' || product.market === selectedMarket;

    // Category
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    // Brand
    const matchesBrand = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();

    // Discount
    const matchesDiscount = product.discountPercent >= selectedDiscount;

    // Rating
    const matchesRating = product.rating >= minRating;

    // Price range (in INR)
    let matchesPrice = true;
    if (selectedPriceRange === 'under-1000') matchesPrice = product.priceINR < 1000;
    else if (selectedPriceRange === '1000-5000') matchesPrice = product.priceINR >= 1000 && product.priceINR <= 5000;
    else if (selectedPriceRange === '5000-25000') matchesPrice = product.priceINR > 5000 && product.priceINR <= 25000;
    else if (selectedPriceRange === 'above-25000') matchesPrice = product.priceINR > 25000;

    return matchesSearch && matchesMarket && matchesCategory && matchesBrand && matchesDiscount && matchesRating && matchesPrice;
  });

  // Sorting
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.priceINR - b.priceINR);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.priceINR - a.priceINR);
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'discount') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.discountPercent - a.discountPercent);
  }

  return (
    <div style={{ padding: '16px 0 60px' }}>
      {/* Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#00f2fe', fontWeight: 700 }}>Shop All Creator Gear</span>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight size={14} />
            <span style={{ color: '#ff9900' }}>
              {TAXONOMY.find(t => t.id === selectedCategory)?.name || selectedCategory}
            </span>
          </>
        )}
      </nav>

      {/* Shop Header Banner */}
      <div 
        className="glass-panel glow-border" 
        style={{ 
          padding: '24px 30px', 
          borderRadius: '16px', 
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(10, 13, 36, 0.9), rgba(20, 24, 60, 0.8))'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff9900', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              <ShoppingBag size={15} /> Complete Creator Catalog & Price Matrix
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '6px' }}>
              Shop Vlogging Equipment & Creator Audio
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '700px' }}>
              Browse Indian budget picks (Digitek, Boya, Grenaro, Tygot) or international flagships (Sony, DJI, SmallRig). Compare live prices across Amazon.in, Flipkart, and B&H.
            </p>
          </div>

          <div style={{ background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.3)', color: '#00f2fe', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>
            ⚡ {filteredProducts.length} Verified Products Found
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout: Sidebar Filter + Products Grid */}
      <div className="marketplace-layout">
        {/* Left Column: Faceted Sidebar Filter */}
        <EcommerceSidebarFilter
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          selectedDiscount={selectedDiscount}
          setSelectedDiscount={setSelectedDiscount}
          minRating={minRating}
          setMinRating={setMinRating}
          selectedMarket={selectedMarket}
          setSelectedMarket={handleMarketChange}
          onReset={handleResetFilters}
        />

        {/* Right Column: Marketplace Catalog Header & Grid */}
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
            {/* Market Segmented Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => handleMarketChange('all')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: selectedMarket === 'all' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedMarket === 'all' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  color: selectedMarket === 'all' ? '#fff' : 'var(--text-secondary)'
                }}
              >
                All Markets
              </button>
              <button
                onClick={() => handleMarketChange('india')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: selectedMarket === 'india' ? 'none' : '1px solid rgba(0, 242, 254, 0.2)',
                  background: selectedMarket === 'india' ? '#00f2fe' : 'transparent',
                  color: selectedMarket === 'india' ? '#050714' : '#00f2fe'
                }}
              >
                🇮🇳 India Market (₹ INR)
              </button>
              <button
                onClick={() => handleMarketChange('global')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: selectedMarket === 'global' ? 'none' : '1px solid rgba(255, 153, 0, 0.2)',
                  background: selectedMarket === 'global' ? '#ff9900' : 'transparent',
                  color: selectedMarket === 'global' ? '#050714' : '#ff9900'
                }}
              >
                🌐 Global Market ($ USD)
              </button>
            </div>

            {/* Sort Dropdown */}
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
                <option value="featured" style={{ background: '#0a0d24' }}>Featured / Best Deals</option>
                <option value="price-low" style={{ background: '#0a0d24' }}>Price: Low to High</option>
                <option value="price-high" style={{ background: '#0a0d24' }}>Price: High to Low</option>
                <option value="discount" style={{ background: '#0a0d24' }}>Biggest Discount (% OFF)</option>
                <option value="rating" style={{ background: '#0a0d24' }}>Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filters Bar */}
          {(searchQuery || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedMarket !== 'all' || selectedPriceRange !== 'all' || selectedDiscount > 0) && (
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Active Filters:</span>
              {selectedMarket !== 'all' && (
                <span style={{ background: selectedMarket === 'india' ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 153, 0, 0.15)', border: `1px solid ${selectedMarket === 'india' ? '#00f2fe' : '#ff9900'}`, color: selectedMarket === 'india' ? '#00f2fe' : '#ff9900', padding: '2px 8px', borderRadius: '6px' }}>
                  Market: {selectedMarket === 'india' ? '🇮🇳 India' : '🌐 Global'}
                </span>
              )}
              {searchQuery && (
                <span style={{ background: 'rgba(0, 242, 254, 0.15)', border: '1px solid #00f2fe', color: '#00f2fe', padding: '2px 8px', borderRadius: '6px' }}>
                  Query: "{searchQuery}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span style={{ background: 'rgba(255, 153, 0, 0.15)', border: '1px solid #ff9900', color: '#ff9900', padding: '2px 8px', borderRadius: '6px' }}>
                  Category: {TAXONOMY.find(t => t.id === selectedCategory)?.name || selectedCategory}
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span style={{ background: 'rgba(0, 242, 254, 0.15)', border: '1px solid #00f2fe', color: '#00f2fe', padding: '2px 8px', borderRadius: '6px' }}>
                  Brand: {selectedBrand}
                </span>
              )}
              {selectedPriceRange !== 'all' && (
                <span style={{ background: 'rgba(0, 230, 118, 0.15)', border: '1px solid #00e676', color: '#00e676', padding: '2px 8px', borderRadius: '6px' }}>
                  Price: {selectedPriceRange}
                </span>
              )}
              {selectedDiscount > 0 && (
                <span style={{ background: 'rgba(255, 107, 107, 0.15)', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '2px 8px', borderRadius: '6px' }}>
                  Min {selectedDiscount}% OFF
                </span>
              )}
              <button onClick={handleResetFilters} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.8rem', marginLeft: '4px' }}>
                Clear All
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '16px' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No products match your selected filters.</p>
              <button 
                className="btn-filter-pill" 
                style={{ marginTop: '16px' }}
                onClick={handleResetFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
