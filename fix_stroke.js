const fs = require('fs');

const path = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css';
let content = fs.readFileSync(path, 'utf8');

const target = `.tt-qty-box {
  border-bottom: 1px solid var(--color-border) !important;
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
}`;

const replacement = `.tt-qty-box {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border) !important;
}`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Reordered CSS");
} else {
    console.log("Could not find CSS block.");
}
