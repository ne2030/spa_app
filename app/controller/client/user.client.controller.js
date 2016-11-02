'use strict';

angular.module('UserController', [])
    .controller('userController', userController);

/** @ngIngect */
function userController($scope, endPoint, $http, $location ,toastr) {

    let userStatus = JSON.parse(localStorage.getItem('authentication'));
    if (userStatus && userStatus.user) {
        $location.path('/');
        toastr.error('Error', '이미 로그인 되어있습니다.');
    }

    $scope.login = () => {
        let userEmail = $scope.userEmail,
            password = $scope.password;
        $http.post(endPoint + '/auth/login', {
            userEmail: userEmail,
            password: password
        }).then((res) => {
            // success
            let auth = JSON.stringify(res.data);
            localStorage.setItem('authentication', auth);
            $location.path('/');
            toastr.success('로그인 되었습니다','Success' );
        }, (err) => {
            // Error function
            toastr.error(err.data.message, 'Error');
        }

        );
    };
    // $ss
}
