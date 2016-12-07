'use strict';

let db = require('../../../config/sequelize'),
    co = require('co'),
    Route2 = db.Route2;

/**
*  GET: /api/route2
*  @param req
*  @param res
*  @param next
*/
module.exports.getRoute2 = (req, res, next) => {

    Route2.findAndCountAll({
        attributes: ['id', 'name', 'content', 'createdAt'],
        order: 'id desc'
    })
    .then((result) => {
        result = {
            id: result.id,
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
    let name = req.body.name;
    let chat = req.body.chat;

    Route2.create({
        name: name,
        content: chat
    })
    .then((_chat) => { res.send(_chat); })
    .catch(next);
};

/**
* DELETE: /api/route2/:itemId
* @param req
* @param res
* @param next
*/
module.exports.deleteItem = function (req, res, next) {
co(function*(){
try{
    let itemId = req.params.itemId;
    yield Route2.destroy({
        where: {
            id: itemId
        }
    });
    res.end();
} catch(e){ next(e);}
});
};
