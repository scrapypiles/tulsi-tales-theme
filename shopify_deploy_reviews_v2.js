const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let liquid = fs.readFileSync('ayus-product-main.liquid', 'utf8');
let css = fs.readFileSync('ayus-styles.css', 'utf8');

// --- 1. UPDATE LIQUID ---
const newReviewsHTML = `
  <!-- Judge.me Main Widget Wrapped for Arrows -->
  <div style="position: relative; max-width: 100%;" id="ayus-reviews-wrapper">
    <button class="ayus-rev-arrow ayus-rev-prev">&#8592;</button>
    <div id="judgeme_product_reviews" class="jdgm-widget jdgm-review-widget" data-id="{{ product.id }}">
      {{ product.metafields.judgeme.widget }}
    </div>
    <button class="ayus-rev-arrow ayus-rev-next">&#8594;</button>
  </div>

  <div class="ayus-review-bottom-action">
    <button id="ayus-trigger-review" class="ayus-btn-elegant">Write a Review</button>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
       const interval = setInterval(() => {
          const carousel = document.querySelector('.jdgm-rev-widg__reviews');
          const realBtn = document.querySelector('.jdgm-write-rev-link');
          
          if (carousel) {
             // Arrows Logic
             const prev = document.querySelector('.ayus-rev-prev');
             const next = document.querySelector('.ayus-rev-next');
             
             prev.addEventListener('click', () => {
               carousel.scrollBy({ left: -320, behavior: 'smooth' });
             });
             next.addEventListener('click', () => {
               carousel.scrollBy({ left: 320, behavior: 'smooth' });
             });
             
             // If Judge.me hasn't generated the button yet, keep waiting
             if (realBtn) {
               clearInterval(interval);
               document.getElementById('ayus-trigger-review').addEventListener('click', function(e) {
                  e.preventDefault();
                  realBtn.click();
               });
             }
          }
       }, 500);
       
       // Fallback clear
       setTimeout(() => clearInterval(interval), 10000);
    });
  </script>
`;

// Replace the old block
const startIdx = liquid.indexOf('<!-- Judge.me Main Widget -->');
const endIdx = liquid.indexOf('</div>\n</div>\n\n{% schema %}');

if (startIdx !== -1 && endIdx !== -1) {
  liquid = liquid.substring(0, startIdx) + newReviewsHTML + '\n' + liquid.substring(endIdx);
  fs.writeFileSync('ayus-product-main.liquid', liquid);
  console.log('Liquid processed locally.');
} else {
  console.log('Could not find liquid replacement markers.');
}

// --- 2. UPDATE CSS ---

// Add new specific CSS to the end of the Judge.me section or just append it
const newCSS = `

/* V2 REVIEWS OVERRIDES */
/* Hide Scrollbar */
.jdgm-rev-widg__reviews::-webkit-scrollbar { display: none !important; }
.jdgm-rev-widg__reviews { 
  -ms-overflow-style: none !important; 
  scrollbar-width: none !important; 
  padding-bottom: 20px !important; 
}

/* Elegant Stars */
.jdgm-star { color: #C2A878 !important; } /* Muted Earthy Gold */
.jdgm-rev-widg__summary-stars .jdgm-star { font-size: 20px !important; letter-spacing: 2px !important; }

/* Hide Original Button */
.jdgm-rev-widg__header .jdgm-write-rev-link { display: none !important; }

/* Arrows */
#ayus-reviews-wrapper {
  position: relative;
}
.ayus-rev-arrow {
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  width: 44px; 
  height: 44px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #eae5d9;
  display: flex; 
  align-items: center; 
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  color: #2C2A29;
  font-size: 18px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}
.ayus-rev-arrow:hover { 
  background: #f7f5f0; 
  transform: translateY(-50%) scale(1.05);
}
.ayus-rev-prev { left: -22px; }
.ayus-rev-next { right: -22px; }

/* Elegant Bottom Button */
.ayus-review-bottom-action { 
  text-align: center; 
  margin-top: 20px; 
}
.ayus-btn-elegant {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-text);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0 0 5px 0;
  cursor: pointer;
  transition: opacity 0.3s;
  border-radius: 0;
}
.ayus-btn-elegant:hover { 
  opacity: 0.5; 
}

@media (max-width: 850px) {
  .ayus-rev-prev { left: -10px; }
  .ayus-rev-next { right: -10px; }
}
`;

css = css + newCSS;
fs.writeFileSync('ayus-styles.css', css);
console.log('CSS processed locally.');


// --- 3. UPLOAD ---
const assets = [
  { key: 'sections/ayus-product-main.liquid', value: liquid },
  { key: 'assets/ayus-styles.css', value: css }
];

function uploadAsset(asset) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ asset });
    const opt = {
      hostname: SHOP,
      path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(opt, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  for (const asset of assets) {
    console.log('Uploading ' + asset.key + '...');
    const res = await uploadAsset(asset);
    if (res.errors) console.error('Failed:', res.errors);
    else console.log('Successfully uploaded ' + asset.key);
  }
}

run();
