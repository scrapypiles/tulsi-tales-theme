const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const footerContent = `<footer class="site-footer" style="padding: 100px 20px 40px; background-color: #F7F5F0; color: #2C2A29; font-family: 'Helvetica Neue', Arial, sans-serif; border-top: 1px solid #EAE5D9;">
  <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between;">
    <div style="flex: 1; min-width: 250px; margin-bottom: 40px;">
      <h4 style="font-family: 'Times New Roman', Times, serif; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; font-size: 14px; margin-bottom: 20px; color: #111;">Tulsi Tales</h4>
      <p style="font-size: 13px; line-height: 2; color: #555;">Rooted in Ayurvedic wisdom.<br>Crafted for modern rituals.</p>
    </div>
    <div style="flex: 1; min-width: 250px; margin-bottom: 40px;">
      <h4 style="font-family: 'Times New Roman', Times, serif; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; font-size: 11px; margin-bottom: 20px; color: #111;">Explore</h4>
      <ul style="list-style: none; padding: 0; font-size: 12px; line-height: 2.5; letter-spacing: 1px; text-transform: uppercase;">
        <li><a href="/collections/all" style="text-decoration: none; color: #555;">All Medicines</a></li>
      </ul>
    </div>
    <div style="flex: 1; min-width: 250px; margin-bottom: 40px;">
      <h4 style="font-family: 'Times New Roman', Times, serif; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; font-size: 11px; margin-bottom: 20px; color: #111;">Legal</h4>
      <ul style="list-style: none; padding: 0; font-size: 12px; line-height: 2.5; letter-spacing: 1px; text-transform: uppercase;">
        <li><a href="/pages/terms" style="text-decoration: none; color: #555;">Terms of Service</a></li>
        <li><a href="/pages/privacy" style="text-decoration: none; color: #555;">Privacy Policy</a></li>
        <li><a href="/pages/refund" style="text-decoration: none; color: #555;">Refund Policy</a></li>
      </ul>
    </div>
  </div>
  <div style="max-width: 1200px; margin: 40px auto 0; padding-top: 30px; border-top: 1px solid #EAE5D9; text-align: center; font-size: 10px; letter-spacing: 2px; color: #888; text-transform: uppercase;">
    &copy; {{ 'now' | date: '%Y' }} Tulsi Tales. All rights reserved.
  </div>
</footer>
{% schema %}
{
  "name": "Ayus Footer",
  "settings": []
}
{% endschema %}`;

const assets = [
  {
    key: 'sections/ayus-footer.liquid',
    value: footerContent
  }
];

function uploadAsset(asset) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ asset });
    const options = {
      hostname: SHOP,
      path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });

    req.on('error', e => reject(e));
    req.write(data);
    req.end();
  });
}

async function run() {
  for (const asset of assets) {
    console.log('Uploading ' + asset.key + '...');
    const res = await uploadAsset(asset);
    if (res.errors) {
      console.error('Failed to upload ' + asset.key + ':', res.errors);
    } else {
      console.log('Successfully uploaded ' + asset.key);
    }
  }
}

run();