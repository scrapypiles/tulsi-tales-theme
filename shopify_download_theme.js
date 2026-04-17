const https = require('https');
const fs = require('fs');
const path = require('path');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700; // Ayus AI Prototype (WIP)

const keys = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/ayus_assets_list.txt', 'utf8')
                .split('\n')
                .filter(l => l.trim().length > 0)
                .map(l => l.split(' ')[0]);

const OUT_DIR = '/home/acharya-kln/.openclaw/workspace/ayus-theme-source';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

let downloaded = 0;

function downloadAsset(key) {
    const encodedKey = encodeURIComponent(key);
    const options = {
        hostname: SHOP,
        path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=${encodedKey}`,
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': TOKEN,
            'Content-Type': 'application/json'
        }
    };

    https.request(options, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const parsed = JSON.parse(data);
            if (parsed.asset) {
                const content = parsed.asset.value || parsed.asset.attachment;
                if(content) {
                    const fullPath = path.join(OUT_DIR, key);
                    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
                    // if it's base64 attachment, write as binary
                    if (parsed.asset.attachment) {
                         fs.writeFileSync(fullPath, Buffer.from(content, 'base64'));
                    } else {
                         fs.writeFileSync(fullPath, content);
                    }
                    downloaded++;
                    console.log(`[${downloaded}/${keys.length}] Downloaded: ${key}`);
                }
            } else {
                console.error(`Failed to download ${key}:`, parsed);
            }
        });
    }).end();
}

// Stagger downloads to avoid rate limits
keys.forEach((key, i) => {
    setTimeout(() => downloadAsset(key), i * 200); 
});

