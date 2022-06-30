const nodefetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const resource_representation = [
    'id',
    'name',
    'mimeType',
    'trashed',
    'thumbnailLink',
    'hasThumbnail',
    'webContentLink',
    'webViewLink',
    'iconLink',
    'parents',
    'thumbnailVersion',
    'owners',
].join(', ');
/**
 * During development, you can change the url to another
 * for example an Ngrok using ncat server because it only accepts https
 * how to tunnel ncat to ngrok https://gist.github.com/FredySandoval/ff34e87f83e4c4dc4a771df44fc7e31c
 * useful for testing 
 * @param {object} options - options for the request
 */
// const options = {
//     rootUrl: 'https://www.googleapis.com',
// }
const options = {
    rootUrl: 'https://efa5-190-104-121-217.ngrok.io/'
}
String.prototype.hashCode = function () {
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
/**
 * 
 * @param {google.drive(v3)} drive - google drive api 
 * @param {integer} pageSize - number of files to return 
 * @param {string=} folderName - optional - name of the folder to search 
 * @param {string=} nextPageToken  - optional - token to continue the search
 * @returns 
 */
async function listFiles(drive, pageSize = 5, folderName, nextPageToken = "") {
    let query = "";
    let folderId;
    if (typeof pageSize !== "number") JSON.parse(pageSize);
    if (folderName) {
        console.log('true for folderName - line 44');
        const folder = await getFolder(drive, folderName);
        folderId = folder?.data?.files[0]?.id || "";
        query = `'${folderId}' in parents`;
    }
    console.log('hash1', nextPageToken.hashCode());
    const files = "kind, nextPageToken ,files(" + resource_representation + ")";
    const path_parameters = {
        q: query,
        pageSize: pageSize,
        fields: files,
        pageToken: nextPageToken,
    }
    const listFiles = await drive.files.list(path_parameters);
    return listFiles;
}
/**
 * @description - uploads a file to google drive
 * @param {google.drive(v3)} drive - google drive api
 * @param {string} pathfile - path to the file to upload
 * @param {Object[]} folderId - array of folder ids
 * @returns {Object} - file object created
 */
async function uploadFile(drive, pathfile, name = 'default', folderId = []) {
    function isStream(stream) {
        return stream !== null
            && typeof stream === 'object'
            && typeof stream.pipe === 'function';
    }
    function isReadableStream(stream) {
        return isStream(stream)
            && stream.readable !== false
            && typeof stream._read === 'function'
            && typeof stream._readableState === 'object';
    }
    if (!isReadableStream(pathfile)) throw new Error('File is not readable');
    const body = typeof pathfile === 'string' ?
        fs.createReadStream(pathfile) : pathfile;
    const path_parameters = {
        resource: {
            'name': name,
            parents: folderId,
        },
        media: {
            body: body,
        },
        fields: resource_representation,
    }

    const result = await drive.files.create(path_parameters);
    return result;
}
/**
 * @description - copies a file to a new folder 
 * @param {google.drive(v3)} drive - google drive api
 * @param {string} newName - new name of the file
 * @param {string} fileId - id of the file to copy
 * @param {string} targetFolderId - id of the folder to copy to
 * @returns {Object} - file object copied
 */
async function copyFile(drive, name, fileId, targetFolderId = []) {
    console.log('t', typeof targetFolderId !== 'string');
    if (typeof targetFolderId !== 'string' &&
        typeof targetFolderId !== 'object') { throw new Error('Invalid targetFolderId parameter') }

    const parents = typeof targetFolderId === 'string' ? [targetFolderId] : targetFolderId;
    const path_parameters = {
        fileId: fileId,
        fields: 'kind, id, name',
        resource: {
            name: name,
            parents: parents,
        },
    }
    const result = await drive.files.copy(path_parameters, options);
    return result;
}
/**
 * @description - gets the folder Object
 * @param {google.drive(v3)} drive - google drive api
 * @param {string} folderName - name of the folder to search
 * @returns {Object} - folder object
 */
async function getFolder(drive, folderName = "") {
    const files = "kind, nextPageToken ,files(" + resource_representation + ")";
    const path_parameters = {
        q: `mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}'`,
        pageSize: 10,
        fields: files,
    }
    const list = await drive.files.list(path_parameters, options);
    return list;
}
/**
 * @description - Example of how to send the request with node-fetch 
 * @param {string} folderName - name of the folder to search
 * @param {string} TOKEN - access_token to use
 * @returns {Object} - folder object 
 */
async function nodeFetch_getFolderId(folderName, TOKEN) {
    const rootUrl = 'https://www.googleapis.com/drive/v3/files';
    const files = "kind, nextPageToken ,files(" + resource_representation + ")";
    const path_parameters = {
        q: `mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}'`,
        pageSize: 10,
        fields: files,
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
 * @param {google.drive(v3)} drive google drive api
 * @param {string} name - name of the folder to search
 * @returns {Object} - file object
 */
async function getFileId(drive, name = "") {
    const files = "kind, nextPageToken ,files(" + resource_representation + ")";
    const path_parameters = {
        q: `name = '${name}'`,
        pageSize: 5,
        fields: files,
    }
    const result = await drive.files.list(path_parameters, options);
    return result;
}
/**
 * @description - gets the file
 * @param {google.drive(v3)} drive - google drive api
 * @param {string} fileId - id of the file to get
 * @returns {Object} - file object
 */
async function getFile(drive, fileId) {
    const path_parameters = {
        fileId: fileId,
        fields: 'kind, id, name',
    }
    const result = await drive.files.get(path_parameters, options);
    return result;
}
/**
 * @description - deletes a file
 * @param {google.drive(v3)} drive - google drive api
 * @param {string} fileId - id of the file to delete
 * @returns {Object} - file object
 */
async function deleteFile(drive, fileId) {
    const path_parameters = {
        fileId: fileId,
        fields: 'kind, id, name',
    }
    const result = await drive.files.delete(path_parameters);
    return result;
}
/**
 * @description - exports a files in the provided mime type
 * @param {google.drive(v3)} drive - google drive api
 * @param {string} fileId - id of the file to be exported
 * @param {string} mimeType - mime type of the file to be exported
 * @returns {Object} - Stream of the file to be saved by fs.writeFile
 */
async function exportFile(drive, fileId, mimeType) {
    const result = await drive.files.export(
        {
            fileId: fileId,
            mimeType: mimeType,
            fields: 'kind, id, name',
        },
        {
            responseType: 'stream',
            rootUrl: 'https://www.googleapis.com',
        }
    );
    return result;
}
/**
 * @description - writes the stream provided
 * @param {Object} stream - stream of the file to be saved by fs.writeFile
 * @param {string} fileName - name of the file to be saved
 */
function writeStream(stream, fileName) {
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
 * @param {google.drive(v3)} drive - google drive api
 * @param {string} folderName - name of the folder bo be created
 * @param {string} parent - optional - id of the parent folder
 */
async function createFolder(drive, folderName, parent = []) {
    let parents = [];
    if (typeof parent === 'string' && parent.length != 0) parents.push(parent);

    const files = "kind, nextPageToken ,files(" + resource_representation + ")";
    const path_parameters = {
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
 * @param {google.drive(v3)} drive - google drive api
 * @returns {Object} - Objects with new ids
 */
async function generateIds(drive, count = 5) {
    const files = 'kind, space, ids';
    const path_parameters = {
        count: count,
        fields: files,
    }
    const result = await drive.files.generateIds(path_parameters);
    return result;
}
/**
 * @description - updates file with trashed true
 * @param {google.drive(v3)} drive - google drive api
 * @param {string} fileId - the id of the file to be trashed
 * @returns {Object} - with the updated file
 */
async function sendToTrash(drive, fileId) {
    const path_parameters = {
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
 * @param {google.drive(v3)} drive - google drive api
 * @param {string} fileId - the id of the file to be watched
 * @returns {Object} - with the watched file
 */
async function watch(drive, fileId) {
    // use https://github.com/uuidjs/uuid to generate a unique id
    const channelId = "01234567-89ab-cdef-0123456789ab";
    const path_parameters = {
        fileId: fileId,
        supportsAllDrives: true,
        supportsTeamDrives: true,
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
 * @param {google.drive(v3)} drive - google drive api
 * @returns {Object} - status of the resquest
 */
async function stopWatch(drive) {
    const channelId = "01234567-89ab-cdef-0123456789ab";
    const path_parameters = {
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
 * @param {google.drive(v3)} drive - google drive api
 * @returns {Object} - status of the resquest
 */
async function emptyTrash(drive) {
    return await drive.files.emptyTrash({});
}
module.exports = {
    getFolder,
    listFiles,
    uploadFile,
    getFile,
    copyFile,
    deleteFile,
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
}