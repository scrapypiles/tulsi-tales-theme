const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');

// 1. Revert link back to /pages/policy so it uses the custom template
liquid = liquid.replace(/href="\/policies\/privacy-policy"/g, 'href="/pages/policy"');

// 2. Fix column spacing
// Using a slightly more balanced grid ratio that pulls the logo column in
liquid = liquid.replace(/grid-template-columns: 2fr 1fr 1\.5fr/g, 'grid-template-columns: 1.2fr 1fr 1fr');

// 3. Fix description text formatting to make it breathable, attractive, and spacious
liquid = liquid.replace(/<div style="font-size: 13px; line-height: 2; color: #555;">/g, 
    '<div style="font-size: 14px; line-height: 2.2; color: #666; font-family: var(--font-body); letter-spacing: 0.05em; max-width: 380px; margin-top: 15px;">');

// 4. Fix form: Sometimes theme JS hijacks classes like 'newsletter-form'. 
// We strip those and rename the ID to ensure it triggers standard Shopify POST behavior.
liquid = liquid.replace(/{% form 'customer', id: 'ContactFooter', class: 'footer__newsletter newsletter-form' %}/g, 
    "{% form 'customer', id: 'AyusFooterNewsletter' %}");

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', liquid);
