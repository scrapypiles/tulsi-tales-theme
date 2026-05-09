const fs = require('fs');
let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-quote.liquid', 'utf8');

liquid = liquid.replace(/background-color: \{\{ section\.settings\.layout_bg_color \| default: '#faf8f5' \}\};/g, 'background-color: #ffffff;');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-story-quote.liquid', liquid);
