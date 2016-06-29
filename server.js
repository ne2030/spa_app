(function() {

    'use strict';

    // node_module dependencies
    var express = require('express'),
        path = require('path'),
        async = require('async'),
        swig = require('swig'),
        Sequelize = require('sequelize'),
        consolidate = require('consolidate');

    // custom js module
    var config = require('./config/config'),
        sequelize = require('./config/sequelize');

    var app = express();

    app.engine('html', consolidate.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/app/views');

    // file middleware
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.static(path.join(__dirname, 'app/views')));

    // express
    app.get('/', function(req, res) {
        res.render('index');
    });

    // async.waterfall([
    //
    // ], function(err, result){
    //     console.log(err);
    // });

    // sequelize
    var Seed = function (){
        sequelize.sequelize.sync({
            force: true
        }).then(function() {
            require('./config/seed')(sequelize);
        });
    };

    Seed();

    app.listen(8080, function() {
        console.log('server is running at localhost with port 8080');
    });
})();
