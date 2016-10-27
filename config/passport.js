'use strict';

let passport = require('passport'),
    path = require('path');

let config = require('./config');

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
    config.getGlobbedFiles(__dirname + '/strategies/*.js').forEach((strategy) => {
        console.log(strategy); //eslint-disable-line
        require(path.resolve(strategy))();
    });
};
