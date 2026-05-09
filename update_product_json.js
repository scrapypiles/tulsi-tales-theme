const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

https.get({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json?asset[key]=templates/product.json',
  headers: { 'X-Shopify-Access-Token': TOKEN }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    let assetData = JSON.parse(body).asset;
    let template = JSON.parse(assetData.value);
    
    // Add the new sections
    template.sections['recommendations'] = {
      "type": "ayus-product-recommendations",
      "settings": {}
    };
    template.sections['reviews'] = {
      "type": "ayus-product-reviews",
      "settings": {}
    };
    
    // Update the order to include them
    template.order = ["main_product", "recommendations", "reviews"];
    
    let putData = JSON.stringify({ asset: { key: 'templates/product.json', value: JSON.stringify(template, null, 2) } });
    let req = https.request({
      hostname: SHOP,
      path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
      method: 'PUT',
      headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
    }, res2 => {
      let body2 = '';
      res2.on('data', c => body2 += c);
      res2.on('end', () => console.log('Updated product.json:', JSON.parse(body2).asset.key));
    });
    req.write(putData);
    req.end();
  });
});