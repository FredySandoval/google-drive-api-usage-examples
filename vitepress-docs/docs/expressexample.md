---
title: Example of how to use the Google Drive API in ExpressJS
---
# {{ $frontmatter.title }}

```ts
const { google } = require('googleapis');
const express = require('express');
const fs = require('fs');
const busboy = require('busboy');
const stream = require('stream');

const app = express();
app.use(express.json());
const { getCredentialName, getCredential, getToken } = require('./utils.js');
const {
    getFileId,
    getFolder,
    listFiles,
    uploadFile,
    copyFile,
    deleteFile,
    emptyTrash,
    exportFile,
    writeStream,
    createFolder,
    generateIds,
    sendToTrash,
    watch,
    stopWatch, } = require('./operations.js');

let drive;
async function main() {
    const SCOPES = ['https://www.googleapis.com/auth/drive'];
    const TOKEN_PATH = './src/token1.json';
    const credentialFullName = await getCredentialName('./src', 'client_secret');
    const credential = await getCredential('./src/', credentialFullName);
    const { installed: { client_id, client_secret, redirect_uris } } = credential;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    const TOKEN = await getToken(oAuth2Client, TOKEN_PATH, SCOPES);
    oAuth2Client.setCredentials(TOKEN);
    drive = google.drive({ version: 'v3', auth: oAuth2Client });
}
main().catch(console.error);

// app.get('/', async (req, res) => {
// });
app.use(express.static('public'));

// app.get('/:getfileid', async (req, res) => {
//     const name = req.query?.name ? req.query.name : '';
//     const fileId = name ? await getFileId(drive, name) : { data: { files: [] } }
//     res.json(fileId);
// });
app.get('/files', async (req, res) => {
    const query = req.query;
    const keys = Object.keys(query);
    const validListKeys = ['listFiles', 'getFolder', 'getFileId'];

    if (isInvalidQuery(keys, validListKeys)) return res.json({ data: [] })

    let result = {};
    for (const key of keys) {
        switch (key) {
            case 'listFiles':
                console.log('query', query.listFiles);
                const paramsListFiles = convertToObject(query.listFiles);

                console.log('params1', paramsListFiles);
                const listfile = await listFiles(
                    drive,
                    paramsListFiles.pageSize,
                    paramsListFiles.folderName,
                    paramsListFiles.nextPageToken,
                )
                Object.assign(result, { listfile });
                break;
            case 'getFolder':
                const paramsGetFolder = convertToObject(query.getFolder);
                const getfolder = await getFolder(
                    drive,
                    paramsGetFolder.folderName,
                )
                Object.assign(result, { getfolder });
                break;
            case 'getFileId':
                const paramsGetFileId = convertToObject(query.getFileId);
                const getfileId = await getFileId(
                    drive,
                    paramsGetFileId.name
                )
                Object.assign(result, { getfileId });
            default:
                break;
        }
    }
    res.json(result)
});
function convertToObject(str) {
    const result = {};
    let step1 = str.replace(/^\(|\)$/g, "");
    console.log('step2', step1);
    let step2 = step1.split(",");
    console.log('step2', step2);
    step2.forEach(key => {
        const temp1 = key.split(/=(.*)/s)
        console.log('temp1', temp1);
        Object.assign(result, { [temp1[0]]: temp1[1] });
    })
    return result;
}

function isInvalidQuery(keys, array) {
    let res = false;
    if (keys.length < 1) return true;
    keys.forEach(key => {
        if (!array.includes(key)) res = true;
    })
    return res;
}
app.post('/files/:fileid/copy', async (req, res) => {
    const params = req.params;
    const body = req.body;
    const result = await copyFile(
        drive,
        body.name,
        params.fileid,
        body.parents
    )
    res.json(result);
})
app.post('/upload/files', (req, res) => {
    const bb = busboy({ headers: req.headers });
    bb.on('file', async (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        const result = await uploadFile(drive, file, filename)
        res.json(result);
    });
    req.pipe(bb);
})

app.delete('/files/:fileid', async (req, res) => {
    const params = req.params;
    const deletefile = deleteFile(
        drive,
        params.fileid
    )
    res.json(deletefile);
});
app.get('/files/:fileid/export', async (req, res) => {
    console.log('params', req.params);
    console.log('query', req.query);
    const result = await exportFile(
        drive,
        req.params.fileid,
        req.query.mimeType
    )
    result.data.pipe(res);
});

app.post('/files/create', async (req, res) => {
    const body = req.body;

    const result = await createFolder(
        drive,
        body.folderName,
        body.parents
    )
    res.json(result);
})

app.get('/files/generateids', async (req, res) => {
    const query = req.query;

    const result = await generateIds(
        drive,
        query.count
    )
    res.json(result);
});
app.patch('/files/:fileid/sendtotrash', async (req, res) => {
    const params = req.params;

    const result = await sendToTrash(
        drive,
        params.fileid
    );
    res.json(result);
})
function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}

app.use(notFound);
app.use(errorHandler);

// gets the localhost IP address
if (!process.env.PRODUCTION) {
    var interfaces = require('os').networkInterfaces(), localhostIP;
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            let ipFamily = interfaces[k][k2].family;
            if (ipFamily === 'IPv4' || ipFamily === 4 && !interfaces[k][k2].internal) {
                localhostIP = interfaces[k][k2].address;
            }
        }
    }
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on http://${localhostIP}:${port}`);
});
```