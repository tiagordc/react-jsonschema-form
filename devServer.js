
const path = require("path");
const webpack = require("webpack");
const fs = require('fs');
const spsave = require("spsave").spsave;
const opn = require('opn');
const webpackConfig = require("./webpack.config.dev");
const compiler = webpack(webpackConfig);
const rimraf = require("rimraf");

rimraf("build", function () { });

compiler.run(function(err, stats) {

  let options = require("./auth");
  let scriptPath = path.join(stats.compilation.outputOptions.path, stats.compilation.outputOptions.filename);
  let file = options.file;
  file.fileContent = fs.readFileSync(scriptPath);

  spsave(options.options, options.credentials, file)
    .then(function() {
        opn(options.debug.url, { app: options.debug.browser });
        rimraf("build", function () { });
        rimraf("lib", function () { });
    });

});
