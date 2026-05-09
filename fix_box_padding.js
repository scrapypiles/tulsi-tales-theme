const fs = require('fs');
let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', 'utf8');

// 1. Equalize padding in the main form wrapper box
liquid = liquid.replace(/padding: 40px 40px 0px 40px;/, 'padding: 40px;');

// 2. Kill the artificial margin injected by Shopify form wrapping
liquid = liquid.replace(/padding-bottom: 40px !important;/, 'padding-bottom: 0px !important;');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', liquid);
