import { drive_v3 } from "googleapis";
/**
 * available property names
 */
export enum PropertyName {
    id = 'id',
    name = 'name',
    mimeType = 'mimeType',
    description = 'description',
    starred = 'starred',
    trashed = 'trashed',
    explicitlyTrashed = 'explicitlyTrashed',
    parents = 'parents',
    properties = 'properties',
    appProperties = 'appProperties',
    spaces = 'spaces',
    version = 'version',
    webContentLink = 'webContentLink',
    webViewLink = 'webViewLink',
    iconLink = 'iconLink',
    thumbnailLink = 'thumbnailLink',
    viewedByMe = 'viewedByMe',
    viewedByMeTime = 'viewedByMeTime',
    createdTime = 'createdTime',
    modifiedTime = 'modifiedTime',
    modifiedByMeTime = 'modifiedByMeTime',
    sharedWithMeTime = 'sharedWithMeTime',
    sharingUser = 'sharingUser',
    owners = 'owners',
    lastModifyingUser = 'lastModifyingUser',
    shared = 'shared',
    ownedByMe = 'ownedByMe',
    viewersCanCopyContent = 'viewersCanCopyContent',
    writersCanShare = 'writersCanShare',
    permissions = 'permissions',
    folderColorRgb = 'folderColorRgb',
    originalFilename = 'originalFilename',
    fullFileExtension = 'fullFileExtension',
    fileExtension = 'fileExtension',
    md5Checksum = 'md5Checksum',
    size = 'size',
    quotaBytesUsed = 'quotaBytesUsed',
    headRevisionId = 'headRevisionId',
    contentHints = 'contentHints',
    imageMediaMetadata = 'imageMediaMetadata',
    videoMediaMetadata = 'videoMediaMetadata',
    capabilities = 'capabilities',
    isAppAuthorized = 'isAppAuthorized',
    hasThumbnail = 'hasThumbnail',
    thumbnailVersion = 'thumbnailVersion',
    modifiedByMe = 'modifiedByMe',
    trashingUser = 'trashingUser',
    trashedTime = 'trashedTime',
    teamDriveId = 'teamDriveId',
    hasAugmentedPermissions = 'hasAugmentedPermissions',
    permissionIds = 'permissionIds',
    copyRequiresWriterPermission = 'copyRequiresWriterPermission',
    exportLinks = 'exportLinks',
    driveId = 'driveId',
    shortcutDetails = 'shortcutDetails',
    contentRestrictions = 'contentRestrictions',
    resourceKey = 'resourceKey',
    linkShareMetadata = 'linkShareMetadata',
};

enum Method {
    GET = 'GET',
    POST = 'POST',
}

type Methods = Method.GET | Method.POST;

export interface Options {
    rootUrl?: string;
    method?: Methods;
    encoding?: string;
}

export interface ListParameters {
    corpora?: string;
    corpus?: string;
    driveId?: string;
    fields?: string;
    includeItemsFromAllDrives?: boolean;
    includePermissionsForView?: string;
    includeTeamDriveItems?: boolean;
    orderBy?: string;
    pageSize?: number;
    pageToken?: string;
    q?: string;
    spaces?: string;
    supportsAllDrives?: boolean;
}

export interface CreateParameters {
    fields?: string;
    media?: Media;
    resource?: ResourceForCreate;
    uploadType?: string;
    enforceSingleParent?: boolean;
    ignoreDefaultVisibility?: boolean;
    includePermissionsForView?: string;
    keepRevisionForever?: boolean;
    ocrLanguage?: string;
    supportsAllDrives?: boolean;
    useContentAsIndexableText?: boolean;
}

interface ResourceForCreate {
    addProperties?: Object;
    contentHints?: Object;
    createTime?: string;
    description?: string;
    folderColorRgb?: string;
    id?: string;
    mimeType?: string;
    modifiedTime?: string;
    name?: string;
    originalFilename?: string;
    parents?: string[];
    properties?: Object;
    shortcutDetails?: Object;
    starred?: boolean;
    viewedByMeTime?: string;
    writersCanShare?: boolean;
}

interface Media {
    body?: Object;
    mimeType?: string;
}

export interface CopyParameters {
    fileId?: string;
    fields?: string;
    resource?: ResourceForCopy;
    enforceSingleParent?: boolean;
    ignoreDefaultVisibility?: boolean;
    includePermissionsForView?: string;
    keepRevisionForever?: boolean;
    ocrLanguage?: string;
    supportsAllDrives?: boolean;
}

interface ResourceForCopy {
    addProperties?: Object;
    contentHints?: Object;
    contentRestrictions?: Object;
    copyRequiresWriterPermission?: boolean;
    description?: string;
    id?: string;
    mimeType?: string;
    modifiedTime?: string;
    name?: string;
    parents?: string[];
    properties?: Object;
    starred?: boolean;
    viewedByMeTime?: string;
    writersCanShare?: boolean;
}
export interface GetParameters {
    fileId?: string;
    fields?: string;
    acknowledgeAbuse?: boolean;
    includePermissionsForView?: string;
    supportsAllDrives?: boolean;
}
export interface DeleteParameters {
    fileId?: string;
    fields?: string;
    supportsAllDrives?: boolean;
}

export interface ExportParameters {
    fileId?: string;
    mimeType?: string;
    fields?: string;
}

export interface GenerateIdsParameters {
    count?: number;
    fields?: string;
    space?: string;
    type?: string;
}

export interface UpdateParameters {
    fileId?: string;
    fields?: string;
    resource?: ResourceForUpdate;
    uploadType?: string;
    addParents?: string;
    includePermissionsForView?: string;
    keepRevisionForever?: boolean;
    ocrLanguage?: string;
    removeParents?: string;
    supportsAllDrives?: boolean;
    useContentAsIndexableText?: boolean;
}

interface ResourceForUpdate {
    addProperties?: Object;
    contentHints?: Object;
    contentRestrictions?: Object;
    copyRequiresWriterPermission?: boolean;
    description?: string;
    folderColorRgb?: string;
    mimeType?: string;
    modifiedTime?: string;
    name?: string;
    originalFilename?: string;
    properties?: Object;
    starred?: boolean;
    trashed?: boolean;
    viewedByMeTime?: string;
    writersCanShare?: boolean;
}

export interface WatchParameters {
    fileId?: string;
    fields?: string;
    acknowledgeAbuse?: boolean;
    supportsAllDrives?: boolean;
    requestBody?: RequestBody;
}
interface RequestBody {
    kind?: string;
    id?: string;
    resourceId?: string;
    resourceUri?: string;
    token?: string;
    expiration?: string;
    type?: string;
    address?: string;
    payload?: boolean;
    params?: { [key: string]: string }  ;
}

export interface stopWatchParameters {
    requestBody?: RequestBody;
}
interface RequestBody {
    kind?: string;
    id?: string;
    resourceId?: string;
    resourceUri?: string;
    token?: string;
    expiration?: string;
    type?: string;
    address?: string;
    payload?: boolean;
    params?: { [key: string]: string }  ;
}

export interface CredentialsM {
    installed: {
        client_id: string;
        client_secret: string;
        redirect_uris: string[];
    };
}