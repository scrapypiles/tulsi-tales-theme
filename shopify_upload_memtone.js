const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const handle = 'aimil-memtone-syrup-200-ml'; // Assuming this is the handle based on the image you sent
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
      console.log('Product not found by handle:', handle);
    }
  });
}).end();

async function uploadImages(productId) {
  const imageUrls = [
    'https://onemg.gumlet.io/images/w_1500,h_1500,c_fit,a_ignore,q_auto,f_auto/cropped/e1d0092c-561b-426c-a81d-e6b3602419f8.jpg'
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
  }
}
