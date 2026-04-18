const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const productId = '10269687873836';

const src = 'https://cdn.shopify.com/s/files/1/0895/2184/8630/files/Aimil_Memtone_Syrup_200ml.png';
const data = JSON.stringify({ image: { src: src, position: 1 } });
const opt = {
  hostname: SHOP,
  path: '/admin/api/2024-01/products/' + productId + '/images.json',
  method: 'POST',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};
const req = https.request(opt, r => {
  let b = '';
  r.on('data', chunk => b += chunk);
  r.on('end', () => {
     console.log('Success uploading real image:', b);
  });
});
req.on('error', console.error);
req.write(data);
req.end();
