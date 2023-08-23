const { src, dest, watch, parallel, series } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const htmlmin = require("gulp-htmlmin");
const notify = require("gulp-notify");
const cleanCSS = require("gulp-clean-css");
const webpack = require("webpack-stream");
const del = require("del");
const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");
const fileinclude = require("gulp-file-include");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");

// const srcPath = "./src";
// const distPath = "./dist";

// !----------------dev
// -----------------------api
const devApi = () => {
  return src("./src/api/**")
    .pipe(dest("./dist/api"))
    .pipe(browserSync.stream());
};
// -----------------------favicon
const favicon = () => {
  return src("./src/*.ico")
    .pipe(newer("./dist"))
    .pipe(imagemin({ progressive: true }))
    .pipe(dest("./dist"));
};
// -----------------------html
const devHtml = () => {
  return (
    src("./src/index.html")
      // для подключения модулей html @@include("./test.html")
      .pipe(
        fileinclude({
          prefix: "@@",
          basepath: "@file",
        })
      )
      // .pipe(htmlmin({ collapseWhitespace: true })) //минимизация
      .pipe(dest("./dist"))
      .pipe(browserSync.stream())
  );
};
//-------------------------scss
const devStyles = () => {
  return (
    src("./src/assets/scss/**/*.scss")
      .pipe(sass().on("error", notify.onError()))
      // .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(dest("./dist"))
      .pipe(browserSync.stream())
  );
};
// -----------------------js
const scripts = () => {
  return (
    src("./src/assets/js/main.js")
      .pipe(
        webpack({
          output: {
            filename: "main.js",
          },
          devtool: "source-map",
          module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: [["@babel/preset-env", { targets: "defaults" }]],
                  },
                },
              },
            ],
          },
        })
      )
      // .pipe(sourcemaps.init())
      // .pipe(sourcemaps.write("."))
      .pipe(dest("./dist"))
      .pipe(browserSync.stream())
  );
};
// ------------------------img
const devImg = () => {
  return src("./src/assets/img/**")
    .pipe(newer("./dist/img"))
    .pipe(imagemin({ progressive: true }))
    .pipe(dest("./dist/img"));
};

// -----------------------fonts
const devFonts = () => {
  return src("./src/assets/fonts/**").pipe(dest("./dist/fonts"));
};

// ----------------------delete fnc
const clean = () => {
  return del("./dist/*");
};

// -----------------------server
const browsersync = () => {
  browserSync.init({
    open: true,
    server: "./dist",
    // port: 4000,
  });
  watch("./src/index.html", devHtml);
  watch("./src/assets/scss/**/*.scss", devStyles);
  watch("./src/assets/js/**/*.js", scripts);
  watch("./src/assets/img/**", devImg);
  watch("./src/assets/fonts/**", devFonts);
  watch("./src/*.ico", favicon);
  watch("./src/api/**", devApi);
};
// ---------------------------tasks for start of console
exports.default = series(
  clean,
  parallel(devHtml, scripts, devImg, devFonts, favicon, devApi),
  devStyles,
  browsersync
);
exports.htmlInclude = devHtml;
exports.buildStyles = devStyles;
exports.scripts = scripts;
// exports.devFonts = devFonts;

// !!---------------build

// -----------------------------html
const htmlBuild = () => {
  return src("./src/index.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist"));
};
// ----------------------------style
const cssBuild = () => {
  return src("./src/assets/scss/**/*.scss")
    .pipe(sass().on("error", notify.onError()))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("./dist"));
};
// ---------------------------script
const jsBuild = () => {
  return src("./src/assets/js/main.js")
    .pipe(
      webpack({
        output: {
          filename: "main.js",
        },
        // devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [["@babel/preset-env", { targets: "defaults" }]],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(dest("./dist"));
};

exports.build = series(
  clean,
  parallel(htmlBuild, cssBuild, jsBuild, devFonts, devImg, favicon, devApi),
  browsersync
);
