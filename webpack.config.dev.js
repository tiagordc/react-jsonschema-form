var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        query: {
          plugins: ["transform-object-rest-spread","transform-class-properties"],
          presets: ['react', 'es2015']
        },
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "node_modules", "codemirror", "mode", "javascript"),
        ],
      }
    ]
  }
};
