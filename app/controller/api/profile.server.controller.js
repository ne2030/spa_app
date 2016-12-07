'use strict';

let db = require('../../../config/sequelize'),
    Profile = db.Profile;

/**
 *  GET: /api/stack
 *  @param req
 *  @param res
 *  @param next
 */
module.exports.getStack = (req, res, next) => {

    Profile.findAndCountAll({
        attributes: ['id', 'skill', 'type', 'description', 'mastery']
    })
    .then((result) => res.send(result.rows))
    .catch((err) => next(err));
};

/**
 *  POST: /api/stack
 *  @param req
 *  @param res
 *  @param next
 */
 module.exports.createStack = (req, res, next) => {

     req.checkBody('skill', '스킬을 입력해주세요').notEmpty();
     req.checkBody('type', '종류를 입력해주세요').notEmpty();
     req.checkBody('description', '설명을 입력해주세요').notEmpty();
     req.checkBody('mastery', '숙련도를 입력해주세요').notEmpty();

     let errors = req.validationErrors();

     if (errors){
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
     })
     .then((result) => res.send(result))
     .catch((err) => next(err));
 };
