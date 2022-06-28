# google-drive-api-usage-examples
An easy to understand guide on how to use the Google Drive API

---

The [Google Drive API Documentation][1] may not be the easiest API in the world, unfortunately is written in a way that is hard to read for the new user. In this repo I try to unveil the mystery and remove the complexity for this API.

Table of contents
=================

<!--ts-->
   * [What its used for](#what-its-used-for)
   * [Types of Authentication](#types-of-authentication)
      * [API key](#api-key)
      * [OAuth client ID](#oauth-client-id)
      * [Service account](#service-account)
<!--te-->

What its used for
=================
In simple words: it help us to send HTTP requests in a way that the Google servers can accept, allowing us to manipulate the the Google Drive files.

Types of Authentication
=====
The first step is to decide the authentication method, here are the option and use cases:

* API key
  -------
  Use this credential to access publicly-available data anonymously, this means files set as "[anyone with the link][2]".

* OAuth client ID
  ---------------
  Use this credential to authenticate as an end user and access their data. Requires your app to request and receive consent from the user.

* Service account
  ---------------
  Use this credential to authenticate as a service account or to access files on behalf of Google Workspace. This service accounts are accessible only through the API.
  
How to Get:
=====
  * API key
    ---------

    Go to https://console.cloud.google.com/apis/credentials > Create Credentials > API Key
  
    !Alert: This API key is normally exposed to the public, so you may want to restrict the API, because its usage will count towards your account.
 
  * OAuth client ID
    ---------------
    Go to https://console.cloud.google.com/apis/credentials > Create Credentials > OAuth client ID
 
  * Service Accounts
    ----------------
    Go to https://console.cloud.google.com/apis/credentials > Create Credentials > Service account

Authenticating our Application
==============================
## Using API key
https://github.com/FredySandoval/google-drive-api-usage-examples/blob/7b61859674203aa2827085a51452b0c50056470e/lib/authenticating-our-application/examples.js#L1-L14

## Using Google OAuth client ID







[1]: https://developers.google.com/drive/api/
[2]: https://support.google.com/drive/answer/2494822?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Cshare-a-file-publicly
