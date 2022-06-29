# google-drive-api-usage-examples
An easy to understand guide on how to use the Google Drive API

---

The [Google Drive API Documentation][1] may not be the easiest API in the world, unfortunately is written in a way that is hard to read for the new user. In this repo I try to unveil the mystery and remove the complexity for this API.

Table of contents
=================

<!--ts-->
   * [What its used for](#what-its-used-for)
   * [Types of Authentication](#types-of-authentication)
      * [API key](#api-key)
      * [OAuth client ID](#oauth-client-id)
      * [Service account](#service-account)
   * [Authenticating our Application](#authenticating-our-application)
      * [Using API key](#using-api-key)
      * [Using Google OAuth client ID](#using-google-oauth-client-id)
      * [Service account](#using-service-account)
<!--te-->

What its used for
=================
In simple words: it help us to send HTTP requests in a way that the Google servers can accept, allowing us to manipulate the the Google Drive files.

Types of Authentication
=====
The first step is to decide the authentication method, here are the option and use cases:

* ## API key
  Use this credential to access publicly-available data anonymously, this means files set as "[anyone with the link][2]".

* ## OAuth client ID
  Use this credential to authenticate as an end user and access their data. Requires your app to request and receive consent from the user.

* ## Service account
  Use this credential to authenticate as a service account or to access files on behalf of Google Workspace. This service accounts can't be accessed using a username or password.
  
How to Get:
=====
  * API key
    ---------

    Go to https://console.cloud.google.com/apis/credentials > Create Credentials > API Key
  
    !Alert: This API key is normally exposed to the public, so you may want to restrict the API, because its usage will count towards your account.
 
  * OAuth client ID
    ---------------
    Go to https://console.cloud.google.com/apis/credentials > Create Credentials > OAuth client ID
 
  * Service Accounts
    ----------------
    Go to https://console.cloud.google.com/apis/credentials > Create Credentials > Service account

Authenticating our Application
==============================
### Using API key

<!-- https://github.com/FredySandoval/google-drive-api-usage-examples/blob/7b61859674203aa2827085a51452b0c50056470e/lib/authenticating-our-application/examples.js#L1-L14 -->
```js 
const { google } = require('googleapis');

const API_KEY = 'RanD0mK3Y-abcdevwefw-1234567890';

async function main() {
    const drive = google.drive({ version: 'v3', auth: API_KEY });
    console.log(drive);
}
```

### Using Google OAuth client ID
<!-- https://github.com/FredySandoval/google-drive-api-usage-examples/blob/850286b06557f106b43036066e20384dd9174f83/lib/authenticating-our-application/examples.js#L17-L69 -->
```js
const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const SCOPES = ['https://www.googleapis.com/auth/drive']; // Allows all scopes 
const TOKEN_PATH = './token.json'; // If the file doesn't exist, it will be created.
const CREDENTIALS_PATH = './client_secret_1234567890.json' // replace with yours
let credentials, token;
async function main() {
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

### Using Service account
```js
const { google } = require('googleapis');
const path = require('path');

function main() {
    const KEYFILEPATH = path.join(__dirname, 'service.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });
    const driveService = google.drive({ version: 'v3', auth });
    console.log(driveService);
};
```
<!-- https://github.com/FredySandoval/google-drive-api-usage-examples/blob/888e71b981847cca000abea1c322d5e54bafa61e/lib/authenticating-our-application/examples.js#L72-L89 -->




[1]: https://developers.google.com/drive/api/
[2]: https://support.google.com/drive/answer/2494822?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Cshare-a-file-publicly
