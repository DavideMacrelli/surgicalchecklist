'use strict';

angular.module('checklistApp.errorPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/error-page', {
        templateUrl: 'error-view/error-page.html'
    });

}]);
