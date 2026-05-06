const fs = require('fs');
let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', 'utf8');

// Reduce space above add to bag
liquid = liquid.replace(/margin-bottom: 30px; border-bottom: 1px solid var\(--color-border\); padding-bottom: 25px;/, 'margin-bottom: 15px; border-bottom: 1px solid var(--color-border); padding-bottom: 15px;');

// Reduce padding above divider line under the price
liquid = liquid.replace(/justify-content: space-between; margin-bottom: 20px; padding-bottom: 0;/, 'justify-content: space-between; margin-bottom: 15px; padding-bottom: 0;');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', liquid);

let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// The mobile layout CSS
css = css.replace(/\/\* Pure Earth Mobile Layout Order \*\/[\s\S]*\}\n\}$/g, 
`/* Pure Earth Mobile Layout Order */
  .tt-main-image-zoom { order: 1 !important; margin-bottom: 15px !important; width: 100% !important; }
  .tt-thumbnail-strip { order: 2 !important; margin-bottom: 20px !important; width: 100% !important; }
  
  .ayus-product-header { order: 3 !important; margin-bottom: 0 !important; width: 100% !important; }
  
  .tt-commerce-controls { order: 4 !important; margin-bottom: 15px !important; border-bottom: none !important; padding-bottom: 0 !important; width: 100% !important; }
  .ayus-add-to-cart-wrapper { order: 5 !important; margin-bottom: 25px !important; width: 100% !important; }
  
  .ayus-product-description { order: 6 !important; margin-top: 0 !important; margin-bottom: 25px !important; width: 100% !important; }
  
  .tt-meta-grid { 
    order: 7 !important; 
    grid-template-columns: 1fr 1fr !important; /* Two columns on mobile */
    margin-bottom: 25px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  .ayus-accordions { order: 8 !important; width: 100% !important; }
}`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);