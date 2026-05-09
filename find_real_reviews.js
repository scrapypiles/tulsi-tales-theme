const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({
  hostname: SHOP,
  path: '/admin/api/2024-01/products.json?limit=250&fields=id,title,handle',
  headers: { 'X-Shopify-Access-Token': TOKEN }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    let products = JSON.parse(body).products;
    let checked = 0;
    products.forEach(p => {
      https.get({
        hostname: SHOP,
        path: `/admin/api/2024-01/products/${p.id}/metafields.json`,
        headers: { 'X-Shopify-Access-Token': TOKEN }
      }, res2 => {
        let body2 = '';
        res2.on('data', c => body2 += c);
        res2.on('end', () => {
          let metafields = JSON.parse(body2).metafields || [];
          let jm = metafields.find(m => m.namespace === 'judgeme' && m.key === 'badge');
          if (jm && jm.value) {
            let match = jm.value.match(/data-number-of-reviews='(\d+)'/);
            if (match && parseInt(match[1]) > 0) {
              console.log(`FOUND: ${p.title} (${p.handle}) has ${match[1]} reviews!`);
            }
          }
          checked++;
          if(checked === products.length) console.log("Done checking all products.");
        });
      });
    });
  });
});