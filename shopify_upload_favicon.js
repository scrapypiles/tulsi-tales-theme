const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const faviconPath = '/home/acharya-kln/.openclaw/media/inbound/Favicon---21b4e33f-5114-4327-ab09-f405b5cd7153.png';
const base64Favicon = fs.readFileSync(faviconPath, 'base64');

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

uploadAsset({
  key: 'assets/favicon.png',
  attachment: base64Favicon
}).then(res => {
  if(res.errors) console.error('Favicon upload errors:', res.errors);
  else console.log('Favicon uploaded successfully');
}).catch(console.error);

