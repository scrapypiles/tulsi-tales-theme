const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let collectionLiquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid', 'utf8');

// Remove the inline style block completely
collectionLiquid = collectionLiquid.replace(/<style>[\s\S]*?<\/style>\n*/, '');

// Replace the banner HTML
const targetBanner = /<div class="contact-banner"[\s\S]*?<\/div>\n<\/div>/;
const newBanner = `<div class="contact-banner" style="background-image: url('{{ hero_bg }}'); margin-bottom: 40px;">
  <div class="contact-banner-content">
    <span class="contact-tagline" style="color: #eeeeee;">THE COLLECTION</span>
    <h1 class="contact-title" style="color: #ffffff;">Every product here earned its place.</h1>
    <div class="contact-subtitle" style="color: #ffffff; opacity: 0.9;">Curated from India's finest Ayurvedic makers. Nothing we wouldn't use ourselves.</div>
  </div>
</div>`;

collectionLiquid = collectionLiquid.replace(targetBanner, newBanner);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid', collectionLiquid);

const putData = JSON.stringify({ asset: { key: "sections/ayus-collection.liquid", value: collectionLiquid } });

const req = https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('ayus-collection synced and deployed.'));
});
req.write(putData);
req.end();
