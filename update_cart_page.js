const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

const script = `<script>
  window.location.href = "/?cart_drawer=open";
</script>
<section class="ayus-cart-page" style="padding: 60px 20px; max-width: 800px; margin: 0 auto; text-align: center;">
  <h1 style="font-family: var(--font-heading); margin-bottom: 20px;">Your Cart</h1>
  <p style="font-family: var(--font-body); color: #555;">Opening your cart...</p>
</section>
{% schema %}
{
  "name": "Cart Page",
  "settings": []
}
{% endschema %}`;

const putData = JSON.stringify({ asset: { key: "sections/ayus-cart.liquid", value: script } });

const req = https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('Cart page updated'));
});
req.write(putData);
req.end();
