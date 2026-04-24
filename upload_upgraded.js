const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

function uploadAsset(asset) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ asset });
    const opt = {
      hostname: SHOP,
      path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(opt, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const files = [
  'ayus-hero.liquid',
  'ayus-philosophy.liquid',
  'ayus-shop-by.liquid',
  'ayus-featured-collection.liquid',
  'ayus-story-hero.liquid',
  'ayus-story-quote.liquid',
  'ayus-story-text.liquid',
  'ayus-story-split.liquid',
  'ayus-story-values.liquid',
  'ayus-story-cta.liquid'
];

async function deployAll() {
  for (const file of files) {
      const content = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/' + file, 'utf8');
      const res = await uploadAsset({
          key: 'sections/' + file,
          value: content
      });
      if(res.errors) console.error(file + ' errors:', res.errors);
      else console.log(file + ' uploaded successfully');
  }
}

deployAll();