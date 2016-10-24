'use strict';

/**
 * Extend user's controller
 */

 module.exports = Object.assign({},
    require('./users/users.authentication.server.controller.js'),
	require('./users/users.authorization.server.controller.js'),
	require('./users/users.server.controller.js'),
	require('./users/users.password.server.controller')
);
