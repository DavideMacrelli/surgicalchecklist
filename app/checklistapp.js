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
        })
        .catch(function() {
            //il then/catch pattern https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns
            //promessa rejected
            $log.log("promessa rejected");

        });
    };

    var getData = function(){
        //getData per il prototipo, usa un data model di oggetti json,
        //presuppone che il barcode sia identificativo
        //quindi una sola operazione per paziente puo essere presente

        return $http.get('content/jsontest.json').then(function(response) {
            //la get restituisce una promise
            $log.log("La get ha avuto esito positivo: ");
            $scope.opList = response.data[$scope.barcode];      //Trovo l'operazione con lo stesso barcode



        },function(response) {
            $log.log("la get ha avuto esito negativo" + response);
            $scope.error = {
                code: response.status,
                message: response.statusText
            };
            $log.log("" + $scope.error.code + "" + $scope.error.message);
        });
    };


}]);

checklistApp.controller('checklistController', ['$scope', function($scope) {
    //TODO: portare lo scope del controller del form qui

}]);
