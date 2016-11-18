'use strict';

angular.module('checklistApp.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'homepage-view/homepage.html',
        controller: 'homepageController'
    });

}])

.controller('homepageController', ['$scope', '$log', '$rootScope', '$location', 'errorPage', 'matchJsonList', function($scope, $log, $rootScope, $location, signalError, getMatchService) {
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
        };

    //TODO: come servizio
    $scope.startSession = function() {
        $rootScope.operation = $scope.match;
        $location.path('/checklist-view');
    };
}]);
