'use strict';

    angular.module('myapp', [
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'toastr',


        'ProfileController',
        'Route2Controller',
        'ChatController',
        'route'
    ])
    .constant('endPoint', 'http://localhost:8080')
    .config(routeConfig);

    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
