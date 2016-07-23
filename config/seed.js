(function() {
    'use strict';

    var async = require('async'),
        _ = require('lodash');


    module.exports = function(db, nextStep) {
        async.parallel([
            function(nextStep) {
                profile(db, nextStep);
            },
            function(nextStep) {
                route2(db, nextStep);
            },
            function(nextStep) {
                chat(db, nextStep);
            }
        ], function(err, result) {
            if (err) console.log(err);
            if (nextStep) {
                if (err) nextStep(err);
                else nextStep();
            }
        });
    };

    function profile(db, nextStep) {
        async.waterfall([
            function(nextStep) {
                var profileStack = [];
                for (var i=0; i < 100; i++) {
                    profileStack.push({
                        name: 'erguono' + i,
                        content: 'test chatting' + i,
                    });
                }
                nextStep(null, profileStack);
            },
            function(profileStack, nextStep) {
                db.Profile.bulkCreate(profileStack)
                    .then(function() {
                        nextStep();
                    }).catch(nextStep);
            }
        ], function(err, result) {
            if (err) {
                console.log('seed profile Stack error');
            }
        });
    }

    function route2(db, nextStep) {

        async.waterfall([
            function(nextStep) {
                var route2chat = [];
                for (var i = 0; i < 100; i++) {
                    route2chat.push({
                        name: 'erguono' + i,
                        content: 'test chatting' + i,
                    });
                }
                nextStep(null, route2chat);
            },
            function(route2chat, nextStep) {
                db.Route2.bulkCreate(route2chat)
                    .then(function(){
                        nextStep();
                    }).catch(nextStep);
            }
        ], function(err, result) {
            console.log(err);
        });
    }

    function chat(db, nextStep) {
        async.waterfall([
            function(nextStep) {
                var chatting = [];
                for (var i = 0; i < 100; i++) {
                    chatting.push({
                        name: 'erguono',
                        content: 'test chatting' + i,
                    });
                }
                nextStep(null, chatting);
            },
            function(chatting, nextStep) {
                db.Chat.bulkCreate(chatting)
                    .then(function() {
                        nextStep();
                    }).catch(nextStep);
            }
        ], function(err, result) {
            console.log(err);
        });
    }

})();
