const fs = require('fs');

const files = [
  'ayus-story-cta.liquid',
  'ayus-story-hero.liquid',
  'ayus-story-quote.liquid',
  'ayus-story-split.liquid',
  'ayus-story-text.liquid',
  'ayus-story-values.liquid'
];

files.forEach(file => {
  let content = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/' + file, 'utf8');
  
  // remove the style block injected
  content = content.replace(/<style>[\s\S]*?<\/style>\s*/, '');
  
  // remove the custom_image block
  const customImgRegex = /\{% if section\.settings\.custom_image %\}.*?\{% endif %\}/s;
  content = content.replace(customImgRegex, '');

  fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/' + file, content);
  console.log('Cleaned ' + file);
});
