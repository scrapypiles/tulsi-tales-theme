const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

css += `
.tt-collection-hero .contact-banner-content {
  color: #ffffff !important;
}
.tt-collection-hero .contact-title {
  color: #ffffff !important;
}
.tt-collection-hero .contact-subtitle {
  color: #ffffff !important;
  opacity: 0.9;
}
.tt-collection-hero .contact-tagline {
  color: #eeeeee !important;
}
`;

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);

const putData = JSON.stringify({ asset: { key: "assets/ayus-styles.css", value: css } });

const req = https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('Collection color fixed.'));
});
req.write(putData);
req.end();
