const fs = require('fs');
let main = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', 'utf8');

// The file needs to be split right before <!-- Related Product Recommendations -->
let parts = main.split('<!-- Related Product Recommendations -->');
if (parts.length > 1) {
  let p1 = parts[0];
  let p2 = '<!-- Related Product Recommendations -->' + parts[1];
  
  // Actually, wait, it has one mega schema at the bottom.
  // This requires careful parsing. Let's do it via CLI directly.
}
