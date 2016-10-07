'use strict';

let _ = require('lodash'),
    config = require('./config');

module.exports.pagenation = function(args) {
    args.req = args.req || {};

    let path = args.req._parsedOriginalUrl.pathname || '';
    let query = args.req.query || {};
    let size = args.size || 20;
    let page = parseInt(query.page) || 0;
    let totalCount = args.totalCount || 0;
    let currentRowCount = args.currentRowCount || 0;

    let prev = null, next = null;

    if (page !== 0) {
        let prevPage = (page - size);
        prevPage = prevPage < 0 ? 0 : prevPage;
        query.page = prevPage;
        prev = makeUrlFromParams(query);
    }

    if (currentRowCount == size && (page + currentRowCount) != totalCount) {
        query.page = page + size;
        next = makeUrlFromParams(query);
    }

    function makeUrlFromParams(params) {
        let str = Object.keys(params).map(function(key) {
            return key + '=' + params[key];
        }).join('&');
        return config.endPoint + path + '?' + str;
    }

    return {
        prev: prev,
        next: next
    };
};
