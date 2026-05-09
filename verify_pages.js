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
     if (pages) {
         pages.forEach(p => console.log(`Page: ${p.title} -> /pages/${p.handle} (Published: ${p.published_at !== null})`));
     } else {
         console.log(body);
     }
  });
});
