'use strict';

let Sequelize = require('sequelize'),
    path = require('path'),
    fs = require('fs'),
    db = {};


let sequelize = new Sequelize(
    'spaApp',
    'root',
    '', {
        host: '127.0.0.1',
dialect: 'mysql',
	port: 3306
});

const rootPath = require('./env/path').root;
var modelsDir = rootPath + '/app/models';

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(modelsDir)
    // .filter(file => (file.indexOf('.') !== -1))
    // import model files and save model names
	.forEach(file => {
		console.log('Loading model file ' + file);
		let model = sequelize.import(path.join(modelsDir, file));
		db[model.name] = model;
	});

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'),
     (err) => console.log('Unable to connect to the database:', err));

//require model files
// require('../app/models/Chat.js')(sequelize);
// require('../app/models/Profile.js')(sequelize);
// require('../app/models/RefreshToken.js')(sequelize);
// require('../app/models/Route2.js')(sequelize);
// require('../app/models/User.js')(sequelize);

for (let key in db) {
    if (db[key].options.associate)
        db[key].options.associate(db);
}

// assign the sequelize letiables to the db object and returning the db.
module.exports = Object.assign({
	sequelize: sequelize,
	Sequelize: Sequelize
}, db);
