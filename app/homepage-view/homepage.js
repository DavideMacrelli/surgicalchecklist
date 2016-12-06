'use strict';

angular.module('checklistApp.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'homepage-view/homepage.html',
        controller: 'homepageController'
    });

}])

.controller('homepageController', ['$scope', '$log', 'listState', function($scope, $log, listState) {

    $scope.startForm = {

    };

    $scope.startSession = function() {
        $log.log($scope.startForm);
        listState.setChecklistInfo($scope.startForm);
        listState.startList();
    };
}]);
