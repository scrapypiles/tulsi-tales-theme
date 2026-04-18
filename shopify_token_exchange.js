const https = require('https');

const SHOP = '5iib0q-9y.myshopify.com';
const API_KEY = '89081a9c354ddfb1d839de7062d40a4f';
const API_SECRET = process.env.SHOPIFY_API_SECRET;
const CODE = 'c00f7d3373d33fc26ec99e46e97db3dc';

const postData = JSON.stringify({
  client_id: API_KEY,
  client_secret: API_SECRET,
  code: CODE
});

const options = {
  hostname: SHOP,
  port: 443,
  path: '/admin/oauth/access_token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data);
    const parsed = JSON.parse(data);
    if(parsed.access_token) {
        const fs = require('fs');
        fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', parsed.access_token);
        console.log("TOKEN SECURELY SAVED.");
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(postData);
req.end();
