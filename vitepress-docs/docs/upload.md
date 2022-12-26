---
title: Upload a new file
---
# Upload a new file
For an upload example visit this [link](https://github.com/FredySandoval/google-drive-api-usage-examples/blob/main/examples/express_example.js)
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

const result = await drive.files.create(path_parameters, options);
```
https://github.com/FredySandoval/google-drive-api-usage-examples/blob/cac9a82f9edf0f8bdce5cf2cb2b047a6ce8c520a/examples/some_http_client_request/uploadFile.http#L1


## HTTP raw requst:

```text
POST http://localhost:5000/upload/files?loco=mundo HTTP/1.1
Connection: keep-alive
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryfwefjwofjwofjw
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.50 Safari/537.36

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="image"; filename="name.jpg"
Content-Type: image/png

< ../name.jpg
----WebKitFormBoundaryfwefjwofjwofjw
```