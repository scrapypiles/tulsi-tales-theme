const fs = require('fs');
let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');

// Replace standard Shopify customer form with a standard HTML action hitting Shopify's contact endpoint directly to bypass all JS interceptions
let formRegex = /{% form 'customer', id: 'AyusFooterNewsletter' %}[\s\S]*?{% endform %}/;

let rawForm = `
<form method="post" action="/contact#ContactFooter" id="ContactFooter" accept-charset="UTF-8" class="contact-form">
  <input type="hidden" name="form_type" value="customer">
  <input type="hidden" name="utf8" value="✓">
  <input type="hidden" name="contact[tags]" value="newsletter">
  
  <div style="display: flex; border-bottom: 1px solid var(--color-text); padding-bottom: 5px; max-width: 300px;">
    <input
      type="email"
      name="contact[email]"
      value=""
      aria-required="true"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="email"
      placeholder="JOIN OUR NEWSLETTER"
      style="border: none; background: transparent; width: 100%; font-family: var(--font-body); font-size: 11px; letter-spacing: 0.1em; color: var(--color-text); outline: none;"
      required
    >
    <button type="submit" style="background: transparent; border: none; font-size: 20px; cursor: pointer; color: var(--color-text); padding: 5px 15px; position: relative; z-index: 10;">&rarr;</button>
  </div>
  
  <!-- We use URL parameters to check success to avoid Liquid cache issues on footer -->
  <script>
    if (window.location.search.includes('customer_posted=true') || window.location.search.includes('contact_posted=true')) {
        document.write('<p style="font-size: 11px; color: green; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.05em;">Thanks for subscribing!</p>');
    }
  </script>
</form>
`;

liquid = liquid.replace(formRegex, rawForm);
fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', liquid);
