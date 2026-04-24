const fs = require('fs');

const oldContent = `<section class="tt-shop-by-section" style="padding: 80px 20px; background-color: #faf8f5;">
  <div class="ayus-container" style="max-width: 1200px; margin: 0 auto; text-align: center;">
    <h2 style="font-family: var(--font-heading); font-size: 36px; margin-top: 0; margin-bottom: 50px; color: var(--color-text);">{{ section.settings.heading | escape }}</h2>
    <div class="tt-shop-by-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
      {% for block in section.blocks %}
        <a href="{{ block.settings.link }}" class="tt-shop-by-card" {{ block.shopify_attributes }} style="display: block; padding: 40px 20px; background: #fff; border: 1px solid var(--color-border); text-align: center; text-decoration: none; color: var(--color-text); transition: all 0.3s ease;">
          <h3 style="margin-top: 0; margin-bottom: 10px; font-family: var(--font-body); font-size: 18px; text-transform: uppercase; letter-spacing: 0.1em;">{{ block.settings.title | escape }}</h3>
          <p style="margin-bottom: 0; font-family: var(--font-body); font-size: 14px; color: #555;">{{ block.settings.description | escape }}</p>
        </a>
      {% endfor %}
    </div>
  </div>
</section>

<style>
.tt-shop-by-card:hover {
  background-color: var(--color-accent) !important;
  color: #fff !important;
}
.tt-shop-by-card:hover h3, .tt-shop-by-card:hover p {
  color: #fff !important;
}
</style>

{% schema %}
{
  "name": "Ayus Shop By Categories",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Shop By"
    }
  ],
  "blocks": [
    {
      "type": "category",
      "name": "Category Card",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Category"
        },
        {
          "type": "text",
          "id": "description",
          "label": "Description",
          "default": "Short description"
        },
        {
          "type": "url",
          "id": "link",
          "label": "Link"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Ayus Shop By Categories",
      "blocks": [
        { "type": "category" },
        { "type": "category" },
        { "type": "category" }
      ]
    }
  ]
}
{% endschema %}
`;

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-shop-by.liquid', oldContent, 'utf8');
console.log('Reverted ayus-shop-by.liquid locally');
