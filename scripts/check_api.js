
const https = require('https');

const API_URL = 'https://autoelite-backend-v5sw.onrender.com/api/autos';

function checkApi() {
    console.log(`Checking API status at: ${API_URL}`);

    https.get(API_URL, (res) => {
        const { statusCode } = res;
        console.log(`Status Code: ${statusCode}`);

        if (statusCode === 200) {
            console.log('API is operational.');
        } else {
            console.log('API might be down or returning errors.');
        }

        res.on('data', (d) => {
            // Consume data
        });

    }).on('error', (e) => {
        console.error(`Error checking API: ${e.message}`);
    });
}

checkApi();
