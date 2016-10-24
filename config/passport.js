'use strict';

let passport = require('passport'),
    path = require('path');

let config = require('config');

module.exports = () => {
    //Serialize Sessions
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    //Deserialize Sessions
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    //Get strategies
    config.getGlobbedFiles('./strategies/*.js').forEach((strategy) => {
        require(path.resolve(strategy))();
    });
};
