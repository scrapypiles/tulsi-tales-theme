const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const options = {
  hostname: '5iib0q-9y.myshopify.com',
  path: `/admin/api/2024-01/policies.json`,
  method: 'GET',
  headers: { 'X-Shopify-Access-Token': token }
};

https.get(options, res => {
  let body=''; res.on('data', c => body+=c); res.on('end', () => {
     let policies = JSON.parse(body).policies;
     if (policies) {
         policies.forEach(p => console.log(`${p.title}: ${p.body ? p.body.length : 0} bytes, URL: ${p.url}`));
     }
  });
});