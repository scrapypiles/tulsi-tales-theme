const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({ hostname: '5iib0q-9y.myshopify.com', path: '/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=templates/page.policy.json', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let asset = JSON.parse(body).asset;
        if (asset) {
            console.log(asset.value.substring(0, 500));
            console.log("...");
            let data = JSON.parse(asset.value);
            console.log("Template type:", data.sections.main.type);
            console.log("Block count:", Object.keys(data.sections.main.blocks || {}).length);
        } else {
            console.log("Asset not found or error:", body);
        }
    });
});