/**
 * copy pasted from https://github.com/angular/angular/blob/master/packages/core/src/linker/system_js_ng_module_factory_loader.ts
 */

import {
  Injectable,
  Optional,
  NgModuleFactory,
  NgModuleFactoryLoader,
  Compiler,
  ɵivyEnabled as ivyEnabled
} from "@angular/core";

const _SEPARATOR = "#";

const FACTORY_CLASS_SUFFIX = "NgFactory";
declare var System: any;

/**
 * Configuration for WebpackNgModuleLoader.
 * token.
 *
 * @experimental
 */
export abstract class WebpackNgModuleLoaderConfig {
  /**
   * Prefix to add when computing the name of the factory module for a given module name.
   */
  // TODO(issue/24571): remove '!'.
  factoryPathPrefix!: string;

  /**
   * Suffix to add when computing the name of the factory module for a given module name.
   */
  // TODO(issue/24571): remove '!'.
  factoryPathSuffix!: string;
}

const DEFAULT_CONFIG: WebpackNgModuleLoaderConfig = {
  factoryPathPrefix: "",
  factoryPathSuffix: ".ngfactory"
};

/**
 * WebpackDllNgModuleLoader that uses webpack `import()` to load NgModuleFactory
 * @experimental
 */
@Injectable()
export class WebpackDllNgModuleLoader implements NgModuleFactoryLoader {
  private _config: WebpackNgModuleLoaderConfig;

  constructor(
    private _compiler: Compiler,
    @Optional() config?: WebpackNgModuleLoaderConfig
  ) {
    this._config = config || DEFAULT_CONFIG;
  }

  load(path: string): Promise<NgModuleFactory<any>> {
    const legacyOfflineMode = !ivyEnabled && this._compiler instanceof Compiler;
    return legacyOfflineMode
      ? this.loadFactory(path)
      : this.loadAndCompile(path);
  }

  private loadAndCompile(path: string): Promise<NgModuleFactory<any>> {
    let [module, exportName] = path.split(_SEPARATOR);
    if (exportName === undefined) {
      exportName = "default";
    }

    return import(module)
      .then((module: any) => module[exportName])
      .then((type: any) => checkNotEmpty(type, module, exportName))
      .then((type: any) => this._compiler.compileModuleAsync(type));
  }

  private loadFactory(path: string): Promise<NgModuleFactory<any>> {
    let [module, exportName] = path.split(_SEPARATOR);
    let factoryClassSuffix = FACTORY_CLASS_SUFFIX;
    if (exportName === undefined) {
      exportName = "default";
      factoryClassSuffix = "";
    }

    return import(
      this._config.factoryPathPrefix + module + this._config.factoryPathSuffix
    )
      .then((module: any) => module[exportName + factoryClassSuffix])
      .then((factory: any) => checkNotEmpty(factory, module, exportName));
  }
}

function checkNotEmpty(
  value: any,
  modulePath: string,
  exportName: string
): any {
  if (!value) {
    throw new Error(`Cannot find '${exportName}' in '${modulePath}'`);
  }
  return value;
}
