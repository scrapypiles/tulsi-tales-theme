const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({ hostname: '5iib0q-9y.myshopify.com', path: '/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=config/settings_data.json', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let settings = JSON.parse(JSON.parse(body).asset.value);
        let policyMenu = settings.current.sections['ayus-footer'].settings.policy_menu;
        console.log("Attached policy menu:", policyMenu);
    });
});
