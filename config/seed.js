var async = require('async');

module.exports = function(db, nextStep) {
    async.waterfall([
        function(nextStep){
            route1(db, nextStep);
        },
        function(nextStep){
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

function route1 (db, nextStep) {
    db.
    console.log(result);
    nextStep();
}

function route2 (db, nextStep) {
    var result = 2 * 2;
    console.log(result);
    nextStep();
}
