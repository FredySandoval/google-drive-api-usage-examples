# export
For a list of avaiable mimeTypes available visit this [link][6] 
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
### HTTP raw request
```text
@rootUrl = http://localhost:5000
@fileId =  ABCDEFGH123456
GET {{rootUrl}}/files/{{fileId}}/export
    ?mimeType=application%2Fpdf&fields=kind,id,name HTTP/1.1
Authorization: Bearer {{$dotenv TOKEN}} #Authorization token goes {{there}}
```
[6]: https://developers.google.com/drive/api/guides/ref-export-formats