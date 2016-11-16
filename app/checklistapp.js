'use strict';

angular.module('checklistApp', [
    'ngRoute',
    'checklistApp.homepage',
    'checklistApp.error-page',
    'checklistApp.errorService',
    'checklistApp.jsonListMatcher'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

     $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
            redirectTo: "/home"
        });

        }
]);
