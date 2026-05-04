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
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const data = JSON.parse(body);
            resolve(data.asset.value || '');
          } catch (err) {
            reject(err);
          }
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
    ['config/settings_schema.json', ['enable_advanced_typography', 'type_heading_transform', 'type_body_style']],
    ['layout/theme.liquid', ['--tt-h1-desktop', 'type_heading_transform', 'type_body_style']],
    ['sections/ayus-collection.liquid', ['background_color', 'hero_heading_tag', 'hero_overlay_opacity']],
    ['sections/ayus-search.liquid', ['search_heading_tag', 'results_text', 'no_results_text']],
    ['sections/ayus-404.liquid', ['error_code', 'heading_tag', 'button_label']],
    ['sections/ayus-banner-basic.liquid', ['Ayus Banner Basic', 'heading_tag', 'background_color']],
    ['sections/ayus-banner-image.liquid', ['Ayus Banner Image', 'heading_tag', 'overlay_opacity']]
  ];

  for (const [key, needles] of checks) {
    const value = await fetchAsset(key);
    const missing = needles.filter(n => !value.includes(n));
    if (missing.length) {
      throw new Error(`${key} missing: ${missing.join(', ')}`);
    }
    console.log(`Verified ${key}`);
  }

  console.log('Theme flexibility assets verified.');
})().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
