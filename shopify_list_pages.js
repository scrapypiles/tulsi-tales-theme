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
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body);
    if (data.pages) {
      console.log(data.pages.map(p => ({ handle: p.handle, title: p.title })));
    } else {
      console.log('No pages found or error:', data);
    }
  });
});
req.on('error', console.error);
req.end();
