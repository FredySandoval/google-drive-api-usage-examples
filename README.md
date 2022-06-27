# google-drive-api-usage-examples
An easy to understand guide on how to use the Google Drive API

---

The [Google Drive API Documentation][1] may not be the easiest API in the world, unfortunately is written in a way that is hard to read for the new user. In this repo I try to unveil the mystery and remove the complexity for this API.
[1]: https://developers.google.com/drive/api/

Table of contents
=================

<!--ts-->
   * [What its used for](#what-its-used-for)
   * [Usage](#usage)
      * [STDIN](#stdin)
      * [Local files](#local-files)
      * [Remote files](#remote-files)
      * [Multiple files](#multiple-files)
      * [Combo](#combo)
      * [Auto insert and update TOC](#auto-insert-and-update-toc)
      * [GitHub token](#github-token)
      * [TOC generation with Github Actions](#toc-generation-with-github-actions)
   * [Tests](#tests)
   * [Dependency](#dependency)
   * [Docker](#docker)
     * [Local](#local)
     * [Public](#public)
<!--te-->

What its used for
=================
In simple words: it help us to send HTTP requests in a way that the Google servers can accept, allowing us to manipulate the the Google Drive files.

