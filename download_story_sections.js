const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const files = [
    'ayus-story-quote.liquid',
    'ayus-story-split.liquid',
    'ayus-story-text.liquid',
    'ayus-story-values.liquid',
    'ayus-story-faq.liquid',
    'ayus-story-cta.liquid'
];

files.forEach(filename => {
    https.get({ hostname: '5iib0q-9y.myshopify.com', path: `/admin/api/2024-01/themes/182982246700/assets.json?asset[key]=sections/${filename}`, headers: { 'X-Shopify-Access-Token': token } }, res => {
        let body=''; res.on('data', c=>body+=c); res.on('end', () => {
            let asset = JSON.parse(body).asset;
            if (asset && asset.value) {
                fs.writeFileSync(`/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/${filename}`, asset.value);
                console.log(`Downloaded ${filename}`);
            } else {
                console.log(`Failed to download ${filename}`);
            }
        });
    });
});
