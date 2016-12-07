const gulp = require('gulp')
    // , concat = require('gulp-concat')
    , uglifyjs = require('uglify-js-harmony') //eslint-disable-line
    , eslint = require('gulp-eslint')
    , Cache = require('gulp-file-cache')
    , minifier = require('gulp-uglify/minifier') //eslint-disable-line
    , babel = require('gulp-babel')
    , pump = require('pump');

const uglify = require('gulp-uglify');

let cache = new Cache();

const js = {
  server: 'server.js',
  config: 'config/**/*.js',
  api: ['app/controller**/*.js', '!app/controller/modules/**/*.js']
};

// 자바스크립트 압축
gulp.task('server', ['config'], (cb) => {
	pump([
    gulp.src(js),
    cache.filter(),
    babel({ presets: [ 'es2015' ]}),
    uglify(),
    cache.cache(),
    gulp.dest('dist/js')
  ], cb);
});

gulp.task('config', ['api'], (cb) => {
	pump([
    gulp.src(js),
    cache.filter(),
    babel({ presets: [ 'es2015' ]}),
    uglify(),
    cache.cache(),
    gulp.dest('dist/js')
  ], cb);
});

gulp.task('api', ['lint'], (cb) => {
	pump([
    gulp.src(js),
    cache.filter(),
    babel({ presets: [ 'es2015' ]}),
    uglify(),
    cache.cache(),
    gulp.dest('dist/js')
  ], cb);
});

gulp.task('lint', () => {
  pump([
    gulp.src(js),
    cache.filter(),
    eslint(),
    cache.cache(),
    eslint.format(),
    eslint.failAfterError()
  ]);
});

//기본 task 설정
gulp.task('default', ['combine-js']);
