const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/182213050668/assets.json?asset[key]=templates/product.json',
  headers: { 'X-Shopify-Access-Token': TOKEN }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    let asset = JSON.parse(body).asset;
    if(asset) {
      if(asset.value.includes('judge')) {
        console.log("Judgeme found in horizon");
        console.log(asset.value.substring(0, 3000));
      } else {
        console.log("No judgeme in horizon product.json");
      }
    }
  });
});