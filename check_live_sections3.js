const https = require('https');
https.get('https://tulsitales.com/pages/our-story', res => {
    let body = '';
    res.on('data', c => body+=c);
    res.on('end', () => {
        let lines = body.split('\n');
        for (let line of lines) {
            if (line.includes('class="ayus-story-')) {
                console.log(line.trim());
            }
        }
    });
});