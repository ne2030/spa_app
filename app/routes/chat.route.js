'use strict';

let controller = require('../controller/api/chat.server.controller.js');

module.exports = function(router) {
    router.route('/api/chat')
        .get(controller.getChat)
        .post(controller.createChat);
    router.route('/api/chat/:chatId')
        .delete(controller.deleteChat);

    return router;
};
