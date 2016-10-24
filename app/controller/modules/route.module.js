'use strict';

    angular.module('route', [])
    .config(routeConfig);

    function routeConfig ($stateProvider) {

        $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'main.html'
        })

        .state('profile', {
            url: '/profile',
            templateUrl: 'profile.html',
            controller: 'profileController'
        })
            .state('profile.stack', {
                url: '/stack',
                templateUrl: 'profile.stack.html',
                controller: 'profileController'
            })

        .state('route2', {
                url: '/route2',
                templateUrl: 'route2.html',
                controller: 'route2Controller'
            })
            .state('route2.list', {
                url: '/list',
                templateUrl: 'route2.list.html',
                controller: 'route2Controller'
            })

        .state('chat', {
            url: '/chat',
            templateUrl: 'chat.html',
            controller: 'chatController'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'userController'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
            contorller: 'userController'
        });
    }
