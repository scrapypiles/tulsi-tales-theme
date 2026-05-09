const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-search.liquid', 'utf8');

// constrain width of the search results grid
liquid = liquid.replace(/<div class="ayus-grid">/, `<div class="ayus-search-grid-wrapper" style="max-width: 1000px; margin: 0 auto; padding: 0 20px;">\n        <div class="ayus-grid" style="row-gap: 50px;">`);
// close the wrapper
liquid = liquid.replace(/<\/div>\n      \{\% endif \%\}\n    \{\% endif \%\}/, `</div>\n        </div>\n      {% endif %}\n    {% endif %}`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-search.liquid', liquid);

const putData = JSON.stringify({ asset: { key: "sections/ayus-search.liquid", value: liquid } });

const req = https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('Search width fixed.'));
});
req.write(putData);
req.end();
