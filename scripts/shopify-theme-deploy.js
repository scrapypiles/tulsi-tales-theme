const https = require('https');
const fs = require('fs');
const path = require('path');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();
const THEME_ID = 182982246700;
const ROOT = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme';
const SOURCE_DIRS = ['layout', 'templates', 'sections', 'assets', 'config', 'snippets'];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function uploadAsset(key, localPath, attempt = 1) {
  return new Promise((resolve, reject) => {
    const buffer = fs.readFileSync(localPath);
    const isText = !['.png', '.jpg', '.jpeg', '.gif', '.webp', '.woff', '.woff2'].includes(path.extname(localPath).toLowerCase());
    const asset = isText
      ? { key, value: buffer.toString('utf8') }
      : { key, attachment: buffer.toString('base64') };
    const payload = JSON.stringify({ asset });

    const req = https.request({
      hostname: SHOP,
      path: `/admin/api/2024-01/themes/${THEME_ID}/assets.json`,
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', async () => {
        if (res.statusCode === 429 && attempt <= 6) {
          const retryAfter = Number(res.headers['retry-after'] || 0);
          const waitMs = Math.max(retryAfter * 1000, attempt * 1500);
          console.log(`Rate limited uploading ${key}, retrying in ${waitMs}ms`);
          await sleep(waitMs);
          try {
            resolve(await uploadAsset(key, localPath, attempt + 1));
          } catch (error) {
            reject(error);
          }
          return;
        }

        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`PUT ${key} failed: ${res.statusCode} ${body}`));
          return;
        }

        console.log(`Uploaded ${key}`);
        resolve();
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  const requested = process.argv.slice(2);
  const files = requested.length
    ? requested.map((relativePath) => path.join(ROOT, relativePath))
    : SOURCE_DIRS.flatMap((dir) => walk(path.join(ROOT, dir))).sort();

  for (const file of files) {
    if (!fs.existsSync(file)) {
      throw new Error(`Missing local file: ${file}`);
    }
    const key = path.relative(ROOT, file).split(path.sep).join('/');
    await uploadAsset(key, file);
    await sleep(600);
  }
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exit(1);
});
