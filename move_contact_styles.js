const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

css += `
/* Global Banner Styles (from Contact) */
.contact-banner {
  position: relative;
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #F7F5F0;
}
.contact-banner::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #000000;
  opacity: 0.3;
}
.contact-banner-content {
  position: relative;
  z-index: 1;
  color: #fff;
  padding: 0 20px;
}
.contact-tagline {
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 13px;
  display: block;
  margin-bottom: 15px;
}
.contact-title {
  font-family: var(--font-heading);
  font-size: 48px;
  line-height: 1.2;
  margin: 0 auto 5px auto;
  font-weight: normal;
}
.contact-subtitle {
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.4;
  max-width: 600px;
  margin: 0 auto;
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
  res.on('end', () => console.log('Styles moved and deployed.'));
});
req.write(putData);
req.end();
