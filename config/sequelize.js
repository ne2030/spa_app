var Sequelize = require('sequelize'),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    db = {};

var config = require('./config');

var sequelize = new Sequelize(
    'spaApp',
    'root',
    '', {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306
    });

var rootPath = path.normalize(__dirname + '/..');
var modelsDir = rootPath + '/app/models';

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(modelsDir)
	.filter(function(file) {
		return (file.indexOf('.') !== -1) && (file !== 'index.js');
	})
	// import model files and save model names
	.forEach(function(file) {
		console.log('Loading model file ' + file);
		var model = sequelize.import(path.join(modelsDir, file));
		db[model.name] = model;
	});

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function(err) {
        console.log('Unable to connect to the database:', err);
    });

// Globbing model files
// config.getGlobbedFiles('../app/models/*.js').forEach(function(modelPath) {
//     require(path.resolve(modelPath))(sequelize);
// });

var Profile = require('../app/models/Profile')(sequelize);
var Route2 = require('../app/models/Route2')(sequelize);
var Chat = require('../app/models/Chat')(sequelize);

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
	sequelize: sequelize,
	Sequelize: Sequelize
}, db);
