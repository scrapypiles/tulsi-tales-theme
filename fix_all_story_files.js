const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const files = [
    'ayus-story-split.liquid',
    'ayus-story-text.liquid',
    'ayus-story-values.liquid',
    'ayus-story-faq.liquid',
    'ayus-story-cta.liquid'
];

files.forEach(filename => {
    let filepath = `/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/${filename}`;
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        
        // 1. Add background-color style if missing
        if (!content.includes('background-color: {{ section.settings.bg_color')) {
            content = content.replace(/style="padding: 100px 20px;/, 'style="padding: 100px 20px; background-color: {{ section.settings.bg_color | default: \'transparent\' }};');
        }
        
        // 2. Add bg_color to schema if missing
        if (!content.includes('"id": "bg_color"')) {
            content = content.replace(/"settings":\s*\[/, `"settings": [\n    {\n      "type": "color",\n      "id": "bg_color",\n      "label": "Background Color"\n    },`);
        }

        fs.writeFileSync(filepath, content);
        console.log(`Updated ${filename}`);

        // Upload
        let putData = JSON.stringify({ asset: { key: `sections/${filename}`, value: content } });
        let req = https.request({
            hostname: '5iib0q-9y.myshopify.com', 
            path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
            method: 'PUT', 
            headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
        }, res => {
            let body=''; res.on('data', c=>body+=c); res.on('end', () => console.log(`${filename} uploaded.`));
        });
        req.write(putData); req.end();
    }
});
