---
title: Stop
---
# stop
This will stop or unwatches the  provious watch file
```js 
const channelId = "01234567-89ab-cdef-0123456789ab";
const path_parameters = {
    requestBody: {
        id: channelId,
        // The watch function returns this value
        resourceId: 'abcdeF-GHIJKLMNOPQRSTUVW',
    },
}
const result = await drive.channels.stop(path_parameters, options);
```
## HTTP raw request
```text
POST https://www.googleapis.com/drive/v3/channels/stop
  
Authorization: Bearer {auth_token_for_current_user}
Content-Type: application/json

{
  "id": "wjfowjo-cjwocjw-jcowjow-cjowcjwo-cjwojwj",
  "resourceId": "fwojfwojfo"
}
```