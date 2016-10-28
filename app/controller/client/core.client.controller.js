'use strict';

angular.module('Core', [])
    .controller('core', core);

/** @ngIngect **/
function core ($scope, endPoint, $location, toastr){

    $scope.isLoggedIn = () => {
        let auth = JSON.parse(localStorage.getItem('authentication'));
        return auth && auth.user;
    };

    $scope.logOut = () => {
        localStorage.setItem('authentication', null);
        toastr.success('success', '로그아웃 되었습니다');
        $scope.isLoggedIn();
    };
}
