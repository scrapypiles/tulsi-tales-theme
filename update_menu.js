const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const query = `
  {
    menus(first: 10) {
      edges {
        node {
          id
          title
          handle
          items {
            id
            title
            url
          }
        }
      }
    }
  }
`;

const req = https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/graphql.json',
  method: 'POST',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json'
  }
}, res => {
  let b = '';
  res.on('data', c => b+=c);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(b), null, 2)));
});
req.write(JSON.stringify({ query }));
req.end();
