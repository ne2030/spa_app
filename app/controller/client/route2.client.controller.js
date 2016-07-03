angular.module('Route2Controller', [])
    .controller('route2Controller', route2Controller);

/** @ngInject */
function route2Controller($scope, endPoint, $http, toastr) {

    $scope.getRoute2 = function() {

        $http.get(endPoint + '/api/route2').then(function(result){
            var data = result.data;
            $scope.count = data.count;
            $scope.items = data.items;
        });
    };

    $scope.createItem = function() {
        var newChat = { name: this.name, chat: this.chat };
        $http.post(endPoint + '/api/route2', {newChat: newChat}).then(function(result){
            $scope.getRoute2();
            this.name = "";
            this.chat = "";
            toastr.success('아이템이 추가되었습니다.', 'Success');
        }, function(err) {
            toastr.error('실패했습니다', 'Error');
        });
    };
}