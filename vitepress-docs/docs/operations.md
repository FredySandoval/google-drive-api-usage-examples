---
title: This is the OAuth2Client but in a simplified version
---
# basic operation of the google drive api
    listFiles,
    uploadFile,
    copyFile,
    getFolder,
    nodeFetch_getFolderId,
    getFileId,
    getFile,
    deleteFile,
    exportFile,
    writeStream,
    createFolder,
    generateIds,
    sendToTrash,
    watch,
    stopWatch,
    emptyTrash,
```typescript
import nodefetch from 'node-fetch';
import path from "path";
import fs from "fs";

import {
    PropertyName,
    Options,
    ListParameters,
    CreateParameters,
    CopyParameters,
    GetParameters,
    DeleteParameters,
    ExportParameters,
    GenerateIdsParameters,
    UpdateParameters,
    WatchParameters,
    stopWatchParameters,
} from "./types";
import type { drive_v3 } from "googleapis";

const resource_representation: string = [
    PropertyName.id,
    PropertyName.name,
    PropertyName.mimeType,
    PropertyName.trashed,
    PropertyName.thumbnailLink,
    PropertyName.hasThumbnail,
    PropertyName.webContentLink,
    PropertyName.webViewLink,
    PropertyName.iconLink,
    PropertyName.parents,
    PropertyName.thumbnailVersion,
    PropertyName.owners,
].join(', ');
const FILES = "kind, nextPageToken ,files(" + resource_representation + "), incompleteSearch";
/**
 * During development, you can change the url to another
 * for example an Ngrok using ncat server because it only accepts https
 * how to tunnel ncat to ngrok https://gist.github.com/FredySandoval/ff34e87f83e4c4dc4a771df44fc7e31c
 * useful for testing 
 * @param {object} options - options for the request
 */
const options: Options = {
    rootUrl: 'https://www.googleapis.com',
}
/**
 * 
  * @param drive - google drive api 
 * @param pageSize - number of files to return 
 * @param folderName - optional - name of the folder to search 
 * @param nextPageToken  - optional - token to continue the search
 * @returns 
 */
async function listFiles(
    drive: drive_v3.Drive,
    pageSize: number,
    folderName: string,
    nextPageToken: string = ""
) {
    let q = "";
    let folderId: string;
    if (folderName) {
        const folder = await getFolder(drive, folderName);
        folderId = folder?.data?.files[0]?.id || "";
        q = `'${folderId}' in parents`;
    }
    const files = "kind, nextPageToken ,files(" + resource_representation + ")";
    const path_parameters: ListParameters = {
        q: q,
        pageSize: pageSize,
        fields: FILES,
        pageToken: nextPageToken,
    }
    const listFiles = await drive.files.list(path_parameters);
    return listFiles;
}
/**
 * @description - uploads a file to google drive
 * @param drive - google drive api
 * @param pathfile - path to the file to upload
 * @param folderId - array of folder ids
 * @returns - file object created
 */
async function uploadFile(
    drive: drive_v3.Drive,
    pathfile: string,
    folderId: string[] = []) {
    const name = path.basename(pathfile);
    const path_parameters: CreateParameters = {
        resource: {
            name: name,
            parents: folderId,
        },
        media: {
            body: fs.createReadStream(pathfile),
        },
        fields: resource_representation,
    }

    const result = await drive.files.create(path_parameters);
    return result;
}
/**
 * @description - copies a file to a new folder 
 * @param drive - google drive api
 * @param newName - new name of the file
 * @param fileId - id of the file to copy
 * @param targetFolderId - id of the folder to copy to
 * @returns - file object copied
 */
async function copyFile(
    drive: drive_v3.Drive,
    newName: string,
    fileId: string,
    targetFolderId: string
) {
    const path_parameters: CopyParameters = {
        fileId: fileId,
        fields: 'kind, id, name',
        resource: {
            name: newName,
            parents: [targetFolderId],
        },
    }
    const result = await drive.files.copy(path_parameters, options);
    return result;
}
/**
 * @description - gets the folder Object
 * @param drive - google drive api
 * @param folderName - name of the folder to search
 * @returns - folder object
 */
async function getFolder(
    drive: drive_v3.Drive,
    folderName: string
) {
    const files = "kind, nextPageToken ,files(" + resource_representation + "), incompleteSearch";
    const path_parameters: ListParameters = {
        q: `mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}'`,
        pageSize: 10,
        fields: FILES,
    }
    const list = await drive.files.list(path_parameters, options);
    return list;
}
/**
 * @description - Example of how to send the request with node-fetch 
 * @param folderName - name of the folder to search
 * @param TOKEN - access_token to use
 * @returns - folder object 
 */
async function nodeFetch_getFolderId(folderName: string, TOKEN: string) {
    const rootUrl = 'https://www.googleapis.com/drive/v3/files';
    const files = "kind, nextPageToken ,files(" + resource_representation + ")";
    const path_parameters: any = {
        q: `mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}'`,
        pageSize: 10,
        fields: FILES,
    }
    let url_path_params = new URLSearchParams(path_parameters).toString();
    let url = `${rootUrl}?${url_path_params}`;

    const response = await nodefetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + TOKEN,
        },
    });
    const data = await response.json();
    return data;
}
/**
 * @description - Gets the file by name 
 * @param drive google drive api
 * @param name - name of the folder to search
 * @returns - file object
 */
async function getFileId(drive: drive_v3.Drive, name: string) {
    const path_parameters: ListParameters = {
        q: `name = '${name}'`,
        pageSize: 5,
        fields: FILES,
    }
    const result = await drive.files.list(path_parameters, options);
    return result;
}
/**
 * @description - gets the file
 * @param drive drive - google drive api
 * @param fileId - id of the file to get
 * @returns - file object
 */
async function getFile(drive: drive_v3.Drive, fileId: string) {
    const path_parameters: GetParameters = {
        fileId: fileId,
        fields: 'kind, id, name',
    }
    const result = await drive.files.get(path_parameters);
    return result;
}
/**
 * @description - deletes a file
 * @param drive - google drive api
 * @param fileId - id of the file to delete
 * @returns - file object
 */
async function deleteFile(drive: drive_v3.Drive, fileId: string) {
    const path_parameters: DeleteParameters = {
        fileId: fileId,
        fields: 'kind, id, name',
    }
    const result = await drive.files.delete(path_parameters);
    return result;
}
/**
 * @description - exports a files in the provided mime type
 * @param drive - google drive api
 * @param fileId - id of the file to be exported
 * @param mimeType - mime type of the file to be exported
 * @returns - Stream of the file to be saved by fs.writeFile
 */
async function exportFile(
    drive: drive_v3.Drive,
    fileId: string,
    mimeType: string) {
    const path_parameters: ExportParameters = {
        fileId: fileId,
        mimeType: mimeType,
        fields: 'kind, id, name',
    }
    interface Options {
        responseType: any;
        rootUrl: string;
    }
    const options: Options = {
        responseType: 'stream',
        rootUrl: 'https://www.googleapis.com'
    }
    const result = await drive.files.export(path_parameters, options);
    return result;
}
/**
 * @description - writes the stream provided
 * @param stream - stream of the file to be saved by fs.writeFile
 * @param fileName - name of the file to be saved
 */
function writeStream(stream: any, fileName: string) {
    const dest = fs.createWriteStream(fileName);
    stream
        .on('end', function () {
            console.log('Done');
        })
        .on('error', function (err) {
            console.log('Error during download', err);
        })
        .pipe(dest);
}
/**
 * @description - creates a folder in root or nested folder
 * @param drive - google drive api
 * @param folderName - name of the folder bo be created
 * @param parent - optional - id of the parent folder
 */
async function createFolder(
    drive: drive_v3.Drive,
    folderName: string,
    parent: string) {
    let parents = [];
    if (typeof parent === 'string') parents.push(parent);

    const files = "kind, nextPageToken ,files(" + resource_representation + ")";
    const path_parameters: CreateParameters = {
        resource: {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: parents,
        },
        fields: 'id',
    }
    const result = await drive.files.create(path_parameters);
    return result;

}
/**
 * @description - generates new ids 
 * @param drive - google drive api
 * @returns - Objects with new ids
 */
async function generateIds(drive: drive_v3.Drive) {
    const files = 'kind, space, ids';
    const path_parameters: GenerateIdsParameters = {
        count: 5,
        fields: files,
    }
    const result = await drive.files.generateIds(path_parameters);
    return result;
}
/**
 * @description - updates file with trashed true
 * @param drive - google drive api
 * @param fileId - the id of the file to be trashed
 * @returns - with the updated file
 */
async function sendToTrash( drive: drive_v3.Drive, fileId: string) {
    const path_parameters: UpdateParameters = {
        fileId: fileId,
        fields: 'kind, id, name',
        resource: {
            trashed: true,
            // name: 'Takeout3'
        },
    }
    const result = await drive.files.update(path_parameters);
    return result;
}
/**
 * @description - watches a file for changes
 * @param drive - google drive api
 * @param fileId - the id of the file to be watched
 * @returns - with the watched file
 */
async function watch(drive: drive_v3.Drive, fileId: string) {
    // use https://github.com/uuidjs/uuid to generate a unique id
    const channelId = "01234567-89ab-cdef-0123456789ab";
    const path_parameters:WatchParameters = {
        fileId: fileId,
        supportsAllDrives: true,
        requestBody: {
            id: channelId,
            type: "web_hook",
            address: "https://example.com/webhook",
            payload: true,
        },
    }

    const result = await drive.files.watch(path_parameters);
    return result;
}
/**
 * @description - unwatches a previously watched file
 * @param drive - google drive api
 * @returns - status of the resquest
 */
async function stopWatch(drive: drive_v3.Drive) {
    const channelId = "01234567-89ab-cdef-0123456789ab";
    const path_parameters:stopWatchParameters = {
        requestBody: {
            id: channelId,
            // get this from the response of watch
            resourceId: 'e8JIF-ZXO8Vjrpr1G7FTerQExrw', 
        },
    }
    const result = await drive.channels.stop(path_parameters);
    return result;
}
/**
 * @description - cleans the trash can
 * @param drive - google drive api
 * @returns - status of the resquest
 */
async function emptyTrash(drive: drive_v3.Drive) { 
    return await drive.files.emptyTrash({});
}

export {
    listFiles,
    uploadFile,
    copyFile,
    getFolder,
    nodeFetch_getFolderId,
    getFileId,
    getFile,
    deleteFile,
    exportFile,
    writeStream,
    createFolder,
    generateIds,
    sendToTrash,
    watch,
    stopWatch,
    emptyTrash,
}
```