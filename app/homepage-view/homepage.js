'use strict';

angular.module('checklistApp.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'homepage-view/homepage.html',
        controller: 'homepageController'
    });

}])

.controller('homepageController', ['$scope', '$log', 'errorPage', 'matchJsonList', function($scope, $log, signalError, getMatchService) {
    $scope.getOperationList = function(){
        $log.log("Inizio: " + $scope.barcode);

        getMatchService.getMatch($scope.barcode)
            .then(function(data) {
                //promessa fulfilled
                $log.log("promessa fulfilled" + data);
                $scope.match = data;

            })
            .catch(function() {
                //promessa reject
                $log.log('promise rejected');
                var error = getMatchService.getError();
                signalError(error.code, error.message);
            });




        /*getData().then(function() {
            //la promessa è fulfilled
            $log.log("Promessa fulfilled");
            if(typeof $scope.opList == "undefined" || $scope.opList.lenght === 0){
                $log.log("Lista vuoto o undefined");
                signalError('00', 'Lista vuota');
            } else {
                $log.log("lista corretta");
                //TODO: controlli migliori per opList
            }
        })
        .catch(function() {
            //il then/catch pattern https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns
            //promessa rejected
            $log.log("promessa rejected");

        });*/
    };



}]);
