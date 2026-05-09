const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;
const SHOP = '5iib0q-9y.myshopify.com';

const imagePath = '/home/acharya-kln/.openclaw/media/inbound/TT-SEO-image---dac57f07-d797-42a4-a393-7db4b8cb5cf8.jpg';
const base64Image = fs.readFileSync(imagePath).toString('base64');

const uploadData = JSON.stringify({
  asset: {
    key: 'assets/seo-image.jpg',
    attachment: base64Image
  }
});

const req = https.request({
  hostname: SHOP,
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

req.on('error', console.error);
req.write(uploadData);
req.end();
