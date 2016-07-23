(function(){
    'use strict';

    angular.module('ProfileController', [])
        .controller('profileController', profileController);

    /** @ngInject */
    function profileController($scope, $http, endPoint) {

        $scope.getProfile = function() {

            $http.get(endPoint + '/api/profile').then(function(result){
                var data = result.data;
                $scope.count = data.count;
                $scope.items = data.items;
            });
        };
    }
})();
