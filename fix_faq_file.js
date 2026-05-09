const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({ hostname: '5iib0q-9y.myshopify.com', path: '/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=sections/ayus-story-faq.liquid', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let asset = JSON.parse(body).asset;
        if (asset) {
            let content = asset.value;
            // 1. Add background-color style if missing
            if (!content.includes('background-color: {{ section.settings.bg_color')) {
                content = content.replace(/style="padding: 100px 20px;/, 'style="padding: 100px 20px; background-color: {{ section.settings.bg_color | default: \'transparent\' }};');
            }
            // 2. Add bg_color to schema if missing
            if (!content.includes('"id": "bg_color"')) {
                content = content.replace(/"settings":\s*\[/, `"settings": [\n    {\n      "type": "color",\n      "id": "bg_color",\n      "label": "Background Color"\n    },`);
            }
            
            let putData = JSON.stringify({ asset: { key: `sections/ayus-story-faq.liquid`, value: content } });
            let req = https.request({
                hostname: '5iib0q-9y.myshopify.com', 
                path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
                method: 'PUT', 
                headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
            }, res2 => {
                let body2=''; res2.on('data', c=>body2+=c); res2.on('end', () => console.log(`ayus-story-faq.liquid updated on server.`));
            });
            req.write(putData); req.end();
        } else {
            console.log("Not found on server either.");
        }
    });
});
