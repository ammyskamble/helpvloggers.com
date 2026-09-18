import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useEcommerce } from '../context/EcommerceContext';
import { VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { 
  ShieldCheck, ArrowRight, ShoppingBag, 
  ChevronLeft, ChevronRight, Star, CheckCircle,
  Mic, Camera, Smartphone, Sliders, Zap
} from 'lucide-react';

const CATEGORY_BANNERS = [
  {
    id: "audio-microphones",
    categorySlug: "audio-microphones",
    name: "Audio & Microphones",
    icon: Mic,
    titleLight: "Best Microphones",
    titleBold: "for Mobiles & Cameras",
    trustTag: "100% GENUINE AUDIO LAB TESTED • ZERO CLIPPING VERIFIED",
    subtext: "Field-tested frequency response, active DSP noise reduction, and factory-sealed units. Authentic brand warranties from Digitek, Boya, DJI & Grenaro.",
    brands: ["Digitek", "Boya", "DJI", "Grenaro", "Maono"],
    accentColor: "#00f2fe",
    bannerImage: "/banners/mic_studio_hero.jpg",
    topProductId: "digitek-dwm-101",
    guaranteeSpecs: ["Zero-Clipping Benchmarked", "1-Year Official Brand Warranty", "Hologram Sealed Units"]
  },
  {
    id: "cameras-recorders",
    categorySlug: "cameras-recorders",
    name: "Cameras & Recorders",
    icon: Camera,
    titleLight: "Cinema 4K Cameras",
    titleBold: "for Vlogging & Creators",
    trustTag: "OFFICIAL SONY & DJI INDIA WARRANTY • 100% SENSOR INSPECTED",
    subtext: "Cinema-grade 10-bit 4:2:2 color, flip touchscreens, and lightning Eye-Autofocus. Rigorously heat-tested under continuous 4K 60fps/120fps recording.",
    brands: ["Sony", "DJI", "Insta360"],
    accentColor: "#f43f5e",
    bannerImage: "/banners/camera_studio_hero.jpg",
    topProductId: "sony-zv-e10-ii",
    guaranteeSpecs: ["Official 2-Year Manufacturer Warranty", "Zero Dead-Pixel Sensor Purity", "4K 60/120p Uncropped Tested"]
  },
  {
    id: "smartphone-rigs",
    categorySlug: "smartphone-rigs",
    name: "Smartphone Rigs & Cages",
    icon: Smartphone,
    titleLight: "Universal Phone Rigs",
    titleBold: "for Mobile Filmmaking",
    trustTag: "AIRCRAFT CNC ALUMINUM • MULTI-COLD SHOE MOUNT CERTIFIED",
    subtext: "Transform any iPhone or Android into a professional handheld cinema rig. Drop-tested CNC aluminum with dual rotating handles and 5 cold shoes.",
    brands: ["SmallRig", "Ulanzi", "Neewer"],
    accentColor: "#00e676",
    bannerImage: "/banners/phone_rig_hero.jpg",
    topProductId: "smallrig-universal-phone-cage",
    guaranteeSpecs: ["Aircraft 6061-T6 Aluminum Alloy", "Universal Arca-Swiss & 5 Cold Shoes", "100% Genuine SmallRig Certified"]
  },
  {
    id: "gimbals-tripods",
    categorySlug: "gimbals-tripods",
    name: "Gimbals & Tripods",
    icon: Sliders,
    titleLight: "3-Axis Gimbals",
    titleBold: "& Heavy-Duty Tripods",
    trustTag: "ZERO-SHAKE MOTOR CALIBRATION • 5KG LOAD FLUID VIDEO HEADS",
    subtext: "Buttery smooth motorized AI face-tracking gimbals and heavy-duty hydraulic fluid drag tripods designed for seamless cinematic panning shots.",
    brands: ["DJI", "Digitek", "Tygot"],
    accentColor: "#ff9900",
    bannerImage: "/banners/gimbal_studio_hero.jpg",
    topProductId: "dji-osmo-mobile-6",
    guaranteeSpecs: ["Smooth Hydraulic Fluid Drag Pan & Tilt", "Up to 5kg Payload Tested", "Anti-Slip Rubberized Leg Joints"]
  },
  {
    id: "creator-lighting",
    categorySlug: "creator-lighting",
    name: "Lighting & Power",
    icon: Zap,
    titleLight: "Studio Ring Lights",
    titleBold: "& High-Speed 4K SDXC",
    trustTag: "CRI 95+ TRUE SKIN TONES • 200MB/S V30 ZERO-DROP FRAMES",
    subtext: "Flicker-free studio lighting with step-less bi-color dimming, paired with broadcast-certified V30 memory cards guaranteed never to drop frames.",
    brands: ["Digitek", "Osaka", "SanDisk", "Ulanzi"],
    accentColor: "#f6d365",
    bannerImage: "/banners/lighting_studio_hero.jpg",
    topProductId: "digitek-drl-18h",
    guaranteeSpecs: ["95+ High Color Rendering (CRI)", "200MB/s V30 4K Zero-Drop Media", "Safe USB Pass-Through Charging"]
  }
];

export default function CategoryBrandBanners() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { formatPrice, market } = useEcommerce();
  const sliderRef = useRef(null);

  // Auto-play slider every 6.5 seconds, pauses on hover
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveCategoryIndex((prev) => (prev + 1) % CATEGORY_BANNERS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveCategoryIndex((prev) => (prev - 1 + CATEGORY_BANNERS.length) % CATEGORY_BANNERS.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveCategoryIndex((prev) => (prev + 1) % CATEGORY_BANNERS.length);
  };

  const currentBanner = CATEGORY_BANNERS[activeCategoryIndex];

  return (
    <section 
      style={{ 
        width: '100%',
        margin: '0 0 36px 0',
        padding: '0',
        position: 'relative'
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Category Navigation Pills (Exact Header-Attached Subnav Style) */}
      <div 
        style={{
          background: 'rgba(5, 7, 18, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '10px 24px'
        }}
      >
        <div 
          className="no-scrollbar"
          style={{ 
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '10px', 
            overflowX: 'auto'
          }}
        >
          {CATEGORY_BANNERS.map((banner, index) => {
            const isActive = index === activeCategoryIndex;
            const IconComponent = banner.icon;
            return (
              <button
                key={banner.id}
                onClick={() => setActiveCategoryIndex(index)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  background: isActive ? banner.accentColor : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#050714' : 'var(--text-secondary)',
                  border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  fontWeight: isActive ? 900 : 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? `0 0 16px ${banner.accentColor}55` : 'none'
                }}
              >
                <IconComponent size={14} />
                <span>{banner.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FULL-WIDTH 530px HERO SLIDER BANNER (Exact MicPrice.com Dimensions & Horizontal Slide Animation) */}
      <div 
        ref={sliderRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '530px',
          overflow: 'hidden',
          background: '#070a14'
        }}
      >
        {/* Horizontal TranslateX Sliding Track (500ms cubic-bezier ease-in-out like micprice.com) */}
        <div 
          style={{
            display: 'flex',
            width: `${CATEGORY_BANNERS.length * 100}%`,
            height: '100%',
            transform: `translateX(-${(activeCategoryIndex * 100) / CATEGORY_BANNERS.length}%)`,
            transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform'
          }}
        >
          {CATEGORY_BANNERS.map((banner) => {
            const featuredProduct = VLOGGING_PRODUCTS.find(p => p.id === banner.topProductId) || VLOGGING_PRODUCTS[0];

            return (
              <div
                key={banner.id}
                style={{
                  width: `${100 / CATEGORY_BANNERS.length}%`,
                  height: '100%',
                  position: 'relative',
                  flexShrink: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {/* Full-bleed Studio Background Image (Aspect Ratio ~2.9:1) */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${banner.bannerImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center right',
                    zIndex: 1
                  }}
                />

                {/* Dark Linear Vignette Overlay (Leaves photography crisp on right, makes text ultra-legible on left) */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, rgba(5, 8, 18, 0.95) 0%, rgba(5, 8, 18, 0.88) 42%, rgba(5, 8, 18, 0.35) 75%, rgba(5, 8, 18, 0.05) 100%)',
                    zIndex: 2
                  }}
                />

                {/* Slide Content Box */}
                <div 
                  style={{
                    position: 'relative',
                    zIndex: 3,
                    maxWidth: '1280px',
                    margin: '0 auto',
                    width: '100%',
                    padding: '0 50px',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(320px, 1.35fr) minmax(280px, 0.65fr)',
                    gap: '40px',
                    alignItems: 'center'
                  }}
                >
                  {/* Left Column: Signature MicPrice 2-Line Headline & Trust Guarantee */}
                  <div>
                    {/* Reliability Trust Seal Tag */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: `1px solid ${banner.accentColor}66`,
                        color: banner.accentColor,
                        fontSize: '0.74rem',
                        fontWeight: 900,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        letterSpacing: '0.8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <ShieldCheck size={14} color={banner.accentColor} />
                        {banner.trustTag}
                      </span>

                      <span style={{ 
                        background: 'rgba(0, 230, 118, 0.15)', 
                        color: '#00e676', 
                        fontSize: '0.72rem', 
                        fontWeight: 800, 
                        padding: '4px 10px', 
                        borderRadius: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <CheckCircle size={12} /> 100% GENUINE
                      </span>
                    </div>

                    {/* Exact MicPrice Headline Style: Light 300 line 1 + Heavy 900 line 2 */}
                    <h1 style={{ margin: '0 0 16px', color: '#ffffff', lineHeight: 1.15 }}>
                      <span style={{ 
                        display: 'block', 
                        fontSize: '2.9rem', 
                        fontWeight: 300, 
                        letterSpacing: '-0.5px',
                        opacity: 0.95
                      }}>
                        {banner.titleLight}
                      </span>
                      <span style={{ 
                        display: 'block', 
                        fontSize: '3.4rem', 
                        fontWeight: 900, 
                        letterSpacing: '-0.5px' 
                      }}>
                        {banner.titleBold}
                      </span>
                    </h1>

                    {/* Subtext description */}
                    <p style={{ 
                      color: 'rgba(240, 244, 255, 0.85)', 
                      fontSize: '0.96rem', 
                      lineHeight: 1.6, 
                      marginBottom: '22px', 
                      maxWidth: '560px' 
                    }}>
                      {banner.subtext}
                    </p>

                    {/* 3 Reliability Guarantee Points */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '18px', 
                      marginBottom: '28px', 
                      flexWrap: 'wrap' 
                    }}>
                      {banner.guaranteeSpecs.map((spec, i) => (
                        <div key={i} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '6px', 
                          fontSize: '0.82rem', 
                          fontWeight: 700, 
                          color: '#e2e8f0' 
                        }}>
                          <span style={{ color: banner.accentColor, fontWeight: 900 }}>✓</span>
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                      <Link
                        to={`/category/${banner.categorySlug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '14px 28px',
                          borderRadius: '30px',
                          background: banner.accentColor,
                          color: '#050714',
                          fontWeight: 900,
                          fontSize: '0.94rem',
                          textDecoration: 'none',
                          boxShadow: `0 8px 24px ${banner.accentColor}55`,
                          transition: 'transform 0.2s ease'
                        }}
                      >
                        <ShoppingBag size={18} />
                        <span>Shop {banner.name} Deals</span>
                        <ArrowRight size={16} />
                      </Link>

                      {/* Authorized Brand Badges */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>Authorized:</span>
                        {banner.brands.map((b, i) => (
                          <span 
                            key={i} 
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.08)', 
                              border: '1px solid rgba(255, 255, 255, 0.12)', 
                              padding: '3px 8px', 
                              borderRadius: '6px', 
                              fontSize: '0.74rem', 
                              fontWeight: 800, 
                              color: '#ffffff' 
                            }}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Floating High-Conversion Top Deal Card */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {featuredProduct && (
                      <div 
                        style={{
                          background: 'rgba(10, 15, 30, 0.78)',
                          backdropFilter: 'blur(22px)',
                          WebkitBackdropFilter: 'blur(22px)',
                          border: `1px solid ${banner.accentColor}55`,
                          borderRadius: '18px',
                          padding: '18px',
                          width: '100%',
                          maxWidth: '320px',
                          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.65)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ 
                            fontSize: '0.7rem', 
                            fontWeight: 900, 
                            color: banner.accentColor, 
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px' 
                          }}>
                            ★ #1 Verified Category Pick
                          </span>
                          {featuredProduct.discountPercent > 0 && (
                            <span style={{ 
                              background: '#ff2d55', 
                              color: '#fff', 
                              fontSize: '0.72rem', 
                              fontWeight: 900, 
                              padding: '2px 7px', 
                              borderRadius: '6px' 
                            }}>
                              -{featuredProduct.discountPercent}% OFF
                            </span>
                          )}
                        </div>

                        {/* Product Image */}
                        <div style={{ height: '140px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px', background: '#050814' }}>
                          <img 
                            src={featuredProduct.image} 
                            alt={featuredProduct.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>

                        {/* Brand & Rating */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          <span style={{ color: banner.accentColor, fontWeight: 800 }}>{featuredProduct.brand}</span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f6d365' }}>
                            <Star size={11} fill="#f6d365" color="#f6d365" /> {featuredProduct.rating}
                          </span>
                        </div>

                        {/* Product Title */}
                        <h3 style={{ 
                          fontSize: '0.88rem', 
                          fontWeight: 700, 
                          color: '#fff', 
                          margin: '0 0 10px', 
                          lineHeight: 1.35,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {featuredProduct.title}
                        </h3>

                        {/* Pricing & Direct Deal Button */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                          <div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: banner.accentColor }}>
                              {formatPrice(featuredProduct.priceINR, featuredProduct.priceUSD)}
                            </div>
                            {featuredProduct.mrpINR && (
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                                {market === 'india' 
                                  ? `₹${featuredProduct.mrpINR.toLocaleString('en-IN')}`
                                  : `$${((featuredProduct.mrpINR / 83) || featuredProduct.priceUSD * 1.3).toFixed(2)}`
                                }
                              </div>
                            )}
                          </div>

                          <Link
                            to={featuredProduct.prices[0]?.url || `/product/${featuredProduct.id}`}
                            rel="nofollow sponsored"
                            style={{
                              padding: '9px 15px',
                              borderRadius: '8px',
                              background: 'linear-gradient(135deg, #ff9900 0%, #ff5500 100%)',
                              color: '#ffffff',
                              fontSize: '0.78rem',
                              fontWeight: 900,
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              boxShadow: '0 4px 14px rgba(255, 100, 0, 0.35)'
                            }}
                          >
                            <ShoppingBag size={14} />
                            <span>GET DEAL</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Left Arrow Button (MicPrice.com Frosted Glass Style) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          style={{
            position: 'absolute',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow Button (MicPrice.com Frosted Glass Style) */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          style={{
            position: 'absolute',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Bottom Centered Pagination Dots (MicPrice.com Expanding Active Pill) */}
        <div 
          style={{
            position: 'absolute',
            bottom: '22px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '7px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {CATEGORY_BANNERS.map((banner, index) => {
            const isActive = index === activeCategoryIndex;
            return (
              <button
                key={banner.id}
                onClick={() => setActiveCategoryIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  width: isActive ? '26px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: isActive ? currentBanner.accentColor : 'rgba(255, 255, 255, 0.45)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease'
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
