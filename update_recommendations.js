const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', 'utf8');

const target = `{% assign related_count = 0 %}
      {% for related in collections['all'].products %}`;

const replacement = `{% assign related_count = 0 %}
      {% assign related_collection = collections['all'] %}
      {% for c in product.collections %}
        {% if c.handle != 'all' and c.handle != 'frontpage' %}
          {% assign related_collection = c %}
          {% break %}
        {% endif %}
      {% endfor %}
      {% for related in related_collection.products %}`;

liquid = liquid.replace(target, replacement);
fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', liquid);

const putData = JSON.stringify({ asset: { key: "sections/ayus-product-main.liquid", value: liquid } });

const req = https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('Recommendations updated.'));
});
req.write(putData);
req.end();
