const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function uploadAsset(assetKey, filePath) {
  return new Promise((resolve) => {
    let content = fs.readFileSync(filePath, 'utf8');
    const putData = JSON.stringify({ asset: { key: assetKey, value: content } });

    const req = https.request({
      hostname: SHOP,
      path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
      method: 'PUT',
      headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve(assetKey + ' updated.'));
    });
    req.write(putData);
    req.end();
  });
}

async function main() {
  console.log(await uploadAsset("sections/ayus-collection.liquid", "ayus-collection.liquid"));
  console.log(await uploadAsset("sections/ayus-story-hero.liquid", "ayus-story-hero.liquid"));
  console.log(await uploadAsset("sections/ayus-contact.liquid", "ayus-contact.liquid"));
}
main();
