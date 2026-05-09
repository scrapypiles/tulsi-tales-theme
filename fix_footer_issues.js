const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');

// Update Privacy Policy link
liquid = liquid.replace(/href="\/pages\/policy"/, 'href="/policies/privacy-policy"');

// Fix column spacing: earlier I changed grid to repeat(auto-fit, minmax(250px, 1fr))
// Let's make it 2fr 1fr 1fr to give the first column more space and push the others right.
liquid = liquid.replace(/grid-template-columns: repeat\(auto-fit, minmax\(250px, 1fr\)\)/, 'grid-template-columns: 2fr 1fr 1.5fr');

// Fix the newsletter button size and z-index to make sure it's clickable
liquid = liquid.replace(/<button type="submit" name="commit" id="Subscribe" style="background: transparent; border: none; font-size: 16px; cursor: pointer; color: var\(--color-text\);">&rarr;<\/button>/, 
  '<button type="submit" name="commit" id="Subscribe" style="background: transparent; border: none; font-size: 20px; cursor: pointer; color: var(--color-text); padding: 5px 15px; position: relative; z-index: 10;">&rarr;</button>');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', liquid);
