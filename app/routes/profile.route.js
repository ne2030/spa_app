(function(){
    'use strict';

    var controller = require('../controller/api/profile.server.controller.js');

    module.exports = function(router) {
        router.route('/api/profile')
            .get(controller.getProfile);

        return router;
    };
    
})();
