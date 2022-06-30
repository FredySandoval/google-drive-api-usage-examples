const URLSearchParams = require('url').URLSearchParams;
const fetch = require('node-fetch');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

class OAuth2Client {
    constructor(opts = {}) {
        this._clientId = opts.client_id;
        this._clientSecret = opts.client_secret;
        this.redirectUri = opts.redirect_uri;
    }

    generateAuthUrl(opts = {}) {

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
            new URLSearchParams(opts).toString()
        );
    }
    getToken(codeOrOptions) {
        const options = typeof codeOrOptions === 'string' ? { code: codeOrOptions } : codeOrOptions;
        return this.getTokenAsync(options);
    }
    async getTokenAsync(options) {
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
OAuth2Client.GOOGLE_OAUTH2_AUTH_BASE_URL_ =
    'https://accounts.google.com/o/oauth2/v2/auth';
OAuth2Client.GOOGLE_OAUTH2_TOKEN_URL_ =
    'https://oauth2.googleapis.com/token';

module.exports = OAuth2Client;
