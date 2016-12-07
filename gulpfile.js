const gulp = require('gulp')
    // , concat = require('gulp-concat')
    , eslint = require('gulp-eslint')
    , Cache = require('gulp-file-cache')
    , babel = require('gulp-babel')
    , pump = require('pump')
    , uglify = require('gulp-uglify')
    , config = require('./config/config')
    , path = require('path');

// const minifier = require('gulp-uglify/minifier')
//     , uglifyjs = require('uglify-js-harmony');

let cache = new Cache();

let js = [ 'server.js', 'config/**/*.js', 'app/**/*.js' ];

js = js.map(e => path.join(__dirname, e));

js = config.getGlobbedFiles(js);
console.log(js);

// 자바스크립트 압축
gulp.task('minify', ['lint'], (cb) => {
	pump([
    gulp.src(js),
    cache.filter(),
    babel({ presets: [ 'es2015' ]}),
    uglify(),
    cache.cache(),
    gulp.dest('dist')
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
gulp.task('default', ['minify']);
