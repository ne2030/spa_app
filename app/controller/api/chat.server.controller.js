

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
                var chat = _.map(result.rows, function(val){
                    var hour24 = val.createdAt.getHours();
                    var hour12 = hour24 / 12 > 1 ? '오후 ' + hour24 % 12 : '오전 ' + hour24;
                    var time = hour12 + ":" + val.createdAt.getMinutes();
                    return _.extend(val.dataValues, {time: time});
                });
                result = _.extend({
                    count: result.count,
                    chat: chat
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
    req.checkBody('name', '이름을 입력해주세요').notEmpty();
    req.checkBody('content', '내용을 입력해주세요').notEmpty();
    var errors = req.validationErrors();
    if (errors){
        console.log(errors);
        res.send(errors[0]);
        return;
    }

    var name = req.body.name;
    var content = req.body.content;
    Chat.create({
        name: name,
        content: content,
    }).then(function(result){
        res.send(result);
    }, function(err) {
        next(err);
    });
};
