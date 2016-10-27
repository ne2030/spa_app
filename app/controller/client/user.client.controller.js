'use strict';

angular.module('UserController', [])
    .controller('userController', userController);

/** @ngIngect */
function userController($scope, endPoint, $http, $location ,toastr) {

    let userStatus = JSON.parse(localStorage.getItem('authentication'));
    if (userStatus && userStatus.userId) {
        $location.path('/');
        toastr.error('Error', '이미 로그인 되어있습니다.');
    }

    $scope.login = () => {
        let userId = $scope.userId,
            password = $scope.password;
        $http.post(endPoint + '/auth/login', {
            userId: userId,
            password: password
        }).then((res) => {
            // Success function
            let auth = JSON.stringify(res.data);
            localStorage.setItem('authentication', auth);
            $location.path('/');
            toastr.success('Success', '로그인 되었습니다');
        }, (e) => {
            // Error function
            toastr.error('error 클라', e);
        }

        );
    };
    // $ss
}
