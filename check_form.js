const fs = require('fs');
let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');
let match = liquid.match(/{% form 'customer'[\s\S]*?{% endform %}/);
console.log(match ? match[0] : "Not found");
