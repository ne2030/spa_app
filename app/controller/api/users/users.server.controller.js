'use strict';
'추후 가능할 때 추가 작업 (user info 관련된 부분)';

/*

var db = require('../../../../config/sequelize'),
    BaseError = require('../../../models/abstract/BaseError'),
    _ = require('lodash'),
    async = require('async'),
    User = db.User,
    i18n = require('i18n'),
    DeviceInfo = db.DeviceInfo,
    PhoneVerification = db.PhoneVerification,
    config = require('../../../../config/config'),
    aws = require('../../../../config/aws'),
    sms = require('../../../../config/sms'),
    crypto = require('crypto');


 * GET: /users/me
 * Roles: ['user', 'truck']
 * @param req
 * @param res
 * @param next

module.exports.getMyInfo = function(req, res, next) {
    var user = req.user;

    User.findOne({
        where: {
            id: user.id
        },
        attributes: ['id', 'profile', 'roles', 'username', 'email', 'phone', 'emailAgreedAt', 'smsAgreedAt', 'createdAt']
    }).then(function(user) {
        res.send(user);
    }).catch(next);
};


 * PUT: /users/me
 * Roles: ['user', 'truck']
 * @param req
 * @param res
 * @param next

module.exports.changeMyInfo = function(req, res, next) {
    var user = req.user;

    var isAgreeEmail = req.body.isAgreeEmail;
    var isAgreeSMS = req.body.isAgreeSMS;

    async.waterfall([
        function(nextStep) {
            User.findOne({
                where: {
                    id: user.id
                },
                attributes: ['id', 'email', 'username', 'emailAgreedAt', 'smsAgreedAt', 'phone', 'profile']
            }).then(function(user) {
                if (!user) {
                    nextStep(BaseError.getNotFoundErrorInstance(i18n.__('errors.notFound')));
                } else {
                    nextStep(null, user);
                }
            }).catch(nextStep);
        },
        function(user, nextStep) {
            var editableKeys = ['password', 'username', 'phone', 'profile'];

            if (isAgreeEmail && !user.emailAgreedAt) {
                user.emailAgreedAt = new Date();
            } else if (!isAgreeEmail && user.emailAgreedAt) {
                user.emailAgreedAt = null;
            }

            if (isAgreeSMS && !user.smsAgreedAt) {
                user.smsAgreedAt = new Date();
            } else if (!isAgreeSMS && user.smsAgreedAt) {
                user.smsAgreedAt = null;
            }

            _.each(editableKeys, function(key) {
                if (req.body[key]) {
                    user[key] = req.body[key];
                }
            });

            user.save().then(function(user) {
                nextStep(null, user);
            }).catch(nextStep);
        }
    ], function(err, user) {
        if (err) next(err);
        else {
            user.password = undefined;
            res.send(user);
        }
    });

};


 * PUT: /devices/:uuid
 * @param req
 * @param res
 * @param next

module.exports.changeDeviceGeom = function(req, res, next) {
    req.checkBody('lat', i18n.__('errors.requireParams')).notEmpty().isFloat();
    req.checkBody('lng', i18n.__('errors.requireParams')).notEmpty().isFloat();
    var errors = req.validationErrors();
    if (errors) {
        return next({message: errors[0].msg, statusCode: 400});
    }

    var uuid = req.params.uuid;
    var lat = req.body.lat;
    var lng = req.body.lng;

    var currentGeom = {
        type: 'Point',
        coordinates: [lng, lat]
    };
    DeviceInfo.update({
        currentGeom: currentGeom,
        currentUpdatedAt: new Date()
    },{
        where: {
            uuid: uuid
        }
    }).then(function() {
        res.send({});
        // Close Statistics Query
        var userId = req.user ? req.user.id : undefined;
        aws.dynamoDB.createItem(aws.CONST.DYNAMO_DB.TABLE.USER_ROUTE, {
            userId: userId,
            deviceUUID: uuid,
            currentGeom: currentGeom
        });
    }).catch(next);
};


 * POST: /users/email/verification
 * @param req
 * @param res
 * @param next

module.exports.emailVerification = function(req, res, next) {
    req.checkBody('email', i18n.__('errors.requireParams')).notEmpty().isEmail();
    var errors = req.validationErrors();
    if (errors) {
        return next({message: errors[0].msg, statusCode: 400});
    }

    var email = req.body.email;
    User.count({
        where: {
            email: email
        },
        paranoid: false
    }).then(function(cnt) {
        if (cnt > 0) next({message: i18n.__('errors.alreadyExistEmail'), statusCode: 409});
        else res.send({});
    }).catch(next);
};


 * POST: /users/phone/verification
 * @param req
 * @param res
 * @param next

module.exports.phoneVerification = function(req, res, next) {
    req.checkBody('phone', i18n.__('errors.requireParams')).notEmpty();
    req.checkBody('verificationCode', i18n.__('errors.requireParams')).notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return next({message: errors[0].msg, statusCode: 400});
    }

    var phone = req.body.phone;
    var verificationCode = req.body.verificationCode;
    PhoneVerification.findOne({
        where: {
            phone: phone,
            verificationCode: verificationCode,
            expiredAt: {
                $gt: new Date()
            }
        }
    }).then(function(exist) {
        if (exist) {
            res.send({});
        } else {
            next(BaseError.getNotFoundErrorInstance(i18n.__('errors.smsVerificationCode')));
        }
    }).catch(next);

};


 * POST: /users/phone/verification/send
 * @param req
 * @param res
 * @param next

module.exports.sendPhoneVerification = function(req, res, next) {
    req.checkBody('phone', i18n.__('errors.requireParams')).notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return next({message: errors[0].msg, statusCode: 400});
    }
    var phone = req.body.phone;

    async.waterfall([
        function(nextStep) {
            PhoneVerification.findOne({
                where: {
                    phone: phone,
                    expiredAt: {
                        $gt: new Date()
                    }
                }
            }).then(function(exist) {
                if (exist) {
                    nextStep({message: i18n.__('errors.alreadySendVerification'), statusCode: 409});
                } else {
                    nextStep();
                }
            }).catch(nextStep);
        },
        function(nextStep) {
            var verificationCode = _.padStart(_.random(0, 999999), 6, '0');
            PhoneVerification.create({
                phone: phone,
                verificationCode: verificationCode,
                expiredAt: Date.now() + (60 * 1000 * 3) // 3 minute
            }).then(function() {
                nextStep(null, verificationCode);
            }).catch(nextStep);
        },
        function(verificationCode, nextStep) {
            sms.sendSMS(phone, i18n.__('sms.verificationCode', verificationCode)).then(function() {
                nextStep(null, verificationCode);
            }, nextStep);
        }
    ], function(err, verificationCode) {
        if (err) next(err);
        else res.send({});
    });
};


 * DELETE: /users/me
 * 회원탈퇴
 * @param req
 * @param res
 * @param next

module.exports.leave = function(req, res, next) {
    var user = req.user;
    User.destroy({
        where: {
            id: user.id
        }
    }).then(function() {
        res.send({});
    }).catch(next);
};

*/
