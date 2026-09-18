import React, { createContext, useContext, useState } from 'react';

const EcommerceContext = createContext();

export function EcommerceProvider({ children }) {
  const [market, setMarket] = useState('india'); // 'india' | 'global' | 'all'
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState(['digitek-dwm-101', 'boya-by-m1']);
  const [selectedPincode, setSelectedPincode] = useState('400001 (Mumbai)');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const switchMarket = (newMarket) => {
    setMarket(newMarket);
    if (newMarket === 'india') {
      setCurrency('INR');
    } else if (newMarket === 'global') {
      setCurrency('USD');
    }
  };

  const toggleCurrency = () => {
    setCurrency(prev => {
      const next = prev === 'INR' ? 'USD' : 'INR';
      if (next === 'INR') setMarket('india');
      else setMarket('global');
      return next;
    });
  };

  const formatPrice = (priceINR, priceUSD) => {
    if (currency === 'INR') {
      return `₹${(priceINR || 0).toLocaleString('en-IN')}`;
    }
    return `$${(priceUSD || 0).toFixed(2)}`;
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const toggleCompare = (productId) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 products at a time.');
        return prev;
      }
      return [...prev, productId];
    });
  };

  return (
    <EcommerceContext.Provider value={{
      market,
      setMarket: switchMarket,
      currency,
      setCurrency,
      toggleCurrency,
      formatPrice,
      wishlist,
      toggleWishlist,
      compareList,
      toggleCompare,
      selectedPincode,
      setSelectedPincode,
      searchCategory,
      setSearchCategory,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </EcommerceContext.Provider>
  );
}

export function useEcommerce() {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
}
