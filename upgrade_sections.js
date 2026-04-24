const fs = require('fs');
const path = require('path');

const sections = [
  'ayus-hero.liquid',
  'ayus-philosophy.liquid',
  'ayus-shop-by.liquid',
  'ayus-featured-collection.liquid',
  'ayus-story-hero.liquid',
  'ayus-story-quote.liquid',
  'ayus-story-text.liquid',
  'ayus-story-split.liquid',
  'ayus-story-values.liquid',
  'ayus-story-cta.liquid'
];

sections.forEach(file => {
  const filepath = path.join(__dirname, file);
  if (!fs.existsSync(filepath)) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Replace textarea with richtext
  content = content.replace(/"type":\s*"textarea"/g, '"type": "richtext"');
  
  // In Liquid, we need to replace {{ ... | escape }} with {{ ... }} for richtext
  content = content.replace(/\{\{\s*(section\.settings\.[a-zA-Z0-9_]+)\s*\|\s*escape\s*\}\}/g, '{{ $1 }}');
  
  // Add global settings to schema if not present
  if (content.includes('{% schema %}') && !content.includes('"id": "header_placement"')) {
    const commonSettings = `
    {
      "type": "header",
      "content": "Layout & Styling"
    },
    {
      "type": "select",
      "id": "header_placement",
      "label": "Header Placement",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "right", "label": "Right" }
      ],
      "default": "center"
    },
    {
      "type": "select",
      "id": "border_placement",
      "label": "Border Placement",
      "options": [
        { "value": "none", "label": "None" },
        { "value": "top", "label": "Top" },
        { "value": "bottom", "label": "Bottom" },
        { "value": "both", "label": "Top & Bottom" }
      ],
      "default": "none"
    },
    {
      "type": "select",
      "id": "heading_size",
      "label": "Heading Size",
      "options": [
        { "value": "24px", "label": "Small" },
        { "value": "36px", "label": "Medium" },
        { "value": "48px", "label": "Large" }
      ],
      "default": "36px"
    },
    {
      "type": "color",
      "id": "text_color",
      "label": "Text Color",
      "default": "#333333"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#FAF8F5"
    },
    {
      "type": "image_picker",
      "id": "custom_image",
      "label": "Insert Image"
    },`;
    
    // Inject common settings after the first '[' in settings
    content = content.replace(/"settings":\s*\[/, '"settings": [' + commonSettings);
    
    // We also need to prepend a style block and section wrapper class to apply these
    const styleInject = `
<style>
  #shopify-section-{{ section.id }} {
    background-color: {{ section.settings.bg_color }};
    color: {{ section.settings.text_color }};
    {% if section.settings.border_placement == 'top' or section.settings.border_placement == 'both' %}
    border-top: 1px solid var(--color-border);
    {% endif %}
    {% if section.settings.border_placement == 'bottom' or section.settings.border_placement == 'both' %}
    border-bottom: 1px solid var(--color-border);
    {% endif %}
  }
  #shopify-section-{{ section.id }} h1,
  #shopify-section-{{ section.id }} h2,
  #shopify-section-{{ section.id }} h3 {
    text-align: {{ section.settings.header_placement }} !important;
    font-size: {{ section.settings.heading_size }} !important;
    color: {{ section.settings.text_color }} !important;
  }
</style>
`;
    
    // Check if there is a custom image tag injected already, if not, put it somewhere generic or just leave it for the user to select
    const imageInject = `
    {% if section.settings.custom_image %}
      <div style="text-align: center; margin: 20px 0;">
        <img src="{{ section.settings.custom_image | img_url: 'master' }}" alt="" style="max-width: 100%; height: auto;">
      </div>
    {% endif %}
    `;

    content = content.replace(/(<section[^>]*>)/, styleInject + '\n$1\n' + imageInject);
  }

  fs.writeFileSync(filepath, content);
  console.log('Upgraded ' + file);
});
