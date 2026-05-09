const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function fetchAsset(key) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: SHOP,
      path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=${encodeURIComponent(key)}`,
      method: 'GET',
      headers: { 'X-Shopify-Access-Token': TOKEN }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const data = JSON.parse(body);
          resolve(data.asset.value || '');
        } else {
          reject(new Error(`${key}: ${res.statusCode} ${body}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  const checks = [
    ['sections/ayus-header.liquid', ['show_announcement'], ['background_color', '#shopify-section-{{ section.id }} > div']],
    ['sections/ayus-story-text.liquid', ['<h2 style="font-family: var(--font-heading); font-size: 32px; margin-bottom: 30px; color: var(--color-text);">{{ section.settings.heading }}</h2>'], ['section.settings.heading_tag']],
    ['sections/ayus-story-split.liquid', ['<h2 style="font-family: var(--font-heading); font-size: 32px; margin-bottom: 15px; color: var(--color-text);">{{ section.settings.heading }}</h2>'], ['section.settings.heading_tag']],
    ['sections/ayus-story-cta.liquid', ['<h2 style="font-family: var(--font-heading); font-size: 36px; margin-bottom: 20px; color: var(--color-text);">{{ section.settings.heading }}</h2>'], ['section.settings.heading_tag']]
  ];

  for (const [key, required, forbidden] of checks) {
    const value = await fetchAsset(key);
    for (const needle of required) {
      if (!value.includes(needle)) throw new Error(`${key} missing required content: ${needle}`);
    }
    for (const needle of forbidden) {
      if (value.includes(needle)) throw new Error(`${key} still contains forbidden content: ${needle}`);
    }
    console.log(`Verified ${key}`);
  }

  console.log('Frontend revert verified.');
})().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
