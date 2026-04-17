const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const assets = [
  {
    key: 'sections/ayus-footer.liquid',
    value: '<footer class="site-footer" style="padding: 80px 20px; background: #000; color: #fff; font-family: \'Helvetica Neue\', sans-serif;"><div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between;"><div style="flex: 1; min-width: 250px; margin-bottom: 40px;"><h4 style="font-family: serif; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; font-size: 14px;">TULSI TALES</h4><p style="font-size: 12px; line-height: 1.8; color: #ccc;">Ayurvedic wisdom, elegantly crafted.<br>Pure, potent, and proven.</p></div><div style="flex: 1; min-width: 250px; margin-bottom: 40px;"><h4 style="font-family: serif; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; font-size: 12px;">Shop</h4><ul style="list-style: none; padding: 0; font-size: 12px; line-height: 2.2; letter-spacing: 1px; text-transform: uppercase;"><li><a href="/collections/all" style="text-decoration: none; color: #ccc;">All Medicines</a></li></ul></div><div style="flex: 1; min-width: 250px; margin-bottom: 40px;"><h4 style="font-family: serif; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; font-size: 12px;">Legal</h4><ul style="list-style: none; padding: 0; font-size: 12px; line-height: 2.2; letter-spacing: 1px; text-transform: uppercase;"><li><a href="/pages/terms" style="text-decoration: none; color: #ccc;">Terms of Service</a></li><li><a href="/pages/privacy" style="text-decoration: none; color: #ccc;">Privacy Policy</a></li><li><a href="/pages/refund" style="text-decoration: none; color: #ccc;">Refund Policy</a></li></ul></div></div></footer>\n{% schema %}\n{\n  "name": "Ayus Footer",\n  "settings": []\n}\n{% endschema %}'
  }
];

function uploadAsset(asset) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ asset });
    const options = {
      hostname: SHOP,
      path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });

    req.on('error', e => reject(e));
    req.write(data);
    req.end();
  });
}

async function run() {
  for (const asset of assets) {
    console.log('Uploading ' + asset.key + '...');
    const res = await uploadAsset(asset);
    if (res.errors) {
      console.error('Failed to upload ' + asset.key + ':', res.errors);
    } else {
      console.log('Successfully uploaded ' + asset.key);
    }
  }
}

run();