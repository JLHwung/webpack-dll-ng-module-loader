#!/bin/bash

rm -rf integration/example/src/dist \
&& rm -rf node_modules/webpack-dll-ng-module-loader \
&& cp -r dist node_modules/webpack-dll-ng-module-loader \
&& cp -r dist integration/ngx-build-plus/node_modules/webpack-dll-ng-module-loader \
&& cp package.json integration/ngx-build-plus/node_modules/webpack-dll-ng-module-loader