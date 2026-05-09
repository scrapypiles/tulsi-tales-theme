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
    themes.forEach(t => console.log(t.id, t.name, t.role));
  });
});