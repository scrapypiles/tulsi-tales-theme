const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let css = fs.readFileSync('ayus-styles.css', 'utf8');

const startMarker = '/* Judge.me Purearth Overrides */';
const endMarker = '/* UNIVERSAL BUTTON STYLING (PUREARTH AESTHETIC) */';

const startIndex = css.indexOf(startMarker);
const endIndex = css.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newJudgeMeCSS = `/* Judge.me Purearth Overrides */
.jdgm-widget { font-family: var(--font-body) !important; }
.jdgm-star { color: #d4af37 !important; }
.jdgm-preview-badge .jdgm-star { font-size: 14px !important; line-height: 1 !important; display: inline-block !important; }
.jdgm-prev-badge__text { font-size: 12px !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; color: #888 !important; margin-left: 8px !important; display: inline-block !important; }

/* Clean Widget Header */
.jdgm-rev-widg { padding: 40px 0 !important; border: none !important; margin: 0 !important; }
.jdgm-rev-widg__header { border: none !important; margin: 0 !important; padding: 0 !important; text-align: center !important; }
.jdgm-rev-widg__title { font-family: var(--font-heading) !important; font-size: 28px !important; color: var(--color-text) !important; text-align: center !important; border: none !important; margin-bottom: 20px !important; }
.jdgm-rev-widg__summary { border: none !important; text-align: center !important; }
.jdgm-rev-widg__summary-stars .jdgm-star { font-size: 24px !important; }
.jdgm-rev-widg__summary-text { font-family: var(--font-body) !important; font-size: 13px !important; text-transform: uppercase; letter-spacing: 0.1em; color: #555; }

/* Buttons */
.jdgm-write-rev-link {
  font-family: var(--font-body) !important;
  font-size: 11px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.15em !important;
  padding: 12px 30px !important;
  background-color: transparent !important;
  color: var(--color-text) !important;
  border: 1px solid var(--color-text) !important;
  border-radius: 0 !important;
  display: inline-flex !important;
  margin-top: 20px !important;
}
.jdgm-write-rev-link:hover { background-color: var(--color-accent) !important; color: #fff !important; border-color: var(--color-accent) !important; }

/* Form */
.jdgm-form-wrapper { border: 1px solid var(--color-border) !important; padding: 30px !important; background: #fff !important; margin-top: 30px !important; }
.jdgm-form__fieldset label { font-family: var(--font-body) !important; font-size: 11px !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; color: #888 !important; }
.jdgm-form__fieldset input, .jdgm-form__fieldset textarea { border: 1px solid var(--color-border) !important; border-radius: 0 !important; padding: 12px !important; font-family: var(--font-body) !important; }
.jdgm-submit-rev { background-color: transparent !important; border: 1px solid var(--color-text) !important; color: var(--color-text) !important; border-radius: 0 !important; font-family: var(--font-body) !important; font-size: 13px !important; text-transform: uppercase !important; letter-spacing: 0.15em !important; padding: 16px 40px !important; }
.jdgm-submit-rev:hover { background-color: var(--color-accent) !important; color: #fff !important; border-color: var(--color-accent) !important; }

/* Horizontal Reviews Carousel */
.jdgm-rev-widg__reviews {
  display: flex !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  gap: 20px;
  padding-bottom: 10px;
  margin-top: 40px !important;
}
.jdgm-rev-widg__reviews::-webkit-scrollbar { height: 6px; }
.jdgm-rev-widg__reviews::-webkit-scrollbar-track { background: #f1f1f1; }
.jdgm-rev-widg__reviews::-webkit-scrollbar-thumb { background: #d4af37; }

/* Review Cards */
.jdgm-rev {
  flex: 0 0 calc(25% - 15px) !important; 
  min-width: 280px !important;
  scroll-snap-align: start;
  border: 1px solid var(--color-border) !important;
  padding: 30px !important;
  border-radius: 0 !important;
  background: #fff;
}
.jdgm-rev__title { font-family: var(--font-heading) !important; font-size: 18px !important; font-weight: normal !important; margin-bottom: 15px !important; }
.jdgm-rev__body { font-family: var(--font-body) !important; font-size: 14px !important; line-height: 1.8 !important; color: #444 !important; }
.jdgm-rev__author { font-family: var(--font-body) !important; font-size: 11px !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; color: #888 !important; }
.jdgm-rev__timestamp { font-family: var(--font-body) !important; font-size: 11px !important; color: #999 !important; }

@media (max-width: 1100px) { .jdgm-rev { flex: 0 0 calc(33.33% - 14px) !important; } }
@media (max-width: 850px) { .jdgm-rev { flex: 0 0 calc(50% - 10px) !important; } }
@media (max-width: 600px) { .jdgm-rev { flex: 0 0 calc(85%) !important; } }

`;
  
  css = css.substring(0, startIndex) + newJudgeMeCSS + css.substring(endIndex);
  fs.writeFileSync('ayus-styles.css', css);
  console.log('CSS processed locally.');
}

const assets = [
  { key: 'sections/ayus-product-main.liquid', value: fs.readFileSync('ayus-product-main.liquid', 'utf8') },
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
