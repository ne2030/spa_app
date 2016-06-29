(function() {
    'use strict';

    /**
     *
     * Route 2
     */

    var Sequelize = require('sequelize');

    module.exports = function(sequelize) {
        var route2 = sequelize.define('Route2', {
            name: {
                type: Sequelize.STRING(10),
                allowNull: true
            },
            content: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            visitedAt: {
                type: Sequelize.DATE
            }
        }, {
            paranoid: true
        });
        return route2;
    };

})();
