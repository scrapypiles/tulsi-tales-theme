const fs = require('fs');
let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// Strip out the previous attempt
css = css.replace(/\/\* --- Mobile PDP specific reordering as requested --- \*\/[\s\S]*$/g, '');

// Append clean block
css += `/* --- Mobile PDP specific reordering as requested --- */
@media (max-width: 768px) {
  .ayus-product-container {
    display: flex !important;
    flex-direction: column !important;
  }
  .tt-left-column,
  .ayus-product-info-wrapper,
  .ayus-cart-form,
  .ayus-cart-form form,
  .tt-product-media-gallery,
  .tt-main-image-container {
    display: contents !important;
  }
  
  .ayus-product-header { order: 1 !important; margin-bottom: 20px !important; }
  .tt-commerce-controls { order: 2 !important; margin-bottom: 20px !important; border-bottom: none !important; padding-bottom: 0 !important; }
  .ayus-add-to-cart-wrapper { order: 3 !important; margin-bottom: 30px !important; width: 100% !important; }
  .tt-main-image-zoom { order: 4 !important; margin-bottom: 15px !important; width: 100% !important; }
  .tt-thumbnail-strip { order: 5 !important; margin-bottom: 30px !important; width: 100% !important; }
  .ayus-product-description { order: 6 !important; margin-top: 0 !important; margin-bottom: 30px !important; }
  
  .tt-meta-grid { 
    order: 7 !important; 
    grid-template-columns: 1fr 1fr !important; /* Two columns on mobile */
    margin-bottom: 30px !important;
  }
  .ayus-accordions { order: 8 !important; width: 100% !important; }
}
`;

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);