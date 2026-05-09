const fs = require('fs');

let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

// 1 & 3: Short desc bolder, italics, reduce space above, reduce space under title
css = css.replace(/\.ayus-product-title {\n  font-size: 36px;\n  line-height: 1\.2;\n  margin-bottom: 24px;\n}/, 
  `.ayus-product-title {\n  font-size: 36px;\n  line-height: 1.2;\n  margin-bottom: 5px;\n}`);

css = css.replace(/\.ayus-product-subtitle {\n  font-family: var\(--font-body\);\n  font-size: 16px;\n  color: #555;\n  margin-top: 10px;\n  margin-bottom: 25px;\n  line-height: 1\.6;\n}/, 
  `.ayus-product-subtitle {\n  font-family: var(--font-body);\n  font-size: 16px;\n  color: #555;\n  margin-top: 0px;\n  margin-bottom: 25px;\n  line-height: 1.6;\n  font-style: italic;\n  font-weight: 600;\n}`);

// 2: Box below add to cart (meta grid) background color
css = css.replace(/\.tt-meta-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 15px;\n  margin-bottom: 40px;\n  padding: 20px;\n  background: #fff;\n  border: 1px solid var\(--color-border\);\n}/, 
  `.tt-meta-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 15px;\n  margin-bottom: 40px;\n  padding: 20px;\n  background: var(--color-background);\n  border: none;\n}`);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);
