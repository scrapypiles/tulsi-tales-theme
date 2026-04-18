const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/pages.json',
  headers: { 'X-Shopify-Access-Token': TOKEN }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    let d = JSON.parse(body);
    d.pages.forEach(p => {
      fs.writeFileSync(`page_${p.handle}.html`, p.body_html || p.content || '');
    });
    console.log('Pages saved.');
  });
}).end();
