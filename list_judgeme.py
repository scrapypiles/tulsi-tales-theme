import urllib.request, json, os, urllib.parse

SHOP = '5iib0q-9y.myshopify.com'
with open('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'r') as f:
    TOKEN = f.read().strip()
LIVE_THEME = '144179364012'
DRAFT_THEME = '182982246700'

def list_assets(theme_id):
    req = urllib.request.Request(f'https://{SHOP}/admin/api/2024-01/themes/{theme_id}/assets.json', headers={'X-Shopify-Access-Token': TOKEN})
    try:
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode('utf-8'))
            assets = data.get('assets', [])
            for a in assets:
                if 'judge' in a['key'].lower():
                    print(a['key'])
    except Exception as e:
        print(f"Error: {e}")

print("Live Theme Judgeme Assets:")
list_assets(LIVE_THEME)
print("\nDraft Theme Judgeme Assets:")
list_assets(DRAFT_THEME)