const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

// Add bg_color to ayus-story-split.liquid if it isn't already there
let splitFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-split.liquid';
let splitContent = fs.readFileSync(splitFile, 'utf8');
if (!splitContent.includes('bg_color')) {
    splitContent = splitContent.replace(/<section class="ayus-story-split" style="padding: 100px 20px; border-bottom: 1px solid var\(--color-border\);">/, 
        '<section class="ayus-story-split" style="padding: 100px 20px; background-color: {{ section.settings.bg_color | default: \'transparent\' }}; border-bottom: 1px solid var(--color-border);">');
    
    let schemaInsert = `
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "transparent"
    },`;
    splitContent = splitContent.replace(/"settings": \[/, `"settings": [${schemaInsert}`);
    fs.writeFileSync(splitFile, splitContent);
}

// Add bg_color to ayus-story-text.liquid if it isn't already there
let textFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-text.liquid';
let textContent = fs.readFileSync(textFile, 'utf8');
if (!textContent.includes('bg_color')) {
    textContent = textContent.replace(/<section class="ayus-story-text" style="padding: 100px 20px; border-bottom: 1px solid var\(--color-border\);">/, 
        '<section class="ayus-story-text" style="padding: 100px 20px; background-color: {{ section.settings.bg_color | default: \'transparent\' }}; border-bottom: 1px solid var(--color-border);">');
    
    let schemaInsert = `
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "transparent"
    },`;
    textContent = textContent.replace(/"settings": \[/, `"settings": [${schemaInsert}`);
    fs.writeFileSync(textFile, textContent);
}
