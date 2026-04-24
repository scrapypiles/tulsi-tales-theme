const fs = require('fs');
let collectionHTML = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid', 'utf8');

// 1. Add IDs to details
collectionHTML = collectionHTML.replace('<!-- CATEGORY FILTER -->\n        <details class="tt-filter-group"', '<!-- CATEGORY FILTER -->\n        <details id="category" class="tt-filter-group"');
collectionHTML = collectionHTML.replace('<!-- CONCERN FILTER -->\n        <details class="tt-filter-group"', '<!-- CONCERN FILTER -->\n        <details id="concern" class="tt-filter-group"');
collectionHTML = collectionHTML.replace('<!-- BRAND FILTER -->\n        <details class="tt-filter-group"', '<!-- BRAND FILTER -->\n        <details id="brand" class="tt-filter-group"');

// 2. Add script to check hash and open details
const scriptToAdd = `
          // Open details if hash is present
          if (window.location.hash) {
            const targetDetails = document.querySelector('details' + window.location.hash);
            if (targetDetails) {
              targetDetails.open = true;
              if (window.innerWidth < 1024) {
                 // on mobile, we might also want to open the filter drawer itself
                 const drawer = document.getElementById('tt-sidebar-drawer');
                 if(drawer) drawer.classList.add('open');
              }
            }
          }
`;

collectionHTML = collectionHTML.replace('document.addEventListener("DOMContentLoaded", function() {', 'document.addEventListener("DOMContentLoaded", function() {' + scriptToAdd);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid', collectionHTML, 'utf8');
console.log('ayus-collection.liquid updated locally.');
