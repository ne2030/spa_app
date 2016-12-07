'use strict';

// custom js module
let app = require('./config/express')();

const port = 80;
const devPort = 8000;

require('./config/passport')();

/**
 *   Sequelize setting
 */
let createSeed = function(){ //eslint-disable-line
  let sequelize = require('./config/sequelize'); //eslint-disable-line
  sequelize.sequelize.sync({
    force: true
  }).then(function () {
    require('./config/seed.js')(sequelize);
  });
};

// createSeed();

process.env.NODE_ENV == 'development' ?
  app.listen(devPort, () => console.log('server is running at localhost:8000')) // eslint-disable-line
  :
  app.listen(port, () => console.log('production server is running')); //eslint-disable-line
