const fs = require('fs');

let liquidFile = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid';
let liquid = fs.readFileSync(liquidFile, 'utf8');

const preloadScript = `
        <script>
          // Preload full-res images in the background so hover is completely instant
          {% for media in product.media %}
            (new Image()).src = '{{ media | img_url: "1200x" }}';
          {% endfor %}
        </script>
`;

liquid = liquid.replace(/(<\/div>\s*\{% endif %\})/, `${preloadScript}\n      $1`);

fs.writeFileSync(liquidFile, liquid);
