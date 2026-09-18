import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { VLOGGING_PRODUCTS, BLOG_CLUSTERS } from '../data/vloggingProducts';

export default function SchemaInjector() {
  const { pathname } = useLocation();

  useEffect(() => {
    let schemaData;

    if (pathname.startsWith('/product/')) {
      const prodId = pathname.replace('/product/', '');
      const prod = VLOGGING_PRODUCTS.find(p => p.id === prodId);
      if (prod) {
        schemaData = {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": prod.title,
          "image": prod.image,
          "description": prod.summary,
          "brand": { "@type": "Brand", "name": prod.brand },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": Math.min(...prod.prices.map(p => p.price)),
            "highPrice": Math.max(...prod.prices.map(p => p.price)),
            "offerCount": prod.prices.length,
            "offers": prod.prices.map(p => ({
              "@type": "Offer",
              "price": p.price,
              "priceCurrency": "USD",
              "seller": { "@type": "Organization", "name": p.store },
              "availability": p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            }))
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": prod.rating,
            "reviewCount": prod.reviewCount
          }
        };
      }
    } else if (pathname.startsWith('/blog/')) {
      const blogId = pathname.replace('/blog/', '');
      const blog = BLOG_CLUSTERS.find(b => b.id === blogId);
      if (blog) {
        schemaData = {
          "@context": "https://schema.org/",
          "@type": "Article",
          "headline": blog.title,
          "image": blog.image,
          "author": { "@type": "Person", "name": blog.author },
          "publisher": { "@type": "Organization", "name": "HelpVloggers" },
          "description": blog.excerpt
        };
      }
    }

    // Default to WebSite + ItemList schema
    if (!schemaData) {
      schemaData = {
        "@context": "https://schema.org/",
        "@type": "ItemList",
        "name": "HelpVloggers Best Vlogging Equipment Directory",
        "itemListElement": VLOGGING_PRODUCTS.map((prod, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "name": prod.title,
            "image": prod.image,
            "brand": { "@type": "Brand", "name": prod.brand },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "lowPrice": Math.min(...prod.prices.map(p => p.price)),
              "highPrice": Math.max(...prod.prices.map(p => p.price)),
              "offerCount": prod.prices.length
            }
          }
        }))
      };
    }

    const scriptId = 'jsonld-schema-helpvloggers';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(schemaData);

  }, [pathname]);

  return null;
}
