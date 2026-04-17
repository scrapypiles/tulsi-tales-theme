const crypto = require('crypto');

const SHOP = '5iib0q-9y.myshopify.com';
const API_KEY = '89081a9c354ddfb1d839de7062d40a4f';
const SCOPES = 'write_themes,read_themes,write_products,read_products,write_product_listings,read_product_listings,write_files,read_files,write_content,read_content';
const REDIRECT_URI = 'http://localhost:8000/callback';
const STATE = crypto.randomBytes(16).toString('hex');

const authUrl = `https://${SHOP}/admin/oauth/authorize?client_id=${API_KEY}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

console.log(authUrl);
