const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({ hostname: '5iib0q-9y.myshopify.com', path: `/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=config/settings_data.json`, headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let settings = JSON.parse(JSON.parse(body).asset.value);
        let blocks = settings.current.sections['ayus-footer'].blocks;
        
        // Let's force the block types to be fully populated so they show up
        let foundLinkList = false;
        for (let key in blocks) {
            if (blocks[key].type === 'link_list') {
                foundLinkList = true;
                // Force an empty menu handle so it triggers the fallback hardcoded links
                blocks[key].settings.menu = "";
            }
        }
        
        // If somehow deleted from settings entirely, re-inject it
        if (!foundLinkList) {
            blocks['links'] = {
                "type": "link_list",
                "settings": {
                    "heading": "Explore",
                    "menu": ""
                }
            };
            if (!settings.current.sections['ayus-footer'].block_order.includes('links')) {
                settings.current.sections['ayus-footer'].block_order.splice(1, 0, 'links');
            }
        }

        let putData = JSON.stringify({ asset: { key: 'config/settings_data.json', value: JSON.stringify(settings) } });
        let req = https.request({
            hostname: '5iib0q-9y.myshopify.com', 
            path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
            method: 'PUT', 
            headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
        }, res2 => {
            let body2=''; res2.on('data', c=>body2+=c); res2.on('end', () => console.log('Settings forced to show Explore column with fallback.'));
        });
        req.write(putData); req.end();
    });
});
