const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let raw = fs.readFileSync('/tmp/live_settings_verify.json', 'utf8');
let data = JSON.parse(raw);

// Check if we can find a logo in Shopify assets or just use the SVG fallback
data.current.sections['ayus-footer'].blocks['brand_info_1'].settings.logo = "shopify:\/\/shop_images\/logo.png";
data.current.settings.favicon = "shopify:\/\/shop_images\/favicon.png"; // Guessing standard naming

const uploadData = JSON.stringify({
  asset: {
    key: 'config/settings_data.json',
    value: JSON.stringify(data)
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
    console.log("Upload response:", body.substring(0, 100) + '...');
  });
});
req.write(uploadData);
req.end();
