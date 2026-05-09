const fs = require('fs');

let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// Title margin bottom
css = css.replace(/\.ayus-product-title\s*{[^}]*}/g, (match) => {
    if (match.includes('font-size: 36px')) {
        return match.replace(/margin-bottom:\s*24px;/, 'margin-bottom: 5px;');
    }
    return match;
});

// Subtitle italics, bold, margin-top
css = css.replace(/\.ayus-product-subtitle\s*{[^}]*}/g, (match) => {
    if (match.includes('font-size: 16px')) {
        let newMatch = match.replace(/margin-top:\s*10px;/, 'margin-top: 0px;');
        newMatch = newMatch.replace('}', '  font-style: italic;\n  font-weight: 600;\n}');
        return newMatch;
    }
    return match;
});

// Meta grid background
css = css.replace(/\.tt-meta-grid\s*{[^}]*}/g, (match) => {
    if (match.includes('grid-template-columns: 1fr 1fr')) {
        let newMatch = match.replace(/background:\s*#[A-Fa-f0-9]+;/, 'background: var(--color-background);');
        newMatch = newMatch.replace(/border:\s*[^;]+;/, 'border: none;');
        return newMatch;
    }
    return match;
});

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);
