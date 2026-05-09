const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

https.get(`https://${SHOP}/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=config/settings_data.json`, {headers: {'X-Shopify-Access-Token': TOKEN}}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let response = JSON.parse(data);
    fs.writeFileSync('settings_data.json', response.asset.value);
    console.log('Saved to settings_data.json');
  });
});
