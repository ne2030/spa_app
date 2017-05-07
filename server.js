'use strict';

const http = require('http'),
    https = require('https'),
    fs = require('fs');

// custom js module
const webpack = require('webpack')
    , webpackDevServer =  require('webpack-dev-server');

const app = require('./config/express')();
// const sequelize = require('./config/sequelize');

const port = 80;
const devPort = 3002;
const securePort = 443;

require('./config/passport')();

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};


/**
 *   Sequelize setting
 */
// (() => {
//   sequelize.sequelize.sync({
//     force: true
//   }).then(function () {
//     require('./config/seed.js')(sequelize);
//   });
// })();


if(process.env.NODE_ENV == 'development') {
  console.log('Server is running on development');

  const config = require('./webpack.dev.config');
  let compiler = webpack(config);
  let devServer = new webpackDevServer(compiler, config.devServer);
  devServer.listen(devPort, () => {
    console.log('webpack-dev-server is listening on port', devPort);
  });
} else {
    http.createServer(app).listen(port, () => console.log('production server is running on port' + port));
    https.createServer(options, app).listen(securePort, () => console.log('https server is also running on port 443'));
}
