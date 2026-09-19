// Centralized Affiliate Configuration for HelpVloggers.com
// Update your Amazon Associates Tracking ID and other affiliate tags here.

export const AFFILIATE_CONFIG = {
  // Amazon Associates Tracking IDs
  // Replace with your actual Amazon Tracking IDs from Amazon Associates Central
  amazon: {
    // Amazon India (amazon.in) - e.g. "yourname-21" or "helpvloggers-21"
    tagIndia: import.meta.env.VITE_AMAZON_IN_TAG || "ammyskambl00c-21",
    
    // Amazon US & Global (amazon.com) - e.g. "yourname-20" or "helpvloggers-20"
    tagUS: import.meta.env.VITE_AMAZON_US_TAG || "ammyskambl00c-21",
    
    // Fallback domains
    inDomain: "https://www.amazon.in",
    usDomain: "https://www.amazon.com"
  },

  // Other Affiliate Networks
  flipkart: {
    affiliateId: import.meta.env.VITE_FLIPKART_AFFILIATE_ID || "helpvloggers",
    baseUrl: "https://www.flipkart.com"
  },
  
  bhphoto: {
    tag: "helpvloggers_bh",
    baseUrl: "https://www.bhphotovideo.com"
  },
  
  croma: {
    baseUrl: "https://www.croma.com"
  },
  
  reliance: {
    baseUrl: "https://www.reliancedigital.in"
  },

  // Behavior Settings
  autoRedirectSeconds: 3, // Set to 0 to disable auto-forwarding, or 3 for preview page
  enableDirectForwarding: false // If true, opens affiliate store immediately
};

/**
 * Builds the tracked Amazon affiliate URL for any product
 * Supports direct ASIN, custom direct affiliate links, or search fallback
 */
export function getAmazonAffiliateUrl({
  country = 'IN',
  asin = null,
  directAffiliateUrl = null,
  searchQuery = '',
  slug = ''
}) {
  // 1. If a custom direct SiteStripe or amzn.to link is provided, use it directly!
  if (directAffiliateUrl) {
    return directAffiliateUrl;
  }

  const isIndia = country === 'IN';
  const domain = isIndia ? AFFILIATE_CONFIG.amazon.inDomain : AFFILIATE_CONFIG.amazon.usDomain;
  const tag = isIndia ? AFFILIATE_CONFIG.amazon.tagIndia : AFFILIATE_CONFIG.amazon.tagUS;

  // 2. If direct ASIN is provided, link directly to the product page with tracking tag
  if (asin) {
    return `${domain}/dp/${asin}?tag=${tag}`;
  }

  // 3. Fallback: link to search results for this exact product title with tracking tag
  const query = encodeURIComponent(searchQuery || slug.replace(/-/g, ' '));
  return `${domain}/s?k=${query}&tag=${tag}`;
}
