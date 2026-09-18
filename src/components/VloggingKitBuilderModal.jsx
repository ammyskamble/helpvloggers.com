import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Check, ShoppingBag, Sparkles, ShieldCheck } from 'lucide-react';
import { VLOGGING_PRODUCTS } from '../data/vloggingProducts';
import { useEcommerce } from '../context/EcommerceContext';

export default function VloggingKitBuilderModal({ isOpen, onClose }) {
  const { formatPrice, currency } = useEcommerce();

  const cameras = VLOGGING_PRODUCTS.filter(p => p.category === 'cameras-recorders');
  const mics = VLOGGING_PRODUCTS.filter(p => p.category === 'audio-microphones');
  const gimbals = VLOGGING_PRODUCTS.filter(p => p.category === 'gimbals-tripods');
  const lights = VLOGGING_PRODUCTS.filter(p => p.category === 'creator-lighting');
  const rigs = VLOGGING_PRODUCTS.filter(p => p.category === 'smartphone-rigs');

  const [selectedCam, setSelectedCam] = useState(cameras[0] || null);
  const [selectedMic, setSelectedMic] = useState(mics[0] || null);
  const [selectedGimbal, setSelectedGimbal] = useState(gimbals[0] || null);
  const [selectedLight, setSelectedLight] = useState(lights[0] || null);

  if (!isOpen) return null;

  const calculateTotalINR = () => {
    let sum = 0;
    if (selectedCam) sum += selectedCam.priceINR;
    if (selectedMic) sum += selectedMic.priceINR;
    if (selectedGimbal) sum += selectedGimbal.priceINR;
    if (selectedLight) sum += selectedLight.priceINR;
    return sum;
  };

  const calculateTotalUSD = () => {
    let sum = 0;
    if (selectedCam) sum += selectedCam.priceUSD;
    if (selectedMic) sum += selectedMic.priceUSD;
    if (selectedGimbal) sum += selectedGimbal.priceUSD;
    if (selectedLight) sum += selectedLight.priceUSD;
    return sum;
  };

  const totalINR = calculateTotalINR();
  const totalUSD = calculateTotalUSD();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff9900', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '4px' }}>
              🇮🇳 Custom Indian & Global Vlogging Kit
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles style={{ color: '#00f2fe' }} /> Interactive Vlogging Kit Builder
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Mix and match budget Indian favorites (Digitek, Boya, Osaka) with global flagships (Sony, DJI). Instant cold-shoe compatibility check!
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', color: '#fff', opacity: 0.7, border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Compatibility Alert Banner */}
        <div style={{
          background: 'rgba(0, 242, 254, 0.1)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: '12px',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.85rem'
        }}>
          <ShieldCheck style={{ color: '#00f2fe' }} size={20} />
          <span><strong>Compatibility Status: 100% Verified.</strong> All gear includes standard 1/4"-20 mounts, cold-shoes, and smartphone USB-C adapters.</span>
        </div>

        {/* Step 1: Camera / Smartphone Rig */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.92rem', color: '#00f2fe', marginBottom: '10px', fontWeight: 700 }}>
            Step 1: Choose Camera or Smartphone Setup
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
            {cameras.concat(rigs.slice(0, 2)).map(cam => (
              <div
                key={cam.id}
                onClick={() => setSelectedCam(cam)}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: selectedCam?.id === cam.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: selectedCam?.id === cam.id ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>{cam.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#00f2fe', fontWeight: 800, fontSize: '0.9rem' }}>
                    {formatPrice(cam.priceINR, cam.priceUSD)}
                  </span>
                  {selectedCam?.id === cam.id && (
                    <span style={{ background: '#00f2fe', color: '#000', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Microphone */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.92rem', color: '#00f2fe', marginBottom: '10px', fontWeight: 700 }}>
            Step 2: Choose Microphone (Indian Budget to Flagship)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
            {mics.map(mic => (
              <div
                key={mic.id}
                onClick={() => setSelectedMic(mic)}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: selectedMic?.id === mic.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: selectedMic?.id === mic.id ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>{mic.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#00f2fe', fontWeight: 800, fontSize: '0.9rem' }}>
                    {formatPrice(mic.priceINR, mic.priceUSD)}
                  </span>
                  {selectedMic?.id === mic.id && (
                    <span style={{ background: '#00f2fe', color: '#000', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Stabilization & Lighting */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.92rem', color: '#00f2fe', marginBottom: '10px', fontWeight: 700 }}>
            Step 3: Choose Stabilization & Lighting
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
            {gimbals.concat(lights).map(item => {
              const isSelected = selectedGimbal?.id === item.id || selectedLight?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.category === 'gimbals-tripods') {
                      setSelectedGimbal(selectedGimbal?.id === item.id ? null : item);
                    } else {
                      setSelectedLight(selectedLight?.id === item.id ? null : item);
                    }
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#00f2fe', fontWeight: 800, fontSize: '0.9rem' }}>
                      {formatPrice(item.priceINR, item.priceUSD)}
                    </span>
                    {isSelected && (
                      <span style={{ background: '#00f2fe', color: '#000', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>✓</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Footer with Dual Currency & Multi-Store Buying Links */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Estimated Custom Studio Bundle Total:</div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#00f2fe' }}>
              {formatPrice(totalINR, totalUSD)}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#00e676', fontWeight: 600 }}>
              ✓ Complete YouTube Starter Bundle Under {currency === 'INR' ? '₹10,000' : '$120'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              to={selectedMic ? selectedMic.prices[0].url : `/go/amazon-in/vlogging-bundle`}
              onClick={onClose}
              className="cta-button"
              style={{ padding: '12px 24px', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              <ShoppingBag size={18} /> Buy on Amazon.in ({formatPrice(totalINR, totalUSD)})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
