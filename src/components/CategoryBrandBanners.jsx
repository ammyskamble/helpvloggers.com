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

      {/* FULL-WIDTH 530px HERO CAROUSEL BANNER (Smooth Crossfade & Vignette Styling) */}
      <div 
        ref={sliderRef}
        className="hero-carousel-track"
        style={{
          position: 'relative',
          width: '100%',
          height: '530px',
          overflow: 'hidden',
          background: '#070a14'
        }}
      >
        {/* Silky-Smooth Crossfade Slides */}
        {CATEGORY_BANNERS.map((banner, index) => {
          const isActive = index === activeCategoryIndex;
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

        {/* Left Arrow Button (High-Contrast Frosted Glass Style) */}
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
            background: 'rgba(5, 8, 22, 0.65)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 242, 254, 0.25)';
            e.currentTarget.style.borderColor = '#00f2fe';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(0, 242, 254, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(5, 8, 22, 0.65)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.5)';
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow Button (High-Contrast Frosted Glass Style) */}
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
            background: 'rgba(5, 8, 22, 0.65)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 242, 254, 0.25)';
            e.currentTarget.style.borderColor = '#00f2fe';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(0, 242, 254, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(5, 8, 22, 0.65)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.5)';
          }}
        >
          <ChevronRight size={24} />
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
