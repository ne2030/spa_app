'use strict';

let endPoint = 'http://localhost:8000'

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
    .constant('endPoint', endPoint)
    .config(routeConfig);

    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
