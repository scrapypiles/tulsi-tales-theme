const fs = require('fs');

function setWhiteBackground(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    // Replace default #faf8f5 with #ffffff, or inject if not present
    content = content.replace(/background-color:\s*\{\{\s*section\.settings\.bg_color\s*\|\s*default:\s*'#[A-Fa-f0-9]+'\s*\}\}/, "background-color: {{ section.settings.bg_color | default: '#ffffff' }}");
    fs.writeFileSync(filename, content);
}

setWhiteBackground('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-text.liquid');
