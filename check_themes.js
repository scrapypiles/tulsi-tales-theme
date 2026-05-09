const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.request({
  hostname: '5iib0q-9y.myshopify.com',
  path: '/admin/api/2024-01/themes.json',
  headers: { 'X-Shopify-Access-Token': token }
}, res => {
  let b = ''; res.on('data', c => b+=c); res.on('end', () => {
      const themes = JSON.parse(b).themes;
      themes.forEach(t => console.log(`${t.id} - ${t.name} - ${t.role}`));
  });
}).end();
