const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-search.liquid', 'utf8');

const replacement = `<div class="ayus-product-card" style="display: flex; flex-direction: column; height: 100%;">
                <a href="{{ item.url }}" target="_blank" style="flex-grow: 1; text-decoration: none; color: inherit; display: flex; flex-direction: column;">
                  <div class="ayus-card-img-wrapper">
                    {% if item.featured_media %}
                      <img src="{{ item.featured_media | img_url: '600x' }}" alt="{{ item.title | escape }}" loading="lazy">
                    {% else %}
                      <div class="ayus-placeholder"></div>
                    {% endif %}
                  </div>
                  <div class="ayus-card-info" style="flex-grow: 1; display: flex; flex-direction: column;">
                    <span class="ayus-brand-text">{{ item.vendor }}</span>
                    <h3 class="ayus-card-title">{{ item.title | split: '-' | last | strip }}</h3>
                    <p class="ayus-card-price" style="margin-bottom: 0;">{{ item.price | money }}</p>
                  </div>
                </a>
                <div class="tt-card-action" style="padding: 10px 0 0 0; margin-top: auto; display: flex; flex-direction: column; width: 100%; align-items: center;">
                  <!-- Stars right above Add to Bag -->
                  <div class="tt-card-rating" style="margin-bottom: 12px; color: #d4af37; display: flex; align-items: center; justify-content: center; gap: 2px;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span style="color: #888; font-size: 11px; margin-left: 6px; font-weight: normal; letter-spacing: 0.1em; text-transform: uppercase;">(0 REVIEWS)</span>
                  </div>
                  <button type="button" class="tt-card-add-btn" onclick="event.preventDefault(); addAddonToCart(this, {{ item.variants.first.id }})">ADD TO BAG</button>
                </div>
              </div>`;

const target = `<div class="ayus-product-card">
                <a href="{{ item.url }}" target="_blank">
                  <div class="ayus-card-img-wrapper">
                    {% if item.featured_media %}
                      <img src="{{ item.featured_media | img_url: '600x' }}" alt="{{ item.title | escape }}">
                    {% else %}
                      <div class="ayus-placeholder"></div>
                    {% endif %}
                  </div>
                  <div class="ayus-card-info">
                    <span class="ayus-brand-text">{{ item.vendor }}</span>
                    <h3 class="ayus-card-title">{{ item.title | split: '-' | last | strip }}</h3>
                    <p class="ayus-card-price">{{ item.price | money }}</p>
                  </div>
                </a>
              </div>`;

liquid = liquid.replace(target, replacement);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-search.liquid', liquid);

const putData = JSON.stringify({ asset: { key: "sections/ayus-search.liquid", value: liquid } });

const req = https.request({
  hostname: SHOP,
  path: '/admin/api/2024-01/themes/' + THEME_ID + '/assets.json',
  method: 'PUT',
  headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('Search cards updated.'));
});
req.write(putData);
req.end();
