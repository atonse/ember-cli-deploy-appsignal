'use strict';
var BasePlugin = require('ember-cli-deploy-plugin');

module.exports = {
  name: require('./package').name,

  createDeployPlugin(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,
      requiredConfig: ['pushApiKey'],

      defaultConfig: {
        filePrefixes: (context) => ['vendor', context.project.pkg.name],
        appName: (context) => context.project.pkg.name,
        environment: (context) => context.deployTarget,
        appsignalUrl: 'https://appsignal.com/api/sourcemaps'
      },

      didUpload(context) {
        console.log(context.distFiles);
      //   curl -k -X POST -H 'Content-Type: multipart/form-data' \
      // -F 'name[]=https://d26keeai591nv2.cloudfront.net/assets/vendor-7958d9dcb7e60fe198d757abc7c2de5c.js' \
      // -F 'revision=76013f44' \
      // -F 'file=@tmp/deploy-dist/assets/vendor-c0be5e7e19658f8efd10dbfde3b4fc53.map' \
      // 'https://appsignal.com/api/sourcemaps?push_api_key=${appsignalPushApiKey}&app_name=AccioAlert&environment=demo'

      }
    });

    return new DeployPlugin();
  }
};
