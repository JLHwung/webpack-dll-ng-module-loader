var webpack = require('webpack');

var AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
var path = require('path');
var CheatAngularCompilerResourcePlugin = require("webpack-dll-ng-module-loader/plugin").CheatAngularCompilerResourcePlugin;
var DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') !== -1;
var DEV = DEV_SERVER || process.env.DEV;

module.exports = {
    mode: DEV ? 'development' : 'production',
    entry: [ "./src/polyfills.ts", "./src/main.ts" ],
    context: __dirname,

    devtool: DEV ? 'eval' :'source-map',

    output: {
        path: path.join(__dirname, "src/dist"),
        publicPath: 'dist/',
        filename: "[name].js",
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    optimization: {
        splitChunks: { chunks: 'all', },
    },

    plugins: [
        new CheatAngularCompilerResourcePlugin(),
        new AngularCompilerPlugin({
            "tsConfigPath": path.resolve(__dirname, 'tsconfig.json'),
            "mainPath": path.resolve(__dirname, 'src/main.ts'),
            "sourceMap": true,
            "skipCodeGeneration": true
        }),
        new webpack.DllReferencePlugin({
            manifest: require("./src/dist/vendor/vendor-manifest.json")
        })
    ],

    module: {
        rules: [
            { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, use: [ "@ngtools/webpack" ] },
        ]
    }
};
