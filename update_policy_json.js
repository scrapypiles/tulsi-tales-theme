const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

// 1. Fetch privacy policy content from API to break it into sections
https.get({ hostname: '5iib0q-9y.myshopify.com', path: '/admin/api/2024-01/policies.json', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let policies = JSON.parse(body).policies;
        let privacy = policies.find(p => p.title === 'Privacy policy');
        
        let template = {
            "sections": {
                "main": {
                    "type": "ayus-policy-content",
                    "blocks": {
                        "content_block": {
                            "type": "section",
                            "settings": {
                                "heading": "",
                                "text": privacy.body.replace(/\n/g, '')
                            }
                        }
                    },
                    "block_order": ["content_block"],
                    "settings": {
                        "tagline": "Tulsi Tales",
                        "subtitle": "Last updated: April 2026",
                        "text_color": "#ffffff",
                        "overlay_color": "#000000",
                        "overlay_opacity": 40
                    }
                }
            },
            "order": ["main"]
        };

        // 2. Upload to theme as page.policy.json
        let putData = JSON.stringify({ asset: { key: 'templates/page.policy.json', value: JSON.stringify(template, null, 2) } });
        let req = https.request({
            hostname: '5iib0q-9y.myshopify.com', 
            path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
            method: 'PUT', 
            headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
        }, res2 => {
            let body2=''; res2.on('data', c=>body2+=c); res2.on('end', () => console.log('Policy JSON template updated.'));
        });
        req.write(putData); req.end();
    });
});
