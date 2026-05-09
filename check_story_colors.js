const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

https.get({ hostname: '5iib0q-9y.myshopify.com', path: '/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=templates/page.our-story.json', headers: { 'X-Shopify-Access-Token': token } }, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => {
        let asset = JSON.parse(body).asset;
        if (!asset) {
            console.log("No asset", body);
            return;
        }
        let data = JSON.parse(asset.value);
        console.log("quote:", data.sections.quote.settings.bg_color);
        console.log("how_it_started:", data.sections.how_it_started.settings.bg_color);
        console.log("what_is_ayurveda:", data.sections.what_is_ayurveda.settings.bg_color);
        console.log("the_problem:", data.sections.the_problem.settings.bg_color);
        console.log("the_bigger_picture:", data.sections.the_bigger_picture.settings.bg_color);
        console.log("curation:", data.sections.curation.settings.bg_color);
        console.log("values:", data.sections.values.settings.bg_color);
        console.log("faqs:", data.sections.faqs.settings.bg_color);
        console.log("cta:", data.sections.cta.settings.bg_color);
    });
});
