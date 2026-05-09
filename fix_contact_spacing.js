const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', 'utf8');

// 1. Remove all bottom padding from the form wrapper
liquid = liquid.replace(/\.ayus-contact-form-wrapper\s*\{[^}]*\}/, `.ayus-contact-form-wrapper {
    flex: 1.5;
    min-width: 300px;
    background: var(--color-background);
    padding: 40px 40px 0px 40px;
    border: none;
  }`);

// 2. Add explicit margin removal to the form and button to kill any default Shopify spacing
if (!liquid.includes('.ayus-contact-form-wrapper form')) {
    liquid = liquid.replace(/\.ayus-submit-btn\s*\{/, `.ayus-contact-form-wrapper form {
    margin-bottom: 0 !important;
    padding-bottom: 40px !important;
  }
  .ayus-submit-btn {
    margin-bottom: 0 !important;
    display: block;
`);
}

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', liquid);
