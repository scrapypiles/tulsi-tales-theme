const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes.json',
  headers: { 'X-Shopify-Access-Token': TOKEN }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    let themes = JSON.parse(body).themes;
    let liveTheme = themes.find(t => t.role === 'main');
    console.log("Live Theme ID:", liveTheme.id);
    
    https.get({
      hostname: SHOP,
      path: '/admin/api/2024-01/themes/' + liveTheme.id + '/assets.json?asset[key]=templates/product.json',
      headers: { 'X-Shopify-Access-Token': TOKEN }
    }, res2 => {
      let body2 = '';
      res2.on('data', c => body2 += c);
      res2.on('end', () => {
        let asset = JSON.parse(body2).asset;
        if(asset) {
          console.log(asset.value.substring(0, 1500));
        } else {
          console.log("No product.json");
        }
      });
    });
  });
});