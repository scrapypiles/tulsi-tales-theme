const https = require('https');
const fs = require('fs');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const filesToUpload = [
    'ayus-cart-drawer.liquid',
    'ayus-collection.liquid',
    'ayus-featured-collection.liquid',
    'ayus-footer.liquid',
    'ayus-product-main.liquid',
    'ayus-story-quote.liquid',
    'ayus-story-split.liquid'
];

filesToUpload.forEach(filename => {
    let path = `/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/${filename}`;
    if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, 'utf8');
        let keyStr = filename === 'ayus-footer.liquid' ? `sections/${filename}` : `sections/${filename}`; // Wait, cart-drawer is snippets?
        
        let prefix = 'sections';
        if (filename.includes('cart-drawer')) prefix = 'snippets';
        
        let putData = JSON.stringify({ asset: { key: `${prefix}/${filename}`, value: content } });
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
