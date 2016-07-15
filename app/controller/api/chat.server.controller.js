

var _ = require('lodash'),
    async = require('async'),
    db = require('../../../config/sequelize'),
    util = require('../../../config/util'),
    Chat = db.Chat;

/**
* GET: /api/chat
* @param req
* @param res
* @param next
*/
// 이해 아직 덜됨 // 참조하는 db 없어서 포함 x
module.exports.getChat = function(req, res, next) {

    var page = req.query.page ? parseInt(req.query.page) : 0;
    var size = 20;

    async.waterfall([
        function(nextStep) {
            Chat.findAndCountAll({
                offset: page,
                limit: size,
                order: 'id desc',
            }).then(function(result) {
                var paginator = util.pagenation({
                    req: req,
                    size: size,
                    totalCount: result.count,
                    currentRowCount: result.rows.length
                });
                result = _.extend({
                    count: result.count,
                    chat: result.rows
                }, paginator);

                nextStep(null, result);
            }).catch(nextStep);
        }
    ], function(err, result) {
        if (err) next(err);
        else res.send(result);
    });
};

/**
* DELETE: /api/chat/:chatId
* @param req
* @param res
* @param next
*/
module.exports.deleteChat = function (req, res, next) {
    var chatId = req.params.chatId;
    Chat.destroy({
        where: {
            id: chatId
        }
    }).then(function(){
        res.send({});
    }).catch(next);
};

/**
* POST: /api/chat
* @param req
* @param res
* @param next
*/
module.exports.createChat = function (req, res, next) {
    var name = req.body.params.name;
    var content = req.body.params.content;
    Chat.create({
        name: name,
        content: content,
    }).then(function(result){
        res.send(result);
    }, function(err) {
        next(err);
    });
};