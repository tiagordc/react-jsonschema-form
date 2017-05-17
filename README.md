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

## deploy

npm start

## usage

```javascript

var myDiv = document.getElementById("myDiv");
var mySchema = { 
    "type": "object", 
    "required": [ "Title" ], 
    "properties": { "Title": { "type": "string", "title": "Title" } } 
};
var myList = "My List Name";
var myItem = null;

//window.ReactForm.load(myDiv, myList, myItem);
window.ReactForm.loadWithSchema(myDiv, mySchema, myList, myItem);

myDiv.addEventListener('loading', function (event) {
  //event.preventDefault();
  console.log('loading',event.detail);
});

myDiv.addEventListener('loaded', function (event) {
  console.log('loaded', event.detail);
});

myDiv.addEventListener('saving', function (event) {
  //event.preventDefault();
  console.log('saving', event.detail);
});

myDiv.addEventListener('saved', function (event) {
  console.log('saved', event.detail);
});

```