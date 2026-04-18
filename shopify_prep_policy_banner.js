const fs = require('fs');

const liquidContent = `{%- style -%}
  .policy-banner {
    position: relative;
    width: 100%;
    height: 350px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    {% if section.settings.banner_image %}
      background-image: url('{{ section.settings.banner_image | img_url: '2000x' }}');
    {% else %}
      background-color: #2C2A29;
    {% endif %}
  }
  .policy-banner::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: {{ section.settings.overlay_color | default: '#000000' }};
    opacity: {{ section.settings.overlay_opacity | default: 30 | divided_by: 100.0 }};
  }
  .policy-banner-content {
    position: relative;
    z-index: 1;
    color: {{ section.settings.text_color | default: '#ffffff' }};
    padding: 0 20px;
  }
  .policy-tagline {
    font-family: var(--font-body);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-size: 11px;
    display: block;
    margin-bottom: 15px;
  }
  .policy-title {
    font-family: var(--font-heading);
    font-size: 42px;
    margin: 0 0 15px 0;
    font-weight: normal;
  }
  .policy-subtitle {
    font-family: var(--font-body);
    font-size: 14px;
    font-style: italic;
    opacity: 0.9;
    margin: 0;
  }
  .tt-policy-content p { margin-bottom: 20px; }
  .tt-policy-content ul, .tt-policy-content ol { padding-left: 20px; margin-bottom: 20px; }
  .tt-policy-content li { margin-bottom: 10px; }
  .tt-policy-content a { color: var(--color-text); text-decoration: underline; text-underline-offset: 4px; }
{%- endstyle -%}

<div class="policy-banner">
  <div class="policy-banner-content">
    <span class="policy-tagline">{{ section.settings.tagline | default: 'Tulsi Tales' }}</span>
    <h1 class="policy-title">
      {% if section.settings.title != blank %}
        {{ section.settings.title }}
      {% else %}
        {{ page.title }}
      {% endif %}
    </h1>
    {% if section.settings.subtitle != blank %}
      <p class="policy-subtitle">{{ section.settings.subtitle }}</p>
    {% endif %}
  </div>
</div>

<section class="ayus-policy-page" style="background-color: #fff; padding: 80px 20px;">
  <div style="max-width: 800px; margin: 0 auto;">
    <div class="tt-policy-content" style="font-family: var(--font-body); font-size: 15px; line-height: 2; color: #444;">
      {% for block in section.blocks %}
        <div class="policy-block" style="margin-bottom: 60px;" {{ block.shopify_attributes }}>
          {% if block.settings.heading != blank %}
            <h2 style="font-family: var(--font-heading); font-size: 24px; color: var(--color-text); margin-bottom: 20px; border-bottom: 1px solid var(--color-border); padding-bottom: 10px;">{{ block.settings.heading }}</h2>
          {% endif %}
          <div class="rte">
            {{ block.settings.text }}
          </div>
        </div>
      {% endfor %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Policy Content",
  "settings": [
    {
      "type": "header",
      "content": "Banner Settings"
    },
    {
      "type": "image_picker",
      "id": "banner_image",
      "label": "Banner Image"
    },
    {
      "type": "color",
      "id": "overlay_color",
      "label": "Overlay Color",
      "default": "#000000"
    },
    {
      "type": "range",
      "id": "overlay_opacity",
      "label": "Overlay Opacity",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 30
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#ffffff"
    },
    {
      "type": "text",
      "id": "tagline",
      "label": "Tagline",
      "default": "Tulsi Tales"
    },
    {
      "type": "text",
      "id": "title",
      "label": "Title Override",
      "info": "Leave blank to use page title"
    },
    {
      "type": "text",
      "id": "subtitle",
      "label": "Subtitle",
      "default": "Last updated: April 2026"
    }
  ],
  "blocks": [
    {
      "type": "section",
      "name": "Text Section",
      "settings": [
        { "type": "text", "id": "heading", "label": "Heading" },
        { "type": "richtext", "id": "text", "label": "Body Text" }
      ]
    }
  ],
  "presets": [{ "name": "Policy Content" }]
}
{% endschema %}
`;

fs.writeFileSync('ayus-policy-content.liquid', liquidContent);
console.log('ayus-policy-content.liquid updated locally.');

['page.refund.json', 'page.shipping.json', 'page.terms.json'].forEach(file => {
  if(!fs.existsSync(file)) return;
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (data.sections && data.sections.main) {
    // Inject the new settings
    data.sections.main.settings = {
      tagline: "Tulsi Tales",
      subtitle: "Last updated: April 2026",
      text_color: "#ffffff",
      overlay_color: "#000000",
      overlay_opacity: 40
    };
    
    // Remove hardcoded text from blocks
    if (data.sections.main.blocks) {
      for (let key in data.sections.main.blocks) {
        let block = data.sections.main.blocks[key];
        if (block.settings && block.settings.text) {
          block.settings.text = block.settings.text.replace(/<p><em>Last updated: April 2026<\/em><\/p>/gi, '');
          block.settings.text = block.settings.text.replace(/<p>Refund Policy<\/p>/gi, '');
          block.settings.text = block.settings.text.replace(/<p>Terms of Service<\/p>/gi, '');
          block.settings.text = block.settings.text.replace(/<p>Shipping Policy<\/p>/gi, '');
        }
      }
    }
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
});
console.log('JSON files cleaned and settings added locally.');
