const fs = require('fs');
const https = require('https');
const path = require('path');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function updateFile(filePath, regex, replacement) {
    const fullPath = path.join('/home/acharya-kln/.openclaw/workspace/ayus-theme-source', filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(regex, replacement);
    fs.writeFileSync(fullPath, content);
    return content;
}

const updates = [
    {
        file: 'sections/ayus-collection.liquid',
        regex: /<a href="\{\{\s*product\.url\s*\}\}" style="/g,
        replace: '<a href="{{ product.url }}" target="_blank" style="'
    },
    {
        file: 'sections/ayus-featured-collection.liquid',
        regex: /<a href="\{\{\s*product\.url\s*\}\}" style="position/g,
        replace: '<a href="{{ product.url }}" target="_blank" style="position'
    },
    {
        file: 'sections/ayus-featured-collection.liquid',
        regex: /<a href="\{\{\s*product\.url\s*\}\}" style="text-decoration/g,
        replace: '<a href="{{ product.url }}" target="_blank" style="text-decoration'
    },
    {
        file: 'sections/ayus-search.liquid',
        regex: /<a href="\{\{\s*item\.url\s*\}\}">/g,
        replace: '<a href="{{ item.url }}" target="_blank">'
    }
];

let modifiedFiles = new Set();
updates.forEach(u => {
    updateFile(u.file, u.regex, u.replace);
    modifiedFiles.add(u.file);
});

async function uploadAsset(key) {
    const fullPath = path.join('/home/acharya-kln/.openclaw/workspace/ayus-theme-source', key);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    const postData = JSON.stringify({
        asset: {
            key: key,
            value: content
        }
    });

    const options = {
        hostname: SHOP,
        path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
        method: 'PUT',
        headers: {
            'X-Shopify-Access-Token': TOKEN,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

(async () => {
    for (const file of modifiedFiles) {
        console.log(`Uploading ${file}...`);
        const res = await uploadAsset(file);
        if (res.asset) {
            console.log(`Successfully uploaded ${file}`);
        } else {
            console.error(`Failed to upload ${file}:`, res);
        }
    }
})();
