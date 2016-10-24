'use strict';

var controller = require('../controllers/api/users.server.controller.js');

module.exports = function(router) {
    // 로그인 및 회원가입
    router.route('/auth/signup').post(controller.signup);
    router.route('/auth/login').post(controller.login);
    router.route('/auth/logout').get(controller.logout);
    router.route('/auth/refresh').post(controller.refresh);

    // 내정보 & 탈퇴
    // router.route('/users/me')
    //     .get(controller.requiresLogin, controller.getMyInfo)
    //     .put(controller.requiresLogin, controller.changeMyInfo)
    //     .delete(controller.requiresLogin, controller.leave);
    //
    // router.route('/users/email/verification').post(controller.emailVerification);
    // router.route('/users/phone/verification').post(controller.phoneVerification);
    // router.route('/users/phone/verification/send').post(controller.sendPhoneVerification);
    //


    // router.route('/users/password').post(controller.findPassword);
    // router.route('/users/password/:token')
    //     .get(controller.validateResetToken)
    //     .put(controller.reset);


    //
    // router.route('/devices/:uuid').put(controller.changeDeviceGeom);

    return router;
};
