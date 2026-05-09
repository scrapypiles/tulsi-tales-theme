const https = require('https');
https.get('https://tulsitales.com/products/brahmi-thailam', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const titleMatch = data.match(/<title>([\s\S]*?)<\/title>/);
    if(titleMatch) {
      console.log("TITLE IS:", JSON.stringify(titleMatch[1]));
    } else {
      console.log("No title found");
    }
  });
}).on('error', console.error);