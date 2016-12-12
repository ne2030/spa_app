'use strict';

// custom js module
const webpack = require('webpack')
    , webpackDevServer =  require('webpack-dev-server');

const app = require('./config/express')();
const sequelize = require('./config/sequelize');

const port = 80;
const devPort = 3002;

require('./config/passport')();



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
}

app.listen(port, () => console.log('production server is running on port' + port));
