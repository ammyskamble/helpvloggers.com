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
          {CATEGORY_BANNERS.map((banner) => (
            <Link
              key={banner.id}
              to={`/category/${banner.categorySlug}`}
              style={{
                width: `${100 / CATEGORY_BANNERS.length}%`,
                height: '100%',
                position: 'relative',
                flexShrink: 0,
                overflow: 'hidden',
                display: 'block',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              title={`Explore ${banner.name}`}
            >
              {/* Pure Aesthetic Full-Bleed Studio Background Image - Zero Clutter / Zero Details */}
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
                  transition: 'transform 0.4s ease'
                }}
              />
            </Link>
          ))}
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
