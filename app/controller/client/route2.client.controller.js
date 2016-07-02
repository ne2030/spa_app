(function(){

    'use strict';

    angular.module('Route2Controller', [])
        .controller('route2Controller', route2Controller);

    /** @ngInject */
    function route2Controller($scope, endPoint, $http ,toastr) {

        $scope.getRoute2 = function() {

            $http.get(endPoint + '/api/route2').then(function(result){
                var data = result.data;
                $scope.count = result.count;
                $scope.items = data.items;
            });
        };

        $scope.createItem = function() {

            var params = { name: this.name, chat: this.chat };
            $http.post(endPoint + '/api/route2', {params: params}).then(function(result){
                $scope.getRoute2();
                toastr.success('아이템이 추가되었습니다.', 'Success');
            }, function(err) {
                toastr.error(err.data.message, 'Error');
            });
        };
    }



})();
