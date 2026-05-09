const fs = require('fs');

const path = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css';
let content = fs.readFileSync(path, 'utf8');

// Strip out the hardcoded :root colors because theme.liquid is now handling them dynamically
content = content.replace(/:root\s*\{[^}]*--font-body[^}]*\}/s, '/* CSS Variables are now injected dynamically via layout/theme.liquid settings */');

fs.writeFileSync(path, content, 'utf8');
console.log("Stripped static :root from css");
