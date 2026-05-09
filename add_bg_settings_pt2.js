const fs = require('fs');

// Add bg_color to ayus-story-values.liquid
let valuesFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-values.liquid';
let valuesContent = fs.readFileSync(valuesFile, 'utf8');
if (!valuesContent.includes('bg_color')) {
    valuesContent = valuesContent.replace(/<section class="ayus-story-values" style="padding: 100px 20px; background-color: var\(--color-background\); border-bottom: 1px solid var\(--color-border\);">/, 
        '<section class="ayus-story-values" style="padding: 100px 20px; background-color: {{ section.settings.bg_color | default: \'var(--color-background)\' }}; border-bottom: 1px solid var(--color-border);">');
    
    let schemaInsert = `
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#ffffff"
    },`;
    valuesContent = valuesContent.replace(/"settings": \[/, `"settings": [${schemaInsert}`);
    fs.writeFileSync(valuesFile, valuesContent);
}

// Add bg_color to ayus-story-faq.liquid
let faqFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-faq.liquid';
if (fs.existsSync(faqFile)) {
    let faqContent = fs.readFileSync(faqFile, 'utf8');
    if (!faqContent.includes('bg_color')) {
        faqContent = faqContent.replace(/<section class="ayus-story-faq" style="padding: 100px 20px; background-color: var\(--color-background\); border-bottom: 1px solid var\(--color-border\);">/, 
            '<section class="ayus-story-faq" style="padding: 100px 20px; background-color: {{ section.settings.bg_color | default: \'var(--color-background)\' }}; border-bottom: 1px solid var(--color-border);">');
        
        let schemaInsert = `
        {
          "type": "color",
          "id": "bg_color",
          "label": "Background Color",
          "default": "#FAF8F5"
        },`;
        faqContent = faqContent.replace(/"settings": \[/, `"settings": [${schemaInsert}`);
        fs.writeFileSync(faqFile, faqContent);
    }
}

// Add bg_color to ayus-story-cta.liquid
let ctaFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-cta.liquid';
let ctaContent = fs.readFileSync(ctaFile, 'utf8');
if (!ctaContent.includes('bg_color')) {
    ctaContent = ctaContent.replace(/<section class="ayus-story-cta" style="padding: 100px 20px; text-align: center; border-bottom: 1px solid var\(--color-border\);">/, 
        '<section class="ayus-story-cta" style="padding: 100px 20px; text-align: center; background-color: {{ section.settings.bg_color | default: \'#ffffff\' }}; border-bottom: 1px solid var(--color-border);">');
    
    let schemaInsert = `
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#ffffff"
    },`;
    ctaContent = ctaContent.replace(/"settings": \[/, `"settings": [${schemaInsert}`);
    fs.writeFileSync(ctaFile, ctaContent);
}
