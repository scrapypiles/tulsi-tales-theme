const fs = require('fs');

const path = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-header.liquid';
let content = fs.readFileSync(path, 'utf8');

const target = `"settings": [
    {
      "type": "link_list",
      "id": "menu",
      "label": "Main Menu",
      "default": "main-menu"
    },`;

const replacement = `"settings": [
    {
      "type": "checkbox",
      "id": "show_announcement",
      "label": "Show Announcement",
      "default": true
    },
    {
      "type": "link_list",
      "id": "menu",
      "label": "Main Menu",
      "default": "main-menu"
    },`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Added show_announcement to schema.");
} else {
    // maybe check without the space
    content = content.replace(/{% if section.settings.show_announcement %}/, '{% if section.settings.announcement_text != blank %}');
    fs.writeFileSync(path, content, 'utf8');
    console.log("Changed condition to text check instead.");
}
