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

const contactContent = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', 'utf8');

uploadAsset({
  key: 'sections/ayus-contact.liquid',
  value: contactContent
}).then(res => {
  if(res.errors) console.error('Upload errors:', res.errors);
  else console.log('ayus-contact.liquid uploaded successfully');
}).catch(console.error);

// We also need to inject the blocks into page.contact.json so they appear by default!
// But if they are already using the page, adding blocks in schema won't auto-populate the JSON unless we push the JSON.
let pageJSON = JSON.parse(fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/page.contact.json', 'utf8'));

if (!pageJSON.sections.main.blocks) {
    pageJSON.sections.main.blocks = {
        "whatsapp": {
            "type": "contact_block",
            "settings": {
                "title": "WhatsApp / Phone",
                "link_text": "+91 63007 96184",
                "link_url": "https://wa.me/916300796184",
                "subtitle": "Available Mon-Fri, 9am - 6pm"
            }
        },
        "email": {
            "type": "contact_block",
            "settings": {
                "title": "Email",
                "link_text": "tulsitales@gmail.com",
                "link_url": "mailto:tulsitales@gmail.com",
                "subtitle": "We aim to reply within 24 hours."
            }
        },
        "instagram": {
            "type": "contact_block",
            "settings": {
                "title": "Instagram",
                "link_text": "@tulsitales",
                "link_url": "https://instagram.com/tulsitales"
            }
        },
        "support": {
            "type": "contact_block",
            "settings": {
                "title": "Customer Support",
                "text_content": "If you have any questions about your order, shipping, or need Ayurvedic advice on our products, our dedicated support team is here to help."
            }
        }
    };
    pageJSON.sections.main.block_order = ["whatsapp", "email", "instagram", "support"];
    
    uploadAsset({
      key: 'templates/page.contact.json',
      value: JSON.stringify(pageJSON, null, 2)
    }).then(res => {
      if(res.errors) console.error('JSON upload errors:', res.errors);
      else console.log('page.contact.json uploaded successfully');
    }).catch(console.error);
}

