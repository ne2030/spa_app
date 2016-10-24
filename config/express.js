'use strict';

// node_module dependencies
let path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    // let swig = require('swig'),
    consolidate = require('consolidate'),
    expressValidator = require('express-validator'),
    CORS = require('cors');

let config = require('./config'),
    errorHandler = require('./errorHandler'),
    jwt = require('jwt');


module.exports = function(){
    let app = express();

    //express engine
    app.engine('html', consolidate.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/../app/views');

    // express middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(expressValidator());

    // Cross Origin Resource Sharing
    let whitelist = [
        'http://52.78.133.77',
        'http://localhost',
        'http://localhost:8080',
        'http://eleclion.asia'
    ];
    let corsOptions = {
        origin: function(origin, callback) {
            let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        },
        credentials: true
    };
    app.use(CORS(corsOptions));

    // express static
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../bower_components')));
    app.use(express.static(path.join(__dirname, '../app')));
    app.use(express.static(path.join(__dirname, '../app/views')));

    app.use((req, res, next) => {
        let token = '';

        // parse headers if req.headers exitst
        if (req.headers && req.headers.authorization){
            let parts = req.headers.authorization.split(' ');
            if (parts.length == 2) {
                var scheme = parts[0];
                var credentials = parts[1];

                if(/^Bearer$/.test(scheme)){
                    token = credentials;
                } else {
                    return next();
                }
            } else {
                return next();
            }

            // jwt authenticate
            let user = jwt.authenticateToken(token, next);
            if (user.error) {
                return next();
            } else {
                req.user = user;
            }
        }
    });

    // express index route
    app.get('/', function(req, res) {
        res.render('index');
    });

    let router = express.Router();

    // Globbing route files
    config.getGlobbedFiles(path.join(__dirname, '../app/routes/*.js')).forEach(routePath => {
        let _router = require(routePath)(router);
        app.use(_router);
    });

    app.use(errorHandler);

    // Return Express server instance
    return app;
};
