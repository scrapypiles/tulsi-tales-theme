const https = require('https');
const fs = require('fs');
const execSync = require('child_process').execSync;

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

// Download the image locally first
try {
  execSync('curl -sL "https://onemg.gumlet.io/images/w_1500,h_1500,c_fit,a_ignore,q_auto,f_auto/cropped/e1d0092c-561b-426c-a81d-e6b3602419f8.jpg" > memtone.jpg');
} catch(e) {
  console.log('Error downloading image', e);
  process.exit(1);
}

const base64Image = fs.readFileSync('memtone.jpg', 'base64');
const productId = '10269687873836';

const data = JSON.stringify({ 
  image: { 
    attachment: base64Image,
    filename: 'memtone.jpg',
    position: 1 
  } 
});

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

const req = https.request(opt, r => {
  let b = '';
  r.on('data', chunk => b += chunk);
  r.on('end', () => {
    const responseData = JSON.parse(b);
    if(responseData.errors) {
      console.error('Error:', responseData.errors);
    } else {
      console.log('Success uploading image. Image ID:', responseData.image.id);
    }
  });
});
req.on('error', console.error);
req.write(data);
req.end();
