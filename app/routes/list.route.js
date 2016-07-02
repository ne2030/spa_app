(function(){
    'use strict';

    var controller1 = require('../controller/api/route1.server.controller.js'),
        controller2 = require('../controller/api/route2.server.controller.js');

    module.exports = function(router) {
        router.route('/api/route1').get(controller1.getRoute1);
        router.route('/api/route2')
            .get(controller2.getRoute2)
            .post(controller2.createItem);
        
        return router;
    };

})();
