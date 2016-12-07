'use strict';

let path = require('path');
let config = require('./config');

module.exports = () => {
    //Get strategies
    config.getGlobbedFiles(__dirname + '/strategies/*.js').forEach((strategy) => {
        require(path.resolve(strategy))();
    });
};
