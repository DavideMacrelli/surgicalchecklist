'use strict';

var checklistApp = angular.module('checklistApp', ['ngRoute']);

checklistApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: "homepage-view/select-operation.html",
            controller: "selectController"
        })
        .when('/surgical-checklist', {
            //TODO: Fare in modo che non ci si possa accedere dalla di navigazione, o senza un operazione loggata
            templateUrl: "checklist-view/surgical-checklist.html",
            controller: "checklistController"
        })
        .when('/operation-list', {
            templateUrl: "homepage-view/operation-list.html",
            controller: "selectController"
        })
        .when('/error-page', {
            templateUrl: "error-view/error-page.html",
            controller: "selectController"
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
            if(typeof $scope.opList == "undefined" || $scope.opList.lenght === 0){
                $log.log("Lista vuoto o undefined");
                errorMessage("", "Operazione non trovata");     //crea il messaggio d'errore
                $location.path('/error-page');      //ridireziona alla pagina che segnala l'errore
            } else {
                $log.log("lista corretta");
                //TODO: controlli migliori per opList
            }
        })
        .catch(function() {
            //il then/catch pattern https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns
            //promessa rejected
            $log.log("promessa rejected");
            $location.path('/error-page');

        });
    };

/**
 * Obtains the surgical operation with the same barcode the user sent via form,
 * data is stored in a json for now
 * @return {HttpPromise} get method promise
 */
    var getData = function(){
        //presuppone che il barcode sia identificativo
        //quindi una sola operazione per paziente puo essere presente
        //TODO: impostare dei servizi per mantenere dati tra le viste
        return $http.get('content/jsontest.json').then(function(response) {
            //la get restituisce una promise
            $log.log("La get ha avuto esito positivo: ");
            $scope.opList = response.data[$scope.barcode];      //Trovo l'operazione con lo stesso barcode

        },function(response) {
            //callback rejected promise
            $log.log("la get ha avuto esito negativo" + response);
            errorMessage(response.status, response.statusText);

        });
    };

/**
 * create an error message accessible from the $scope
 * @param  {string} code    code of the error
 * @param  {string} message
 *
 */
    var errorMessage = function(code,message) {

        $scope.error = {
            code: code,
            message: message
        };
        $log.log("" + $scope.error.code + "" + $scope.error.message);


    };

}]);

checklistApp.controller('checklistController', ['$scope', function($scope) {
    //TODO: portare lo scope del controller del form qui

}]);
