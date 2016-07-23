(function() {
    'use strict';

    /**
     *
     * Chat
     */

    var Sequelize = require('sequelize');

    module.exports = function(sequelize) {
        var chat = sequelize.define('Chat', {
            name: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            content: {
                type: Sequelize.STRING(255),
                allowNull: false
            }
        }, {
            paranoid: true
        });
        return chat;
    };

})();
