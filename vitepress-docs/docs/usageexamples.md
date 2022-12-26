# Usa examples of the Google Drive API are commented out
```js
const { google } = require('googleapis');

const {
    getCredentialName,
    getCredential,
    getToken,
} = require('./utils.js');
const {
    getFolder,
    listFiles,
    uploadFile,
    copyFile,
    deleteFile,
    getFile,
    emptyTrash,
    exportFile,
    getFileId,
    writeStream,
    createFolder,
    generateIds,
    sendToTrash,
    watch,
    stopWatch,
    nodeFetch_getFolderId,
} = require('./operations.js');
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token1.json';


async function main() {
    const credentialFullName = await getCredentialName('./src', 'client_secret');
    const credential = await getCredential('./src', credentialFullName);

    // google.auth.OAuth2.GOOGLE_OAUTH2_AUTH_BASE_URL_ = 'https://anotherhttpsdomain.com';
    const { installed: { client_id, client_secret, redirect_uris } } = credential;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    const TOKEN = await getToken(oAuth2Client, TOKEN_PATH, SCOPES);
    oAuth2Client.setCredentials(TOKEN);

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    // const APIKEY = 'owjefojwoefjowejfowejfowj'
    // const drive = google.drive({ version: 'v3', auth: APIKEY });

    // // Get file id
    // const files = await getFileId(drive, 'copiedfile');
    // const fileId = files.data.files[0].id;
    // console.log('fileId', fileId);

    // get folder id by name
    // const getfolder = await getFolder(drive, 'foldername');
    // const folderId = getfolder.data.files[0].id;
    // console.log('folderfield', folderId);
    // // upload file
    // let upload = await uploadFile(drive, './filepath', [folderid]);
    // console.log('upload', upload);

    // const nextPageToken = process.argv[2]
    // const nextPageToken = "fjwoejfwofwoejwoejwoeftoken"
    // console.log('1', nextPageToken);
    // list files in root or in folder
    // const listfile = await listFiles(drive, 5, "Takeout");
    // console.log('npt', listfile);
    const getfile = await getFile(drive, 'fileidfwhefweofhwoefh');
    console.log(getfile);

    // copy files
    // let copyfile = await copyFile(drive, 'copiedfile', fileId, folderId)
    // console.log('copyfile', copyfile);

    // // deletes file permanently
    // const deletefile = await deleteFile(drive, 'woejfowjefojweofjwoefjw' )
    // console.log('deletefile', deletefile);

    // // empty the trash
    // const emptytrash = await emptyTrash(drive);
    // console.log('emptytrash', emptytrash);

    // export 
    // const getfileid = await getFileId(drive, 'filename');
    // const fileFields = getfileid?.data?.files[0];
    // console.log(fileFields);
    // const exportfile = await exportFile(drive, fileFields.id, 'application/pdf');
    // console.log(exportfile);
    // writeStream(exportfile.data, fileFields.name + '.pdf');

    // // create folder
    // const createfolder = await createFolder(drive, 'Takeout3', folderField.id );
    // console.log('createfolder', createfolder);

    // // generate ids
    // const generateids = await generateIds(drive);
    // console.log('generateids', generateids);

    // // send to trash
    // const sendtotrash = await sendToTrash(drive, folderField[0].id );
    // console.log('sendtotrash', sendtotrash);

    // // watch
    // const wa = await watch(drive, fileId.data.files[0].id);
    // console.log('watch', watch);

    // // stop watch
    // const stopwatch = await stopWatch(drive);
    // console.log('stopwatch', stopwatch);

}

main().catch(console.error);
```