export default {
  title: 'Google Drive API',
  description: 'A comprensible guide for the Google Drive API',
  lang: 'en-US',
  head: [
    [
      'script',
      { async:'', src:'https://www.googletagmanager.com/gtag/js?id=G-YTTD136PRT' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-YTTD136PRT');`
    ]
  ],
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: "https://github.com/FredySandoval"}
    ],
    sidebar: {
      '/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What\'s the Drive API?', link: '/introduction'},
            { text: 'Authentication', link: '/authentication'},
            { text: 'Sending Request', link: '/sendingrequest'},
          ]
        },
        {
          text: 'File Methods',
          items: [
            { text: 'Copy', link: '/copy' },
            { text: 'Create', link: '/create' },
            { text: 'Upload', link: '/upload' },
            { text: 'Delete', link: '/delete' },
            { text: 'Empty', link: '/empty' },
            { text: 'Export', link: '/export' },
            { text: 'Generateids', link: '/generateids' },
            { text: 'Get', link: '/get' },
            { text: 'List', link: '/list' },
            { text: 'Update', link: '/update' },
            { text: 'Watch', link: '/watch' },
            { text: 'Stop', link: '/stop' },
          ]
        },
        {
          text: 'Code Examples',
          items: [
            { text: 'utils.ts', link: '/utils'},
            { text: 'types.ts', link: '/types'},
            { text: 'usageexamples.ts', link: '/usageexamples'},
            { text: 'operations.ts', link: '/operations'},
            { text: 'ExpressJS example', link: '/expressexample'},
            { text: 'OAuth2Client.ts', link: '/oauth2client'},
          ]
        }
      ]
    },
    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2022-present <a href="https://github.com/FredySandoval">Fredy Sandoval</a>'
    }
  }
}