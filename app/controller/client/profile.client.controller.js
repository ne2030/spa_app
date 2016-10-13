'use strict';

angular.module('ProfileController', [])
    .controller('profileController', profileController);

/** @ngInject */
function profileController($scope, $http, endPoint, toastr) {

    $scope.getProfile = () => {
        $http.get(endPoint + '/api/profile')
        .then((result) => {
            $scope.items = result.data;
        });
    };

    $scope.createStack = () => {

        let skill =  this.skill,
            type = this.type,
            description =  this.description,
            mastery =  this.mastery;

        $http.post(endPoint + '/api/profile', {
            skill: skill,
            type: type,
            description: description,
            mastery: mastery
        })
        .then((result) => {
                if (result.data.msg) {
                    toastr.error(result.data.msg, 'Error');
                } else {
                    $scope.getProfile();
                    $scope.skill = '';
                    $scope.type = '';
                    $scope.description = '';
                    $scope.mastery = '';
                }})
        .catch((err) => { toastr.error(err.data.message, 'Error'); });
    };
}
