const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({ hostname: '5iib0q-9y.myshopify.com', path: '/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=templates/page.our-story.json', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let data = JSON.parse(JSON.parse(body).asset.value);
        if (data.sections.faqs) {
            console.log("faqs type:", data.sections.faqs.type);
        } else {
            console.log("No faqs section found in JSON.");
        }
    });
});
