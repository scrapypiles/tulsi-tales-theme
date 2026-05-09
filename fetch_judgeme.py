import urllib.request, json, os, urllib.parse

SHOP = '5iib0q-9y.myshopify.com'
with open('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'r') as f:
    TOKEN = f.read().strip()
LIVE_THEME = '144179364012'
DRAFT_THEME = '182982246700'

def fetch_asset(key, theme_id):
    req = urllib.request.Request(f'https://{SHOP}/admin/api/2024-01/themes/{theme_id}/assets.json?asset[key]={urllib.parse.quote(key)}', headers={'X-Shopify-Access-Token': TOKEN})
    try:
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode('utf-8'))
            return data.get('asset', {}).get('value')
    except Exception as e:
        print(f"Error fetching {key}: {e}")
        return None

def put_asset(key, value, theme_id):
    data = json.dumps({"asset": {"key": key, "value": value}}).encode('utf-8')
    req = urllib.request.Request(f'https://{SHOP}/admin/api/2024-01/themes/{theme_id}/assets.json', data=data, headers={'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json'})
    req.get_method = lambda: 'PUT'
    try:
        with urllib.request.urlopen(req) as res:
            print(f"Successfully uploaded {key} to {theme_id}")
    except Exception as e:
        print(f"Error uploading {key}: {e}")

snippet = fetch_asset('snippets/judgeme_widgets.liquid', LIVE_THEME)
if snippet:
    print("Found judgeme_widgets.liquid!")
    put_asset('snippets/judgeme_widgets.liquid', snippet, DRAFT_THEME)
else:
    print("Could not find judgeme_widgets.liquid")