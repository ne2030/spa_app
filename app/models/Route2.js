'use strict';

/**
 *
 * Route 2
 */

let Sequelize = require('sequelize');

module.exports = function(sequelize) {
    let route2 = sequelize.define('Route2', {
        name: {
            type: Sequelize.STRING(10),
            allowNull: true
        },
        content: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
    }, {
        paranoid: true
    });
    return route2;
};
