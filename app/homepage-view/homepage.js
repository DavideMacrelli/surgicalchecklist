'use strict';

angular.module('checklistApp.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'homepage-view/homepage.html',
        controller: 'homepageController'
    });

}])

.controller('homepageController', ['$scope', '$log', 'listState', 'errorPage', 'matchJsonList', function($scope, $log, listState, signalError, getMatchService) {
    $scope.getOperationList = function(){
        getMatchService.getMatch($scope.barcode)
            .then(function(data) {
                //promessa fulfilled
                $log.log("promessa get fulfilled" + data);
                $scope.match = data;

            })
            .catch(function() {
                //promessa reject
                $log.log('promessa get rejected');
                var error = getMatchService.getError();
                signalError(error.code, error.message);
            });
        };

    //TODO: come servizio
    $scope.startSession = function() {
        $log.log("operation prima di passarlo: " + $scope.match);
        listState.startList($scope.barcode, $scope.match);
        /*
        $rootScope.operation = $scope.match;
        $location.path('/checklist-view');
        */
    };
}]);
