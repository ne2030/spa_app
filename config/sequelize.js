'use strict';

let Sequelize = require('sequelize'),
    path = require('path'),
    fs = require('fs'),
    config = require('./config.js'),
    db = {};

// let config = require('./config');

let sequelize = new Sequelize(
    'spaApp',
    'root',
    '', {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306
    });

let rootPath = path.normalize(__dirname + '/..');
let modelsDir = rootPath + '/app/models';

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(modelsDir)
	// .filter(file => (file.indexOf('.') !== -1))

	// import model files and save model names
	.forEach(file => {
		console.log('Loading model file ' + file); //eslint-disable-line
		let model = sequelize.import(path.join(modelsDir, file));
		db[model.name] = model;
	});

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'), // eslint-disable-line
     (err) => console.log('Unable to connect to the database:', err)); //eslint-disable-line

// Globbing model files
config.getGlobbedFiles('../app/models/*.js').forEach((modelPath) => {
    require(path.resolve(modelPath))(sequelize);
});

for (let key in db) {
    if (db[key].options.associate)
        db[key].options.associate(db);
}

// assign the sequelize letiables to the db object and returning the db.
module.exports = Object.assign({
	sequelize: sequelize,
	Sequelize: Sequelize
}, db);
