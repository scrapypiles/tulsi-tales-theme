const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

let content = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-policy-content.liquid', 'utf8');

let putData = JSON.stringify({ asset: { key: 'sections/ayus-policy-content.liquid', value: content } });
let req = https.request({
    hostname: '5iib0q-9y.myshopify.com', 
    path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
    method: 'PUT', 
    headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => console.log('ayus-policy-content uploaded successfully.'));
});
req.write(putData); req.end();
