const fs = require('fs');

let quoteFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-quote.liquid';
let quoteContent = fs.readFileSync(quoteFile, 'utf8');

// The previous edit hardcoded it to #ffffff. Let's bind it to bg_color setting instead.
quoteContent = quoteContent.replace(/background-color: #ffffff;/, 'background-color: {{ section.settings.bg_color | default: \'#FAF8F5\' }};');

if (!quoteContent.includes('"id": "bg_color"')) {
    let schemaInsert = `
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#FAF8F5"
    },`;
    quoteContent = quoteContent.replace(/"settings": \[/, `"settings": [${schemaInsert}`);
}

fs.writeFileSync(quoteFile, quoteContent);
