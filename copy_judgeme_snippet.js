const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const DRAFT_THEME = 182982246700;
const LIVE_THEME = 144179364012; // Assuming default or fetch from live

function copyAsset(key) {
  // First fetch from live theme
  https.get({
    hostname: SHOP,
    path: '/admin/api/2024-01/themes/' + LIVE_THEME + '/assets.json?asset[key]=' + encodeURIComponent(key),
    headers: { 'X-Shopify-Access-Token': TOKEN }
  }, res => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => {
      let data = JSON.parse(body);
      if(data.asset && data.asset.value) {
        // Now PUT to draft theme
        let putData = JSON.stringify({ asset: { key: key, value: data.asset.value } });
        let req = https.request({
          hostname: SHOP,
          path: '/admin/api/2024-01/themes/' + DRAFT_THEME + '/assets.json',
          method: 'PUT',
          headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
        }, res2 => {
          let body2 = '';
          res2.on('data', c => body2 += c);
          res2.on('end', () => console.log('Copied snippet:', key));
        });
        req.write(putData);
        req.end();
      } else {
        console.log('Could not find asset in live theme:', key);
      }
    });
  });
}

copyAsset('snippets/judgeme_core.liquid');