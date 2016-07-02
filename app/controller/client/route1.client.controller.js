(function(){
    'use strict';

    angular.module('Route1Controller', [])
        .controller('route1Controller', route1Controller);

    /** @ngInject */
    function route1Controller($scope, $http, endPoint) {

        $scope.getRoute1 = function() {

            $http.get(endPoint + '/api/route1').then(function(result){
                var data = result.data;
                $scope.count = data.count;
                $scope.items = data.items;
            });
        };
    }
})();
