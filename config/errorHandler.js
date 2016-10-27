'use strict';

module.exports = (err, req, res, next) => {
    if (!err) return next();
    // console.log(err);

    let route = req.originalMethod || req.method;

    if (!res.headersSent) {
    res.status(err.statusCode || 500).send({
        message: err.message,
        body: req.body,
        url: req.originalUrl,
        route: route
    });
    } else return next();
};
