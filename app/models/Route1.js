(function() {
    'use strict';

    /**
     *
     * Route 1
     */

    var Sequelize = require('sequelize');

    module.exports = function(sequelize) {
        var route1 = sequelize.define('Route1', {
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
        return route1;
    };

})();
