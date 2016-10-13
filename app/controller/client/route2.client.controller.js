'use strict';

angular.module('Route2Controller', [])
    .controller('route2Controller', route2Controller);

/** @ngInject */
function route2Controller($scope, endPoint, $http, toastr) {

    $scope.getRoute2 = function() {

        $http.get(endPoint + '/api/route2')
        .then((result) => {
            let data = result.data;
            $scope.count = data.count;
            $scope.items = data.items;
        });
    };

    $scope.createItem = () => {
        let newChat = { name: this.name, chat: this.chat };
        $http.post(endPoint + '/api/route2', {newChat: newChat})
        .then(() => {
            $scope.getRoute2();
            $scope.name = '';
            $scope.chat = '';
            toastr.success('아이템이 추가되었습니다.', 'Success');
        })
        .catch(() => toastr.error('실패했습니다', 'Error'));
    };
}
