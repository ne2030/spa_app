'use strict';

// node_module dependencies
let path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    // nunjucks = require('nunjucks'),
    expressValidator = require('express-validator'),
    CORS = require('cors');

    // custom config modules
let config = require('./config'),
    errorHandler = require('./errorHandler'),
    jwt = require('./jwt');

module.exports = function(){
    let app = express();

    //express engine
    // app.engine('html', nunjucks.render);
    // app.set('view engine', 'html');
    // nunjucks.configure('./../front/views', {
    //     autoescape: true,
    //     express: app
    // });

    // express middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(expressValidator());

    // Cross Origin Resource Sharing
    let whitelist = [
        'http://52.78.225.119',
        'http://localhost',
        'http://localhost:8000',
        'http://eleclion.asia',

        // for test Front (react)
        'http://localhost:3000',
        'http://localhost:9000'
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
    app.use(express.static(path.join(__dirname, '../app')));
    app.use(express.static(path.join(__dirname, '../front/build')));

    // authentication middleware
    app.use((req, res, next) => {
    try {
        // headers.authorization ?
        if (!req.headers || !req.headers.authorization) return next();

        // authorization format ? 'Bearer + Token'
        if (!/^Bearer/.test(req.headers.authorization)) return next();
        let token = req.headers.authorization.split(' ')[1];

        // jwt authenticate
        let user = jwt.authenticateToken(token, next);
        if (user.error) return next();
        req.user = user;
        next();
    } catch (e) { next(e);} //eslint-disable-line
    });

    // express index route
    // app.get('/', function(req, res) {
    //     res.render('index');
    // });

    let router = express.Router();

    // Globbing route files
    config.getGlobbedFiles(path.join(__dirname, '../app/routes/*.js')).forEach((routePath) => {
        let _router = require(routePath)(router);
        console.log(routePath); //eslint-disable-line
        app.use(_router);
    });

    app.use(errorHandler);

    // Return Express server instance
    return app;
};
