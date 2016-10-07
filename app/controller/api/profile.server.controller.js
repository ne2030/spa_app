'use strict';

    let db = require('../../../config/sequelize'),
        Profile = db.Profile;

    /**
     *  GET: /api/profile
     *  @param req
     *  @param res
     *  @param next
     */
    module.exports.getProfile = function (req, res, next) {

        Profile.findAndCountAll({
            attributes: ['skill', 'type', 'description', 'mastery']
        }).then(function(result) {
            let stack = {
                items: result.rows
            };
            res.send(stack);
        }).catch(function(err) {
            console.log('Error: ' + err);
            next();
        });
    };

    /**
     *  POST: /api/profile
     *  @param req
     *  @param res
     *  @param next
     */
     module.exports.createStack = function (req, res, next) {
         req.checkBody('skill', '스킬을 입력해주세요').notEmpty();
         req.checkBody('type', '종류를 입력해주세요').notEmpty();
         req.checkBody('description', '설명을 입력해주세요').notEmpty();
         req.checkBody('mastery', '숙련도를 입력해주세요').notEmpty();
         let errors = req.validationErrors();
         if (errors){
             console.log(errors);
             res.send(errors[0]);
             return;
         }

         let skill = req.body.skill,
             type = req.body.type,
             description = req.body.description,
             mastery = req.body.mastery;
         Profile.create({
             skill: skill,
             type: type,
             description: description,
             mastery: mastery
         }).then(function(result){
             res.send(result);
         }, function(err){
             next(err);
         });
     }
