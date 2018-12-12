var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var cssnano = require('gulp-cssnano');
var header = require('gulp-header');
var autoprefixer = require('autoprefixer');
var pkg = require('./package.json');

gulp.task('watch', function () {
    gulp.watch('src/**', ['build:style', 'build:example']);
});
gulp.task('build:style', function () {
    gulp
        .src(['src/pages/**/*.less', 'src/component/**/*.less'], {
            base: 'src'
        })
        .pipe(less())
        .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
        .pipe(
            cssnano({
                zindex: false,
                autoprefixer: false,
                discardComments: {
                    removeAll: true
                }
            })
        )
        .pipe(
            rename(function (path) {
                path.extname = '.wxss';
            })
        )
        .pipe(gulp.dest('dist'));
});
gulp.task('build:example', function () {
    gulp
        .src(
            [
                'src/app.js',
                'src/app.json',
                'src/app.wxss',
                'src/api/**',
                'src/assets/**',
                'src/pages/**',
                'src/utils/**',
                'src/component/**',
                '!src/pages/**/*.less',
                '!src/component/**/*.less'
            ], {
                base: 'src'
            }
        )
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'build:style', 'build:example']);