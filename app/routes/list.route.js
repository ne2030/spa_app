'use strict';

let controller = require('../controller/api/route2.server.controller.js');

module.exports = function(router) {
    router.route('/api/route2')
      .get(controller.getRoute2)
      .post(controller.makeItem);
    router.route('/api/route2/:itemId')
      .delete(controller.deleteItem);

    return router;
};
