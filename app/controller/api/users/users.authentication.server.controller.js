'use strict';

let passport = require('passport'),
    bcrypt = require('bcrypt'),
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
    // check body
    req.checkBody('userEmail', '이메일을 입력해주세요').notEmpty();
    req.checkBody('password', '패스워드를 입력해주세요').notEmpty();
    let errors = req.validationErrors();
    if (!errors) {
        passport.authenticate('local', (err, user, info) => {
            if (err || !user) {
                next({message: info.message || err.message, statusCode: 401});
            } else {

            let refreshToken = createRefreshToken();

            RefreshToken.create({
                refreshToken: refreshToken,
                expiredAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
                UserId: user.id
            }).then(() => {
                let _user = {id: user.id, email: user.email};
                let jwToken = jwt.generateToken(_user, req.hostname, next);
                res.send({'refreshToken': refreshToken, 'jwToken': jwToken, 'user': user.email });
            });
            }
        })(req, res, next);
    } else {
        res.send(errors[0]);
    }
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



function createRefreshToken(){
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(config.tokenSecret, salt);
}
