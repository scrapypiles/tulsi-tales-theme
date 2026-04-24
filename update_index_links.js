const fs = require('fs');
let indexJSON = JSON.parse(fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/index.json', 'utf8'));

if(indexJSON.sections.shop_by && indexJSON.sections.shop_by.blocks) {
    if(indexJSON.sections.shop_by.blocks.brand) {
        indexJSON.sections.shop_by.blocks.brand.settings.link = "/collections/all#brand";
    }
    if(indexJSON.sections.shop_by.blocks.concern) {
        indexJSON.sections.shop_by.blocks.concern.settings.link = "/collections/all#concern";
    }
    if(indexJSON.sections.shop_by.blocks.category) {
        indexJSON.sections.shop_by.blocks.category.settings.link = "/collections/all#category";
    }
}

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/index.json', JSON.stringify(indexJSON, null, 2), 'utf8');
console.log('index.json links updated.');
