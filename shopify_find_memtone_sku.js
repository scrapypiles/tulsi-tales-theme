const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

// GraphQL is better for querying by SKU or Title safely
const query = `
{
  products(first: 10, query: "title:*Memtone*") {
    edges {
      node {
        id
        title
        handle
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
    
    if (data.data && data.data.products.edges.length > 0) {
      const idStr = data.data.products.edges[0].node.id;
      const pid = idStr.split('/').pop();
      console.log('Uploading to Product ID:', pid);
      uploadImage(pid);
    } else {
      console.log('Product not found in Shopify.');
    }
  });
});
req.end(postData);

function uploadImage(productId) {
  const src = 'https://onemg.gumlet.io/images/w_1500,h_1500,c_fit,a_ignore,q_auto,f_auto/cropped/e1d0092c-561b-426c-a81d-e6b3602419f8.jpg';
  const data = JSON.stringify({ image: { src: src, position: 1 } });
  const opt = {
    hostname: SHOP,
    path: '/admin/api/2024-01/products/' + productId + '/images.json',
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': TOKEN,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };
  const req2 = https.request(opt, r => {
    let b = '';
    r.on('data', chunk => b += chunk);
    r.on('end', () => {
       console.log('Success uploading image to ' + productId);
    });
  });
  req2.on('error', console.error);
  req2.write(data);
  req2.end();
}
