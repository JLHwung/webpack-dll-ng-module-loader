import * as path from "path";
import * as fs from "fs";
import { Compiler, Plugin, compilation } from "webpack";
import ContextModuleFactory = compilation.ContextModuleFactory;

export class CheatAngularCompilerResourcePlugin implements Plugin {
  apply(compiler: Compiler) {
    compiler.hooks.contextModuleFactory.tap(
      "cheat-angular-compiler-resource",
      (cmf: ContextModuleFactory) => {
        const webpackNgModuleLoaderPath = require.resolve(
          "webpack-dll-ng-module-loader/package.json"
        );
        const webpackNgModuleDirName = fs.realpathSync(
          path.dirname(webpackNgModuleLoaderPath)
        );

        const angularCorePackagePath = require.resolve(
          "@angular/core/package.json"
        );
        const angularCoreDirName = fs.realpathSync(
          path.dirname(angularCorePackagePath)
        );

        cmf.hooks.afterResolve.tapAsync(
          "cheat-angular-compiler-resource",
          (result: any, callback: (err?: Error, request?: any) => void) => {
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
  }
}
