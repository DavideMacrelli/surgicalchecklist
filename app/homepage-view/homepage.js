'use strict';

angular.module('checklistApp.homepage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'homepage-view/homepage.html',
        controller: 'homepageController'
    });

}])

.controller('homepageController', ['$scope', '$location', '$http', '$log', '$q', 'errorPage', 'matchJsonList', function($scope, $location, $http, $log, $q, signalError, getMatchService) {
    $scope.getOperationList = function(){
        $log.log("Inizio: " + $scope.barcode);
        //TODO: getData come servizio

        getMatchService.getMatch($scope.barcode);


        /*getData().then(function() {
            //la promessa è fulfilled
            $log.log("Promessa fulfilled");
            if(typeof $scope.opList == "undefined" || $scope.opList.lenght === 0){
                $log.log("Lista vuoto o undefined");
                signalError('00', 'Lista vuota');
            } else {
                $log.log("lista corretta");
                //TODO: controlli migliori per opList
            }
        })
        .catch(function() {
            //il then/catch pattern https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns
            //promessa rejected
            $log.log("promessa rejected");

        });*/
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
        return $http.get('content/json5test.json').then(function(response) {
            //la get restituisce una promise
            $log.log("La get ha avuto esito positivo: ");
            $scope.opList = response.data[$scope.barcode];      //Trovo l'operazione con lo stesso barcode

        },function(response) {
            //callback rejected promise
            $log.log("la get ha avuto esito negativo" + response);
             //definire la callback fa tornare la promessa come fulfilled
            return $q.reject();   //setto la promessa a rejected

        });
    };

}]);
