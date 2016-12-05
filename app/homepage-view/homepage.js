'use strict';

angular.module('checklistApp.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'homepage-view/homepage.html',
        controller: 'homepageController'
    });

}])

.controller('homepageController', ['$scope', '$log', 'listState', 'errorPage', '$location', function($scope, $log, listState, signalError,$location) {

    $scope.startForm = {

    };

    $scope.startSession = function() {
        $log.log($scope.startForm);
        listState.setChecklistInfo($scope.startForm);
        listState.startList();
    };

    $scope.$on('$destroy', function() {

    });
}]);
