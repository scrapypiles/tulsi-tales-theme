const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function updateAsset(assetKey, filePath, targetRegExp, replacement) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(targetRegExp, replacement);
  fs.writeFileSync(filePath, content);

  const putData = JSON.stringify({ asset: { key: assetKey, value: content } });

  const req = https.request({
    hostname: SHOP,
    path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
    method: 'PUT',
    headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
  }, res => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => console.log(assetKey + ' updated.'));
  });
  req.write(putData);
  req.end();
}

const targetRegExp = /<div class="tt-card-rating" style="margin-bottom: 12px; color: #d4af37; display: flex; align-items: center; justify-content: center; gap: 2px;">/g;
const replacement = `<div class="tt-card-rating" style="margin-bottom: 5px; color: #d4af37; display: flex; align-items: center; justify-content: center; gap: 2px;">`;

updateAsset("sections/ayus-collection.liquid", "/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid", targetRegExp, replacement);
updateAsset("sections/ayus-search.liquid", "/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-search.liquid", targetRegExp, replacement);
