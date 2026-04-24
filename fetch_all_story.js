const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const filesToFetch = [
  'sections/ayus-story-cta.liquid',
  'sections/ayus-story-hero.liquid',
  'sections/ayus-story-quote.liquid',
  'sections/ayus-story-split.liquid',
  'sections/ayus-story-text.liquid',
  'sections/ayus-story-values.liquid'
];

filesToFetch.forEach(key => {
  const options = {
    hostname: '5iib0q-9y.myshopify.com',
    path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=${key}`,
    method: 'GET',
    headers: { 'X-Shopify-Access-Token': token }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      const asset = JSON.parse(data).asset;
      if (asset) {
          const filename = key.replace('sections/', '');
          fs.writeFileSync(`/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/${filename}`, asset.value);
          console.log(`Saved ${filename}`);
      }
    });
  });
  req.end();
});
