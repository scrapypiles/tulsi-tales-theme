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
     let policyPage = pages.find(p => p.handle === 'policy');
     if (policyPage) {
         console.log("Body HTML length:", policyPage.body_html ? policyPage.body_html.length : 0);
         console.log("Body HTML excerpt:", policyPage.body_html ? policyPage.body_html.substring(0, 100) : "NULL");
     }
  });
});