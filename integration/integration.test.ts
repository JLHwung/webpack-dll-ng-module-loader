import * as webpack from "webpack";
import * as fs from "fs";
import * as path from "path";

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

describe("integration", () => {
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
