const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const SHOP = '5iib0q-9y.myshopify.com';

// 1. Get Privacy Policy
https.get({ hostname: SHOP, path: '/admin/api/2024-01/policies.json', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let policies = JSON.parse(body).policies;
        let privacy = policies.find(p => p.title === 'Privacy policy');
        
        if (privacy && privacy.body) {
            console.log("Found privacy policy, length:", privacy.body.length);
            // 2. Get Page ID
            https.get({ hostname: SHOP, path: '/admin/api/2024-01/pages.json', headers: { 'X-Shopify-Access-Token': token } }, res2 => {
                let body2=''; res2.on('data', c=>body2+=c); res2.on('end', () => {
                    let pages = JSON.parse(body2).pages;
                    let policyPage = pages.find(p => p.handle === 'policy');
                    
                    if (policyPage) {
                        console.log("Found page 'policy', ID:", policyPage.id);
                        // 3. Update Page
                        let putData = JSON.stringify({ page: { id: policyPage.id, body_html: privacy.body } });
                        let req = https.request({ 
                            hostname: SHOP, 
                            path: `/admin/api/2024-01/pages/${policyPage.id}.json`, 
                            method: 'PUT', 
                            headers: { 
                                'X-Shopify-Access-Token': token, 
                                'Content-Type': 'application/json', 
                                'Content-Length': Buffer.byteLength(putData) 
                            } 
                        }, res3 => {
                            let body3=''; res3.on('data', c=>body3+=c); res3.on('end', () => console.log('Page updated successfully.'));
                        });
                        req.on('error', e => console.error(e));
                        req.write(putData); 
                        req.end();
                    } else {
                        console.log("Could not find page with handle 'policy'");
                    }
                });
            });
        } else {
            console.log("Could not find Privacy Policy in policies.json");
        }
    });
});
