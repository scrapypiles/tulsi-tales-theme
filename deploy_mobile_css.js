const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function uploadAsset(key, path) {
  return new Promise((resolve, reject) => {
    const asset = { key, value: fs.readFileSync(path, 'utf8') };
    const data = JSON.stringify({ asset });
    const req = https.request({
      hostname: SHOP,
      path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
      method: 'PUT',
      headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve());
    });
    req.write(data);
    req.end();
  });
}

async function run() {
  await uploadAsset('assets/ayus-styles.css', '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css');
  await uploadAsset('sections/ayus-product-main.liquid', '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid');
  await uploadAsset('sections/ayus-featured-collection.liquid', '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-featured-collection.liquid');
  console.log('Mobile assets deployed successfully');
}
run();
