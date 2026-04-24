const fs = require('fs');

const quotePath = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-quote.liquid';
let quoteContent = fs.readFileSync(quotePath, 'utf8');
quoteContent = quoteContent.replace(/width: 24px; height: 24px;[^>]*opacity: 0\.8;/g, "width: 48px; height: 48px; object-fit: contain; margin-bottom: 20px; opacity: 1;");
quoteContent = quoteContent.replace(/<section class="ayus-story-quote" style="[^"]*background-color: var\(--color-background\)[^"]*">/, `<section class="ayus-story-quote" style="padding: 100px 20px; text-align: center; background-color: {{ section.settings.bg_color | default: '#faf8f5' }}; border-bottom: 1px solid var(--color-border);">`);
// Add bg_color setting
quoteContent = quoteContent.replace(/"settings": \[/, `"settings": [\n    { "type": "color", "id": "bg_color", "label": "Background Color", "default": "#faf8f5" },`);
fs.writeFileSync(quotePath, quoteContent, 'utf8');

const heroPath = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-hero.liquid';
let heroContent = fs.readFileSync(heroPath, 'utf8');
heroContent = heroContent.replace(/font-size: 11px;/g, "font-size: 13px;");
fs.writeFileSync(heroPath, heroContent, 'utf8');

const textPath = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-text.liquid';
let textContent = fs.readFileSync(textPath, 'utf8');
textContent = textContent.replace(/font-size: 10px;/g, "font-size: 12px;");
textContent = textContent.replace(/<section class="ayus-story-text" style="[^"]*background-color: var\(--color-background\)[^"]*">/, `<section class="ayus-story-text" style="padding: 100px 20px; text-align: center; background-color: {{ section.settings.bg_color | default: '#faf8f5' }}; border-bottom: 1px solid var(--color-border);">`);
textContent = textContent.replace(/"settings": \[/, `"settings": [\n    { "type": "color", "id": "bg_color", "label": "Background Color", "default": "#faf8f5" },`);
fs.writeFileSync(textPath, textContent, 'utf8');

const valuesPath = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-values.liquid';
let valuesContent = fs.readFileSync(valuesPath, 'utf8');
valuesContent = valuesContent.replace(/font-size: 10px;/g, "font-size: 12px;");
valuesContent = valuesContent.replace(/<section class="ayus-story-values" style="[^"]*background-color: #fff[^"]*">/, `<section class="ayus-story-values" style="background-color: {{ section.settings.bg_color | default: '#ffffff' }}; padding: 100px 20px; border-bottom: 1px solid var(--color-border);">`);
valuesContent = valuesContent.replace(/"settings": \[/, `"settings": [\n    { "type": "color", "id": "bg_color", "label": "Background Color", "default": "#ffffff" },`);
fs.writeFileSync(valuesPath, valuesContent, 'utf8');

const splitPath = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-split.liquid';
let splitContent = fs.readFileSync(splitPath, 'utf8');
splitContent = splitContent.replace(/font-size: 10px;/g, "font-size: 12px;");
splitContent = splitContent.replace(/<section class="ayus-story-split-section" style="[^"]*background-color: #fff[^"]*">/, `<section class="ayus-story-split-section" style="background-color: {{ section.settings.bg_color | default: '#ffffff' }}; border-bottom: 1px solid var(--color-border);">`);
splitContent = splitContent.replace(/"settings": \[/, `"settings": [\n    { "type": "color", "id": "bg_color", "label": "Background Color", "default": "#ffffff" },`);
fs.writeFileSync(splitPath, splitContent, 'utf8');

const ctaPath = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-cta.liquid';
let ctaContent = fs.readFileSync(ctaPath, 'utf8');
ctaContent = ctaContent.replace(/font-size: 10px;/g, "font-size: 12px;");
if(ctaContent.match(/<section class="ayus-story-cta"/)) {
    ctaContent = ctaContent.replace(/<section class="ayus-story-cta" style="[^"]*background-color: var\(--color-background\)[^"]*">/, `<section class="ayus-story-cta" style="padding: 100px 20px; text-align: center; background-color: {{ section.settings.bg_color | default: '#faf8f5' }};">`);
    ctaContent = ctaContent.replace(/"settings": \[/, `"settings": [\n    { "type": "color", "id": "bg_color", "label": "Background Color", "default": "#faf8f5" },`);
}
fs.writeFileSync(ctaPath, ctaContent, 'utf8');

console.log("Changes applied locally.");
