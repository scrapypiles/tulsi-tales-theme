const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

// 1. First find the product by handle (aimil-led-oil-100-ml)
const handle = 'aimil-led-oil-100-ml';
const options = {
  hostname: SHOP,
  path: '/admin/api/2024-01/products.json?handle=' + handle,
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json'
  }
};

https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body);
    if (data.products && data.products.length > 0) {
      const productId = data.products[0].id;
      console.log('Found product ID:', productId);
      uploadImages(productId);
    } else {
      console.log('Product not found. Try searching by title...');
    }
  });
}).end();

async function uploadImages(productId) {
  const imageUrls = [
    'https://onemg.gumlet.io/images/w_1500,h_900,c_fit,a_ignore,q_auto,f_auto/cropped/l4l1n2j59p5gq920d3t0/aimil-led-oil-100-ml.jpg',
    'https://cdn01.pharmeasy.in/dam/products_otc/I06109/aimil-led-oil-100ml-2-1673873427.jpg?dim=1440x0&f=webp'
  ];

  for (let i = 0; i < imageUrls.length; i++) {
    const src = imageUrls[i];
    console.log('Uploading image ' + (i+1) + '...');
    
    await new Promise((resolve, reject) => {
      const postData = JSON.stringify({ image: { src: src, position: i + 1 } });
      const opt = {
        hostname: SHOP,
        path: '/admin/api/2024-01/products/' + productId + '/images.json',
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': TOKEN,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      const req = https.request(opt, r => {
        let b = '';
        r.on('data', chunk => b += chunk);
        r.on('end', () => {
           console.log('Success image ' + (i+1));
           resolve();
        });
      });
      req.on('error', reject);
      req.write(postData);
      req.end();
    });
    
    await new Promise(r => setTimeout(r, 1000));
  }
}
