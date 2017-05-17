
const path = require("path");
const webpack = require("webpack");
const fs = require('fs');
const spsave = require("spsave").spsave;
const opn = require('opn');
const webpackConfig = require("./webpack.config.dev");
const compiler = webpack(webpackConfig);

const scriptPath = "build/bundle.js";
if (fs.existsSync(scriptPath)) fs.unlinkSync(scriptPath);

compiler.run(function(err, stats) {

  const options = require("./auth");

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
