'use strict';

let passport = require('passport'),
    bcrypt = require('bcrypt'),
    co = require('co'),
    jwt = require('../../../../config/jwt'),
    config = require('../../../../config/config'),
    db = require('../../../../config/sequelize'),
    RefreshToken = db.RefreshToken;

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

    co(function* (){
    try {
        if (err || !user) {
            next({message: info || err, statusCode: 401});
        } else {
            let refreshToken = create_refreshToken();

            yield RefreshToken.create({
                refreshToken: refreshToken,
                expiredAt: Date.now() + 60 * 1000 * 24 * 30,
                UserId: user.id
            });

            let jwToken = jwt.generateToken({userId: user.userId}, req.hostname, next);
            res.send({'refreshToken': refreshToken, 'jwToken': jwToken, 'userId': user.userId });
        }
    } catch (e) { next(e); }
    });
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


function create_refreshToken(){
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(config.tokenSecret, salt);
}
