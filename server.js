(function() {

    'use strict';

    // node_module dependencies
    var express = require('express'),
        path = require('path'),
        async = require('async'),
        bodyParser = require('body-parser'),
        swig = require('swig'),
        consolidate = require('consolidate');

    var app = express();

    // custom js module
    var config = require('./config/config'),
        sequelize = require('./config/sequelize');

    app.engine('html', consolidate.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + './app/views');

    // file middleware
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, './public')));
    app.use(express.static(path.join(__dirname, './app')));
    app.use(express.static(path.join(__dirname, './app/views')));

    // express

    app.get('/', function(req, res) {
        res.render('index');
    });

    var router = express.Router();

    // Globbing route files
    config.getGlobbedFiles('./app/routes/*.js').forEach(function(routePath) {
        console.log(routePath);
		var _router = require(path.resolve(routePath))(router);
		app.use(_router);
	});

    /**
     *   Sequelize setting
     */

    // var seed = function () {
    //     sequelize.sequelize.sync({
    //         force: true
    //     }).then(function () {
    //         require('./config/seed')(sequelize);
    //     });
    // }();

    app.listen(8080, function() {
        console.log('server is running at localhost with port 8080');
    });

})();
