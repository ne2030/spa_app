'use strict';

let passport = require('passport'),
    bcrypt = require('bcrypt'),
    jwt = require('./jwt'),
    config = require('../../../../config/config'),
    db = require('../../../../config/sequelize'),
    User = db.user;

/**
* POST: /auth/login
* @param req
* @param res
* @param next
*/

module.exports.login = (req, res, next) => {

    // let userId = req.body.userId,
    //     password = req.body.password;

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            next({message: info || err, statusCode: 401});
        } else {
            let refreshToken = create_refreshToken();

            let create_refreshToken = () => {
                let salt = bcrypt.genSaltSync(10);
                return bcrypt.hashSync(config.tokenSecret, salt);
            };

            let jwToken = jwt.generateToken({userId: user.userId}, req.hostname, next);
            res.send({'refreshToken': refreshToken, 'jwToken': jwToken, 'userId': user.userId });
        }
    })(req, res, next);
};

/**
* POST: /auth/refresh
* @param req
* @param res
* @param next
*/

// module.exports.refresh = (req, res, next) => {
//     next();
//     return 'e';
//
// };
