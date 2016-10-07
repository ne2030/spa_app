'use strict';

angular.module('ProfileController', [])
    .controller('profileController', profileController);

/** @ngInject */
function profileController($scope, $http, endPoint, toastr) {

    $scope.getProfile = function() {
        $http.get(endPoint + '/api/profile').then(function(result){
            let data = result.data;
            $scope.items = data.items;
        });
    };

    $scope.createStack = function() {

        let skill =  this.skill,
            type = this.type,
            description =  this.description,
            mastery =  this.mastery;

        $http.post(endPoint + '/api/profile', {
            skill: skill,
            type: type,
            description: description,
            mastery: mastery
        }).then(
            function(result){
                if (result.data.msg) {
                    toastr.error(result.data.msg, 'Error');
                } else {
                    $scope.getProfile();
                    $scope.skill = "";
                    $scope.type = "";
                    $scope.description = "";
                    $scope.mastery = "";
                }
            },  function(err) {
                toastr.error(err.data.message, 'Error');
            });
    };
}
