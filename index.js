'use strict';
var BasePlugin = require('ember-cli-deploy-plugin');
var fs = require("fs");
var request = require('request-promise');
var throat = require('throat');

module.exports = {
  name: require('./package').name,

  createDeployPlugin(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,
      requiredConfig: ['pushApiKey'],

      defaultConfig: {
        appName: (context) => context.project.pkg.name,
        environment: (context) => context.deployTarget,
        appsignalUrl: 'https://appsignal.com/api/sourcemaps'
      },

      didUpload(context) {
        const baseURL = this.readConfig('appsignalUrl');
        const pushApiKey = this.readConfig('pushApiKey');
        const appName = this.readConfig('appName');
        const environment = this.readConfig('environment');

        const uri = `${baseURL}?push_api_key=${pushApiKey}&app_name=${appName}&environment=${environment}`;

        const assetMap = JSON.parse(fs.readFileSync(`./${context.config.build.outputPath}/assets/assetMap.json`));

        const files = Object.keys(assetMap.assets).filter((key) => key.endsWith('.js'));

        const revisionKey = context.revisionData.revisionKey;

        const requests = files.map(throat(1, file => {
          const cdnURL = `${assetMap.prepend}${assetMap.assets[file]}`;
          const mapFile = `${context.config.build.outputPath}/${assetMap.assets[file.replace(".js", ".map")]}`;

          if (assetMap.assets[file.replace(".js", ".map")] === undefined) { return; }

          const formData = {
            'name[]': cdnURL,
            'revision': revisionKey,
            'file': fs.createReadStream(mapFile)
          };

          return request.post({uri, formData});
        }));

        return Promise.all(requests)
                .then(values => this.log('finished requests', values))
                .catch((err) => this.log(err));
      }
    });

    return new DeployPlugin();
  }
};
