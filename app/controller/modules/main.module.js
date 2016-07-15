
    angular.module('myapp', [
        "ui.router",
        "ui.bootstrap",
        "ngAnimate",
        "toastr",


        "Route1Controller",
        "Route2Controller",
        "ChatController",
        "route"
    ])
    .constant('endPoint', 'http://eleclion.asia')
    .config(routeConfig);

    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
