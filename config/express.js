var express = require('express'),
    CORS = require('cors'),
    path = require('path'),
    swig = require('swig'),
    consolidate = require('consolidate'),
    bodyParser = require('body-parser');
    config = require('./config');

module.exports = function(){
    var app = express();

    var router = express.Router();

    // Globbing route files
    config.getGlobbedFiles('./app/routes/*.js').forEach(function(routePath) {
        console.log(routePath);
        var _router = require(path.resolve(routePath))(router);
        app.use(_router);
    });

    // Cross Origin Resource Sharing
    var whitelist = [
        'http://52.79.125.6',
        'http://localhost',
        'http://localhost:8080',
        'http://eleclion.asia'
    ];
    var corsOptions = {
        origin: function(origin, callback) {
            var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        },
        credentials: true
    };
    app.use(CORS(corsOptions));

    //set engine
    app.engine('html', consolidate.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + './app/views');

    // body parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    // express static
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../bower_components')));
    app.use(express.static(path.join(__dirname, '../app')));
    app.use(express.static(path.join(__dirname, '../app/views')));

    // index page
    app.get('/', function(req, res) {
        res.render('index');
    });

    // excute server
    app.listen(8080, function() {
        console.log('server is running at localhost:8080');
    });
};
