const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const options = {
  hostname: '5iib0q-9y.myshopify.com',
  path: `/admin/api/2024-01/custom_collections.json`,
  method: 'GET',
  headers: { 'X-Shopify-Access-Token': token }
};

https.get({ ...options, path: '/admin/api/2024-01/smart_collections.json' }, res => {
  let body=''; res.on('data', c => body+=c); res.on('end', () => console.log(body.substring(0,200)));
});

// Since Shopify API doesn't expose Menus directly without Plus, we can check Pages directly.
https.get({ ...options, path: '/admin/api/2024-01/pages.json' }, res => {
  let body=''; res.on('data', c => body+=c); res.on('end', () => {
     let pages = JSON.parse(body).pages;
     if (pages) console.log("Pages found:", pages.map(p => p.handle).join(", "));
  });
});

https.get({ ...options, path: '/admin/api/2024-01/policies.json' }, res => {
  let body=''; res.on('data', c => body+=c); res.on('end', () => {
     let pols = JSON.parse(body).policies;
     if (pols) console.log("Policies found:", pols.map(p => p.title).join(", "));
  });
});
