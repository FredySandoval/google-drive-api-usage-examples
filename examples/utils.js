const fs = require('fs').promises;
const readline = require('readline');

/**
 * Normally the credential is saved in the form client_secret_<some_random>.json 
 * In order to get the credential, we need to get the name of the file.
 * 
 * @description - This function will get the full name of the file.
 * @param {string} containingFolder - The folder containing the credential.
 * @param {string} credentialStartingName - The name the credential starts with.
 * @returns {string} - The  full name of the credential.
 */
async function getCredentialName(containingFolder, credentialStartingName) {
    try {
        const filenames = await fs.readdir(containingFolder);
        const name = filenames.filter((filename) => filename.indexOf(credentialStartingName) > -1)[0];
        return name;
    } catch (err) {
        console.error(err);
    }
}
/**
 *  @description - This function will get the credential. 
 * @param {string} path - The path to the token in a string.
 * @param {string} name - The name of the credential. 
 * @returns {Object} - The Credentials: client_id, client_secret, redirect_uris. 
 */
async function getCredential(path, name) {
    const url = (path + "/" +name).replace(/([^:]\/)\/+/g, '$1');
    try {
        const file = await fs.readFile(url);
        return JSON.parse(file);
    } catch (err) {
        console.error(err);
    }
}
/**
 * @description - Reads the token if found otherwise creates a new token. 
 * @param {google.auth.OAuth} oAuth2Client - The OAuth2 client to get token for.
 * @param {string} path - The path to the token in a string.
 * @param {array} scopes - The scopes to request.
 * @returns {Object} - The token.
 */
async function getToken(oAuth2Client, tokenpath, scopes) {
    try {
        const file = await fs.readFile(tokenpath);
        return JSON.parse(file);
    } catch (err) {
        return await getAccessToken(oAuth2Client,tokenpath, scopes);
    }
}
/**
 * 
 * @param {google.auth.OAuth} oAuth2Client - The OAuth2 client to get token for.
 * @param {Array} SCOPES - The scopes to request.
 * @returns {Object} - The token.
 */
async function getAccessToken(oAuth2Client,TOKEN_PATH, SCOPES) {
    return new Promise((resolve, reject) => {
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
            oAuth2Client.getToken(code, async (err, token) => {
                if (err) reject(err);
                await fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) reject(err);
                    console.log('Token stored to', `./${TOKEN_PATH}`);
                });
                resolve(token);
            });
        });
    });
}

module.exports = {
    getCredentialName,
    getCredential,
    getToken,
}