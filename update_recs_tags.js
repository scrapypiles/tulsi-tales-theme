const https = require('https');
const fs = require('fs');
const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', 'utf8');

const target = `{% assign related_count = 0 %}
      {% assign related_collection = collections['all'] %}
      {% for c in product.collections %}
        {% if c.handle != 'all' and c.handle != 'frontpage' %}
          {% assign related_collection = c %}
          {% break %}
        {% endif %}
      {% endfor %}
      {% for related in related_collection.products %}
        {% if related.id != product.id and related_count < 8 %}`;

const replacement = `{% assign related_count = 0 %}
      {% assign current_tags = product.tags | join: '|||' | downcase %}
      {% for related in collections['all'].products %}
        {% if related.id == product.id %}{% continue %}{% endif %}
        
        {% assign is_match = false %}
        {% for tag in related.tags %}
          {% assign down_tag = tag | downcase %}
          {% if down_tag != 'ayurvedic' and down_tag != 'vaidyaratnam' and down_tag != 'wellness' %}
            {% if current_tags contains down_tag %}
              {% assign is_match = true %}
              {% break %}
            {% endif %}
          {% endif %}
        {% endfor %}

        {% if is_match and related_count < 8 %}`;

liquid = liquid.replace(target, replacement);

const target2 = `{% assign related_count = related_count | plus: 1 %}
        {% endif %}
      {% endfor %}
    </div>`;

const replacement2 = `{% assign related_count = related_count | plus: 1 %}
        {% endif %}
      {% endfor %}
      
      {% comment %} Fallback if tags yield too few results {% endcomment %}
      {% if related_count < 4 %}
        {% assign offset_num = product.id | modulo: 15 %}
        {% for related in collections['all'].products offset: offset_num %}
          {% if related.id != product.id and related_count < 8 %}
            <div class="tt-carousel-card ayus-product-card">
              <div style="flex-grow: 1; display: flex; flex-direction: column;">
                <a href="{{ related.url }}" style="position: relative; width: 100%; padding-bottom: 125%; background: #eee; overflow: hidden; margin-bottom: 15px; display: block;">
                  {% if related.featured_media %}
                    <img src="{{ related.featured_media | img_url: '600x' }}" alt="{{ related.title | escape }}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;" loading="lazy">
                  {% else %}
                    <div class="ayus-placeholder" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>
                  {% endif %}
                </a>
                <div class="ayus-card-info" style="flex-grow: 1; display: flex; flex-direction: column; text-align: center; align-items: center; padding-top: 10px;">
                  <span class="ayus-brand-text" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent); margin-bottom: 5px;">{{ related.vendor }}</span>
                  <a href="{{ related.url }}" style="text-decoration: none; color: inherit;">
                    <h3 class="ayus-card-title" style="font-size: 16px; font-family: var(--font-body); margin-bottom: 10px;">{{ related.title | split: '-' | last | strip }}</h3>
                  </a>
                  <p class="ayus-card-price" style="font-size: 14px; font-weight: bold; margin: auto 0 0 0;">{{ related.price | money }}</p>
                </div>
              </div>
            </div>
            {% assign related_count = related_count | plus: 1 %}
          {% endif %}
        {% endfor %}
      {% endif %}
    </div>`;

liquid = liquid.replace(target2, replacement2);
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
