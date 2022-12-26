# Authenticating our Application

## Using API key

```js 
const { google } = require('googleapis');

const API_KEY = 'RanD0mK3Y-abcdevwefw-1234567890';

async function main() {
    const drive = google.drive({ version: 'v3', auth: API_KEY });
    console.log(drive);
}
```

## Using Google OAuth client ID
```js
const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const SCOPES = ['https://www.googleapis.com/auth/drive']; // Allows all scopes 
const TOKEN_PATH = './token.json'; // If the file doesn't exist, it will be created.
const CREDENTIALS_PATH = './client_secret_1234567890.json' // replace with yours
let credentials, token;
// Getting credentials
try {
    const file = await fs.promises.readFile(CREDENTIALS_PATH);
    credentials = JSON.parse(file);
} catch (err) {
    console.error('Unable to read file:', err);
}
const { installed: { client_id, client_secret, redirect_uris } } = credential;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
// Getting Token
try {
    const file = await fs.promises.readFile(TOKEN_PATH);
    token = JSON.parse(file);
} catch (err) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, async (err, r_token) => {
            if (err) reject(err);
            await fs.promises.writeFile(TOKEN_PATH, JSON.stringify(r_token), (err) => {
                if (err) reject(err);
                console.log('Token stored to', `./${TOKEN_PATH}`);
            });
            token = r_token;
        });
    });
}
// Setting token 
oAuth2Client.setCredentials(token);
const drive = google.drive({ version: 'v3', auth: oAuth2Client });
```
## Using Service account
```js
const { google } = require('googleapis');
const path = require('path');

const KEYFILEPATH = path.join(__dirname, 'service.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});
const drive = google.drive({ version: 'v3', auth });
```