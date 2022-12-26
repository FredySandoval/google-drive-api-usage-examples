# generateIds
```js
const fields = 'kind, space, ids';
const path_parameters = {
    count: 3, // the number of IDs you want
    fields: fields,
}
const result = await drive.files.generateIds(path_parameters, options);
```

### HTTP raw request
```text
GET http://localhost:5000/files/generateids?count=3
```