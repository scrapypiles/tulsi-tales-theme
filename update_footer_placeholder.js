const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');

liquid = liquid.replace(/"default": "JOIN OUR NEWSLETTER"/g, '"default": "ENTER EMAIL TO JOIN NEWSLETTER"');
liquid = liquid.replace(/placeholder="JOIN OUR NEWSLETTER"/g, 'placeholder="ENTER EMAIL TO JOIN NEWSLETTER"');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', liquid);
