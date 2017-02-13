'use strict';

let controller = require('../controller/api/profile.server.controller.js');

module.exports = function(router) {
    router.route('/api/stack')
        .get(controller.getStack)
        .post(controller.createStack);
    router.route('/api/stack/:id')
        .delete(controller.deleteStack);
    return router;
};
