const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-policy-content.liquid', 'utf8');

// Add global h2 styling to match the block-level heading styling
let styleInsert = `  .tt-policy-content h2 {
    font-family: var(--font-heading);
    font-size: 24px;
    color: var(--color-text);
    margin-top: 40px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 10px;
  }
  .tt-policy-content p { margin-bottom: 20px; }`;

liquid = liquid.replace(/\.tt-policy-content p { margin-bottom: 20px; }/, styleInsert);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-policy-content.liquid', liquid);
