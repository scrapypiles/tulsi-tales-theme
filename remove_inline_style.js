const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid', 'utf8');

liquid = liquid.replace(/<style>[\s\S]*?<\/style>\n\n/m, '');

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
  res.on('end', () => console.log('Inline style removed and deployed.'));
});
req.write(putData);
req.end();
