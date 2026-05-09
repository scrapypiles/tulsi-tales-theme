const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let themeData = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/theme.liquid', 'utf8');

const injection = `
<script>
  document.addEventListener("DOMContentLoaded", function() {
    if(window.location.search.includes("cart_drawer=open")) {
      if(typeof openBagDrawer === 'function') {
        openBagDrawer();
      }
    }
  });
</script>
</body>
`;

themeData = themeData.replace('</body>', injection);

const putData = JSON.stringify({ asset: { key: "layout/theme.liquid", value: themeData } });

const req = https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('Theme injected with cart trigger.'));
});
req.write(putData);
req.end();
