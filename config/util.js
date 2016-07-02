(function(){
    'use strict';

    var _ = require('lodash'),
        config = require('./config');

    module.exports.pagenation = function(args) {
        args.req = args.req || {};

        var path = args.req._parsedOriginalUrl.pathname || '';
        var query = args.req.query || {};
        var size = args.size || 20;
        var page = parseInt(query.page) || 0;
        var totalCount = args.totalCount || 0;
        var currentRowCount = args.currentRowCount || 0;

        var prev = null, next = null;

        if (page !== 0) {
            var prevPage = (page - size);
            prevPage = prevPage < 0 ? 0 : prevPage;
            query.page = prevPage;
            prev = makeUrlFromParams(query);
        }

        if (currentRowCount == size && (page + currentRowCount) != totalCount) {
            query.page = page + size;
            next = makeUrlFromParams(query);
        }

        function makeUrlFromParams(params) {
            var str = Object.keys(params).map(function(key) {
                return key + '=' + params[key];
            }).join('&');
            return config.endPoint + path + '?' + str;
        }

        return {
            prev: prev,
            next: next
        };
    };
})();
