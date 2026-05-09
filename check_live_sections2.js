const https = require('https');
https.get('https://tulsitales.com/pages/our-story', res => {
    let body = '';
    res.on('data', c => body+=c);
    res.on('end', () => {
        let matches = body.match(/<section[^>]*style="[^"]*"[^>]*>/g);
        if (matches) {
            matches.forEach(m => console.log(m));
        } else {
            console.log("None");
        }
    });
});