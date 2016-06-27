
angular.module('subController', [])
    .controller('mainController', mainController);

/** @ngInject */
function mainController($scope) {

    $scope.getRoute1 = function() {
        var array = ['a', 'set', 'of', 'item'];
        var counting = array.length;
        $scope.items = array;
        $scope.results = counting;

    };

    $scope.getRoute2 = function() {
        var things = ['a', 'set', 'of', 'things'];
        var add = this.addings;
        $scope.insert = function(){
            things.push(add);
        };
        $scope.things = things;
    };
}
