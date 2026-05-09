const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function uploadAsset(key, value) {
  let putData = JSON.stringify({ asset: { key: key, value: value } });
  let req = https.request({
    hostname: SHOP,
    path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
    method: 'PUT',
    headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
  }, res => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => console.log('Created css:', key));
  });
  req.write(putData);
  req.end();
}

uploadAsset('assets/judgeme_widgets.css', '/* judgeme blank file */');