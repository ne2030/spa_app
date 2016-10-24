'use strict';

/**
 *
 * 유저 Refresh Token
 */

module.exports = function(sequelize, DataTypes) {
    var RefreshToken = sequelize.define('RefreshToken', {
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            expiredAt: {
                type: DataTypes.DATE,
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
