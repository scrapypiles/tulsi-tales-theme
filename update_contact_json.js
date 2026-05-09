const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({ hostname: '5iib0q-9y.myshopify.com', path: '/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=templates/page.contact.json', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let asset = JSON.parse(body).asset;
        let data = JSON.parse(asset.value);
        
        // 1. Text color white on banner
        data.sections.main.settings.text_color = "#ffffff";
        
        // 2. Change customer support text
        if (data.sections.main.blocks && data.sections.main.blocks.support) {
            data.sections.main.blocks.support.settings.text_content = "Ayurveda works best when you have the right guidance. If you're unsure which products are right for you, we'd recommend speaking with a qualified Ayurvedic practitioner first. For everything else, including orders, products, or general questions, we're right here.";
        }
        
        let putData = JSON.stringify({ asset: { key: 'templates/page.contact.json', value: JSON.stringify(data, null, 2) } });
        let req = https.request({
            hostname: '5iib0q-9y.myshopify.com', 
            path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
            method: 'PUT', 
            headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
        }, res2 => {
            let body2=''; res2.on('data', c=>body2+=c); res2.on('end', () => {
                console.log('Contact JSON updated.');
            });
        });
        req.write(putData); req.end();
    });
});
