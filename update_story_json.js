const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({ hostname: '5iib0q-9y.myshopify.com', path: '/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=templates/page.our-story.json', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let asset = JSON.parse(body).asset;
        let data = JSON.parse(asset.value);

        // Sequence logic
        if(data.sections.how_it_started) data.sections.how_it_started.settings.bg_color = "#FAF8F5";
        if(data.sections.what_is_ayurveda) data.sections.what_is_ayurveda.settings.bg_color = "#ffffff";
        if(data.sections.the_problem) data.sections.the_problem.settings.bg_color = "#FAF8F5";
        if(data.sections.the_bigger_picture) data.sections.the_bigger_picture.settings.bg_color = "#ffffff";
        if(data.sections.curation) data.sections.curation.settings.bg_color = "#FAF8F5";

        let putData = JSON.stringify({ asset: { key: 'templates/page.our-story.json', value: JSON.stringify(data, null, 2) } });
        let req = https.request({
            hostname: '5iib0q-9y.myshopify.com', 
            path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
            method: 'PUT', 
            headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
        }, res2 => {
            let body2=''; res2.on('data', c=>body2+=c); res2.on('end', () => console.log('Story JSON updated to alternate backgrounds.'));
        });
        req.write(putData); req.end();
    });
});
