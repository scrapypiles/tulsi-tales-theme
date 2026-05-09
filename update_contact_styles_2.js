const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', 'utf8');

// 1. Tagline styling: match Our Story (13px, letter-spacing: 0.2em)
liquid = liquid.replace(/\.contact-tagline\s*\{[^}]*\}/, `.contact-tagline {
    font-family: var(--font-body);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 13px;
    display: block;
    margin-bottom: 15px;
  }`);

// 2. Title styling: match Our Story (48px, line-height 1.2)
liquid = liquid.replace(/\.contact-title\s*\{[^}]*\}/, `.contact-title {
    font-family: var(--font-heading);
    font-size: 48px;
    line-height: 1.2;
    margin: 0 0 15px 0;
    font-weight: normal;
  }`);

// 3. Featured Support Block Styling (transparent bg, no border, bigger orange text)
liquid = liquid.replace(/\.contact-info-block\.featured-support\s*\{[^}]*\}/, `.contact-info-block.featured-support {
    background-color: transparent;
    padding: 0;
    border: none;
    margin-bottom: 50px;
  }`);

liquid = liquid.replace(/\.contact-info-block\.featured-support\s*p\s*\{[^}]*\}/, `.contact-info-block.featured-support p {
    font-size: 20px;
    line-height: 1.6;
    color: var(--color-accent);
    margin: 0;
    font-style: italic;
    letter-spacing: 1px;
  }`);

// 4. Form Wrapper styling (beige background, padding tweaks)
liquid = liquid.replace(/\.ayus-contact-form-wrapper\s*\{[^}]*\}/, `.ayus-contact-form-wrapper {
    flex: 1.5;
    min-width: 300px;
    background: var(--color-background);
    padding: 50px 40px 40px 40px;
    border: 1px solid var(--color-border);
  }`);

// 5. Form Group Labels (more prominent)
liquid = liquid.replace(/\.ayus-form-group\s*label\s*\{[^}]*\}/, `.ayus-form-group label {
    display: block;
    font-family: var(--font-body);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--color-text);
    font-weight: 600;
    margin-bottom: 8px;
  }`);

// 6. Form Title HTML (make it ALL CAPS with letter spacing)
liquid = liquid.replace(/<h3 style="font-family: var\(--font-heading\); font-size: 24px; color: var\(--color-text\); margin-bottom: 30px; font-weight: normal; text-align: center;">\{\{ section\.settings\.form_heading \| default: 'Send us a Message' \}\}<\/h3>/, 
  `<h3 style="font-family: var(--font-heading); font-size: 20px; text-transform: uppercase; letter-spacing: 3px; color: var(--color-text); margin-bottom: 35px; font-weight: 500; text-align: center;">{{ section.settings.form_heading | default: 'Send us a Message' }}</h3>`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', liquid);
