const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const assets = [
  {
    key: 'sections/ayus-instagram.liquid',
    path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-instagram.liquid'
  },
  {
    key: 'templates/index.json',
    path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/index.json'
  }
];

function uploadAsset(asset) {
  return new Promise((resolve, reject) => {
    const value = fs.readFileSync(asset.path, 'utf8');
    const putData = JSON.stringify({ asset: { key: asset.key, value } });

    const req = https.request({
      hostname: SHOP,
      path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(putData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(asset.key);
        } else {
          reject(new Error(`${asset.key} failed: ${res.statusCode} ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(putData);
    req.end();
  });
}

(async () => {
  for (const asset of assets) {
    await uploadAsset(asset);
    console.log(`Uploaded ${asset.key}`);
  }
  console.log('Instagram section deployed.');
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
