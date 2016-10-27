'use strict';

    angular.module('myapp', [
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'toastr',

        'Core',
        'ProfileController',
        'Route2Controller',
        'ChatController',
        'UserController',
        'route'
    ])
    .constant('endPoint', 'http://localhost:8080')
    .config(routeConfig);

    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
