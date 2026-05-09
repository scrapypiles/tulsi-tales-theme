const https = require('https');
https.get('https://5iib0q-9y.myshopify.com/pages/our-story', res => {
    let body = '';
    res.on('data', c => body+=c);
    res.on('end', () => {
        let matches = body.match(/<section[^>]*>/g);
        if (matches) {
            matches.forEach(m => console.log(m));
        }
    });
});
