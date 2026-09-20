import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight,
  Mic, Camera, Smartphone, Sliders, Zap
} from 'lucide-react';

const CATEGORY_BANNERS = [
  {
    id: "audio-microphones",
    categorySlug: "audio-microphones",
    name: "Audio & Microphones",
    icon: Mic,
    accentColor: "#00f2fe",
    bannerImage: "/banners/mic_studio_hero.jpg"
  },
  {
    id: "cameras-recorders",
    categorySlug: "cameras-recorders",
    name: "Cameras & Recorders",
    icon: Camera,
    accentColor: "#f43f5e",
    bannerImage: "/banners/camera_studio_hero.jpg"
  },
  {
    id: "smartphone-rigs",
    categorySlug: "smartphone-rigs",
    name: "Smartphone Rigs & Cages",
    icon: Smartphone,
    accentColor: "#00e676",
    bannerImage: "/banners/phone_rig_hero.jpg"
  },
  {
    id: "gimbals-tripods",
    categorySlug: "gimbals-tripods",
    name: "Gimbals & Tripods",
    icon: Sliders,
    accentColor: "#ff9900",
    bannerImage: "/banners/gimbal_studio_hero.jpg"
  },
  {
    id: "creator-lighting",
    categorySlug: "creator-lighting",
    name: "Lighting & Power",
    icon: Zap,
    accentColor: "#f6d365",
    bannerImage: "/banners/lighting_studio_hero.jpg"
  }
];

export default function CategoryBrandBanners() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  // Auto-play slider every 5.0 seconds with hover pause
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveCategoryIndex((prev) => (prev + 1) % CATEGORY_BANNERS.length);
    }, 5000);
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
      {/* Category Navigation Pills (Touch-Friendly Smooth Horizontal Swipe) */}
      <div 
        className="hero-category-pills-bar"
        style={{
          background: 'rgba(5, 7, 18, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '10px 20px'
        }}
      >
        <div 
          className="category-subnav-scroll no-scrollbar"
          style={{ 
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '10px', 
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            padding: '2px 4px'
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
                  flexShrink: 0,
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

      {/* FULL-WIDTH 530px HERO CAROUSEL BANNER (Smooth Crossfade & Vignette Styling) */}
      <div 
        ref={sliderRef}
        className="hero-carousel-container hero-carousel-track"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          background: '#070a14'
        }}
      >
        {/* Silky-Smooth Crossfade Slides */}
        {CATEGORY_BANNERS.map((banner, index) => {
          const isActive = index === activeCategoryIndex;
          const IconComp = banner.icon;
          return (
            <Link
              key={banner.id}
              to={`/category/${banner.categorySlug}`}
              className={`hero-slide ${isActive ? 'active' : ''}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
                transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: isActive ? 2 : 1,
                display: 'block',
                textDecoration: 'none',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              title={`Explore ${banner.name}`}
            >
              {/* Compact Slide Title / Category Badge */}
              <div className="hero-slide-badge">
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: banner.accentColor, display: 'inline-block', boxShadow: `0 0 8px ${banner.accentColor}` }} />
                <span>{banner.name}</span>
                <span className="hero-badge-sub" style={{ opacity: 0.6, fontSize: '0.7rem' }}>• 2025/2026 Picks</span>
              </div>

              {/* Full-Bleed Studio Background Image with Ken-Burns subtle zoom */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${banner.bannerImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: isActive ? 'scale(1)' : 'scale(1.03)',
                  transition: 'transform 6s ease-out',
                  willChange: 'transform, opacity'
                }}
              />
            </Link>
          );
        })}

        {/* Subtle Dark Bottom Gradient Vignette for High Contrast Indicators */}
        <div className="hero-vignette-bottom" />

        {/* Subtle Side Dark Vignettes for Arrow Controls */}
        <div className="hero-vignette-side-left" />
        <div className="hero-vignette-side-right" />

        {/* Left Arrow Button (Compact Carousel Arrow with Brand Orange Hover) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="carousel-arrow left"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Right Arrow Button (Compact Carousel Arrow with Brand Orange Hover) */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="carousel-arrow right"
        >
          <ChevronRight size={18} />
        </button>

        {/* Bottom Centered Pagination Dots with Pill Expansion Effect */}
        <div 
          className="carousel-dots"
          style={{
            position: 'absolute',
            bottom: '26px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(5, 8, 22, 0.82)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            padding: '8px 18px',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)'
          }}
        >
          {CATEGORY_BANNERS.map((banner, index) => {
            const isActive = index === activeCategoryIndex;
            return (
              <button
                key={banner.id}
                onClick={() => setActiveCategoryIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`dot ${isActive ? 'active' : ''}`}
                style={{
                  width: isActive ? '28px' : '8px',
                  height: '8px',
                  borderRadius: isActive ? '4px' : '50%',
                  background: isActive ? currentBanner.accentColor : 'rgba(255, 255, 255, 0.45)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? `0 0 10px ${currentBanner.accentColor}88` : 'none'
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
