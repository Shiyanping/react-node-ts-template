const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const tsConfig = ts.createProject('./tsconfig.json');
const gulpTslint = require('gulp-tslint');
const tslint = require('tslint');
const program = tslint.Linter.createProgram('./tsconfig.json');

const entry = './src/server/**/*.ts';

function buildprod() {
  return gulp
    .src(entry)
    .pipe(
      gulpTslint({
        program
      })
    )
    .pipe(
      gulpTslint.report({
        allowWarnings: true
      })
    )
    .pipe(tsConfig())
    .pipe(
      babel({
        // ignore: ['./src/server/config/*.js'],
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

let build = gulp.series(buildprod);

gulp.task('default', build);
