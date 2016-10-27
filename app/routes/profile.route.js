'use strict';

let controller = require('../controller/api/profile.server.controller.js');

module.exports = function(router) {
    router.route('/api/stack')
        .get(controller.getStack)
        .post(controller.createStack);
    return router;
};
