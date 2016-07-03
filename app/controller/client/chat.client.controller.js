(function(){
    'use strict';

    angular.module('ChatController', [])
        .controller('chatController', chatController);

    /** @ngInject */
    function chatController($scope, $http, endPoint, toastr){
        $scope.totalCnt = 0;
        $scope.page = 1;

        $scope.getChat = function(){
            var page = this.page || 1;
            var params = {page: (page - 1) * 20};
            $http.get(endPoint + '/api/chat', {params: params}).then(function(result){
                var data = result.data;
                $scope.totalCnt = data.count;
                $scope.chats = data.chat;
            }, function(err) {
                toastr.error(err.data.message, 'Error');
            });
        };

        $scope.deleteChat = function(chat){
            var chatId = chat.id;
            $http.delete(endPoint + '/api/chat/' + chatId).then(function(result){
                $scope.getChat();
                toastr.success('아이템이 삭제되었습니다.', 'Success');
            }, function(err) {
                toastr.error(err.data.message, 'Error');
            });
        };

        $scope.createChat = function(){
            var name = this.name;
            var content = this.content;
            var params = {name: name, content: content};
            $http.post(endPoint + '/api/chat', {params: params}).then(function(result){
                $scope.getChat();
                $scope.name = "";
                $scope.content = "";
            }, function(err) {
                toastr.error(err.data.message, 'Error');
            });
        };
    }
})();
