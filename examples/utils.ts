import fs from "fs";
import type { OAuth2Client } from "google-auth-library";
import readline from "readline";
import type { CredentialsM } from "./types"

/**
 * Normally the credential is saved in the form client_secret_<some_random>.json 
 * In order to get the credential, we need to get the name of the file.
 * 
 * @description - This function will get the full name of the file.
 * @param containingFolder - The folder containing the credential.
 * @param credentialStartingName - The name the credential starts with.
 * @returns - The  full name of the credential.
 */
export async function getCredentialName(
    containingFolder: string,
    credentialStartingName: string): Promise<string> {
    try {
        const filenames = await fs.promises.readdir(containingFolder);
        const name = filenames.filter((filename) => filename.indexOf(credentialStartingName) > -1)[0];
        return name;
    } catch (err) {
        console.error(err);
    }
}
/**
 *  @description - This function will get the credential. 
 * @param path - The path to the token in a string.
 * @param name - The name of the credential. 
 * @returns - The Credentials: client_id, client_secret, redirect_uris. 
 */
export async function getCredential(
    path: string,
    name: string): Promise<CredentialsM> {
    try {
        const file: any = await fs.promises.readFile(path + name);
        return JSON.parse(file);
    } catch (err) {
        console.error(err);
    }
}

/**
 * @description - Reads the token if found otherwise creates a new token. 
 * @param oAuth2Client - The OAuth2 client to get token for.
 * @param tokenpath - The path to the token in a string.
 * @param scopes - The scopes to request.
 * @returns - The token.
 */
async function getToken(
    oAuth2Client: OAuth2Client,
    tokenpath: string,
    scopes: string[]): Promise<string> {
    try {
        const file: any = await fs.promises.readFile(tokenpath);
        return JSON.parse(file);
    } catch (err) {
        const result = await getAccessToken(oAuth2Client, tokenpath, scopes);
        return result;
    }
}
/**
 * 
 * @param oAuth2Client - The OAuth2 client to get token for.
 * @param SCOPES - The scopes to request.
 * @returns - The token.
 */
async function getAccessToken(
        oAuth2Client: OAuth2Client,
        TOKEN_PATH: string, 
        SCOPES: string[]): Promise<string> {
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
        rl.question('Enter the code from that page here: ', async (code) => {
            rl.close();
            const tokenResult = await oAuth2Client.getToken(code);
            const tokenstring = JSON.stringify(tokenResult);
            await fs.promises.writeFile(TOKEN_PATH, tokenstring);
            resolve(tokenstring);
        });
    });
}