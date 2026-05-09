const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/182213050668/assets.json?asset[key]=snippets/judgeme_widgets.liquid',
  headers: { 'X-Shopify-Access-Token': TOKEN }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    let data = JSON.parse(body);
    if(data.asset && data.asset.value) {
      console.log(data.asset.value.substring(0, 500));
    } else {
      console.log('No judgeme_widgets.liquid found');
    }
  });
});