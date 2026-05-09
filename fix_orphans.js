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
        
        // Remove orphaned blocks from settings_data.json
        if (settings.current.sections['ayus-header']) {
            delete settings.current.sections['ayus-header'].blocks;
            delete settings.current.sections['ayus-header'].block_order;
        }
        if (settings.current.sections['ayus-footer']) {
            delete settings.current.sections['ayus-footer'].blocks;
            delete settings.current.sections['ayus-footer'].block_order;
        }
        
        // Force the color variables explicitly just to be safe
        settings.current.color_accent = "#4A5D4E";
        settings.current.color_bg = "#FAF8F5";
        settings.current.color_text = "#2C2C2C";
        settings.current.color_border = "#EAE5D9";
        
        const res1 = await uploadAsset('config/settings_data.json', JSON.stringify(settings, null, 2));
        console.log("Updated settings_data.json", res1.errors || "OK");

        // Now try uploading schema again
        const schema = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/settings_schema.json', 'utf8');
        const res2 = await uploadAsset('config/settings_schema.json', schema);
        console.log("Uploaded settings_schema.json", res2.errors || "OK");
      }
    });
  }).end();
}
run();