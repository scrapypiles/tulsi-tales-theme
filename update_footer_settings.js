const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const options = {
  hostname: '5iib0q-9y.myshopify.com',
  path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=config/settings_data.json`,
  method: 'GET',
  headers: {
    'X-Shopify-Access-Token': token,
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const asset = JSON.parse(data).asset;
    if (asset) {
        let settings = JSON.parse(asset.value);
        
        // Find the footer contact block and update values
        const blocks = settings.current.sections['ayus-footer'].blocks;
        for (let key in blocks) {
            if (blocks[key].type === 'contact_newsletter') {
                blocks[key].settings.contact_text = "<p>Email: tulsitales@gmail.com<br>Phone: +91 7832 980 384</p>";
                blocks[key].settings.newsletter_placeholder = "JOIN OUR NEWSLETTER";
            }
        }
        
        // Upload back
        const uploadData = JSON.stringify({
          asset: {
            key: 'config/settings_data.json',
            value: JSON.stringify(settings)
          }
        });

        const uploadReq = https.request({
          hostname: '5iib0q-9y.myshopify.com',
          path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
          method: 'PUT',
          headers: {
            'X-Shopify-Access-Token': token,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(uploadData)
          }
        }, (uploadRes) => {
          let body = '';
          uploadRes.on('data', chunk => body += chunk);
          uploadRes.on('end', () => {
            console.log("Upload response:", body.substring(0, 100) + "...");
          });
        });
        uploadReq.write(uploadData);
        uploadReq.end();
        
    }
  });
});
req.end();
