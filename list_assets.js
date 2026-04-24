const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/shopify_access_token.txt', 'utf8').trim();
const themeId = 175782723896; 

const options = {
  hostname: 'tulsitales.myshopify.com',
  path: `/admin/api/2024-01/themes/${themeId}/assets.json`,
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': token,
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data.substring(0, 500));
  });
});
req.end();
