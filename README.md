ember-cli-deploy-appsignal
==============================================================================

Ember Deploy plugin for automatically uploading your JS SourceMaps to Appsignal for their FrontEnd reporting product.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-deploy-appsignal
```


Usage
------------------------------------------------------------------------------

Add the following to `deploy.js`:

```js
ENV.appsignal = {
  appName: '<your app name>',
  pushApiKey: '<your push key, not front-end key>',
  environment: '<optional: appsignal environment, default is deployTarget>'
  appsignalUrl: '<optional: default is https://appsignal.com/api/sourcemaps'
}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
