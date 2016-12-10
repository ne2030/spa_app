'use strict';

global.isProduction = () => {
    return process.env.NODE_ENV === 'production';
};

global.isDevelopment = () => {
    return process.env.NODE_ENV === 'development';
};

global._root = '/Users/gyeonghun/Documents/projects/spa_app';
