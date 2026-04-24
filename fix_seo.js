const fs = require('fs');

const path = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/theme.liquid';
let content = fs.readFileSync(path, 'utf8');

const target = `<meta property="og:image" content="{{ 'social-image.jpg' | asset_url }}">
    <meta property="og:image:secure_url" content="{{ 'social-image.jpg' | asset_url }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:image" content="{{ 'social-image.jpg' | asset_url }}">`;

const replacement = `{%- assign social_img = settings.share_image | default: 'social-image.jpg' -%}
    {%- if settings.share_image != blank -%}
      <meta property="og:image" content="{{ settings.share_image | image_url: width: 1200 }}">
      <meta property="og:image:secure_url" content="{{ settings.share_image | image_url: width: 1200 }}">
      <meta name="twitter:image" content="{{ settings.share_image | image_url: width: 1200 }}">
    {%- else -%}
      <meta property="og:image" content="{{ 'social-image.jpg' | asset_url }}">
      <meta property="og:image:secure_url" content="{{ 'social-image.jpg' | asset_url }}">
      <meta name="twitter:image" content="{{ 'social-image.jpg' | asset_url }}">
    {%- endif -%}
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Fixed SEO tags in theme.liquid");
} else {
    console.log("Could not find SEO tags");
}
