import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, ArrowRight, 
  ChevronLeft, ChevronRight, CheckCircle,
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
    guaranteeSpecs: ["95+ High Color Rendering (CRI)", "200MB/s V30 4K Zero-Drop Media", "Safe USB Pass-Through Charging"]
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
              {/* Full-bleed Studio Background Image */}
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

              {/* Dark Linear Vignette Overlay (Leaves studio gear photography crisp on right, ensures ultra-crisp typography on left) */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, rgba(5, 8, 18, 0.95) 0%, rgba(5, 8, 18, 0.82) 44%, rgba(5, 8, 18, 0.22) 75%, rgba(5, 8, 18, 0.02) 100%)',
                  zIndex: 2
                }}
              />

              {/* Aesthetic Slide Content Box (Spacious Editorial Layout - No product cards) */}
              <div 
                style={{
                  position: 'relative',
                  zIndex: 3,
                  maxWidth: '1280px',
                  margin: '0 auto',
                  width: '100%',
                  padding: '0 50px'
                }}
              >
                <div style={{ maxWidth: '720px' }}>
                  {/* Reliability Trust Seal Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
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

                  {/* Clean 2-Line Headline: Light 300 line 1 + Heavy 900 line 2 */}
                  <h1 style={{ margin: '0 0 16px', color: '#ffffff', lineHeight: 1.15 }}>
                    <span style={{ 
                      display: 'block', 
                      fontSize: 'clamp(2rem, 3.8vw, 3rem)', 
                      fontWeight: 300, 
                      letterSpacing: '-0.5px',
                      opacity: 0.95
                    }}>
                      {banner.titleLight}
                    </span>
                    <span style={{ 
                      display: 'block', 
                      fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)', 
                      fontWeight: 900, 
                      letterSpacing: '-0.5px' 
                    }}>
                      {banner.titleBold}
                    </span>
                  </h1>

                  {/* Editorial Description */}
                  <p style={{ 
                    color: 'rgba(240, 244, 255, 0.85)', 
                    fontSize: '1rem', 
                    lineHeight: 1.65, 
                    marginBottom: '24px', 
                    maxWidth: '620px' 
                  }}>
                    {banner.subtext}
                  </p>

                  {/* 3 Reliability Guarantee Points */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '20px', 
                    marginBottom: '32px', 
                    flexWrap: 'wrap' 
                  }}>
                    {banner.guaranteeSpecs.map((spec, i) => (
                      <div key={i} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        fontSize: '0.84rem', 
                        fontWeight: 700, 
                        color: '#e2e8f0' 
                      }}>
                        <span style={{ color: banner.accentColor, fontWeight: 900 }}>✓</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Clean Call To Action & Authorized Brands */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <Link
                      to={`/category/${banner.categorySlug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '14px 30px',
                        borderRadius: '30px',
                        background: banner.accentColor,
                        color: '#050714',
                        fontWeight: 900,
                        fontSize: '0.96rem',
                        textDecoration: 'none',
                        boxShadow: `0 8px 24px ${banner.accentColor}55`,
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <span>Explore {banner.name}</span>
                      <ArrowRight size={18} />
                    </Link>

                    {/* Authorized Brand Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600 }}>Tested Brands:</span>
                      {banner.brands.map((b, i) => (
                        <span 
                          key={i} 
                          style={{ 
                            background: 'rgba(255, 255, 255, 0.08)', 
                            border: '1px solid rgba(255, 255, 255, 0.14)', 
                            padding: '4px 10px', 
                            borderRadius: '6px', 
                            fontSize: '0.76rem', 
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
              </div>
            </div>
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
