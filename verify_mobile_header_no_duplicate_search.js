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
  const css = await fetchAsset('assets/ayus-styles.css');

  const headerChecks = [
    'class="tt-icon-link tt-mobile-search-toggle" data-search-toggle="true"',
    'class="tt-icon-link tt-desktop-search-toggle desktop-only" data-search-toggle="true"'
  ];
  for (const check of headerChecks) {
    if (!header.includes(check)) throw new Error(`Header missing: ${check}`);
  }

  const cssChecks = [
    '.tt-mobile-header-left,\n.tt-mobile-search-toggle {',
    '.desktop-only,\n  .tt-desktop-search-toggle {',
    'display: grid !important;',
    'grid-template-columns: 1fr auto 1fr;',
    'position: static !important;'
  ];
  for (const check of cssChecks) {
    if (!css.includes(check)) throw new Error(`CSS missing: ${check}`);
  }

  console.log('Verified mobile header no-duplicate-search layout in remote assets.');
})().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
