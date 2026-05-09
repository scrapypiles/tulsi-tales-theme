const fs = require('fs');

let content = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-header.liquid', 'utf8');

content = content.replace(/{% for link in linklists\[section\.settings\.menu\]\.links %}/g, 
  "{% for link in linklists[section.settings.menu].links %}\n        {% if link.title == 'Contact' or link.title == 'Contact Us' or link.url contains 'contact' %}{% continue %}{% endif %}");

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-header.liquid', content);