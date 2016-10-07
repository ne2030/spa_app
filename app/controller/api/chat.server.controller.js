'use strict';

let co = require('co'),
    tfy = require('thunkify'),
    db = require('../../../config/sequelize'),
    util = require('../../../config/util'),
    Chat = db.Chat;

/**
* GET: /api/chat
* @param req
* @param res
* @param next
*/

module.exports.getChat = (req, res, next) => {
    co(function* (){
    try {
        var result;
        let page = req.query.page ? parseInt(req.query.page) : 0;
        let size = 20;

        let data = yield Chat.findAndCountAll({
            offset: page,
            limit: size,
            order: 'id desc'
        });
        let chat = data.rows.map(val => {
            let hour24 = val.createdAt.getHours();
            let hour12 = hour24 / 12 > 1 ? '오후 ' + hour24 % 12 : '오전 ' + hour24;
            let time = hour12 + ":" + val.createdAt.getMinutes();
            return Object.assign(val.dataValues, {time: time});
        });

        let paginator = util.pagenation({
            req: req,
            size: size,
            totalCount: data.count,
            currentRowCount: data.rows.length
        });

        result = Object.assign({
            count: data.count,
            chat: chat
        }, paginator);
        res.send(result);
    } catch (e) { console.log(e.name, e.message); next(e); }
    });
}

/**
* DELETE: /api/chat/:chatId
* @param req
* @param res
* @param next
*/
module.exports.deleteChat = function (req, res, next) {
    co(function*(){
    try{

        let chatId = req.params.chatId;
        yield Chat.destroy({
            where: {
                id: chatId
            }
        });
        res.send({});
    } catch(e){ next(e);}
    });
}

/**
* POST: /api/chat
* @param req
* @param res
* @param next
*/
module.exports.createChat = function (req, res, next) {
co(function*(){
    // empty input value checking!
    req.checkBody('name', '이름을 입력해주세요').notEmpty();
    req.checkBody('content', '내용을 입력해주세요').notEmpty();
    let errors = req.validationErrors();
    if (errors){
        console.log(errors);
        res.send(errors[0]);
    } else {

    // real DB processing
    try {
        let name = req.body.name;
        let content = req.body.content;
        yield Chat.create({
            name: name,
            content: content,
        });
        res.send({});
    } catch (e) { next(e); }}
});

}
