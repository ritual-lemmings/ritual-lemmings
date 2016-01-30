var path = require("path");

module.exports = {
  entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, "public"),
      publicPath: "/public/",
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.sass$/, loader: 'style!css!autoprefixer!sass?indentedSyntax'},
      { test: /pixi.js/, loader: "script" },
      { test: /phaser.js/, loader: "script" }
    ]
  }
}
