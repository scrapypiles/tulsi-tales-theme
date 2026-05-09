from pathlib import Path
root = Path('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme')
for path in root.glob('ayus-*.liquid'):
    text = path.read_text()
    text = text.replace('padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px;', 'padding: {{ section.settings.padding_top }}px 20px {{ section.settings.padding_bottom }}px !important;')
    text = text.replace('padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px;', 'padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px !important;')
    text = text.replace('padding-top: {{ section.settings.padding_top }}px; padding-bottom: {{ section.settings.padding_bottom }}px;', 'padding-top: {{ section.settings.padding_top }}px !important; padding-bottom: {{ section.settings.padding_bottom }}px !important;')
    path.write_text(text)
    print('Updated', path.name)
