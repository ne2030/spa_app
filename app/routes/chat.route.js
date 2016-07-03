(function(){
    'use strict';

    var controller = require('../controller/api/chat.server.controller.js');

    module.exports = function(router) {
        router.route('/api/chat')
            .get(controller.getChat)
            .post(controller.createChat);
        router.route('/api/chat/:chatId')
            .get(controller.deleteChat);
        
        return router;
    };
})();
