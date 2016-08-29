(function() {
    'use strict';

    /**
     *
     * Profile
     */

    var Sequelize = require('sequelize');

    module.exports = function(sequelize) {
        var profile = sequelize.define('Profile', {
            skill: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            type: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            mastery: {
                type: Sequelize.INTEGER(3),
                allowNull: false
            }
        }, {
            paranoid: true
        });
        return profile;
    };

})();
