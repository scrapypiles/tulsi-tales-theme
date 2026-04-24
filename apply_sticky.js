const https = require('https');
const fs = require('fs');

const path = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css';
let content = fs.readFileSync(path, 'utf8');

const target = `.ayus-product-info-wrapper {
  flex: 1 1 45%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
}`;

const replacement = `.ayus-product-info-wrapper {
  flex: 1 1 45%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 120px;
  align-self: flex-start;
}`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Applied sticky CSS.");
} else {
    console.log("Could not find CSS block.");
}
