const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function uploadAsset(asset) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ asset });
    const opt = {
      hostname: SHOP,
      path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(opt, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function uploadAll() {
  const collectionContent = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid', 'utf8');
  await uploadAsset({ key: 'sections/ayus-collection.liquid', value: collectionContent });
  console.log('ayus-collection.liquid uploaded');

  const indexContent = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/index.json', 'utf8');
  await uploadAsset({ key: 'templates/index.json', value: indexContent });
  console.log('index.json uploaded');
}

uploadAll();
