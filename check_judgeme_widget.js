const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({
  hostname: SHOP,
  path: '/admin/api/2024-01/products/10269692395820/metafields.json',
  headers: { 'X-Shopify-Access-Token': TOKEN }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    let metafields = JSON.parse(body).metafields || [];
    let widget = metafields.find(m => m.namespace === 'judgeme' && m.key === 'widget');
    if (widget) {
      console.log('Widget size:', widget.value.length);
      console.log('Widget preview:', widget.value.substring(0, 500));
    } else {
      console.log('No judgeme.widget metafield found for this product.');
    }
  });
});