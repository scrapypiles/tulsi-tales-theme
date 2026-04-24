const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const options = {
  hostname: '5iib0q-9y.myshopify.com',
  path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': token,
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const assets = JSON.parse(data).assets;
    if (assets) {
        console.log(assets.filter(a => a.key.includes('page') || a.key.includes('story') || a.key.includes('philosophy') || a.key.includes('text')).map(a => a.key));
    }
  });
});
req.end();
