const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const dbData = [
{"medicine_name":"Bamboo Earbuds","image_urls":["https://m.media-amazon.com/images/I/71R2oE1iHlL._AC_SL1500_.jpg","https://m.media-amazon.com/images/I/61s4S6uE50L._AC_SL1500_.jpg","https://m.media-amazon.com/images/I/612+h1x-HUL._AC_SL1500_.jpg"]},
{"medicine_name":"Bamboo Toothbrush","image_urls":["https://m.media-amazon.com/images/I/71u92N0C2RL._SL1500_.jpg","https://m.media-amazon.com/images/I/71zFqQe3rKL._SL1500_.jpg","https://images-eu.ssl-images-amazon.com/images/I/719hR7H+5SL._AC_UL600_SR600,400_.jpg"]},
{"medicine_name":"Bamboo Toothbrush - Charcoal Infused","image_urls":["https://m.media-amazon.com/images/I/71s8p0y1R3L._SX679_.jpg","https://m.media-amazon.com/images/I/71N9DqG77pL._SX679_.jpg","https://m.media-amazon.com/images/I/71e-3B0k7AL._SX679_.jpg"]},
{"medicine_name":"Jeera 100 g","image_urls":["https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cumin_seeds_01.jpg/1280px-Cumin_seeds_01.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cumin-powder-2.jpg/1280px-Cumin-powder-2.jpg"]},
{"medicine_name":"Methi 200 g","image_urls":["https://m.media-amazon.com/images/I/71R2c+NfPFL._SL1500_.jpg"]},
{"medicine_name":"Methi 400 g","image_urls":["https://m.media-amazon.com/images/I/71u9s8nQ8mL._AC_SL1500_.jpg"]},
{"medicine_name":"Neem Wood Comb","image_urls":["https://m.media-amazon.com/images/I/71Y8Xg9itbL._SX679_.jpg","https://m.media-amazon.com/images/I/61kG8yY2oSL._SX679_.jpg"]},
{"medicine_name":"Organic Almond Oil","image_urls":["https://m.media-amazon.com/images/I/719h1nEwVCL._SL1500_.jpg"]},
{"medicine_name":"Organic Black Cardamom 100 g","image_urls":["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Black_Cardamom_Pods.jpg/1280px-Black_Cardamom_Pods.jpg"]},
{"medicine_name":"Organic Curry Leaf 100 g","image_urls":["https://m.media-amazon.com/images/I/71R2c9f5LXL.jpg"]},
{"medicine_name":"Organic Fennel Seeds 100 g","image_urls":["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Fennel_seeds_%28Foeniculum_vulgare%29.jpg/1280px-Fennel_seeds_%28Foeniculum_vulgare%29.jpg"]},
{"medicine_name":"Organic Green Cardamom","image_urls":["https://m.media-amazon.com/images/I/71uK51hE-CL._AC_SL1500_.jpg"]},
{"medicine_name":"Organic Seseme Oil","image_urls":["https://images.apollo247.in/pub/media/catalog/product/p/o/pold0034.png"]},
{"medicine_name":"Premium Handpoured Soy Wax Candle - Bewitched","image_urls":["https://cdn.shopify.com/s/files/1/0616/0927/6554/products/SoulSoothe_Bewitched_SoyWaxCandle_Mockup1.jpg?v=1671520666"]},
{"medicine_name":"Premium Handpoured Soy Wax Candle - Cherry Blossom","image_urls":["https://m.media-amazon.com/images/I/71R2n7T60kL._SL1500_.jpg"]},
{"medicine_name":"Premium Handpoured Soy Wax Candle - Pink Pony","image_urls":["https://m.media-amazon.com/images/I/71oD4G1GqBL._SX679_.jpg"]},
{"medicine_name":"Saunf 100 g","image_urls":["https://m.media-amazon.com/images/I/71Y+gLg+7DL._AC_SY355_.jpg"]},
{"medicine_name":"FIFATROL TAB","image_urls":["https://aimilpharmaceuticals.com/assets/images/product_images/fifatrol_tablet_aimil_1_min.webp"]}
];

async function fetchProducts() {
  return new Promise((resolve) => {
    https.request({
      hostname: SHOP,
      path: '/admin/api/2024-01/products.json?limit=250',
      headers: { 'X-Shopify-Access-Token': TOKEN }
    }, res => {
      let b = ''; res.on('data', c => b+=c); res.on('end', () => resolve(JSON.parse(b).products));
    }).end();
  });
}

async function addImage(productId, src) {
  const data = JSON.stringify({ image: { src: src } });
  return new Promise((resolve) => {
    const req = https.request({
      hostname: SHOP,
      path: '/admin/api/2024-01/products/' + productId + '/images.json',
      method: 'POST',
      headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    }, res => {
      let b = ''; res.on('data', c => b+=c); res.on('end', () => resolve(JSON.parse(b)));
    });
    req.write(data);
    req.end();
  });
}

async function run() {
  const products = await fetchProducts();
  if (products && products.length > 0) {
    for (let dbRow of dbData) {
      const match = products.find(p => p.title.includes(dbRow.medicine_name) || dbRow.medicine_name.includes(p.title));
      if (match) {
        console.log("Matching " + match.title + " with DB images...");
        let count = 0;
        for (let url of dbRow.image_urls) {
          if (count >= 3) break;
          if (url.includes('example.com')) continue;
          
          await addImage(match.id, url);
          console.log("   Added image");
          count++;
        }
      }
    }
    console.log("Finished importing real DB images to Shopify products.");
  }
}
run();
