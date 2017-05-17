
const path = require("path");
const webpack = require("webpack");
const fs = require('fs');
const spsave = require("spsave").spsave;
const opn = require('opn');
const webpackConfig = require("./webpack.config.dev");
const compiler = webpack(webpackConfig);

compiler.run(function(err, stats) {

  const options = require("./auth");
  const scriptPath = path.join(stats.compilation.outputOptions.path, stats.compilation.outputOptions.filename);

  let file = options.file;
  file.fileContent = fs.readFileSync(scriptPath);

  spsave(options.options, options.credentials, file)
    .then(function(){
        opn(options.debug.url, { app: options.debug.browser });
    })
    .catch(function(err){
        console.log(err);
    });

});
