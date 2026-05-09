const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let raw = fs.readFileSync('/tmp/contact_page.json', 'utf8');
let asset = JSON.parse(raw).asset;
let data = JSON.parse(asset.value);

// Reorder blocks
data.sections.main.block_order = [
  "support",
  "whatsapp",
  "email",
  "instagram"
];

const uploadData = JSON.stringify({
  asset: {
    key: 'templates/page.contact.json',
    value: JSON.stringify(data, null, 2)
  }
});

const req = https.request({
  hostname: '5iib0q-9y.myshopify.com',
  path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
  method: 'PUT',
  headers: {
    'X-Shopify-Access-Token': token,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(uploadData)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log("Upload response:", body.substring(0, 150));
  });
});
req.write(uploadData);
req.end();
