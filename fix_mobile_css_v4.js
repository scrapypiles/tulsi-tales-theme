const fs = require('fs');
let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// The mobile layout CSS
css = css.replace(/margin-bottom: 20px !important;/g, 'margin-bottom: 15px !important;');
css = css.replace(/margin-bottom: 30px !important;/g, 'margin-bottom: 20px !important;');
  
fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);