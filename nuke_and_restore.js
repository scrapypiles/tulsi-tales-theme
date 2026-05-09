const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const files = [
  { path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', key: 'assets/ayus-styles.css' },
  { path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/index.json', key: 'templates/index.json' },
  { path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-hero.liquid', key: 'sections/ayus-hero.liquid' },
  { path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-shop-by.liquid', key: 'sections/ayus-shop-by.liquid' },
  { path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-featured-collection.liquid', key: 'sections/ayus-featured-collection.liquid' },
  { path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-philosophy.liquid', key: 'sections/ayus-philosophy.liquid' },
  { path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/theme.liquid', key: 'layout/theme.liquid' },
  { path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-header.liquid', key: 'sections/ayus-header.liquid' },
  { path: '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', key: 'sections/ayus-footer.liquid' }
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
    console.log('Uploading ' + file.key + '...');
    const res = await uploadAsset(file);
    if (res.errors) console.error('Failed:', res.errors);
    else console.log('Successfully uploaded');
  }
}

run();
