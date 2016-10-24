'use strict';

let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('../sequelize'),
    User = db.User;

module.exports = () => {
    // Use local strategy
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password'
    },(userId, password, done) => {

        User.findOne({
             userId: userId
         })
        .then((user) => {
            // 유저 없음
            if(!user) {
                done(null, false, {message: '등록된 아이디가 아닙니다.'});
            }
            // 비밀번호 인증 실패
            if(user.authenticate(password)) {
                done(null, false, {message: '비밀번호가 틀렸습니다.'});
            }
            return done(null, user);
        }).catch(err => { done(err); });
    }));
};