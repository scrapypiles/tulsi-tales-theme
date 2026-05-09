const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', 'utf8');

const checkboxHtml = `
        <div class="ayus-form-group ayus-newsletter-optin" style="display: flex; align-items: center; margin-bottom: 25px; gap: 10px;">
          <input type="checkbox" id="ContactForm-newsletter" name="contact[tags]" value="newsletter" style="width: 18px; height: 18px; padding: 0; margin: 0; cursor: pointer; accent-color: var(--color-accent);">
          <label for="ContactForm-newsletter" style="margin: 0; cursor: pointer; text-transform: none; letter-spacing: 0.05em; font-size: 14px; font-weight: normal; color: var(--color-text);">Sign up for our newsletter</label>
        </div>
        
        <button type="submit" class="ayus-submit-btn">`;

liquid = liquid.replace(/<button type="submit" class="ayus-submit-btn">/, checkboxHtml);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-contact.liquid', liquid);
