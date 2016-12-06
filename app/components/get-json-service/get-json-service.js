'use strict';

angular.module('checklistApp.getJsonService',[])

/**TODO
 * getJson uses the '$http' service to get the list of operation stored in a json file
 * return an object if a match is found or rejects the promise otherwise
 * errors are stored in property that callers can obtain with the 'getError' method
 */
.factory('getJson', ['$http', '$log', '$q', function($http, $log, $q) {
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
        getResource: function(url) {
            return $http.get(url).then(function(response) {
                //la get restituisce una promise
                $log.log("got JSON: " + response.data);
                if(typeof(response.data) == 'object'){
                    //risposta valida
                    $log.log("risposta valida");
                    return response.data;
                } else {
                    //risposta invalida
                    $log.log("risposta invalida");
                    setError("01", "C'è stato un errore nell recupero della checklist");
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
