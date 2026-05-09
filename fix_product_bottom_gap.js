const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', 'utf8');

// The `ayus-product-wrapper` container was closed before recommendations. 
// It looks like `</section>\n</div>` before `<!-- Related Product Recommendations -->`
// The `</div>` is the `ayus-product-container`. Let's ensure it has margin-bottom: 60px;
// I see I missed adding it to the actual element in the previous step.
liquid = liquid.replace(/<div class="ayus-product-container">/, '<div class="ayus-product-container" style="padding-bottom: 60px;">');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', liquid);
