const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function uploadAsset(key, value) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ asset: { key, value } });
    const opt = {
      hostname: SHOP,
      path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
      method: 'PUT',
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
  // First download settings_data.json
  const opt = {
    hostname: SHOP,
    path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=config/settings_data.json`,
    method: 'GET',
    headers: { 'X-Shopify-Access-Token': TOKEN }
  };
  
  https.request(opt, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const asset = JSON.parse(data).asset;
      if (asset) {
        let settings = JSON.parse(asset.value);
        settings.current.color_accent = "#4A5D4E";
        settings.current.color_bg = "#FAF8F5";
        settings.current.color_text = "#2C2C2C";
        settings.current.color_border = "#EAE5D9";
        
        await uploadAsset('config/settings_data.json', JSON.stringify(settings, null, 2));
        console.log("Updated settings_data.json");
      }
    });
  }).end();
}
run();