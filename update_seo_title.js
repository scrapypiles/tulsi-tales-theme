const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/theme.liquid', 'utf8');

liquid = liquid.replace(/<title>\{% if template == 'index' %\}Tulsi Tales \| Authentic Ayurvedic Products from India\{% else %\}\{\{ page_title \}\} - Tulsi Tales\{% endif %\}<\/title>/, 
  "<title>{% if template == 'index' %}Tulsi Tales | Authentic Ayurvedic Products from India{% else %}{{ page_title }} | Tulsi Tales{% endif %}</title>");

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/theme.liquid', liquid);
