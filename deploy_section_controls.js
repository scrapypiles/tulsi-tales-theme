const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const files = [
  'ayus-404.liquid',
  'ayus-collection.liquid',
  'ayus-contact.liquid',
  'ayus-featured-collection.liquid',
  'ayus-footer.liquid',
  'ayus-header.liquid',
  'ayus-hero.liquid',
  'ayus-instagram.liquid',
  'ayus-philosophy.liquid',
  'ayus-policy-content.liquid',
  'ayus-policy.liquid',
  'ayus-product-main.liquid',
  'ayus-search.liquid',
  'ayus-shop-by.liquid',
  'ayus-story-cta.liquid',
  'ayus-story-faq.liquid',
  'ayus-story-hero.liquid',
  'ayus-story-quote.liquid',
  'ayus-story-split.liquid',
  'ayus-story-text.liquid',
  'ayus-story-values.liquid'
];

function upload(file) {
  return new Promise((resolve, reject) => {
    const value = fs.readFileSync(`/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/${file}`, 'utf8');
    const payload = JSON.stringify({ asset: { key: `sections/${file}`, value } });
    const req = https.request({
      hostname: SHOP,
      path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`Uploaded ${file}`);
          resolve();
        } else {
          reject(new Error(`${file}: ${res.statusCode} ${body}`));
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

(async () => {
  for (const file of files) {
    await upload(file);
  }
  console.log('Section control upgrade deployed.');
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
