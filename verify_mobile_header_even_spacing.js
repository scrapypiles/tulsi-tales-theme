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
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`${key}: ${res.statusCode} ${body}`));
          return;
        }
        resolve(JSON.parse(body).asset.value || '');
      });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  const header = await fetchAsset('sections/ayus-header.liquid');
  const theme = await fetchAsset('layout/theme.liquid');
  const css = await fetchAsset('assets/ayus-styles.css');

  const headerChecks = [
    'class="tt-mobile-header-left"',
    'class="tt-icon-link tt-mobile-search-toggle" data-search-toggle="true"',
    'class="tt-icon-link desktop-only" data-search-toggle="true"'
  ];
  for (const check of headerChecks) {
    if (!header.includes(check)) throw new Error(`Header missing: ${check}`);
  }

  const themeChecks = [
    "document.querySelectorAll('[data-search-toggle=\"true\"]')"
  ];
  for (const check of themeChecks) {
    if (!theme.includes(check)) throw new Error(`Theme missing: ${check}`);
  }

  const cssChecks = [
    '.tt-mobile-header-left,\n  .ayus-nav-right {',
    'width: 92px;',
    'min-width: 92px;',
    'vertical-align: middle !important;'
  ];
  for (const check of cssChecks) {
    if (!css.includes(check)) throw new Error(`CSS missing: ${check}`);
  }

  console.log('Verified even mobile header spacing in remote assets.');
})().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
