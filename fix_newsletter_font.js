const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');

liquid = liquid.replace(/font-size: 11px; letter-spacing: 0\.1em; color: var\(--color-text\); outline: none;"/g, 
  'font-size: 13px; letter-spacing: 0.05em; color: var(--color-text); outline: none;"');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', liquid);
