import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Arjun Mehta",
    channel: "Tech & Vlogs India (320K Subs)",
    role: "YouTube Creator • Mumbai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "I read the comparisons before buying my first wireless mic, and HelpVloggers saved me ₹4,000. The Digitek DWM-101 vs Boya BY-M1 showdown gave me real audio noise samples instead of marketing hype."
  },
  {
    id: 2,
    name: "Priya Sharma",
    channel: "Priya Vlogs & Travel",
    role: "Instagram Reel Creator • Delhi",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "One of the few creator review platforms that actually compares Indian market pricing across Amazon.in and Flipkart in real time! The Tygot gorilla tripod + Osaka light combo is my daily travel kit now."
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    channel: "The Indian Creator Podcast",
    role: "Podcaster & Voice Artist • Bengaluru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "The custom kit builder verified mount compatibility before I ordered. Having 32-bit float audio explained in plain Hindi and English made choosing the DJI Mic 2 straightforward."
  }
];

export default function CreatorTestimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIdx];

  return (
    <div className="glass-panel glow-border" style={{ padding: '24px', borderRadius: '18px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#ff9900', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🇮🇳 Real Creator Community
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '2px 0 0' }}>
              Creator Testimonials
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Rating Stars */}
        <div style={{ display: 'flex', gap: '3px', marginBottom: '14px', color: '#f6d365' }}>
          {[...Array(current.rating)].map((_, i) => (
            <Star key={i} size={15} fill="#f6d365" />
          ))}
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '6px' }}>Verified Indian Buyer</span>
        </div>

        {/* Quote */}
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '20px', position: 'relative' }}>
          "{current.text}"
        </p>
      </div>

      {/* Creator Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
        <img 
          src={current.avatar} 
          alt={current.name} 
          style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #00f2fe' }} 
        />
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {current.name}
            <CheckCircle size={14} color="#00e676" />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#00f2fe' }}>{current.channel}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{current.role}</div>
        </div>
      </div>
    </div>
  );
}
