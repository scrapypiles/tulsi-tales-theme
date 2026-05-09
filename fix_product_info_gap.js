const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', 'utf8');

// The `ayus-product-wrapper` div closing tag is right before `<section class="tt-recommendations">`
// Let's add a clean 60px margin to the bottom of the wrapper to separate the extra images from the divider line
liquid = liquid.replace(/<div class="ayus-product-wrapper" style="margin-bottom: 60px;">/, '<div class="ayus-product-wrapper" style="margin-bottom: 60px; padding-bottom: 60px;">');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', liquid);
