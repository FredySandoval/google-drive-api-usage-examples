---
title: Get
---
# {{ $frontmatter.title }}

```js
const path_parameters = {
    fileId: 'YOUR_FILE_ID',
    fields: 'kind, id, name',
}
const result = await drive.files.get(path_parameters, options);
```

## HTTP raw request:

## Get File ID
```text
GET http://localhost:5000/files?listFiles=(pageSize=10,folderName=Takeout)&getFolder=(folderName=Takeout)&getFileId=(name=Takeout)
```
## Get folder
```text
@rootUrl = https://www.googleapis.com
GET {{rootUrl}}/drive/v3/files
    ?q=mimeType='application/vnd.google-apps.folder' and name = 'Takeout'
    &pageSize=10
    &fields=kind, nextPageToken ,files(id, name, mimeType, trashed, thumbnailLink, hasThumbnail, webContentLink, webViewLink, iconLink, parents, thumbnailVersion, owners) HTTP/1.1
Authorization: Bearer {{$dotenv TOKEN}}
Content-Type: application/json
```