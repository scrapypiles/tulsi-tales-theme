import urllib.request, json, os, urllib.parse

SHOP = '5iib0q-9y.myshopify.com'
with open('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'r') as f:
    TOKEN = f.read().strip()

req = urllib.request.Request(f'https://{SHOP}/admin/api/2024-01/themes.json', headers={'X-Shopify-Access-Token': TOKEN})
try:
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode('utf-8'))
        themes = data.get('themes', [])
        for t in themes:
            print(f"Theme: {t['name']} ({t['id']}) - Role: {t['role']}")
            # List assets for this theme
            req2 = urllib.request.Request(f'https://{SHOP}/admin/api/2024-01/themes/{t["id"]}/assets.json', headers={'X-Shopify-Access-Token': TOKEN})
            with urllib.request.urlopen(req2) as res2:
                data2 = json.loads(res2.read().decode('utf-8'))
                assets = data2.get('assets', [])
                for a in assets:
                    if 'judge' in a['key'].lower():
                        print(f"  Found: {a['key']}")
except Exception as e:
    print(f"Error: {e}")