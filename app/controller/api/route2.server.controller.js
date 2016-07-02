
    var _ = require('lodash'),
        async = require('async'),
        db = require('../../../config/sequelize'),
        Route2 = db.Route2;

    /**
    *  GET: /api/route2
    *  @param req
    *  @param res
    *  @param next
    */
    module.exports.getRoute2 = function (req, res, next){
        Route2.findAndCountAll({
            order: 'id asc'
        }).then(function(result){
            var items = result.rows;
        })
        .then(function(result){
            res.send(result);
            }, function(err) { console.log(err);
        });

    };

    /**
    *  POST: /api/route2
    *  @param req
    *  @param res
    *  @param next
    */
    module.exports.createItem = function (req, res, next){
        var name = req.body.name;
        var chat = req.body.chat;

        Route2.create({
            name: name,
            chat: chat
        }).then(function(_chat){
            res.send(_chat);
        }).catch(next);
    };
