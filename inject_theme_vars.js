const fs = require('fs');

const path = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/theme.liquid';
let content = fs.readFileSync(path, 'utf8');

const target = `    {{ 'ayus-styles.css' | asset_url | stylesheet_tag }}`;

const replacement = `    {%- style -%}
      {{ settings.font_heading | font_face: font_display: 'swap' }}
      {{ settings.font_body | font_face: font_display: 'swap' }}
      
      :root {
        --color-background: {{ settings.color_bg | default: '#FAF8F5' }};
        --color-text: {{ settings.color_text | default: '#2C2C2C' }};
        --color-accent: {{ settings.color_accent | default: '#4A5D4E' }};
        --color-border: {{ settings.color_border | default: '#EAE5D9' }};
        
        --font-heading: {{ settings.font_heading.family | default: "'Playfair Display'" }}, {{ settings.font_heading.fallback_families | default: "serif" }};
        --font-body: {{ settings.font_body.family | default: "'Lato'" }}, {{ settings.font_body.fallback_families | default: "sans-serif" }};
        
        --base-heading-size: {{ settings.heading_base_size | default: 36 }}px;
        --base-body-size: {{ settings.body_base_size | default: 14 }}px;
        --global-section-padding: {{ settings.section_padding | default: 80 }}px;
        --global-border-radius: {{ settings.border_radius | default: 0 }}px;
      }
    {%- endstyle -%}
    {{ 'ayus-styles.css' | asset_url | stylesheet_tag }}`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Injected dynamic CSS variables into theme.liquid");
} else {
    console.log("Could not find target in theme.liquid");
}
