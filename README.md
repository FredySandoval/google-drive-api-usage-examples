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

```js 
const { google } = require('googleapis');

const API_KEY = 'RanD0mK3Y-abcdevwefw-1234567890';

async function main() {
    const drive = google.drive({ version: 'v3', auth: API_KEY });
    console.log(drive);
}
```

### Using Google OAuth client ID
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
    const drive = google.drive({ version: 'v3', auth });
};
```
Sending a request
=================
Regardless of the method or programming language we use, the HTTP request that Google will receive looks like this:

- ### Using the API key
```http
GET /drive/v3/files/AbCdEFGhijklmopr-abcde_fghijl-oqQrstuvWxyZ?fields=kind%2C%20id%2C%20name&key=Abcdefghij-KmnloprstuVwxyZ HTTP/1.1
Host: googleapis.com
User-Agent: google-api-nodejs-client/0.7.2 (gzip)
Accept: application/json
Accept-Encoding: gzip
X-Forwarded-For: 190.191.192.193
X-Forwarded-Proto: https
```
- ### Using the OAuth client ID
```http
GET /drive/v3/files/17qEQsVNm-XWtdGSWy2_p0-pyoLaZS0mq16L1mKX2it4?fields=kind%2C%20id%2C%20name HTTP/1.1
Host: googleapis.com 
User-Agent: google-api-nodejs-client/0.7.2 (gzip)
Accept: application/json
Accept-Encoding: gzip
Authorization: Bearer ya12.RaNdOmStRinG1234RaNdOmStRinG1234RaNdOmStRinG1234-RaNdOmStRinG1234_RaNdOmStRinG1234_RaNdOmStRinG1234
X-Forwarded-For: 190.191.192.193
X-Forwarded-Proto: https
```
Sending the same request with the [Google APIs Node.js Client][3] package will look like this:
```js
// The authentication was done using the previous methods
const path_parameters = {
    fileId: 'AbCdEFGhijklmopr-abcde_fghijl-oqQrstuvWxyZ',
    fields: 'kind, id, name',
}
const result = await drive.files.get(path_parameters, options);
```

Methods examples:
=======
## set root Url
for example you can send the request to a [ngrok https server tunneling ncat][4] to output all the incoming requests, for testing purposes.
```js
const options = {
    rootUrl: 'https://www.googleapis.com',
}
// const options = {
//     rootUrl: 'https://1234-199-199-199-199.ngrok.io/'
// }
```
## copy
```js
const parents = ['YOUR_PARENT_ID_IN_ARRAY'];
const fileId = 'YOUR_ID_OF_THE_FILE_TO_BE_COPIED';
const name = 'YOUR_NEW_NAME';
const path_parameters = {
    fileId: fileId,
    fields: 'kind, id, name',
    resource: {
        name: name,
        parents: parents,
    },
}
const result = await drive.files.copy(path_parameters, options);
```
## create
  - create a new folder
```js
const parents = ['YOUR_PARENT_FOLDER_OPTIONAL'];
const name = 'YOUR_NEW_FOLDER_NAME';
const path_parameters = {
    resource: {
        name: name, 
        mimeType: 'application/vnd.google-apps.folder',
        parents: parents,
    },
    fields: 'kind, id, name',
}
const result = await drive.files.create(path_parameters, options);
```
 - Upload a new file
```js
const path_parameters = {
    resource: {
        name: 'YOUR_NEW_FILE_NAME',
        parents: ['YOUR_PARENTS_IDs_OPTIONAL'],
    },
    media: {
        body: 'YOUR_READABLE_STREAM',
    },
    fields: 'kind, id, name',
}

const result = await drive.files.create(path_parameters);
```
## delete
```js
const path_parameters = {
    fileId: 'YOUR_FILE_ID',
    fields: 'kind, id, name',
}
const result = await drive.files.delete(path_parameters);
```
## empty trash
```js
await drive.files.emptyTrash({});
```

## export
For a list of avaiable mimeTypes available visit this link https://developers.google.com/drive/api/guides/ref-export-formats
```js
const path_parameters = {
    fileId: 'YOUR_FILE_ID',
    mimeType: 'THE MIMETYPE',
    fields: 'kind, id, name',
}
const options = {
    responseType: 'stream',
    rootUrl: 'https://www.googleapis.com',
}
const result = await drive.files.export(path_parameters, options);
```

## generateIds
```js
const fields = 'kind, space, ids';
const path_parameters = {
    count: 3, // the number of IDs you want
    fields: fields,
}
const result = await drive.files.generateIds(path_parameters);
```
## get
```js
const path_parameters = {
    fileId: 'YOUR_FILE_ID',
    fields: 'kind, id, name',
}
const result = await drive.files.get(path_parameters, options);
```
## list
For a list of query string parameters visit this [link][5]
```js
const fields = "kind, nextPageToken ,files(kind, id, name)";
const query = "YOUR_QUERIES";
const nextPageToken = "TO_CONTINUE_WITH_A_PREVIOUS_LIST";
const path_parameters = {
    q: query,
    pageSize: 5, // Number of files returned
    fields: fields,
    pageToken: nextPageToken, // optional
}
const listFiles = await drive.files.list(path_parameters);
```


[1]: https://developers.google.com/drive/api/
[2]: https://support.google.com/drive/answer/2494822?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Cshare-a-file-publicly
[3]: https://github.com/googleapis/google-api-nodejs-client
[4]: https://gist.github.com/FredySandoval/ff34e87f83e4c4dc4a771df44fc7e31c
[5]: https://developers.google.com/drive/api/guides/search-files