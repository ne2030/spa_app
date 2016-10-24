
'use strict';

// custom js module
let app = require('./config/express')();
    sequelize = require('./config/sequelize'); //eslint-disable-line

/**
 *   Sequelize setting
 */

// (function(){
//     sequelize.sequelize.sync({
//         force: true
//     }).then(function () {
//         require('./config/seed.js')(sequelize);
//     });
// })();

require('./config/passport')();

app.listen(8080, () => console.log('server is running at localhost:8080')); //eslint-disable-line
