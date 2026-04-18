const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const files = [
  { path: 'ayus-styles.css', key: 'assets/ayus-styles.css' },
  { path: 'ayus-header.liquid', key: 'sections/ayus-header.liquid' },
  { path: 'ayus-footer.liquid', key: 'sections/ayus-footer.liquid' }
];

function uploadAsset(file) {
  return new Promise((resolve, reject) => {
    const asset = {
      key: file.key,
      value: fs.readFileSync(file.path, 'utf8')
    };
    
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

async function run() {
  for (const file of files) {
    console.log('Uploading ' + file.path + '...');
    const res = await uploadAsset(file);
    if (res.errors) console.error('Failed:', res.errors);
    else console.log('Successfully uploaded ' + file.path);
  }
}

run();
