const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const options = {
  hostname: SHOP,
  path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
      const parsed = JSON.parse(data);
      const output = parsed.assets.map(a => `${a.key} (${a.size} bytes)`).join('\n');
      fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/ayus_assets_list.txt', output);
      console.log(`Saved ${parsed.assets.length} assets to ayus_assets_list.txt`);
  });
});

req.on('error', e => console.error(e));
req.end();
