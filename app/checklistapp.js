'use strict';

angular.module('checklistApp', [
    'ngRoute',
    'ngAnimate',
    'checklistApp.homepage',
    'checklistApp.errorPage',
    'checklistApp.errorService',
    'checklistApp.jsonListMatcher',
    'checklistApp.checklistView',
    'checklistApp.checklistDirective',
    'checklistApp.listStateService'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

     $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
            redirectTo: "/home"
        });

}]);
