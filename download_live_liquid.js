const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function downloadAsset(key, path) {
  const options = {
    hostname: SHOP,
    path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=${key}`,
    method: 'GET',
    headers: {
      'X-Shopify-Access-Token': TOKEN,
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      const asset = JSON.parse(data).asset;
      if (asset) {
          fs.writeFileSync(path, asset.value);
          console.log("Saved " + path);
      }
    });
  });
  req.end();
}

downloadAsset('sections/ayus-hero.liquid', '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/live-ayus-hero.liquid');
downloadAsset('sections/ayus-featured-collection.liquid', '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/live-ayus-featured.liquid');
