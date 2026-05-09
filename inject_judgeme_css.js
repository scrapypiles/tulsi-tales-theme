const fs = require('fs');
let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

css += `
/* =========================================================
   JUDGE.ME FULL BRANDING OVERRIDES
   ========================================================= */

.jdgm-widget {
  color: var(--color-text) !important;
  font-family: var(--font-body) !important;
}

.jdgm-widget * {
  font-family: var(--font-body) !important;
}

/* Stars */
.jdgm-star,
.jdgm-star::before {
  color: var(--color-accent) !important;
}

/* Make widget title fancy serif */
.jdgm-rev-widg__title {
  font-family: var(--font-heading) !important;
  color: var(--color-text) !important;
  font-weight: 400 !important;
  font-size: 28px !important;
}

/* Review Headers */
.jdgm-rev__title {
  font-family: var(--font-body) !important;
  color: var(--color-text) !important;
  font-weight: 700 !important;
  font-size: 16px !important;
}

/* Author and Date */
.jdgm-rev__author {
  color: var(--color-text) !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  font-size: 12px !important;
}
.jdgm-rev__timestamp {
  color: #777 !important;
  font-size: 12px !important;
}

/* Body Text */
.jdgm-rev__body p {
  color: #555 !important;
  line-height: 1.6 !important;
  font-size: 14px !important;
}

/* Histogram Bars */
.jdgm-histogram__bar-content {
  background-color: var(--color-accent) !important;
}
.jdgm-histogram__bar {
  background-color: var(--color-border) !important;
}

/* Forms */
.jdgm-form__fieldset input, .jdgm-form__fieldset textarea {
  border: 1px solid var(--color-border) !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  color: var(--color-text) !important;
}

.jdgm-form__fieldset input:focus, .jdgm-form__fieldset textarea:focus {
  border-color: var(--color-text) !important;
  outline: none !important;
}
`;

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);
console.log("Injected Judgeme CSS overrides");