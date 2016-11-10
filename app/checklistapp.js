var checklistApp = angular.module('checklistApp', ['ngRoute']);

checklistApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: "views/select-operation.html",
            controller: "selectController"
        })
        .when('/surgical-checklist', {
            //TODO: Fare in modo che non ci si possa accedere dalla di navigazione, o senza un operazione loggata
            templateUrl: "views/surgical-checklist.html",
            controller: "checklistController"
        })
        .otherwise({
            redirectTo: "/home"
        });

        }
]);



checklistApp.controller('selectController', ['$scope', '$location', function($scope, $location) {
    $scope.checkForOperation = function(){
        //TODO: Una o più operazioni per barcode?
        var barcode = $scope.barcode;
        $location.path('/surgical-checklist');

    };

}]);

checklistApp.controller('checklistController', ['$scope', function($scope) {
    //TODO: portare lo scope del controller del form qui

}]);
