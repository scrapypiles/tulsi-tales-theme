const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const options = {
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json?asset[key]=assets/ayus-styles.css',
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body);
    if (data.asset) {
      fs.writeFileSync('ayus-styles.css', data.asset.value);
      console.log('Saved to ayus-styles.css');
    } else {
      console.log('Error:', data);
    }
  });
});

req.on('error', e => console.error(e));
req.end();