# create
to create a new folder
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

### HTTP raw of how to Create a folder

```text
POST http://localhost:5000/files/create
Content-Type: application/json

{
   "folderName" : "Takeout99",
   "parents": ""
}
```