# Example of Integration to `ngx-build-plus`

## A step-by-step guid of integration to `ngx-build-plus`

1. Install `ngx-build-plus`

```
ng add ngx-build-plus
```

2. Create your extra webpack configuration `webpack.partial.js`. It should include `DllReferencePlugin` to work with Webpack DLL. Take [./webpack.partial.js] as an example.

3. It's better we add the dll building step to the `package.json`

```json
{
  "build:dll": "webpack --config webpack.vendor.config.js"
}
```

And run `npm run build:dll` to generate the DLL library.

4. The generated DLL vendor is `src/assets/DllVendor.js`. As the Angular/CLI does not recognize its existence, we manually add it to the `script` tag of your `src/index.html`

```html
<script src="./assets/DllVendor.js"></script>
```

Note that as is the requirement of webpack dll, the dll vendor should come before any other JavaScript files.

5. Add the following command line arguments to the `ng build` and `ng serve` section in `package.json`. These arguments instruct `ngx-build-plus` to read extra webpack config and consume our integration plugin.

```json
{
  "start": "ng serve --plugin webpack-dll-ng-module-loader/ngx-build-plus --extraWebpackConfig ./webpack.partial.js",
  "build": "ng build --plugin webpack-dll-ng-module-loader/ngx-build-plus --extraWebpackConfig ./webpack.partial.js"
}
```

6. Run `npm start` or `npm run build` to enjoy the building speed improvements brought by webpack dll. 🍻

## Example usage

The whole [`integration/ngx-build-plus`](.) is an example project show asing how to use this library with `ngx-build-plus`.
You can run the project by

```
npm install
npm run build:dll
npm run start
```

And visit the demo website on http://localhost:4200. The funtionality of this demo is identical to the plain version [example](../example).
