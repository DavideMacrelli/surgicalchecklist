'use strict';

angular.module('checklistApp.jsonListMatcher',[])

/**
 * matchJsonList uses the '$http' service to get the list of operation stored in a json file
 * return an object if a match is found or rejects the promise otherwise
 * errors are stored in property that callers can obtain with the 'getError' method
 */
.factory('matchJsonList', ['$http', '$log', '$q', function($http, $log, $q) {
    var errorMessage = {
        code: "",
        message: ""
    };


/**
 * set an error property
 * @param {*} code    code
 * @param {String} message short description of the error
 */
    var setError =  function(code,message) {
        errorMessage.code = code;
        errorMessage.message = message;
    };

    return {

        getError: function() {
            return errorMessage;
        },
        getMatch: function(barcode) {
            return $http.get('content/jsontest.json').then(function(response) {
                //la get restituisce una promise
                if(typeof(response.data) == 'object'){
                    //risposta valida
                    $log.log("risposta valida: ");
                    var matchList = [];
                    $log.log("Typo di response data: " + typeof(response.data[barcode]));
                    if(typeof(response.data[barcode]) != 'undefined'){
                        //c'è un match nella lista
                        matchList.push(response.data[barcode]);
                        $log.log("C'è un match: " + matchList[0]);
                        return matchList[0];
                    } else {
                        //non c'è un match
                        $log.log("Non c'è un match");
                        setError('00', 'Nessun intervento trovato');
                        return $q.reject(response.data);
                    }
                } else {
                    //risposta invalida
                    $log.log("risposta invalida");
                    setError("01", "Risposta invalida");
                    return $q.reject(response.data);
                }

            },function(response) {
                //callback rejected promise
                $log.log("la get ha avuto esito negativo" + response);
                setError(response.status, response.statusText);
                return $q.reject(response.data);
            });

        }
    };

}]);
