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
        .when('/operation-list', {
            templateUrl: "views/operation-list.html",
            controller: "selectController"
        })
        .when('/data-error', {
            templateUrl: "views/data-error.html"
        })
        .otherwise({
            redirectTo: "/home"
        });

        }
]);



checklistApp.controller('selectController', ['$scope', '$location', '$http', '$log', function($scope, $location, $http, $log) {
    $scope.getOperationList = function(){
        $log.log("Inizio: " + $scope.barcode);
        getData().then(function() {
            //la promessa è fulfilled
            $log.log("Promessa fulfilled");
        },function() {
            //la promessa è rejected
            $log.log("Promessa rejected");


        });
    };

    var getData = function(){
        //TODO: disacoppiare dall'Implementazione,
        //idealmente dovrebbe funzionare anche con un Database

        return $http.get('content/jsontest.json');
    };


}]);

checklistApp.controller('checklistController', ['$scope', function($scope) {
    //TODO: portare lo scope del controller del form qui

}]);
