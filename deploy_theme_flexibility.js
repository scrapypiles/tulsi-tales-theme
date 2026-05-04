const https = require('https');
const fs = require('fs');
const path = require('path');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;
const ROOT = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme';

const assets = [
  { local: 'theme.liquid', remote: 'layout/theme.liquid' },
  { local: 'settings_schema.json', remote: 'config/settings_schema.json' },
  { local: 'ayus-404.liquid', remote: 'sections/ayus-404.liquid' },
  { local: 'ayus-collection.liquid', remote: 'sections/ayus-collection.liquid' },
  { local: 'ayus-contact.liquid', remote: 'sections/ayus-contact.liquid' },
  { local: 'ayus-featured-collection.liquid', remote: 'sections/ayus-featured-collection.liquid' },
  { local: 'ayus-footer.liquid', remote: 'sections/ayus-footer.liquid' },
  { local: 'ayus-header.liquid', remote: 'sections/ayus-header.liquid' },
  { local: 'ayus-hero.liquid', remote: 'sections/ayus-hero.liquid' },
  { local: 'ayus-instagram.liquid', remote: 'sections/ayus-instagram.liquid' },
  { local: 'ayus-philosophy.liquid', remote: 'sections/ayus-philosophy.liquid' },
  { local: 'ayus-policy-content.liquid', remote: 'sections/ayus-policy-content.liquid' },
  { local: 'ayus-policy.liquid', remote: 'sections/ayus-policy.liquid' },
  { local: 'ayus-product-main.liquid', remote: 'sections/ayus-product-main.liquid' },
  { local: 'ayus-search.liquid', remote: 'sections/ayus-search.liquid' },
  { local: 'ayus-shop-by.liquid', remote: 'sections/ayus-shop-by.liquid' },
  { local: 'ayus-story-cta.liquid', remote: 'sections/ayus-story-cta.liquid' },
  { local: 'ayus-story-faq.liquid', remote: 'sections/ayus-story-faq.liquid' },
  { local: 'ayus-story-hero.liquid', remote: 'sections/ayus-story-hero.liquid' },
  { local: 'ayus-story-quote.liquid', remote: 'sections/ayus-story-quote.liquid' },
  { local: 'ayus-story-split.liquid', remote: 'sections/ayus-story-split.liquid' },
  { local: 'ayus-story-text.liquid', remote: 'sections/ayus-story-text.liquid' },
  { local: 'ayus-story-values.liquid', remote: 'sections/ayus-story-values.liquid' },
  { local: 'ayus-banner-basic.liquid', remote: 'sections/ayus-banner-basic.liquid' },
  { local: 'ayus-banner-image.liquid', remote: 'sections/ayus-banner-image.liquid' }
];

function uploadAsset(localFile, remoteKey) {
  return new Promise((resolve, reject) => {
    const value = fs.readFileSync(path.join(ROOT, localFile), 'utf8');
    const payload = JSON.stringify({ asset: { key: remoteKey, value } });
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
          console.log(`Uploaded ${remoteKey}`);
          resolve();
        } else {
          reject(new Error(`${remoteKey}: ${res.statusCode} ${body}`));
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

(async () => {
  for (const asset of assets) {
    await uploadAsset(asset.local, asset.remote);
  }
  console.log('Theme flexibility upgrade deployed.');
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
