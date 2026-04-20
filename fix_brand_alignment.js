const fs = require('fs');

const cssPath = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newAlignmentCSS = `
.ayus-card-info {
  display: flex !important;
  flex-direction: column !important;
  flex-grow: 1 !important;
  justify-content: flex-start !important; /* Force Brand Name to lock to the top edge */
}

.ayus-brand-text {
  margin-top: 0 !important; /* Ensure brand is flush against top padding */
}

/* Ensure the title itself has a standard margin bottom */
.ayus-card-title {
  margin-bottom: auto !important; /* Push the price and button down to the bottom */
}

.ayus-card-price {
  margin-top: 15px !important;
}
`;

css = css.replace(/\.ayus-card-info\s*\{\s*display:\s*flex\s*!important;\s*flex-direction:\s*column\s*!important;\s*flex-grow:\s*1\s*!important;\s*justify-content:\s*flex-end\s*!important;\s*\}/, newAlignmentCSS);

fs.writeFileSync(cssPath, css);
console.log('Fixed vertical alignment CSS');
