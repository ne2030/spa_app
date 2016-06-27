angular.module('mainApp', [
    'ui.router',
    'subController'
])
        .config(function($stateProvider, $urlRouterProvider){

        //For any unmatched url, send to '/'
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'main.html',
                controller: 'mainController'
            })
            .state('route1', {
                url: '/route1',
                templateUrl: 'route1.html',
                controller: 'mainController'
            })
                .state('route1.list', {
                    url: '/list',
                    templateUrl: 'route1.list.html',
                    controller: 'mainController'
                })

            .state('route2', {
                url: '/route2',
                templateUrl: 'route2.html',
                controller: 'mainController'
            })
            .state('route2_list', {
                url: '/route2/list',
                templateUrl: 'route2.list.html',
                controller: 'mainController'
            });
});
