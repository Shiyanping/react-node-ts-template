const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const eslint = require('gulp-eslint');

const entry = './src/server/**/*.js';

// 开发环境
function builddev() {
  return gulp
    .src(entry)
    .pipe(
      babel({
        babelrc: false,
        plugins: [
          [
            '@babel/plugin-proposal-decorators',  // 编译装饰器
            {
              legacy: true
            }
          ],
          'transform-es2015-modules-commonjs'
        ]
      })
    )
    .pipe(gulp.dest('dist'));
}

// 上线环境
function buildprod() {
  return gulp
    .src(entry)
    .pipe(
      babel({
        ignore: ['./src/server/config/*.js'],
        babelrc: false,
        plugins: [
          [
            '@babel/plugin-proposal-decorators',
            {
              legacy: true
            }
          ],
          'transform-es2015-modules-commonjs'
        ]
      })
    )
    .pipe(gulp.dest('dist'));
}

// 对代码进行检查环境
function buildlint() {
  return gulp
    .src(['scripts/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

/**
 * 清洗环境
 * rollup 将没用的代码进行过滤
 * rollup-plugin-replace 对一些判断语句中判断线上测试的逻辑变量进行替换，上线时，只显示线上的环境代码
 */
function buildconfig() {
  return gulp
    .src(entry)
    .pipe(
      rollup({
        output: {
          format: 'cjs'
        },
        plugins: [
          replace({
            'process.env.NODE_ENV': JSON.stringify('production')
          })
        ],
        input: './src/server/config/index.js'
      })
    )
    .pipe(gulp.dest('./dist'));
}

let build = gulp.series(builddev);

if (process.env.NODE_ENV == 'development') {
}

if (process.env.NODE_ENV == 'production') {
  build = gulp.series(buildprod, buildconfig);
}

if (process.env.NODE_ENV == 'lint') {
  build = gulp.series(buildlint);
}

gulp.task('default', build);
