const fs = require('fs');
let content = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');

const replacement = `{% when 'link_list' %}
          <div style="flex: 1; min-width: 250px;" {{ block.shopify_attributes }}>
            <h4 style="font-family: var(--font-heading); font-weight: 300; letter-spacing: 2px; text-transform: uppercase; font-size: 11px; margin-bottom: 20px; color: var(--color-text);">{{ block.settings.heading }}</h4>
            <ul style="list-style: none; padding: 0; font-size: 12px; line-height: 2.5; letter-spacing: 1px; text-transform: uppercase;">
              {% if linklists[block.settings.menu].links.size > 0 %}
                {% for link in linklists[block.settings.menu].links %}
                  <li><a href="{{ link.url }}" style="color: var(--color-text); text-decoration: none;">{{ link.title }}</a></li>
                {% endfor %}
              {% else %}
                <li><a href="/pages/our-story" style="color: var(--color-text); text-decoration: none;">Our Story</a></li>
                <li><a href="/pages/terms" style="color: var(--color-text); text-decoration: none;">Terms of Service</a></li>
                <li><a href="/pages/policy" style="color: var(--color-text); text-decoration: none;">Privacy Policy</a></li>
                <li><a href="/pages/refund" style="color: var(--color-text); text-decoration: none;">Refund Policy</a></li>
                <li><a href="/pages/shipping" style="color: var(--color-text); text-decoration: none;">Shipping Policy</a></li>
                <li><a href="/pages/contact" style="color: var(--color-text); text-decoration: none;">Contact Us</a></li>
              {% endif %}
            </ul>
          </div>`;

content = content.replace(/{% when 'link_list' %}[\s\S]*?<\/div>/, replacement);
fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', content);
