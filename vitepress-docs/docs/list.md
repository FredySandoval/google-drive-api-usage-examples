---
title: List
---
# list
For a list of query string parameters visit this [link][5]
```js
const fields = "kind, nextPageToken ,files(kind, id, name)";
const query = "YOUR_QUERIES";
const nextPageToken = "TO_CONTINUE_WITH_A_PREVIOUS_LIST";
const path_parameters = {
    q: query,
    pageSize: 5, // Number of files returned
    fields: fields,
    pageToken: nextPageToken, // optional
}
const listFiles = await drive.files.list(path_parameters, options);
```
[5]: https://developers.google.com/drive/api/guides/search-files
