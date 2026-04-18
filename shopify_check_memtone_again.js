const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const query = `
{
  products(first: 20, query: "Memtone") {
    edges {
      node {
        id
        title
        handle
        images(first: 5) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  }
}
`;

const postData = JSON.stringify({ query });

const options = {
  hostname: SHOP,
  path: '/admin/api/2024-01/graphql.json',
  method: 'POST',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body);
    console.log(JSON.stringify(data, null, 2));
  });
});
req.end(postData);
