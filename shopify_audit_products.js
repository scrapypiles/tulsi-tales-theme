const https = require('https');
const fs = require('fs');

const SHOP = '5iib0q-9y.myshopify.com';
const TOKEN = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

const query = `
{
  products(first: 50) {
    edges {
      node {
        id
        title
        productType
        descriptionHtml
        tags
        metafields(first: 10) {
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
      }
    }
  }
}
`;

const postData = JSON.stringify({ query });
const opt = {
  hostname: SHOP,
  path: '/admin/api/2024-01/graphql.json',
  method: 'POST',
  headers: {
    'X-Shopify-Access-Token': TOKEN,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(opt, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body);
    let dirtyCount = 0;
    
    if (data.data && data.data.products) {
      data.data.products.edges.forEach(edge => {
        const p = edge.node;
        let dirty = false;
        let issues = [];
        
        // Check Description for inline styles
        if (p.descriptionHtml && p.descriptionHtml.match(/font-family|font-size|line-height|<span/i)) {
          dirty = true;
          issues.push('Inline styles in description');
        }
        
        // Check Type for array brackets
        if (p.productType && p.productType.match(/\[|\]|'/)) {
          dirty = true;
          issues.push('Array brackets in productType');
        }
        
        // Check Metafields for array brackets
        p.metafields.edges.forEach(mEdge => {
          const m = mEdge.node;
          if (m.value && m.value.match(/\[|\]|'/)) {
            dirty = true;
            issues.push(`Array brackets in metafield ${m.key}`);
          }
        });
        
        if (dirty) {
          dirtyCount++;
          console.log(`Product: ${p.title} - Issues:`, issues.join(', '));
        }
      });
      console.log(`\nAudit complete. Found ${dirtyCount} products with formatting issues out of ${data.data.products.edges.length} checked.`);
    } else {
      console.log('No products found or error:', data);
    }
  });
});
req.end(postData);
