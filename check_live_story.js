const https = require('https');

https.get('https://5iib0q-9y.myshopify.com/pages/our-story', res => {
    let body = '';
    res.on('data', c => body+=c);
    res.on('end', () => {
        // Look for sections and their background colors
        let matches = body.match(/<section class="ayus-story-[^"]+" style="[^"]*background-color:[^"]+"/g);
        console.log("Found sections with background-color:");
        if (matches) {
            matches.forEach(m => console.log(m));
        } else {
            console.log("None found.");
        }
    });
});
