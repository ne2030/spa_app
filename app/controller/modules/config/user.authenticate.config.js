'use strict';

angular.module('myapp').config(['$httpProvider', function($httpProvider){
        $httpProvider.interceptors.push(['$injector', authInjector]);
    }
]);

function authInjector($injector, $http, $location, endPoint, toastr) {
    function getAuth() {
        return JSON.parse(localStorage.getItem('authentication'));
    }
    return {
        request: function(config){
            let authentication = getAuth() || {};
            if (!config.headers) { config.headers = {}; }
            config.headers.authorization = `Bearer ${authentication.jwToken}`;
            // set-cookie
			config.withCredentials = true;
			return config;
        },
        // responseError: function(rejection){
        //     // var $http = $injector.get('$http');
        //     switch (rejection.status) {
        //         case 401: {
        //             let authentication = getAuth() || {};
        //             if (authentication.refreshToken) {
        //                 $http.post(endPoint + '/auth/refresh', {
        //                     refreshToken: authentication.refreshToken
        //                 }).then(
        //                 (token) => { localStorage.setItem('authentication', JSON.stringify(token)); },
        //                 (error) => { toastr.error(error.data.message, 'Token Error'); });
        //             } else {
        //                 location.href = '/#/login';
        //             }
        //             break;
        //         }
        //     }
        //     return rejection;
        // }
    };
}













// 나중에 ... 정말 나아아중에 앵귤러를 할 마음에 다시 생기면 돌아와서 '모듈' 이나 컴포넌트 만들기, 팩토링, 파일 구조 같은 것들 이해하고 설게해보기
// 지금은 아냐... 그냥 모듈 exports로 로드하던지 아 근데 그게 안되는 구나 common.js 가 없어서
// 그래서 angular 쓰는구나 그러면 뭐 어쩔 수 없이 필요한 곳에서는 다 설정해줘야지머 근데 그케 어려운건 아니니까
// 어짜피 해봤자 isLogged In 정도 밖에 쓸 거는 없고, 아 getAuthentication 도 쓸려면 쓰긴 쓰겠다.


//
// // Authentication service for user variables

// angular.module('users').factory('Authentication', [
// 	function() {
// 		this._data = JSON.parse(sessionStorage.getItem('authentication')) || {};
//
// 		this.isLoggedIn = function() {
// 			return this._data && this._data.user;
// 		};
//
// 		// this.hasRole = function(data, role) {
// 		// 	return data.user && data.user.roles.indexOf(role) !== -1;
// 		// };
//
// 		this.setAuthentication = function(data) {
// 			this._data = data;
//
// 			sessionStorage.setItem('authentication', JSON.stringify(data));
// 		};
//
// 		this.getAuthentication = function() {
// 			return this._data || JSON.parse(sessionStorage.getItem('authentication'));
// 		};
//
// 		return this;
// 	}
// ]);
