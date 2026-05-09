const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', 'utf8');

liquid = liquid.replace(/\.ayus-contact-container\s*\{[^}]*\}/, `.ayus-contact-container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    align-items: flex-start; /* Prevents the right column from stretching to match the left column's height */
  }`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', liquid);
