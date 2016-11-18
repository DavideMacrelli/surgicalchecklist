'use strict';

angular.module('checklistApp', [
    'ngRoute',
    'checklistApp.homepage',
    'checklistApp.errorPage',
    'checklistApp.errorService',
    'checklistApp.jsonListMatcher',
    'checklistApp.checklistView'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

     $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
            redirectTo: "/home"
        });

}]);
