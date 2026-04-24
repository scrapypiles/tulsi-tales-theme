const fs = require('fs');

const path = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css';
let content = fs.readFileSync(path, 'utf8');

const target = `.tt-qty-box {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border) !important;
}`;

// We want NO stroke underneath in the bag drawer
// In bag drawer, it's .tt-cart-qty

const replacement = `.tt-qty-box {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
}

.tt-qty-box.tt-cart-qty {
  border-bottom: none !important;
  border: 1px solid var(--color-border);
}`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Fixed CSS");
} else {
    console.log("Could not find CSS block.");
}
