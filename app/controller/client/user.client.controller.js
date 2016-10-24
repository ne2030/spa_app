'use strict';

angular.module('UserController', [])
    .controller('userController', userController);

/** @ngIngect */
function userController($scope, endPoint, $http, $location ,toastr) {



        $scope.login = () => {

            $http.post(endPoint + '/auth/login', {
                userId: this.userId,
                password: this.password
            }).then((res) => {
                // Success function
                localStorage.setItem('authentication', JSON.stringify(res));
                $location.path('/');
            }, (e) => {
                // Error function
                toastr.error('error', e);
            }

            );
        };

        $scope.signup = () => {
            // signup API
        };
}
