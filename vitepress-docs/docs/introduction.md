---
title: What is the Google Drive API
---
## What is the Google Drive API?

In simple words: it help us to send HTTP requests in a way that the Google servers can accept, allowing us to manipulate the the Google Drive files.

## Types of Authentication
The first step is to decide the authentication method, here are the option and use cases:

* #### API key
  Use this credential to access publicly-available data anonymously, this means files set as "[anyone with the link][2]".

* #### OAuth client ID
  Use this credential to authenticate as an end user and access their data. Requires your app to request and receive consent from the user.

* #### Service account
  Use this credential to authenticate as a service account or to access files on behalf of Google Workspace. This service accounts can't be accessed using a username or password.

## How to Get the corresponding API credentials:
  * #### API key
    Go to https://console.cloud.google.com/apis/credentials > Create Credentials > API Key
  
    !Alert: This API key is normally exposed to the public, so you may want to restrict the API, because its usage will count towards your account.
 
  * #### OAuth client ID

    Go to https://console.cloud.google.com/apis/credentials > Create Credentials > OAuth client ID

  * #### Service Accounts
    Go to https://console.cloud.google.com/apis/credentials > Create Credentials > Service account


[2]: https://support.google.com/drive/answer/2494822?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Cshare-a-file-publicly