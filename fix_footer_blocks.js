const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let raw = fs.readFileSync('/tmp/live_settings.json', 'utf8');
let data = JSON.parse(raw);

// Inject footer blocks
data.current.sections['ayus-footer'] = {
  "type": "ayus-footer",
  "blocks": {
    "brand_info_1": {
      "type": "brand_info",
      "settings": {
        "text": "Rooted in eternal Ayurvedic wisdom. Crafted with pure, botanical ingredients for your holistic well-being."
      }
    },
    "link_list_1": {
      "type": "link_list",
      "settings": {
        "heading": "Explore",
        "menu": "footer"
      }
    },
    "contact_1": {
      "type": "contact_newsletter",
      "settings": {
        "heading": "Contact & Join",
        "contact_text": "<p>Email: namaste@tulsitales.com<br>Phone: +91 800 000 0000</p>",
        "newsletter_placeholder": "ENTER YOUR EMAIL",
        "success_message": "Thanks for subscribing!"
      }
    }
  },
  "block_order": [
    "brand_info_1",
    "link_list_1",
    "contact_1"
  ],
  "settings": {
    "copyright_text": "Rooted in eternal Ayurvedic wisdom."
  }
};

fs.writeFileSync('/tmp/new_settings_data.json', JSON.stringify(data, null, 2));

const uploadData = JSON.stringify({
  asset: {
    key: 'config/settings_data.json',
    value: JSON.stringify(data)
  }
});

const req = https.request({
  hostname: '5iib0q-9y.myshopify.com',
  path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
  method: 'PUT',
  headers: {
    'X-Shopify-Access-Token': token,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(uploadData)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log("Upload response:", body.substring(0, 100) + '...');
  });
});
req.write(uploadData);
req.end();
