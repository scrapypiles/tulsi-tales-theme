const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

https.get({ hostname: '5iib0q-9y.myshopify.com', path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=config/settings_data.json`, headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let settings = JSON.parse(JSON.parse(body).asset.value);
        
        settings.current.sections['ayus-footer'] = {
            "type": "ayus-footer",
            "blocks": {
                "brand": { "type": "brand_info", "settings": {} },
                "links": { "type": "link_list", "settings": {} },
                "contact": { "type": "contact_newsletter", "settings": {} }
            },
            "block_order": ["brand", "links", "contact"],
            "settings": {
                "show_divider": true,
                "copyright_text": "TULSI TALES. ALL RIGHTS RESERVED."
            }
        };

        let putData = JSON.stringify({ asset: { key: 'config/settings_data.json', value: JSON.stringify(settings) } });
        let req = https.request({
            hostname: '5iib0q-9y.myshopify.com', 
            path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`, 
            method: 'PUT', 
            headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
        }, res2 => {
            let body2=''; res2.on('data', c=>body2+=c); res2.on('end', () => console.log('Footer blocks injected into settings.'));
        });
        req.write(putData); req.end();
    });
});
