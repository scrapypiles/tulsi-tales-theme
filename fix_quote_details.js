const fs = require('fs');

let path = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-quote.liquid';
let content = fs.readFileSync(path, 'utf8');

// 1. Change background to white
content = content.replace(/background-color: #FAF8F5;/, 'background-color: #ffffff;');

// 2. Remove quotation marks around the text
content = content.replace(/"\{\{ section\.settings\.quote_text \}\}"/, '{{ section.settings.quote_text }}');

fs.writeFileSync(path, content);
