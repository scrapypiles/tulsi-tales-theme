const fs = require('fs');

const cssPath = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/\/\* 1\. Global Box-Sizing to Prevent Horizontal Scroll\/Bleed \*\/\s*\*, \*\:\:before, \*\:\:after \{\s*box-sizing: border-box;\s*\}/, '');

const globalReset = `
/* GLOBAL BOX-SIZING FIX */
*, *::before, *::after {
  box-sizing: border-box !important;
}
`;

if (!css.includes('/* GLOBAL BOX-SIZING FIX */')) {
  css = globalReset + css;
  fs.writeFileSync(cssPath, css);
  console.log('Fixed global box sizing');
}
