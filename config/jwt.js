'use strict';

let jwt = require('jsonwebtoken'),
    config = require('./config');

module.exports.core = jwt;

module.exports.generateToken = (user, aud, next) => {
try {
    let jwtOptions = {
        algorithm: 'HS256',
        expiresIn: '3h',
        issuer: config.sessionIssuer,
        audience: aud
    };
    let token = jwt.sign(user, config.sessionSecret, jwtOptions);
    return token;
} catch (e) { return next(e); }
};

module.exports.authenticateToken = (token, aud) => {
try {
    let jwtOptions = {
        algorithm: 'HS256',
        expiresIn: '3h',
        issuer: config.sessionIssuer,
        audience: aud
    };
    let user = jwt.verify(token, config.sessionSecret, jwtOptions);
    return user;
} catch (e) { e.error = 'error'; return e; }
};
