const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const options = {
  hostname: '5iib0q-9y.myshopify.com',
  path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=templates/page.our-story.json`,
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': token,
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const asset = JSON.parse(data).asset;
    if (asset) {
        console.log(asset.value);
    } else {
        console.log("Asset not found");
        console.log(data);
    }
  });
});
req.end();
