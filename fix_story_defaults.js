const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

// Map of file -> default color
const defaults = {
    'ayus-story-quote.liquid': '#FAF8F5',
    'ayus-story-split.liquid': '#FAF8F5',
    'ayus-story-text.liquid': '#ffffff',
    'ayus-story-values.liquid': '#ffffff',
    'ayus-story-faq.liquid': '#FAF8F5',
    'ayus-story-cta.liquid': '#ffffff'
};

for (let file in defaults) {
    let path = `/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/${file}`;
    if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, 'utf8');
        
        // Replace default in schema
        content = content.replace(/"id": "bg_color",\s*"label": "Background Color",\s*"default": "[^"]*"/, `"id": "bg_color",\n      "label": "Background Color",\n      "default": "${defaults[file]}"`);
        
        // Replace default in liquid tag
        content = content.replace(/background-color: \{\{ section\.settings\.bg_color \| default: '[^']*' \}\}/, `background-color: {{ section.settings.bg_color | default: '${defaults[file]}' }}`);

        // Write locally
        fs.writeFileSync(path, content);
        
        // Upload
        let putData = JSON.stringify({ asset: { key: `sections/${file}`, value: content } });
        let req = https.request({
            hostname: '5iib0q-9y.myshopify.com', 
            path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
            method: 'PUT', 
            headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
        }, res => {
            let body=''; res.on('data', c=>body+=c); res.on('end', () => console.log(`${file} updated.`));
        });
        req.write(putData); req.end();
    }
}
