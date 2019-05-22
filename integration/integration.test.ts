import * as webpack from "webpack";
import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";

function webpackErrorHandler(err, stats) {
  if (err || stats.hasErrors()) {
    if (err) {
      console.error(err);
    }
  }
  console.log(
    stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true // Shows colors in the console
    })
  );
}

describe("integration basic", () => {
  let mainStats;
  beforeAll(done => {
    /* The example app webpack compilation should take less than 10 minutes */
    jest.setTimeout(600 * 1000);
    webpack(require("./example/webpack.vendor.config"), (err, stats) => {
      webpackErrorHandler(err, stats);
      webpack(require("./example/webpack.config"), (err, stats) => {
        webpackErrorHandler(err, stats);
        done();
      });
    });
  });
  it("@angular/* dependencies are in dll bundles", () => {
    const { sources } = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "./example/src/dist/main.js.map"),
        "utf8"
      )
    );

    const entryPoint = "fesm5";
    const angularSources = sources.filter(
      path => path.includes("@angular") && path.includes(entryPoint)
    );
    expect(angularSources.length).toBeGreaterThan(0);
    for (const source of angularSources) {
      expect(source).toMatch(/^webpack\:\/\/\/delegated/);
    }
  });
  it("@ngtools/webpack should build lazy loaded modules", () => {
    const expectedChunkPath = path.join(__dirname, "./example/src/dist/1.js");
    expect(fs.existsSync(expectedChunkPath)).toBe(true);
  });
});

describe("integration ngx-build-plus", () => {
  let mainStats;
  beforeAll(done => {
    /* The ngx-build-plus app webpack compilation should take less than 10 minutes */
    jest.setTimeout(600 * 1000);
    webpack(require("./ngx-build-plus/webpack.vendor.config"), (err, stats) => {
      webpackErrorHandler(err, stats);
      exec(
        "npm run build",
        {
          cwd: path.resolve(__dirname, "./ngx-build-plus")
        },
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          done();
        }
      );
    });
  });

  it("@angular/* dependencies are in dll bundles", () => {
    const { sources } = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          "./ngx-build-plus/dist/ngx-build-plus/main.js.map"
        ),
        "utf8"
      )
    );

    const entryPoint = "fesm5";
    const angularSources = sources.filter(
      path => path.includes("@angular") && path.includes(entryPoint)
    );
    expect(angularSources.length).toBeGreaterThan(0);
    for (const source of angularSources) {
      expect(source).toMatch(/^webpack\:\/\/\/delegated/);
    }
  });
  it("@ngtools/webpack should build lazy loaded modules", () => {
    const expectedChunkPath = path.join(
      __dirname,
      "./ngx-build-plus/dist/ngx-build-plus/foo-foo-module.js"
    );
    expect(fs.existsSync(expectedChunkPath)).toBe(true);
  });
});
