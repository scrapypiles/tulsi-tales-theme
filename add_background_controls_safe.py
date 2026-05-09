from pathlib import Path
ROOT = Path('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme')
DEFAULTS = {
    'ayus-404.liquid': '#ffffff',
    'ayus-collection.liquid': '#f9f6f0',
    'ayus-contact.liquid': '#ffffff',
    'ayus-featured-collection.liquid': '#faf8f5',
    'ayus-footer.liquid': '#faf8f5',
    'ayus-header.liquid': '#faf8f5',
    'ayus-hero.liquid': '#faf8f5',
    'ayus-instagram.liquid': '#ffffff',
    'ayus-philosophy.liquid': '#ffffff',
    'ayus-policy-content.liquid': '#ffffff',
    'ayus-policy.liquid': '#faf8f5',
    'ayus-product-main.liquid': '#ffffff',
    'ayus-search.liquid': '#faf8f5',
    'ayus-shop-by.liquid': '#ffffff',
    'ayus-story-cta.liquid': '#ffffff',
    'ayus-story-faq.liquid': '#faf8f5',
    'ayus-story-hero.liquid': '#faf8f5',
    'ayus-story-quote.liquid': '#ffffff',
    'ayus-story-split.liquid': '#faf8f5',
    'ayus-story-text.liquid': '#ffffff',
    'ayus-story-values.liquid': '#ffffff',
}

STYLE_TMPL = """{%- style -%}
  #shopify-section-{{ section.id }} > section,
  #shopify-section-{{ section.id }} > div,
  #shopify-section-{{ section.id }} > header,
  #shopify-section-{{ section.id }} > footer {
    background-color: {{ section.settings.background_color | default: '__DEFAULT__' }} !important;
    {% if section.settings.background_image != blank %}
      background-image: url('{{ section.settings.background_image | image_url: width: 2400 }}') !important;
      background-size: cover !important;
      background-position: {{ section.settings.background_position | default: 'center center' }} !important;
      background-repeat: no-repeat !important;
    {% endif %}
  }
{%- endstyle -%}

"""

SETTINGS_TMPL = """    {
      "type": "color",
      "id": "background_color",
      "label": "Background color",
      "default": "__DEFAULT__"
    },
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background image"
    },
    {
      "type": "select",
      "id": "background_position",
      "label": "Background image position",
      "options": [
        { "value": "center center", "label": "Center" },
        { "value": "center top", "label": "Top" },
        { "value": "center bottom", "label": "Bottom" },
        { "value": "left center", "label": "Left" },
        { "value": "right center", "label": "Right" }
      ],
      "default": "center center"
    },
"""

for name, default in DEFAULTS.items():
    path = ROOT / name
    text = path.read_text()
    body, schema = text.split('{% schema %}', 1)

    if '#shopify-section-{{ section.id }} > section' not in body:
        insert = STYLE_TMPL.replace('__DEFAULT__', default)
        marker = '{% if section.settings.show_section %}\n'
        if marker in body:
            body = body.replace(marker, insert + marker, 1)
        else:
            body = insert + body

    if '"id": "background_color"' not in schema:
        settings_block = SETTINGS_TMPL.replace('__DEFAULT__', default)
        marker = '      "id": "padding_bottom"'
        idx = schema.find(marker)
        if idx == -1:
            raise SystemExit(f'Could not find padding_bottom in {name}')
        end = schema.find('    }', idx)
        if end == -1:
            raise SystemExit(f'Could not find end of padding_bottom block in {name}')
        end += len('    }')
        schema = schema[:end] + ',\n' + settings_block.rstrip('\n') + '\n' + schema[end:]

    path.write_text(body + '{% schema %}' + schema)
    print('Updated', name)
