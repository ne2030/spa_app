(function() {
    'use strict';

    var async = require('async'),
        Sequelize = require('sequelize');


    module.exports = function(db, nextStep) {
        async.parallel([
            function(nextStep) {
                route1(db, nextStep);
            },
            function(nextStep) {
                route2(db, nextStep);
            }
        ], function(err, result) {
            if (err) console.log(err);
            if (nextStep) {
                if (err) nextStep(err);
                else nextStep();
            }
        });
    };

    function route1(db, nextStep) {
        db.Route1.create({
            name: 'gyeonghun',
            content: 'it is chatting',
            visitedAt: new Date()
        }).then(function(){
            nextStep();
        });
    }

    function route2(db, nextStep) {
        db.Route1.create({
            name: 'ne2030',
            content: 'test chat',
            visitedAt: new Date()
        }).then(function(){
            nextStep();
        });
    }

})();
