const https = require('https');
const fs = require('fs');
const path = require('path');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;
const ROOT = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme';
const TARGET_PREFIXES = ['layout/', 'templates/', 'sections/', 'assets/', 'config/', 'snippets/'];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function apiGet(apiPath, attempt = 1) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: SHOP,
      path: apiPath,
      method: 'GET',
      headers: { 'X-Shopify-Access-Token': TOKEN }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', async () => {
        if (res.statusCode === 429 && attempt <= 6) {
          const retryAfter = Number(res.headers['retry-after'] || 0);
          const waitMs = Math.max(retryAfter * 1000, attempt * 1500);
          console.log(`Rate limited on ${apiPath}, retrying in ${waitMs}ms`);
          await sleep(waitMs);
          try {
            resolve(await apiGet(apiPath, attempt + 1));
          } catch (error) {
            reject(error);
          }
          return;
        }

        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`GET ${apiPath} failed: ${res.statusCode} ${body}`));
          return;
        }

        resolve(JSON.parse(body));
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const list = await apiGet(`/admin/api/2024-01/themes/${THEME_ID}/assets.json`);
  const keys = (list.assets || []).map((asset) => asset.key).filter((key) => TARGET_PREFIXES.some((prefix) => key.startsWith(prefix))).sort();
  const manifest = [];

  for (const key of keys) {
    const encodedKey = encodeURIComponent(key);
    const data = await apiGet(`/admin/api/2024-01/themes/${THEME_ID}/assets.json?asset[key]=${encodedKey}`);
    const asset = data.asset;
    const localPath = path.join(ROOT, key);
    fs.mkdirSync(path.dirname(localPath), { recursive: true });

    if (typeof asset.value === 'string') {
      fs.writeFileSync(localPath, asset.value, 'utf8');
      manifest.push({ key, localPath, type: 'text' });
      console.log(`Synced ${key}`);
    } else if (typeof asset.attachment === 'string') {
      fs.writeFileSync(localPath, Buffer.from(asset.attachment, 'base64'));
      manifest.push({ key, localPath, type: 'binary' });
      console.log(`Synced ${key} (binary)`);
    } else {
      manifest.push({ key, localPath, type: 'skipped' });
      console.log(`Skipped ${key}`);
    }

    await sleep(600);
  }

  fs.writeFileSync(path.join(ROOT, 'theme-sync-manifest.json'), JSON.stringify({ shop: SHOP, themeId: THEME_ID, syncedAt: new Date().toISOString(), assets: manifest }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exit(1);
});
