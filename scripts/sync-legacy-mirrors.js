const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const DEFAULT_MIRRORS = [
  'ayus-cart-drawer.liquid',
  'ayus-collection.liquid',
  'ayus-contact.liquid',
  'ayus-featured-collection.liquid',
  'ayus-footer.liquid',
  'ayus-hero.liquid',
  'ayus-policy-content.liquid',
  'ayus-product-main.liquid',
  'ayus-search.liquid',
  'ayus-story-hero.liquid',
  'ayus-story-quote.liquid',
  'ayus-story-split.liquid',
  'collection.json',
  'product.json'
];

function syncFile(relativePath) {
  const canonicalPath = relativePath.endsWith('.json')
    ? path.join(ROOT, 'templates', relativePath)
    : path.join(ROOT, 'sections', relativePath);
  const legacyPath = path.join(ROOT, relativePath);

  if (!fs.existsSync(canonicalPath)) {
    throw new Error(`Missing canonical file: ${canonicalPath}`);
  }

  if (!fs.existsSync(legacyPath)) {
    console.log(`Skipping missing legacy mirror: ${relativePath}`);
    return;
  }

  fs.copyFileSync(canonicalPath, legacyPath);
  console.log(`Synced ${relativePath}`);
}

function main() {
  const requested = process.argv.slice(2);
  const targets = requested.length ? requested : DEFAULT_MIRRORS;
  for (const target of targets) {
    syncFile(target);
  }
}

main();
