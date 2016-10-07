
'use strict';

// node_module dependencies
let express = require('express'),
    path = require('path'),
    async = require('async'),
    bodyParser = require('body-parser'),
    swig = require('swig'),
    consolidate = require('consolidate'),
    expressValidator = require('express-validator'),
    CORS = require('cors');

let app = express();

// custom js module
let config = require('./config/config'),
    sequelize = require('./config/sequelize'),
    errorHandler = require('./config/errorHandler');

//express engine
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + './app/views');

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
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/bower_components')));
app.use(express.static(path.join(__dirname, '/app')));
app.use(express.static(path.join(__dirname, '/app/views')));

// express index route
app.get('/', function(req, res) {
    res.render('index');
});

let router = express.Router();

// Globbing route files
config.getGlobbedFiles('./app/routes/*.js').forEach(routePath => {
    console.log(routePath);
	let _router = require(routePath)(router);
	app.use(_router);
});

/**
 *   Sequelize setting
 */

// () => {
//     sequelize.sequelize.sync({
//         force: true
//     }).then(function () {
//         require('./config/seed')(sequelize);
//     });
// }();

app.use(errorHandler);

app.listen(8080, () => console.log('server is running at localhost:8080'));
