/**
 * copy pasted from https://github.com/angular/angular/blob/master/packages/core/src/linker/system_js_ng_module_factory_loader.ts
 */
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
import { Injectable, Optional, Compiler } from "@angular/core";
var _SEPARATOR = "#";
var FACTORY_CLASS_SUFFIX = "NgFactory";
/**
 * Configuration for WebpackNgModuleLoader.
 * token.
 *
 * @experimental
 */
var WebpackNgModuleLoaderConfig = /** @class */ (function() {
  function WebpackNgModuleLoaderConfig() {}
  return WebpackNgModuleLoaderConfig;
})();
export { WebpackNgModuleLoaderConfig };
var DEFAULT_CONFIG = {
  factoryPathPrefix: "",
  factoryPathSuffix: ".ngfactory"
};
/**
 * WebpackDllNgModuleLoader that uses webpack `import()` to load NgModuleFactory
 * @experimental
 */
var WebpackDllNgModuleLoader = /** @class */ (function() {
  function WebpackDllNgModuleLoader(_compiler, config) {
    this._compiler = _compiler;
    this._config = config || DEFAULT_CONFIG;
  }
  WebpackDllNgModuleLoader.prototype.load = function(path) {
    var offlineMode = this._compiler instanceof Compiler;
    return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
  };
  WebpackDllNgModuleLoader.prototype.loadAndCompile = function(path) {
    var _this = this;
    var _a = path.split(_SEPARATOR),
      module = _a[0],
      exportName = _a[1];
    if (exportName === undefined) {
      exportName = "default";
    }
    return import(module)
      .then(function(module) {
        return module[exportName];
      })
      .then(function(type) {
        return checkNotEmpty(type, module, exportName);
      })
      .then(function(type) {
        return _this._compiler.compileModuleAsync(type);
      });
  };
  WebpackDllNgModuleLoader.prototype.loadFactory = function(path) {
    var _this = this;
    var _a = path.split(_SEPARATOR),
      module = _a[0],
      exportName = _a[1];
    var factoryClassSuffix = FACTORY_CLASS_SUFFIX;
    if (exportName === undefined) {
      exportName = "default";
      factoryClassSuffix = "";
    }
    return import(this._config.factoryPathPrefix +
      module +
      this._config.factoryPathSuffix)
      .then(function(module) {
        return module[exportName + factoryClassSuffix];
      })
      .then(function(factory) {
        return checkNotEmpty(factory, module, exportName);
      });
  };
  WebpackDllNgModuleLoader = __decorate(
    [
      Injectable(),
      __param(1, Optional()),
      __metadata("design:paramtypes", [Compiler, WebpackNgModuleLoaderConfig])
    ],
    WebpackDllNgModuleLoader
  );
  return WebpackDllNgModuleLoader;
})();
export { WebpackDllNgModuleLoader };
function checkNotEmpty(value, modulePath, exportName) {
  if (!value) {
    throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
  }
  return value;
}
