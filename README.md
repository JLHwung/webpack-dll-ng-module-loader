# webpack-dll-ng-module-loader

[![Build Status](https://travis-ci.com/JLHwung/webpack-dll-ng-module-loader.svg?branch=master)](https://travis-ci.com/JLHwung/webpack-dll-ng-module-loader)

A workaround on the [issue] that `@ngtools/webpack` fail to build lazy modules when `@angular/core` is bundled into a webpack dll.

If you are not bundling `@angular/core` to webpack dll, you probably never need this plugin.

## Install

```
yarn add webpack-dll-ng-module-loader
```

## Usage

### 1. Use `WebpackDllNgModuleLoader` on your application

Import `WebpackDllNgModuleLoader` in the root module `app.module.ts`:

```ts
import { NgModuleFactoryLoader } from "@angular/core";
import { WebpackDllNgModuleLoader } from "webpack-dll-ng-module-loader";
```

Then provide the `NgModuleFactoryLoader` using `WebpackDllNgModuleLoader`

```ts
{ provide: NgModuleFactoryLoader, useClass: WebpackDllNgModuleLoader }
```

### 2. Webpack Configuration

If you are hand crafting the webpack configuration of the whole Angular Project, please refer to 2.1 for how to get it works.

If you are using @angular/cli, it is [recommended](https://github.com/angular/angular-cli/issues/10618#issuecomment-425506339) to install [`ngx-build-plus`](https://github.com/manfredsteyer/ngx-build-plus) and skip the 2.1 section and see [ngx-build-plus integration guide](integration/ngx-build-plus/README.md) for a step-by-step integration guide to `ngx-build-plus`.

#### 2.1 Use `CheatAngularCompilerResourcePlugin` on your webpack configuration

This section is for those who have ejected Angular CLI configuration or built the webpack configuration from the ground.
Import `CheatAngularCompilerResourcePlugin` in the webpack configuration `webpack.config.js`.

```js
const {
  CheatAngularCompilerResourcePlugin
} = require("webpack-dll-ng-module-loader/plugin");
```

Then add `CheatAngularCompilerResourcePlugin` **before** the `AngularCompilerPlugin` on your webpack configuration. Here the order matters since the plugin cheats `AngularCompilerPlugin` to process async resources issued by `webpack-dll-ng-module-loader`.

```js
plugins: [
  new CheatAngularCompilerResourcePlugin(),
  new AngularCompilerPlugin({
    /* compiler options */
  })
];
```

## Example

The [`integration/example`](integration/example) folder is a demo of using `webpack-dll-ng-module-loader` in an angular application with `@angular/*` dependencies bundled in a dll vendors. While the plugin tests against this application, the configuration is overly simplified to demonstrate the plugin usage only and thus is far from optimized.

You can run the following command to serve the built application

```
npm test && cd integration/example && python3 -m http.server 8611
```

Then visit `http://localhost:8611` to see the demo.

## Note

- Do not add `webpack-dll-ng-module-loader` to your dll entries, otherwise it will fail with the same reason of this [issue].

- This plugin relies on the internals of `@ngtools/webpack` and `@angular/core`, though it works well with Angular 6.0 but in the future it might fail within the minor/patch version of angular without any notice. Use at your own risk.

[issue]: https://github.com/angular/angular-cli/issues/4565
