const fs = require('fs');

let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/theme.liquid', 'utf8');

// Replace the fallback social-image.jpg reference with the new seo-image.jpg we just uploaded
liquid = liquid.replace(/{%- assign social_img = settings\.share_image \| default: 'social-image\.jpg' -%}/g, 
  "{%- assign social_img = settings.share_image | default: 'seo-image.jpg' -%}");

liquid = liquid.replace(/<meta property="og:image" content="{{ 'social-image\.jpg' \| asset_url }}">/g, 
  '<meta property="og:image" content="{{ \'seo-image.jpg\' | asset_url }}">');

liquid = liquid.replace(/<meta property="og:image:secure_url" content="{{ 'social-image\.jpg' \| asset_url }}">/g, 
  '<meta property="og:image:secure_url" content="{{ \'seo-image.jpg\' | asset_url }}">');

liquid = liquid.replace(/<meta name="twitter:image" content="{{ 'social-image\.jpg' \| asset_url }}">/g, 
  '<meta name="twitter:image" content="{{ \'seo-image.jpg\' | asset_url }}">');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/theme.liquid', liquid);
