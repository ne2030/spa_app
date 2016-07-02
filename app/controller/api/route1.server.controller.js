
    var _ = require('lodash'),
        async = require('async'),
        db = require('../../../config/sequelize'),
        Route1 = db.Route1;

    /**
     *  GET: /api/route1
     *  @param req
     *  @param res
     *  @param next
     */
    module.exports.getRoute1 = function (req, res, next) {

        Route1.findAndCountAll({
            attributes: ['name', 'content', 'createdAt']
        }).then(function(result) {
            result = {
                count: result.count,
                items: result.rows
            };
            res.send(result);
            console.log(result);
        }).catch(function(err) {
            console.log('Error: ' + err);
        });
    };
