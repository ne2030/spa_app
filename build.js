const uglify = require('uglify-js')
    , fs = require('fs')
    , config = require('./config/config')
    , mkdirp = require('mkdirp')
    , path = require('path');

let js = [
  'server.js', 'config/**/*.js', 'app/**/*.js'
];

js = js.map(e => path.join(__dirname, e));

let result, dir, dest, cache =[];


config.getGlobbedFiles(js).map(path => {
  //make directory tree
  dir = path.replace(/\/(\w+\.)+js/, '');
  dir = dir.replace(/spa_app/, 'spa_app/dist');
  if (cache.indexOf(dir) !== -1) mkdirp(dir, err => err ? console.error(err):'');

  result = uglify.minify(path);
  // out file - destination: /dist , name: ~.min.js
  dest = path.replace(/spa_app/, 'spa_app/dist');
  dest = dest.replace(/\.js/, '.min.js');
  fs.writeFile(path, result, (err) => {
    console.error(err);
  });
});
