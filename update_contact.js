const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

// 1. Update opacity in JSON to make header darker
https.get({ hostname: '5iib0q-9y.myshopify.com', path: '/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=templates/page.contact.json', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let asset = JSON.parse(body).asset;
        let data = JSON.parse(asset.value);
        
        data.sections.main.settings.overlay_opacity = 50; // increased from 30
        
        let putData = JSON.stringify({ asset: { key: 'templates/page.contact.json', value: JSON.stringify(data, null, 2) } });
        let req = https.request({
            hostname: '5iib0q-9y.myshopify.com', 
            path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
            method: 'PUT', 
            headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
        }, res2 => {
            let body2=''; res2.on('data', c=>body2+=c); res2.on('end', () => {
                console.log('JSON Opacity updated.');
            });
        });
        req.write(putData); req.end();
    });
});

// 2. Reduce space below button in Liquid
let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', 'utf8');

liquid = liquid.replace(/\.ayus-contact-form-wrapper\s*\{[^}]*\}/, `.ayus-contact-form-wrapper {
    flex: 1.5;
    min-width: 300px;
    background: var(--color-background);
    padding: 50px 40px 10px 40px;
    border: none;
  }`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', liquid);
