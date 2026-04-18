const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const PRODUCT_ID = 10269692395820;

const imageUrls = [
  'https://ayushherbs.com/cdn/shop/files/abheeja_joint_pain.png',
  'https://i.ebayimg.com/images/g/PS0AAOSwm1Rm4t8w/s-l1600.png',
  'https://i.ebayimg.com/images/g/PS4AAOSwm1Rm4t8x/s-l1600.png',
  'https://i.ebayimg.com/images/g/l9kAAOSwDKFm4t8t/s-l1600.png'
];

async function addImageToProduct(src, position) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      image: { src, position }
    });

    const opt = {
      hostname: SHOP,
      path: '/admin/api/2024-01/products/' + PRODUCT_ID + '/images.json',
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(opt, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  for (let i = 0; i < imageUrls.length; i++) {
    console.log('Uploading image ' + (i + 1) + '...');
    const res = await addImageToProduct(imageUrls[i], i + 1);
    if (res.errors) {
      console.error('Failed to upload image:', res.errors);
    } else {
      console.log('Successfully uploaded image ' + (i + 1));
    }
    // Shopify rate limit wait
    await new Promise(r => setTimeout(r, 1000));
  }
}

run();
