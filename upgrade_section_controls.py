from pathlib import Path

ROOT = Path('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme')

CONFIG = {
    'ayus-404.liquid': {
        'top': 60, 'bottom': 60,
        'replace': [
            ('<section class="ayus-404-section" style="padding: 60px 20px; background-color: #ffffff; text-align: center; min-height: 40vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">',
             '<section class="ayus-404-section" style="padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px; background-color: #ffffff; text-align: center; min-height: 40vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">')
        ]
    },
    'ayus-collection.liquid': {
        'top': 0, 'bottom': 60,
        'replace': [
            ('<section class="ayus-collection-section" data-section-id="{{ section.id }}" style="background-color: #F9F6F0; padding-bottom: 60px;">',
             '<section class="ayus-collection-section" data-section-id="{{ section.id }}" style="background-color: #F9F6F0; padding-top: {{ section.settings.padding_top }}px; padding-bottom: {{ section.settings.padding_bottom }}px;">')
        ]
    },
    'ayus-contact.liquid': {
        'top': 80, 'bottom': 80,
        'replace': [
            ('  .ayus-contact-section {\n    padding: 80px 20px;\n    background-color: #ffffff;\n  }',
             '  .ayus-contact-section {\n    padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px;\n    background-color: #ffffff;\n  }')
        ]
    },
    'ayus-featured-collection.liquid': {
        'top': 80, 'bottom': 50,
        'replace': [
            ('<section class="ayus-featured-collection">',
             '<section class="ayus-featured-collection" style="padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px;">')
        ]
    },
    'ayus-footer.liquid': {
        'top': 100, 'bottom': 40,
        'replace': [
            ('<footer class="site-footer" style="padding: 100px 20px 40px; background-color: var(--color-background); color: var(--color-text); font-family: var(--font-body); border-top: 1px solid var(--color-border);">',
             '<footer class="site-footer" style="padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px; background-color: var(--color-background); color: var(--color-text); font-family: var(--font-body); border-top: 1px solid var(--color-border);">')
        ]
    },
    'ayus-header.liquid': {
        'top': 15, 'bottom': 15,
        'replace': [
            ('<header class="ayus-header">',
             '<header class="ayus-header" style="padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px;">')
        ]
    },
    'ayus-hero.liquid': {
        'top': 100, 'bottom': 100,
        'replace': [
            ("<section class=\"ayus-hero\" style=\"{% if section.settings.image %}background-image: url('{{ section.settings.image | img_url: 'master' }}');{% endif %} display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; text-align: center !important; padding: 100px 20px;\">",
             "<section class=\"ayus-hero\" style=\"{% if section.settings.image %}background-image: url('{{ section.settings.image | img_url: 'master' }}');{% endif %} display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; text-align: center !important; padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px;\">")
        ]
    },
    'ayus-instagram.liquid': {
        'top': 90, 'bottom': 80,
        'only_padding': True,
        'replace': [
            ('  .ayus-instagram-section {\n    padding: 90px 20px 80px;\n    background: #ffffff;\n    border-top: 1px solid var(--color-border);\n  }',
             '  .ayus-instagram-section {\n    padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px;\n    background: #ffffff;\n    border-top: 1px solid var(--color-border);\n  }')
        ]
    },
    'ayus-philosophy.liquid': {
        'top': 80, 'bottom': 80,
        'replace': [
            ('<section class="ayus-philosophy" style="background-color: #ffffff; padding: 80px 20px; text-align: center; border-top: 1px solid var(--color-border);">',
             '<section class="ayus-philosophy" style="background-color: #ffffff; padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px; text-align: center; border-top: 1px solid var(--color-border);">')
        ]
    },
    'ayus-policy-content.liquid': {
        'top': 80, 'bottom': 80,
        'replace': [
            ('<section class="ayus-policy-page" style="background-color: #fff; padding: 80px 20px;">',
             '<section class="ayus-policy-page" style="background-color: #fff; padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px;">')
        ]
    },
    'ayus-policy.liquid': {
        'top': 100, 'bottom': 100,
        'replace': [
            ('<section class="ayus-policy-page" style="padding: 100px 20px; background-color: var(--color-background);">',
             '<section class="ayus-policy-page" style="padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px; background-color: var(--color-background);">')
        ]
    },
    'ayus-product-main.liquid': {
        'top': 0, 'bottom': 60,
        'replace': [
            ('  <div class="ayus-product-container" style="padding-bottom: 60px;">',
             '  <div class="ayus-product-container" style="padding-top: {{ section.settings.padding_top }}px; padding-bottom: {{ section.settings.padding_bottom }}px;">')
        ]
    },
    'ayus-search.liquid': {
        'top': 0, 'bottom': 0,
        'replace': [
            ('<section class="ayus-search-section" style="padding: 0px 20px;">',
             '<section class="ayus-search-section" style="padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px;">')
        ]
    },
    'ayus-shop-by.liquid': {
        'top': 80, 'bottom': 80,
        'replace': [
            ('<section class="tt-shop-by-section">',
             '<section class="tt-shop-by-section" style="padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px;">')
        ]
    },
    'ayus-story-cta.liquid': {
        'top': 100, 'bottom': 100,
        'replace': [
            ('<section class="ayus-story-cta" style="padding: 100px 20px; text-align: center; background-color: #ffffff; border-bottom: 1px solid var(--color-border);">',
             '<section class="ayus-story-cta" style="padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px; text-align: center; background-color: #ffffff; border-bottom: 1px solid var(--color-border);">')
        ]
    },
    'ayus-story-faq.liquid': {
        'top': 100, 'bottom': 100,
        'replace': [
            ('<section class="ayus-story-faq" style="padding: 100px 20px; background-color: #FAF8F5; border-bottom: 1px solid var(--color-border);">',
             '<section class="ayus-story-faq" style="padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px; background-color: #FAF8F5; border-bottom: 1px solid var(--color-border);">')
        ]
    },
    'ayus-story-hero.liquid': {
        'top': 0, 'bottom': 0,
        'replace': [
            ('<section class="ayus-story-hero" style="background-color: var(--color-background); border-bottom: 1px solid var(--color-border);">',
             '<section class="ayus-story-hero" style="background-color: var(--color-background); border-bottom: 1px solid var(--color-border); padding-top: {{ section.settings.padding_top }}px; padding-bottom: {{ section.settings.padding_bottom }}px;">')
        ]
    },
    'ayus-story-quote.liquid': {
        'top': 100, 'bottom': 100,
        'replace': [
            ('<section class="ayus-story-quote" style="padding: 100px 20px; text-align: center; background-color: #ffffff; border-bottom: 1px solid var(--color-border);">',
             '<section class="ayus-story-quote" style="padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px; text-align: center; background-color: #ffffff; border-bottom: 1px solid var(--color-border);">')
        ]
    },
    'ayus-story-split.liquid': {
        'top': 0, 'bottom': 0,
        'replace': [
            ('<section class="ayus-story-split-section" style="background-color: #FAF8F5; border-bottom: 1px solid var(--color-border);">',
             '<section class="ayus-story-split-section" style="background-color: #FAF8F5; border-bottom: 1px solid var(--color-border); padding-top: {{ section.settings.padding_top }}px; padding-bottom: {{ section.settings.padding_bottom }}px;">')
        ]
    },
    'ayus-story-text.liquid': {
        'top': 100, 'bottom': 100,
        'replace': [
            ('<section class="ayus-story-text" style="padding: 100px 20px; text-align: center; background-color: #ffffff; border-bottom: 1px solid var(--color-border);">',
             '<section class="ayus-story-text" style="padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px; text-align: center; background-color: #ffffff; border-bottom: 1px solid var(--color-border);">')
        ]
    },
    'ayus-story-values.liquid': {
        'top': 100, 'bottom': 100,
        'replace': [
            ('<section class="ayus-story-values" style="padding: 100px 20px; background-color: #ffffff; border-bottom: 1px solid var(--color-border);">',
             '<section class="ayus-story-values" style="padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px; background-color: #ffffff; border-bottom: 1px solid var(--color-border);">')
        ]
    }
}

SETTINGS_TEMPLATE = '''    {
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

PADDING_ONLY_TEMPLATE = '''    {
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

for name, cfg in CONFIG.items():
    path = ROOT / name
    text = path.read_text()
    original = text

    for old, new in cfg['replace']:
        if old in text:
            text = text.replace(old, new, 1)
        elif new in text:
            pass
        else:
            raise SystemExit(f'Missing expected block in {name}: {old[:80]}')

    if not cfg.get('only_padding') and '"id": "show_section"' not in text:
        body, schema = text.split('{% schema %}', 1)
        body = body.rstrip() + '\n\n'
        body = '{% if section.settings.show_section %}\n' + body + '{% endif %}\n\n'
        text = body + '{% schema %}' + schema

    if name == 'ayus-instagram.liquid':
        marker = '    {\n      "type": "checkbox",\n      "id": "show_section",\n      "label": "Show Instagram section",\n      "default": false\n    },\n'
        insert = marker + PADDING_ONLY_TEMPLATE.replace('__TOP__', str(cfg['top'])).replace('__BOTTOM__', str(cfg['bottom']))
        if '"id": "padding_top"' not in text:
            if marker not in text:
                raise SystemExit(f'Instagram marker missing in {name}')
            text = text.replace(marker, insert, 1)
    else:
        if '"id": "show_section"' not in text or '"id": "padding_top"' in original:
            pass
        else:
            marker = '  "settings": [\n'
            insert = marker + SETTINGS_TEMPLATE.replace('__TOP__', str(cfg['top'])).replace('__BOTTOM__', str(cfg['bottom']))
            if marker not in text:
                raise SystemExit(f'Settings marker missing in {name}')
            text = text.replace(marker, insert, 1)

    if text != original:
        path.write_text(text)
        print(f'Updated {name}')
    else:
        print(f'Already updated {name}')
