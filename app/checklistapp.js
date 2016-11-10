var checklistApp = angular.module('checklistApp', ['ngRoute']);

checklistApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: "views/select-operation.html",
            controller: "selectController"
        })
        .otherwise({
            redirectTo: "/home"
        });

        }
]);



checklistApp.controller('selectController', ['$scope', function($scope) {

}]);
