const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', 'utf8');

// Replace raw form with proper Liquid form
const rawForm = /<form method="post" action="\/contact#ContactFooter" id="ContactFooter" accept-charset="UTF-8" class="contact-form">[\s\S]*?<\/form>/;

const liquidForm = `{% form 'customer', id: 'ContactFooter' %}
              <input type="hidden" name="contact[tags]" value="newsletter">
              
              <div style="display: flex; border-bottom: 1px solid var(--color-text); padding-bottom: 5px; max-width: 300px;">
                <input
                  type="email"
                  name="contact[email]"
                  value="{{ form.email }}"
                  aria-required="true"
                  autocorrect="off"
                  autocapitalize="off"
                  autocomplete="email"
                  placeholder="{{ block.settings.newsletter_placeholder | escape }}"
                  style="border: none; background: transparent; width: 100%; font-family: var(--font-body); font-size: 13px; letter-spacing: 0.05em; color: var(--color-text); outline: none;"
                  required
                >
                <button type="submit" style="background: transparent; border: none; font-size: 20px; cursor: pointer; color: var(--color-text); padding: 5px 15px; position: relative; z-index: 10;">&rarr;</button>
              </div>
              {%- if form.posted_successfully? -%}
                <p style="font-size: 11px; color: green; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.05em;">Thanks for subscribing!</p>
              {%- endif -%}
            {% endform %}`;

liquid = liquid.replace(rawForm, liquidForm);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-footer.liquid', liquid);
