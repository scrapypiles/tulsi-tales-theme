const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid', 'utf8');

const target = `<div class="tt-collection-hero" style="background-image: url('{{ hero_bg }}'); position: relative;">
      <div class="tt-hero-overlay"></div>
      <div class="tt-hero-content" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; max-width: 800px; padding: 0 20px; box-sizing: border-box; text-align: center; z-index: 10;">
    <h1 class="tt-hero-title" style="margin: 0 auto 5px auto; text-align: center; color: #fff; font-family: var(--font-heading); font-size: 48px; font-weight: normal; letter-spacing: 0.02em;">The Collection</h1>
    <div class="tt-collection-desc" style="margin: 0 auto; text-align: center; color: #fff; font-family: var(--font-body); font-size: 18px; line-height: 1.6;">Authentic Ayurvedic products, carefully chosen.</div>
  </div>
</div>`;

const replacement = `<div class="contact-banner tt-collection-hero" style="background-image: url('{{ hero_bg }}');">
    <div class="contact-banner-content" style="color: #fff;">
      <span class="contact-tagline" style="color: #eee;">THE COLLECTION</span>
      <h1 class="contact-title" style="color: #fff !important;">Every product here earned its place.</h1>
      <div class="contact-subtitle" style="color: #fff; opacity: 0.9; line-height: 1.4;">Curated from India's finest Ayurvedic makers. Nothing we wouldn't use ourselves.</div>
    </div>
  </div>`;

liquid = liquid.replace(target, replacement);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid', liquid);

const putData = JSON.stringify({ asset: { key: "sections/ayus-collection.liquid", value: liquid } });

const req = https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('Collection Hero updated.'));
});
req.write(putData);
req.end();
