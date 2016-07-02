
    angular.module('route', [])
    .config(routeConfig);

    function routeConfig ($stateProvider) {

        $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'main.html'
        })
        .state('route1', {
            url: "/route1",
            templateUrl: "route1.html",
            controller: 'route1Controller'
        })
            .state('route1.list', {
                url: "/list",
                templateUrl: "route1.list.html",
                controller: 'route1Controller'
            })

        .state('route2', {
                url: "/route2",
                templateUrl: "route2.html",
                controller: 'route2Controller'
            })
            .state('route2.list', {
                url: "/list",
                templateUrl: "route2.list.html",
                controller: 'route2Controller'
            })
        .state('chat', {
            url: "/chat",
            templateUrl: "chat.html",
            controller: 'chatController'
        });
    }
