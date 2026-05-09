const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', 'utf8');

// Update styling to make "Customer Support" block featured
let replacement = `        <div class="contact-info-block {% if block.settings.title == 'Customer Support' %}featured-support{% endif %}" {{ block.shopify_attributes }}>
          {% if block.settings.title != 'Customer Support' %}<h3>{{ block.settings.title }}</h3>{% endif %}
          {% if block.settings.link_text != blank %}
            <p><a href="{{ block.settings.link_url }}">{{ block.settings.link_text }}</a></p>
          {% endif %}
          {% if block.settings.subtitle != blank %}
            <p style="font-size: 12px; color: #888; margin-top: 5px;">{{ block.settings.subtitle }}</p>
          {% endif %}
          {% if block.settings.text_content != blank %}
            <p>{{ block.settings.text_content }}</p>
          {% endif %}
        </div>`;

liquid = liquid.replace(/<div class="contact-info-block" \{\{ block\.shopify_attributes \}\}>[\s\S]*?<\/div>/, replacement);

let styles = `  .contact-info-block.featured-support {
    background-color: var(--color-background);
    padding: 30px;
    border: 1px solid var(--color-border);
    margin-bottom: 50px;
  }
  .contact-info-block.featured-support p {
    font-size: 15px;
    line-height: 2;
    color: var(--color-text);
    margin: 0;
    font-style: italic;
  }
`;

liquid = liquid.replace(/(\.contact-info-block \{[\s\S]*?\})/, `$1\n${styles}`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', liquid);
