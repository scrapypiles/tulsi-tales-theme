const fs = require('fs');

const configs = [
    { file: 'ayus-story-quote.liquid', color: '#FAF8F5' },
    { file: 'ayus-story-split.liquid', color: '#FAF8F5' },
    { file: 'ayus-story-text.liquid', color: '#ffffff' },
    { file: 'ayus-story-values.liquid', color: '#ffffff' },
    { file: 'ayus-story-faq.liquid', color: '#FAF8F5' },
    { file: 'ayus-story-cta.liquid', color: '#ffffff' }
];

configs.forEach(conf => {
    let path = `/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/${conf.file}`;
    let content = fs.readFileSync(path, 'utf8');
    
    // Clean up the <section> tag entirely and reconstruct the style
    content = content.replace(/<section\s+class="([^"]+)"\s+style="[^"]*">/, (match, className) => {
        let styleStr = "";
        if (className === 'ayus-story-split-section') {
             styleStr = `background-color: ${conf.color}; border-bottom: 1px solid var(--color-border);`;
        } else if (className === 'ayus-story-cta') {
             styleStr = `padding: 100px 20px; text-align: center; background-color: ${conf.color}; border-bottom: 1px solid var(--color-border);`;
        } else if (className === 'ayus-story-text') {
             styleStr = `padding: 100px 20px; text-align: center; background-color: ${conf.color}; border-bottom: 1px solid var(--color-border);`;
        } else {
             styleStr = `padding: 100px 20px; background-color: ${conf.color}; border-bottom: 1px solid var(--color-border);`;
        }
        
        // Quote has text-align: center too
        if (className === 'ayus-story-quote') {
            styleStr = `padding: 100px 20px; text-align: center; background-color: ${conf.color}; border-bottom: 1px solid var(--color-border);`;
        }

        return `<section class="${className}" style="${styleStr}">`;
    });

    fs.writeFileSync(path, content);
});
