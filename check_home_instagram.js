const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function fetchAsset(key) {
  return new Promise((resolve, reject) => {
    https.get(`https://${SHOP}/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=${encodeURIComponent(key)}`, {
      headers: { 'X-Shopify-Access-Token': TOKEN }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).asset?.value || '');
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

(async () => {
  const indexJson = await fetchAsset('templates/index.json');
  const instagramSection = await fetchAsset('sections/ayus-instagram.liquid');
  console.log(indexJson.includes('"instagram"') && indexJson.includes('"type": "ayus-instagram"') ? 'index ok' : 'index missing');
  console.log(instagramSection.includes('Show Instagram section') ? 'section ok' : 'section missing');
})().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
