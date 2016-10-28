'use strict';

/**
 *
 * User
 */

let Sequelize = require('sequelize'),
    bcrypt = require('bcrypt');

module.exports = function(sequelize) {
    let User = sequelize.define('User', {
        email: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rolse: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER(3),
            allowNull: false
        },
        resetPasswordToken: {
            type: Sequelize.STRING,
            unique: true
        },
        resetPasswordExpires: {
            type: Sequelize.DATE
        },
        lastSignIn: {
            type: Sequelize.DATE
        }
    }, {
        paranoid: true,
        instanceMethods: {
            authenticate: function(text) {
                return bcrypt.compareSync(text, this.password);
            },
            hashPassword: function(password) {
                var salt = bcrypt.genSaltSync(10);
                return bcrypt.hashSync(password, salt);
            }
        }
        // DB 참조 (추후 활용 시도)
        // associate: function(models) {
        //         User.hasMany(models.UserDevice, {
        //             foreignKey: {
        //                 name: 'userId',
        //                 allowNull: false
        //             }
        //         });
        //         User.hasMany(models.TruckManagement, {
        //             foreignKey: {
        //                 name: 'userId',
        //                 allowNull: false
        //             }
        //         });
        //     }
    });

    User.beforeCreate(passwordCheckHook);
    User.beforeUpdate(passwordCheckHook);

    function passwordCheckHook(user) {
        if (user && user.password && typeof(user.password) == 'string') {
            if (user.password.length >= 6 && user.password.length <= 4096) {
                user.password = user.hashPassword(user.password);
            } else {
                throw {message: '비밀번호 길이를 체크해주십시오'};
            }
        }
    }

    return User;
};
