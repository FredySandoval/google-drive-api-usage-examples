---
title: Update
---

# update
```js
const path_parameters = {
    fileId: "YOUR_FILE_ID",
    fields: 'kind, id, name',
    resource: {
        trashed: true, // This will send the file to trash
        name: 'YOUR_NEW_FILE_NAME'
    },
}
const result = await drive.files.update(path_parameters, options);
```