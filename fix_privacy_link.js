const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');

// Fix the hardcoded fallback link
liquid = liquid.replace(/<a href="\/policies\/privacy-policy"/g, '<a href="/pages/policy"');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', liquid);
