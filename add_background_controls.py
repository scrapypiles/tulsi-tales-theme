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

STYLE_TMPL = """{%- style -%}\n  #shopify-section-{{ section.id }} > section,\n  #shopify-section-{{ section.id }} > div,\n  #shopify-section-{{ section.id }} > header,\n  #shopify-section-{{ section.id }} > footer {\n    background-color: {{ section.settings.background_color | default: '__DEFAULT__' }} !important;\n    {% if section.settings.background_image != blank %}\n      background-image: url('{{ section.settings.background_image | image_url: width: 2400 }}') !important;\n      background-size: cover !important;\n      background-position: {{ section.settings.background_position | default: 'center center' }} !important;\n      background-repeat: no-repeat !important;\n    {% endif %}\n  }\n{%- endstyle -%}\n\n"""

SETTINGS_TMPL = """    {\n      \"type\": \"color\",\n      \"id\": \"background_color\",\n      \"label\": \"Background color\",\n      \"default\": \"__DEFAULT__\"\n    },\n    {\n      \"type\": \"image_picker\",\n      \"id\": \"background_image\",\n      \"label\": \"Background image\"\n    },\n    {\n      \"type\": \"select\",\n      \"id\": \"background_position\",\n      \"label\": \"Background image position\",\n      \"options\": [\n        { \"value\": \"center center\", \"label\": \"Center\" },\n        { \"value\": \"center top\", \"label\": \"Top\" },\n        { \"value\": \"center bottom\", \"label\": \"Bottom\" },\n        { \"value\": \"left center\", \"label\": \"Left\" },\n        { \"value\": \"right center\", \"label\": \"Right\" }\n      ],\n      \"default\": \"center center\"\n    },\n"""

for name, default in DEFAULTS.items():
    path = ROOT / name
    text = path.read_text()

    if '"id": "background_color"' not in text:
        marker = '    {\n      "type": "range",\n      "id": "padding_bottom",\n'
        start = text.find(marker)
        if start == -1:
            raise SystemExit(f'padding_bottom marker not found in {name}')
        end = text.find('    },\n', start)
        end += len('    },\n')
        insert = SETTINGS_TMPL.replace('__DEFAULT__', default)
        text = text[:end] + insert + text[end:]

    if '#shopify-section-{{ section.id }} > section' not in text:
        prefix = '{% if section.settings.show_section %}\n\n'
        if prefix in text:
            text = text.replace(prefix, prefix + STYLE_TMPL.replace('__DEFAULT__', default), 1)
        else:
            text = STYLE_TMPL.replace('__DEFAULT__', default) + text

    path.write_text(text)
    print('Updated', name)
