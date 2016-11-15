'use strict';
/**
 * Services for signaling errors
 */
angular.module('checklistApp.errorService', [])

/**
 * Logs the error on the console
 *
 * @param {*} code error code
 * @param {String} message description of the error
 */
.factory('logError', ['$log', function($log) {
    return function(code, message) {
        //factory in questo caso registra questa funzione che istanzia il servizio quando chiamata
        $log.log("Error! code: " + code + "  Message: " + message);

    };
}])

/**
 * Creates an object that contains error information
 * redirects then to a view that visualize it
 *
 * @param {*} code error code
 * @param {String} message description of the error
 */

.factory('errorPage', ['$location','$rootScope', function($location, $rootScope) {

    //ritorna la stessa 'interfaccia' del logError cosi da disaccoppiare
    //l'implementazione della segnalazione dell'errore dagli altri moduli
    return function(code, message) {

        $rootScope.error = {
            code: code,
            message: message
        };
        $location.path('/error-page');
    };


}]);
