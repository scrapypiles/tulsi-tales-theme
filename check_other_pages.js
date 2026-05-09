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
     ['policy', 'terms', 'refund', 'shipping'].forEach(handle => {
         let p = pages.find(page => page.handle === handle);
         if (p) {
             console.log(`${handle} page: ${p.body_html ? p.body_html.length : 0} bytes`);
         }
     });
  });
});