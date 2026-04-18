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

let css = fs.readFileSync('ayus-styles.css', 'utf8');
css = css.replace(/--font-heading: 'Playfair Display', serif;/g, "--font-heading: 'Seravek', sans-serif;");
css = css.replace(/--font-body: 'Lato', sans-serif;/g, "--font-body: 'Seravek', sans-serif;");
fs.writeFileSync('ayus-styles.css', css);

uploadAsset({
  key: 'assets/ayus-styles.css',
  value: css
}).then(res => {
  if(res.errors) console.error('CSS upload errors:', res.errors);
  else console.log('CSS updated with new fonts successfully');
}).catch(console.error);

