---
title: This is the OAuth2Client but in a simplified version
---
# This is the OAuth2Client but in a simplified version. 

Original version can be found in [github.com/googleapis/google-auth-library-nodejs/oauth2client.ts](https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/oauth2client.ts)

```ts
import { URLSearchParams } from "url";
import fetch from "node-fetch";

interface Opts {
    client_id?: string;
    client_secret?: string;
    redirect_uri?: string;
}
export interface GenerateAuthUrlOpts {
    access_type?: string;
    hd?: string;
    response_type?: string;
    client_id?: string;
    redirect_uri?: string;
    scope?: string[] | string;
    state?: string;
    include_granted_scopes?: boolean;
    login_hint?: string;
    prompt?: string;
    code_challenge_method?: Object;
    code_challenge?: string;
}
export interface GetTokenOptions {
    code: string;
    codeVerifier?: string;
    client_id?: string;
    redirect_uri?: string;
}
export interface GetTokenResponse {
    tokens: Object;
    res: Object | null;
  }
class OAuth2Client {
    private _clientId: string;
    private _clientSecret: string;
    private redirectUri: string;
    private static readonly GOOGLE_OAUTH2_AUTH_BASE_URL_ =
        'https://accounts.google.com/o/oauth2/v2/auth';
    private static readonly GOOGLE_OAUTH2_TOKEN_URL_ =
        'https://oauth2.googleapis.com/token';

    constructor(opts: Opts = {}) {
        this._clientId = opts.client_id;
        this._clientSecret = opts.client_secret;
        this.redirectUri = opts.redirect_uri;
    }

    generateAuthUrl(opts: GenerateAuthUrlOpts = {}) {

        if (opts.code_challenge_method && !opts.code_challenge) {
            throw new Error(
                'If a code_challenge_method is provided, code_challenge must be included.'
            );
        }
        opts.response_type = opts.response_type || 'code';
        opts.client_id = opts.client_id || this._clientId;
        opts.redirect_uri = opts.redirect_uri || this.redirectUri;
        // Allow scopes to be passed either as array or a string
        if (opts.scope instanceof Array) {
            opts.scope = opts.scope.join(' ');
        }
        const rootUrl = OAuth2Client.GOOGLE_OAUTH2_AUTH_BASE_URL_;
        return (
            rootUrl +
            '?' +
            // @ts-expect-error
            new URLSearchParams(opts).toString()
        );
    }
    getToken(codeOrOptions: string | GetTokenOptions) {
        const options = typeof codeOrOptions === 'string' ? { code: codeOrOptions } : codeOrOptions;
        return this.getTokenAsync(options);
    }
    private async getTokenAsync(options: GetTokenOptions): Promise<GetTokenResponse> {
        const url = OAuth2Client.GOOGLE_OAUTH2_TOKEN_URL_;
        const values = {
            code: options.code,
            client_id: options.client_id || this._clientId,
            client_secret: this._clientSecret,
            redirect_uri: options.redirect_uri || this.redirectUri,
            grant_type: 'authorization_code',
        };

        const res = await fetch(url, {
            method: 'POST',
            body: new URLSearchParams(values).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await res.json();
        return json;
    }
}

module.exports = OAuth2Client;
```