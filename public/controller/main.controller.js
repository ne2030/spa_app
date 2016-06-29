
angular.module('subController', [])
    .controller('mainController', mainController);

/** @ngInject */
function mainController($scope) {

    var array = ['a', 'set', 'of', 'item'];
    var things = ['a', 'set', 'of', 'things'];

    $scope.getRoute1 = function() {

        var counting = array.length;
        $scope.items = array;
        $scope.results = counting;

    };

    $scope.getRoute2 = function() {

        var add = this.addings;
        (function(){
            if (add){
                things.push(add);}
        })();
        var counting = things.length;
        this.addings = "";

        $scope.things = things;
        $scope.results = counting;
    };
}
