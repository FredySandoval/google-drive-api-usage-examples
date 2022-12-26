---
title: 'File Methods, example:'
---
# {{ $frontmatter.title }}

## set root Url
::: tip
for example you can send the request to a [ngrok https server tunneling ncat][4] to output all the incoming requests, for testing purposes.
:::
Example:
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
### The HTTP request will look like this:
```text
@fileid = abcdefghi12345
POST http://localhost:5000/files/{{fileid}}/copy
    ?fields=kind, id, name HTTP/1.1
Content-Type: application/json

{"name":"copiedfile","parents":["XXxXxrxxxxxxXXXXXXXXXXXXXXXXXXXXX"]}
```
[4]: https://gist.github.com/FredySandoval/ff34e87f83e4c4dc4a771df44fc7e31c