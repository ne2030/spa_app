'use strict';

global.isProduction = () => {
    return process.env.NODE_ENV === 'production';
};

global.isDevelopment = () => {
    return process.env.NODE_ENV === 'development';
};
