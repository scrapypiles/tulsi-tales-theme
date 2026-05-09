const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const options = {
  hostname: SHOP,
  path: '/admin/api/2024-01/pages.json',
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
  }
};

const req = https.request(options, res => {
  let b = '';
  res.on('data', chunk => b += chunk);
  res.on('end', () => {
    const pages = JSON.parse(b).pages;
    console.log("Pages found:", pages.length);
    pages.forEach(p => console.log(p.handle, "-> template:", p.template_suffix));
  });
});
req.end();
