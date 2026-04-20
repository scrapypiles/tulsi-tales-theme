const fs = require('fs');

function stripInline(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the messy inline styles on the carousel wrapper
  content = content.replace(
    /<div class="tt-horizontal-carousel"[^>]+>/g,
    '<div class="tt-horizontal-carousel">'
  );
  
  // Replace inline styles on the carousel card
  content = content.replace(
    /<div class="tt-carousel-card ayus-product-card"[^>]+>/g,
    '<div class="tt-carousel-card ayus-product-card">'
  );
  
  fs.writeFileSync(file, content);
  console.log('Stripped inline styles from', file);
}

stripInline('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid');
stripInline('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-featured-collection.liquid');
