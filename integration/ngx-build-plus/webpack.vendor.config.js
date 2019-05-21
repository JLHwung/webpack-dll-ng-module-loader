var webpack = require("webpack");
var path = require("path");

module.exports = {
  mode: "production",
  context: __dirname,
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: {
    DllVendor: [
      "@angular/core",
      "@angular/common",
      "@angular/router",
      "@angular/platform-browser",
      "@angular/platform-browser-dynamic",
      "rxjs",
      "zone.js",
      "core-js"
    ]
  },
  output: {
    path: path.join(__dirname, "./src/assets"),
    filename: "[name].js",
    library: "DllVendor"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "./src/assets", "[name]-manifest.json"),
      name: "DllVendor"
    })
  ]
};
