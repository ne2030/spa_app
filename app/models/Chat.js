'use strict';

/**
 *
 * Chat
 */

let Sequelize = require('sequelize');

module.exports = function(sequelize) {
    let Chat = sequelize.define('Chat', {
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
    return Chat;
};
