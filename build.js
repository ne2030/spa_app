const uglify = require('uglify-js-harmony')
    , fs = require('fs')
    , config = require('./config/config')
    , mkdirp = require('mkdirp');

const js = [
  'server.js', 'config/**/*.js', 'app/controller**/*.js', '!app/controller/modules/**/*.js'
];

let result, dir, cache =[];

config.getGlobbedFiles(js).map(path => {
  //make directory tree
  dir = path.replace(/\/(\w+\.)+js/, '');
  dir = dir.replace(/spa_app/, 'spa_app/dist');
  if (cache.indexOf(dir) !== -1) mkdirp(dir, err => err ? console.error(err):''); //eslint-disable-line

  result = uglify.minify(path);

  //out file - destination: /dist , name: ~.min.js
  path.replace(/spa_app/, 'spa_app/dist');
  path.replace(/\.js/, '.min.js');
  fs.writeFile(path, result, (err) => {
    console.error(err); //eslint-disable-line
  });
});
