const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

// Upload logo
const logoPath = '/home/acharya-kln/.openclaw/media/inbound/logo_horizontal_color_orange---38cd1e07-a5a1-4578-b2cc-0ff4fe2c0d3e.png';
const base64Logo = fs.readFileSync(logoPath, 'base64');

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
  key: 'assets/tulsi-tales-logo.png',
  attachment: base64Logo
}).then(res => {
  if(res.errors) console.error('Logo upload errors:', res.errors);
  else console.log('Logo uploaded successfully to assets/tulsi-tales-logo.png');
}).catch(console.error);

