'use strict';

let db = require('../../../config/sequelize'),
    Route2 = db.Route2;

/**
*  GET: /api/route2
*  @param req
*  @param res
*  @param next
*/
module.exports.getRoute2 = (req, res, next) => {
    
    Route2.findAndCountAll({
        attributes: ['name', 'content', 'createdAt'],
        order: 'id desc'
    })
    .then((result) => {
        result = {
            count: result.count,
            items: result.rows
        };
        res.send(result);
    })
    .catch(next);

};

/**
*  POST: /api/route2
*  @param req
*  @param res
*  @param next
*/
module.exports.makeItem = function (req, res, next){
    let name = req.body.newChat.name;
    let chat = req.body.newChat.chat;

    Route2.create({
        name: name,
        content: chat
    })
    .then((_chat) => { res.send(_chat); })
    .catch(next);
};
