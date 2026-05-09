const fs = require('fs');

// 1. Add loading="lazy" to all <img tags missing it
const liquidFiles = fs.readdirSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme').filter(f => f.endsWith('.liquid'));

liquidFiles.forEach(file => {
    let path = `/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/${file}`;
    let content = fs.readFileSync(path, 'utf8');
    let original = content;

    // Replace <img ... > not containing loading=
    content = content.replace(/<img\s+(?![^>]*loading=)[^>]+>/gi, match => {
        // Don't lazy load the main logo usually, but Shopify handles header logo fine. Let's just do it except if it's the header logo or hero images.
        if (match.includes('logo.png') || match.includes('favicon.png') || file === 'ayus-header.liquid') {
            return match; // Skip
        }
        return match.replace(/\/?>$/, ' loading="lazy">');
    });

    // 2. Add aria-label and role="img" to background images in story-split
    if (file === 'ayus-story-split.liquid') {
        content = content.replace(/<div class="tt-split-img"/, '<div class="tt-split-img" role="img" aria-label="{{ section.settings.heading | escape }}"');
    }

    if (content !== original) {
        fs.writeFileSync(path, content);
        console.log(`Updated ${file} for SEO & Lazy Loading`);
    }
});
