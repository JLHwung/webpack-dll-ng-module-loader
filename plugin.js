"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var CheatAngularCompilerResourcePlugin = /** @class */ (function() {
  function CheatAngularCompilerResourcePlugin() {}
  CheatAngularCompilerResourcePlugin.prototype.apply = function(compiler) {
    compiler.hooks.contextModuleFactory.tap(
      "cheat-angular-compiler-resource",
      function(cmf) {
        var webpackNgModuleLoaderPath = require.resolve(
          "webpack-dll-ng-module-loader/package.json"
        );
        var webpackNgModuleDirName = fs.realpathSync(
          path.dirname(webpackNgModuleLoaderPath)
        );
        var angularCorePackagePath = require.resolve(
          "@angular/core/package.json"
        );
        var angularCoreDirName = fs.realpathSync(
          path.dirname(angularCorePackagePath)
        );
        cmf.hooks.afterResolve.tapAsync(
          "cheat-angular-compiler-resource",
          function(result, callback) {
            if (!result) {
              return callback();
            }
            if (result.resource.startsWith(webpackNgModuleDirName)) {
              result.resource = angularCoreDirName;
              return callback(undefined, result);
            }
            return callback(undefined, result);
          }
        );
      }
    );
  };
  return CheatAngularCompilerResourcePlugin;
})();
exports.CheatAngularCompilerResourcePlugin = CheatAngularCompilerResourcePlugin;
