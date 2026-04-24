const fs = require('fs');

const path = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid';
let content = fs.readFileSync(path, 'utf8');

const oldBlock = `      <div class="tt-main-image-container">
        {%- if product.media.size > 0 -%}
          <div class="tt-main-image-zoom">
            <img id="tt-primary-image" src="{{ product.featured_media | img_url: '1200x' }}" alt="{{ product.title | escape }}" loading="lazy">
          </div>
        {%- else -%}
          {{ 'product-1' | placeholder_svg_tag: 'ayus-placeholder-svg' }}
        {%- endif -%}
      </div>
    </div>

      <!-- Moved Description -->
      <div class="ayus-product-description rte" style="margin-top: 40px;">
        {{ product.description }}
      </div>
    </div>`;

const newBlock = `      <div class="tt-main-image-container">
        {%- if product.media.size > 0 -%}
          <div class="tt-main-image-zoom">
            <img id="tt-primary-image" src="{{ product.featured_media | img_url: '1200x' }}" alt="{{ product.title | escape }}" loading="lazy">
          </div>
        {%- else -%}
          {{ 'product-1' | placeholder_svg_tag: 'ayus-placeholder-svg' }}
        {%- endif -%}
        
        <!-- Moved Description -->
        <div class="ayus-product-description rte" style="margin-top: 40px;">
          {{ product.description }}
        </div>
      </div>
    </div>
    </div>`;

if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Successfully moved description.");
} else {
    console.log("Could not find the block to replace.");
}
