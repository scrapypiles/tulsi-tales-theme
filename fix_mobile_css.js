const fs = require('fs');

const cssPath = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

const mobileCSS = `

/* =========================================================
   MOBILE RESPONSIVENESS PATCH (Strictly Mobile Guardrails)
   ========================================================= */

/* 1. Global Box-Sizing to Prevent Horizontal Scroll/Bleed */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. Strict Mobile Restraints */
@media (max-width: 768px) {
  
  /* Container Padding to prevent edge-touching */
  .ayus-container {
    padding: 40px 15px !important;
  }
  
  /* Buttons: Ensure 48px Apple-standard touch targets, no cropping */
  button, .ayus-btn-primary, .ayus-btn-outline, .ayus-nav-btn {
    min-height: 48px !important;
    white-space: normal !important;
    word-wrap: break-word !important;
    height: auto !important;
    padding: 12px 20px !important;
  }

  /* Full-width Add to Cart button on mobile */
  .tt-product-add-to-cart {
    width: 100% !important;
  }

  /* Typography Scaling for small screens */
  h1, .tt-hero-content-box h1 {
    font-size: clamp(32px, 8vw, 42px) !important;
  }
  h2 {
    font-size: clamp(24px, 6vw, 32px) !important;
  }

  /* Mobile Carousels (Horizontal Swipe) */
  .tt-horizontal-carousel {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    -webkit-overflow-scrolling: touch !important;
    scroll-snap-type: x mandatory !important;
    scrollbar-width: none !important; /* Firefox */
    gap: 15px !important;
    padding-bottom: 20px !important;
    margin: 0 -15px !important; /* Bleed to edge of screen */
    padding-left: 15px !important; /* Start padding */
    padding-right: 15px !important; /* End padding */
  }
  
  .tt-horizontal-carousel::-webkit-scrollbar {
    display: none !important; /* Chrome/Safari */
  }

  .tt-horizontal-carousel .tt-carousel-card {
    flex: 0 0 auto !important;
    width: calc(80vw - 15px) !important; /* Show 1 full card and a peek of the next */
    min-width: 250px !important;
    max-width: 300px !important;
    scroll-snap-align: center !important;
  }
  
  /* Product Cards within carousels */
  .tt-carousel-card .tt-card-info {
    text-align: center !important;
  }
  
  /* Featured Collection section specific spacing */
  .ayus-featured-collection .ayus-container,
  .tt-recommendations .ayus-container {
    padding-left: 0 !important;
    padding-right: 0 !important;
    overflow-x: hidden !important;
  }

  /* Collection Grid adjustments for mobile */
  .ayus-collection-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 15px !important;
  }
  
  .ayus-collection-sidebar {
    padding: 15px !important;
  }

  /* Ensure the mobile product media gallery image fits correctly */
  .tt-main-image-wrapper {
    width: 100% !important;
    max-width: 100% !important;
  }

  /* Header mobile padding */
  .ayus-header-inner {
    padding: 15px !important;
  }
}
`;

if (!css.includes("MOBILE RESPONSIVENESS PATCH")) {
  fs.writeFileSync(cssPath, css + mobileCSS);
  console.log("Mobile patch added.");
} else {
  console.log("Mobile patch already present.");
}
