# sp-react-form

A React component to bring JSON Schema Web Forms to SharePoint

[![Build Status](https://travis-ci.org/tiagordc/sp-react-form.svg?branch=master)](https://travis-ci.org/tiagordc/sp-react-form)

## auth.js

```javascript
module.exports = {
    options: {
        siteUrl: '[SITE URL]',
        checkin: true,
        checkinType: 1
    },
    credentials: {
        clientId: '[CLIENT ID]',
        clientSecret: '[CLIENT SECRET]',
        realm: '[REALM]'
    },
    file: {
        folder: 'Style Library/Scripts',
        fileName: 'sp.react.form.js'
    },
    debug: {
        url: '[DEBUG URL]',
        browser: 'chrome'
    }
}
```

## instructions

npm start
