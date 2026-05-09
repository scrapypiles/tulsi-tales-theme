from pathlib import Path

ROOT = Path('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme')
DEFAULTS = {
    'ayus-404.liquid': (60, 60),
    'ayus-collection.liquid': (0, 60),
    'ayus-contact.liquid': (80, 80),
    'ayus-featured-collection.liquid': (80, 50),
    'ayus-footer.liquid': (100, 40),
    'ayus-header.liquid': (15, 15),
    'ayus-hero.liquid': (100, 100),
    'ayus-instagram.liquid': (90, 80),
    'ayus-philosophy.liquid': (80, 80),
    'ayus-policy-content.liquid': (80, 80),
    'ayus-policy.liquid': (100, 100),
    'ayus-product-main.liquid': (0, 60),
    'ayus-search.liquid': (0, 0),
    'ayus-shop-by.liquid': (80, 80),
    'ayus-story-cta.liquid': (100, 100),
    'ayus-story-faq.liquid': (100, 100),
    'ayus-story-hero.liquid': (0, 0),
    'ayus-story-quote.liquid': (100, 100),
    'ayus-story-split.liquid': (0, 0),
    'ayus-story-text.liquid': (100, 100),
    'ayus-story-values.liquid': (100, 100),
}

SETTINGS_BLOCK = '''    {
      "type": "checkbox",
      "id": "show_section",
      "label": "Show section",
      "default": true
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 240,
      "step": 1,
      "unit": "px",
      "label": "Padding top",
      "default": __TOP__
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 240,
      "step": 1,
      "unit": "px",
      "label": "Padding bottom",
      "default": __BOTTOM__
    },
'''

INSTAGRAM_PADDING = '''    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 240,
      "step": 1,
      "unit": "px",
      "label": "Padding top",
      "default": __TOP__
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 240,
      "step": 1,
      "unit": "px",
      "label": "Padding bottom",
      "default": __BOTTOM__
    },
'''

for name, (top, bottom) in DEFAULTS.items():
    path = ROOT / name
    text = path.read_text()
    body, schema = text.split('{% schema %}', 1)

    while '{% if section.settings.show_section %}\n{% if section.settings.show_section %}\n' in body:
        body = body.replace('{% if section.settings.show_section %}\n{% if section.settings.show_section %}\n', '{% if section.settings.show_section %}\n')
    while '\n{% endif %}\n\n{% endif %}\n' in body:
        body = body.replace('\n{% endif %}\n\n{% endif %}\n', '\n{% endif %}\n')
    while '\n{% endif %}\n\n{% endif %}' in body:
        body = body.replace('\n{% endif %}\n\n{% endif %}', '\n{% endif %}')

    stripped = body.strip()
    if not stripped.startswith('{% if section.settings.show_section %}'):
        body = '{% if section.settings.show_section %}\n' + body.strip() + '\n\n{% endif %}\n\n'
    else:
        if not stripped.endswith('{% endif %}'):
            body = body.rstrip() + '\n{% endif %}\n\n'
        else:
            body = body.rstrip() + '\n\n'

    if name == 'ayus-instagram.liquid':
        if '"id": "padding_top"' not in schema:
            marker = '    {\n      "type": "checkbox",\n      "id": "show_section",\n      "label": "Show Instagram section",\n      "default": false\n    },\n'
            insert = marker + INSTAGRAM_PADDING.replace('__TOP__', str(top)).replace('__BOTTOM__', str(bottom))
            schema = schema.replace(marker, insert, 1)
    else:
        if '"id": "show_section"' not in schema:
            marker = '  "settings": [\n'
            insert = marker + SETTINGS_BLOCK.replace('__TOP__', str(top)).replace('__BOTTOM__', str(bottom))
            schema = schema.replace(marker, insert, 1)

    path.write_text(body + '{% schema %}' + schema)
    print(f'Normalized {name}')
