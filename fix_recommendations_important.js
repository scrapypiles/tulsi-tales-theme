const fs = require('fs');

let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// Remove the `!important` override on .tt-recommendations padding
css = css.replace(/\.tt-recommendations\s*\{\s*padding:\s*0\s*!important;\s*margin-top:\s*0\s*!important;\s*\}/, 
  `.tt-recommendations {\n  /* Removed conflicting padding zeroing */\n}`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);
