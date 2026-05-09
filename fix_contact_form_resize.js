const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', 'utf8');

// 1. Remove the resize grabber from textareas
if (!liquid.includes('resize: none;')) {
    liquid = liquid.replace(/\.ayus-form-group input, \.ayus-form-group textarea\s*\{/, 
    `.ayus-form-group input, .ayus-form-group textarea {
    resize: none;`);
}

// 2. To absolutely guarantee the padding below the button is fixed, we need to handle the <form> margin
// Sometimes Shopify themes inject global margins on <form>.
// Let's strip the last margin-bottom from the final form group as well to avoid stacked margins.
liquid = liquid.replace(/<div class="ayus-form-group">\s*<label for="ContactForm-body">/, 
  `<div class="ayus-form-group" style="margin-bottom: 25px;">\n          <label for="ContactForm-body">`);

// 3. Make sure .ayus-contact-form-wrapper form is block and has no margin at all
liquid = liquid.replace(/\.ayus-contact-form-wrapper form\s*\{[^}]*\}/, `.ayus-contact-form-wrapper form {
    margin: 0 !important;
    padding: 0 !important;
    display: block;
  }`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', liquid);
