const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');

// 1. Convert textarea to richtext so she can use bold, italics, and links.
liquid = liquid.replace(
  /"type": "textarea",\s*"id": "text",/g,
  '"type": "richtext",\n          "id": "text",'
);

// Default for richtext needs to be wrapped in HTML
liquid = liquid.replace(
  /"default": "Rooted in eternal Ayurvedic wisdom. We craft pure, botanical formulations designed to bring holistic well-being, harmony, and natural balance to your daily rituals."/g,
  '"default": "<p>Rooted in eternal Ayurvedic wisdom. We craft pure, botanical formulations designed to bring holistic well-being, harmony, and natural balance to your daily rituals.</p>"'
);

// 2. Fix the link list fallback logic. `linklists[block.settings.menu]` might exist but be empty, or `block.settings.menu` might evaluate weirdly. 
// We will explicitly assign the menu and check lengths reliably.
let menuLogic = `{% assign footer_menu = block.settings.menu %}
              {% if footer_menu != blank and linklists[footer_menu] != empty and linklists[footer_menu].links.size > 0 %}
                {% for link in linklists[footer_menu].links %}
                  <li><a href="{{ link.url }}" style="color: var(--color-text); text-decoration: none;">{{ link.title }}</a></li>
                {% endfor %}
              {% else %}
                <li><a href="/collections/all" style="color: var(--color-text); text-decoration: none;">All Products</a></li>
                <li><a href="/pages/our-story" style="color: var(--color-text); text-decoration: none;">Our Story</a></li>
                <li><a href="/pages/contact" style="color: var(--color-text); text-decoration: none;">Contact Us</a></li>
              {% endif %}`;

liquid = liquid.replace(/{% if block\.settings\.menu != blank and linklists\[block\.settings\.menu\]\.links\.size > 0 %}[\s\S]*?{% endif %}/, menuLogic);

// Ensure richtext rendering handles the internal <p> tags gracefully (no double margins)
liquid = liquid.replace(/<div style="font-size: 14px; line-height: 2\.2; color: #666; font-family: var\(--font-body\); letter-spacing: 0\.05em; max-width: 380px; margin-top: 15px;">\s*{{ block\.settings\.text }}\s*<\/div>/, 
  `<div class="footer-rte" style="font-size: 14px; line-height: 2.2; color: #666; font-family: var(--font-body); letter-spacing: 0.05em; max-width: 380px; margin-top: 15px;">
              {{ block.settings.text }}
            </div>
            <style>.footer-rte p { margin: 0 0 10px 0; } .footer-rte a { color: var(--color-text); text-decoration: underline; text-underline-offset: 4px; } .footer-rte strong { font-weight: 600; color: var(--color-text); }</style>`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', liquid);
