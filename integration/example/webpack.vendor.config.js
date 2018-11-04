var webpack = require("webpack")
var path = require("path")

module.exports = {
    mode: "production",
    context: __dirname,
    resolve: {
        extensions: [".js", ".jsx"]
    },
    entry: {
        vendor: ["@angular/core", "@angular/common", "@angular/router", "@angular/platform-browser", "@angular/platform-browser-dynamic", "rxjs", "zone.js", "core-js"]
    },
    output: {
        path: path.join(__dirname, "./src/dist/vendor"),
        filename: "MyDll.[name].js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "./src/dist/vendor", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ]
};
