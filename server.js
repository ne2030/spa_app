(function() {

    'use strict';

    // node_module dependencies
    var path = require('path');

    // custom js module
    var config = require('./config/config'),
        sequelize = require('./config/sequelize');

        require('./config/express')();

     /**
      *   Sequelize setting
      */

    // var seed = function () {
    //     sequelize.sequelize.sync({
    //         force: true
    //     }).then(function () {
    //         require('./config/seed')(sequelize);
    //     });
    // }();

})();
