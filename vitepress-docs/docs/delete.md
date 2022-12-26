# delete
```js
const path_parameters = {
    fileId: 'YOUR_FILE_ID',
    fields: 'kind, id, name',
}
const result = await drive.files.delete(path_parameters, options);
```

### HTTP raw to delete
```text
@fileid = abcdefghi123456
DELETE http://localhost:5000/files/{{fileid}}
```