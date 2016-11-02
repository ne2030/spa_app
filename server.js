
'use strict';

// custom js module
let app = require('./config/express')();



/**
 *   Sequelize setting
 */

// let sequelize = require('./config/sequelize'); //eslint-disable-line
// (function(){
//     sequelize.sequelize.sync({
//         force: true
//     }).then(function () {
//         require('./config/seed.js')(sequelize);
//     });
// })();



require('./config/passport')();

app.listen(8000, () => console.log('server is running at localhost:8000')); //eslint-disable-line
