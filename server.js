(function() {

    'use strict';

    // node_module dependencies
    var express = require('express'),
        path = require('path'),
        async = require('async'),
        bodyParser = require('body-parser'),
        swig = require('swig'),
        consolidate = require('consolidate'),
        expressValidator = require('express-validator');

    var app = express();

    // custom js module
    var config = require('./config/config'),
        sequelize = require('./config/sequelize');

    //express engine
    app.engine('html', consolidate.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + './app/views');

    // express middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(expressValidator());

    // express static
    app.use(express.static(path.join(__dirname, './public')));
    app.use(express.static(path.join(__dirname, './bower_components')));
    app.use(express.static(path.join(__dirname, './app')));
    app.use(express.static(path.join(__dirname, './app/views')));

    // express index route
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

    // (function() {
    //     sequelize.sequelize.sync({
    //         force: true
    //     }).then(function () {
    //         require('./config/seed')(sequelize);
    //     });
    // })();

    app.listen(8080, function() {
        console.log('server is running at localhost:8080');
    });

})();
