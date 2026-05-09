const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({ hostname: '5iib0q-9y.myshopify.com', path: '/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=templates/page.our-story.json', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let asset = JSON.parse(body).asset;
        let data = JSON.parse(asset.value);
        
        // Fix the richtext validation errors
        if (data.sections.hero && data.sections.hero.settings.hero_subheading) {
            if (!data.sections.hero.settings.hero_subheading.startsWith('<p>')) {
                data.sections.hero.settings.hero_subheading = `<p>${data.sections.hero.settings.hero_subheading}</p>`;
            }
        }
        if (data.sections.quote && data.sections.quote.settings.quote_text) {
            if (!data.sections.quote.settings.quote_text.startsWith('<p>')) {
                data.sections.quote.settings.quote_text = `<p>${data.sections.quote.settings.quote_text}</p>`;
            }
        }

        const WHITE = "#ffffff";
        const BEIGE = "#FAF8F5";

        const updates = {
            "quote": BEIGE,
            "how_it_started": BEIGE,
            "what_is_ayurveda": WHITE,
            "the_problem": BEIGE,
            "the_bigger_picture": WHITE,
            "curation": BEIGE,
            "values": WHITE,
            "faqs": BEIGE,
            "cta": WHITE
        };

        for (let key in updates) {
            if (data.sections[key]) {
                if (!data.sections[key].settings) data.sections[key].settings = {};
                data.sections[key].settings.bg_color = updates[key];
            }
        }

        let putData = JSON.stringify({ asset: { key: 'templates/page.our-story.json', value: JSON.stringify(data, null, 2) } });
        let req = https.request({
            hostname: '5iib0q-9y.myshopify.com', 
            path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
            method: 'PUT', 
            headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
        }, res2 => {
            let body2=''; res2.on('data', c=>body2+=c); res2.on('end', () => {
                console.log('Upload response:', body2.substring(0,300));
            });
        });
        req.write(putData); req.end();
    });
});
