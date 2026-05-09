const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=config/settings_data.json',
  headers: { 'X-Shopify-Access-Token': TOKEN }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    let asset = JSON.parse(body).asset;
    if(asset) {
      if(asset.value.includes('judge')) {
        console.log("Judgeme is enabled in our theme's settings_data.json");
      } else {
        console.log("No judgeme found in our theme's settings_data.json");
      }
    }
  });
});