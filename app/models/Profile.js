(function() {
    'use strict';

    /**
     *
     * Profile
     */

    var Sequelize = require('sequelize');

    module.exports = function(sequelize) {
        var profile = sequelize.define('Profile', {
            name: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            content: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
        }, {
            paranoid: true
        });
        return profile;
    };

})();
