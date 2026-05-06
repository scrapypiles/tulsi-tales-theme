const fs = require('fs');
let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// Replace all margin-bottom to 15px to make it perfectly consistent.
css = css.replace(/\.tt-main-image-zoom \{ order: 1 !important; margin-bottom: 15px !important; width: 100% !important; \}/, '.tt-main-image-zoom { order: 1 !important; margin-bottom: 15px !important; width: 100% !important; }');
css = css.replace(/\.tt-thumbnail-strip \{ order: 2 !important; margin-bottom: 20px !important; width: 100% !important; \}/, '.tt-thumbnail-strip { order: 2 !important; margin-bottom: 15px !important; width: 100% !important; }');

// We set this to 5px above. Let's keep it tight.
css = css.replace(/\.ayus-product-header \{ order: 3 !important; margin-bottom: 5px !important; padding-bottom: 0 !important; width: 100% !important; border-bottom: none !important; \}/, '.ayus-product-header { order: 3 !important; margin-bottom: 10px !important; padding-bottom: 0 !important; width: 100% !important; border-bottom: none !important; }');

css = css.replace(/\.tt-commerce-controls \{ order: 4 !important; margin-top: 5px !important; margin-bottom: 5px !important; border-bottom: none !important; padding-bottom: 0 !important; width: 100% !important; \}/, '.tt-commerce-controls { order: 4 !important; margin-bottom: 15px !important; border-bottom: none !important; padding-bottom: 0 !important; width: 100% !important; }');

css = css.replace(/\.ayus-add-to-cart-wrapper \{ order: 5 !important; margin-bottom: 15px !important; width: 100% !important; \}/, '.ayus-add-to-cart-wrapper { order: 5 !important; margin-bottom: 15px !important; width: 100% !important; }');

css = css.replace(/\.ayus-product-description \{ order: 6 !important; margin-top: 0 !important; margin-bottom: 15px !important; width: 100% !important; \}/, '.ayus-product-description { order: 6 !important; margin-top: 0 !important; margin-bottom: 15px !important; width: 100% !important; }');

css = css.replace(/margin-bottom: 20px !important;\n    width: 100% !important;\n    box-sizing: border-box !important;\n  \}\n  \.ayus-accordions/g, 'margin-bottom: 15px !important;\n    width: 100% !important;\n    box-sizing: border-box !important;\n  }\n  .ayus-accordions');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', 'utf8');

// Also remove inline gap and margin on commerce controls to not double up
liquid = liquid.replace(/<div class="tt-commerce-controls" style="display:flex; flex-direction: column; align-items: flex-start; gap: 15px; margin-bottom: 15px; border-bottom: 1px solid var\(--color-border\); padding-bottom: 15px;">/, '<div class="tt-commerce-controls" style="display:flex; flex-direction: column; align-items: flex-start; gap: 10px; margin-top: 5px; margin-bottom: 10px; border-bottom: 1px solid var(--color-border); padding-bottom: 10px;">');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', liquid);

