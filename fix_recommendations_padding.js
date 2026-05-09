const fs = require('fs');

let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// 1. Give .tt-recommendations proper top and bottom padding at the section level, not just the container level
css = css.replace(/\.tt-recommendations\s*\{[^}]*\}/, `.tt-recommendations {
  border-top: none;
  padding: 60px 0;
  margin-top: 0;
  background-color: var(--color-background);
}`);

css = css.replace(/\.tt-recommendations \.ayus-container\s*\{[^}]*\}/g, `.tt-recommendations .ayus-container {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);
