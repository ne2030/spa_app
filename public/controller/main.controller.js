(function () {
    'use strict';

    angular.module('subContrller')
        .controller('mainController', mainController);

    /** @ngInject */
    function mainController($scope) {

        $scope.getRoute1 = function() {
            var items = ['a', 'list', 'of', 'items'];
            var counting = itmes.length + 2;

            if (counting == 6){
                $scope.items = items;
                $scope.results = counting;
            }
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
})();
