
    angular.module('myapp', [
        "ui.router",
        "ngAnimate",
        "toastr",

        "Route1Controller",
        "Route2Controller",
        "ChatController",
        "route"
    ])
    .constant('endPoint', 'http://localhost:8080')
    .config(routeConfig);

    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
