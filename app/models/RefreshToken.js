'use strict';

/**
 *
 * 유저 Refresh Token
 */

 let Sequelize = require('sequelize');

module.exports = function(sequelize) {
    var RefreshToken = sequelize.define('RefreshToken', {
            refreshToken: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            expiredAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },
        {
            associate: function(models) {
                RefreshToken.belongsTo(models.User, {foreignKey: {allowNull: false}});
            }
        }
    );
    return RefreshToken;
};
