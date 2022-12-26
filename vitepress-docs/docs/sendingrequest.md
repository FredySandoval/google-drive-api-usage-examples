# Sending a request
Regardless of the method or programming language we use, the HTTP request that Google will receive, looks like this:

- ## Using the API key
```
GET /drive/v3/files/AbCdEFGhijklmopr-abcde_fghijl-oqQrstuvWxyZ?fields=kind%2C%20id%2C%20name&key=Abcdefghij-KmnloprstuVwxyZ HTTP/1.1
Host: googleapis.com
User-Agent: google-api-nodejs-client/0.7.2 (gzip)
Accept: application/json
Accept-Encoding: gzip
X-Forwarded-For: 190.191.192.193
X-Forwarded-Proto: https
```
- ## Using the OAuth client ID
```
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

[3]: https://github.com/googleapis/google-api-nodejs-client
