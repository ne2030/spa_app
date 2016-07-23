
    var db = require('../../../config/sequelize'),
        Profile = db.Profile;

    /**
     *  GET: /api/profile
     *  @param req
     *  @param res
     *  @param next
     */
    module.exports.getProfile = function (req, res, next) {

        Profile.findAndCountAll({
            attributes: ['name', 'content', 'createdAt']
        }).then(function(result) {
            result = {
                count: result.count,
                items: result.rows
            };
            res.send(result);
        }).catch(function(err) {
            console.log('Error: ' + err);
            next();
        });
    };
