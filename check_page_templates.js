const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const options = {
  hostname: '5iib0q-9y.myshopify.com',
  path: `/admin/api/2024-01/pages.json`,
  method: 'GET',
  headers: { 'X-Shopify-Access-Token': token }
};

https.get(options, res => {
  let body=''; res.on('data', c => body+=c); res.on('end', () => {
     let pages = JSON.parse(body).pages;
     pages.forEach(p => {
         if (['policy', 'terms', 'refund', 'shipping'].includes(p.handle)) {
             console.log(`Page: ${p.handle}, ID: ${p.id}, Template Suffix: ${p.template_suffix}`);
         }
     });
  });
});
