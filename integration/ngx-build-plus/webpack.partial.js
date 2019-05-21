const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require("./src/assets/Dllvendor-manifest.json")
    })
  ]
};
