(function() {
    'use strict';

    angular.module('myapp', [
        "ui.router",
        "subController"
    ]).config(function($stateProvider, $urlRouterProvider) {

        // For any unmatched url, send to /route1
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'main.html'
            })
            .state('route1', {
                url: "/route1",
                templateUrl: "route1.html",
                controller: 'mainController'
            })
            .state('route1.list', {
                url: "/list",
                templateUrl: "route1.list.html",
                controller: 'mainController'
            })

        .state('route2', {
                url: "/route2",
                templateUrl: "route2.html",
                controller: 'mainController'
            })
            .state('route2.list', {
                url: "/list",
                templateUrl: "route2.list.html",
                controller: 'mainController'
            });
    });
})();
