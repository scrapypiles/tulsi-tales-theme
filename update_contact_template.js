const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', 'utf8');

// 1. Add subtitle styling
const subtitleStyle = `
  .contact-subtitle {
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    max-width: 600px;
    margin: 15px auto 0;
    color: inherit;
    opacity: 0.9;
  }
`;
liquid = liquid.replace(/\.contact-title \{[\s\S]*?\}/, `$&${subtitleStyle}`);

// 2. Replace title and add subtitle in HTML
const bannerHtml = `<div class="contact-banner-content">
    <span class="contact-tagline">{{ section.settings.tagline | default: 'Get in Touch' }}</span>
    <h1 class="contact-title">
      {% if section.settings.title != blank %}
        {{ section.settings.title }}
      {% else %}
        {{ page.title }}
      {% endif %}
    </h1>
    {% if section.settings.subtitle != blank %}
      <div class="contact-subtitle">{{ section.settings.subtitle }}</div>
    {% endif %}
  </div>`;
liquid = liquid.replace(/<div class="contact-banner-content">[\s\S]*?<\/div>/, bannerHtml);

// 3. Add to schema
const schemaInsert = `
    {
      "type": "text",
      "id": "title",
      "label": "Custom Title (Overrides page title)"
    },
    {
      "type": "richtext",
      "id": "subtitle",
      "label": "Subtitle / Paragraph"
    },`;
liquid = liquid.replace(/"id": "tagline",\s*"label": "Tagline",\s*"default": "Get in Touch"\s*},/, `$&${schemaInsert}`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', liquid);
