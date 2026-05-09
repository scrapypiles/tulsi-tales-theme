const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');

// Task 2: Make columns evenly spaced. `flex: 1` -> `flex: 1 1 0%;`
liquid = liquid.replace(/<div style="flex: 1; min-width: 250px;"/g, '<div style="flex: 1 1 0%; min-width: 250px;"');

// Task 3: Update <h4> headings to look more like headings
liquid = liquid.replace(/<h4 style="font-family: var\(--font-heading\); font-weight: 300; letter-spacing: 2px; text-transform: uppercase; font-size: 11px; margin-bottom: 20px; color: var\(--color-text\);">/g, 
  '<h4 style="font-family: var(--font-heading); font-weight: 500; letter-spacing: 3px; text-transform: uppercase; font-size: 15px; margin-bottom: 20px; color: var(--color-text);">');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', liquid);
