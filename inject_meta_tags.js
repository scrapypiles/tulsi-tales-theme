const fs = require('fs');
let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/theme.liquid', 'utf8');

// Replace the existing canonical and title block
const existingMetaBlock = /<link rel="canonical" href="{{ canonical_url }}">\s*<title>{{ page_title }} - Tulsi Tales<\/title>/;

const newMetaBlock = `<link rel="canonical" href="{% if template == 'index' %}https://www.tulsitales.com{% else %}{{ canonical_url }}{% endif %}">
    <title>{% if template == 'index' %}Tulsi Tales | Authentic Ayurvedic Products from India{% else %}{{ page_title }} - Tulsi Tales{% endif %}</title>

    <meta property="og:type" content="website">
    <meta property="og:title" content="{% if template == 'index' %}Tulsi Tales | Authentic Ayurvedic Products from India{% else %}{{ page_title }}{% endif %}">
    <meta property="og:description" content="{% if page_description %}{{ page_description | escape }}{% else %}A curated Ayurvedic marketplace sourcing authentic herbs, supplements, oils, and wellness products from India. Delivered across India and worldwide.{% endif %}">
    <meta property="og:url" content="{{ canonical_url }}">
    <meta name="description" content="{% if page_description %}{{ page_description | escape }}{% else %}A curated Ayurvedic marketplace sourcing authentic herbs, supplements, oils, and wellness products from India. Delivered across India and worldwide.{% endif %}">
`;

liquid = liquid.replace(existingMetaBlock, newMetaBlock);

// Inject the og:image:alt text right after og:image:height
liquid = liquid.replace(/<meta property="og:image:height" content="630">/, 
    '<meta property="og:image:height" content="630">\n    <meta property="og:image:alt" content="Tulsi Tales — curated Ayurvedic products from India">');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/theme.liquid', liquid);
