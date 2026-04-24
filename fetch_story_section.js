const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function fetchAsset(key, path) {
  const options = {
    hostname: '5iib0q-9y.myshopify.com',
    path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=${key}`,
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
          fs.writeFileSync(path, asset.value);
          console.log(`Saved ${path}`);
      }
    });
  });
  req.end();
}

fetchAsset('sections/ayus-story-quote.liquid', '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-quote.liquid');
